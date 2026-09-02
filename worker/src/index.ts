import { buildSystemPrompt, SiteData } from './systemPrompt';

export interface Env {
  GROQ_API_KEY: string;
  GROQ_MODEL: string;
  ALLOWED_ORIGINS: string;
  ADMIN_PASSWORD: string;
  SITE_DATA: KVNamespace;
  LEADS_DB: D1Database;
}

type ChatRole = 'user' | 'model';
type ChatMessage = { role: ChatRole; text: string };
type Attachment = { type: 'file'; url: string; fileName: string };

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 20;
const MAX_DATA_BODY_BYTES = 1024 * 1024; // 1 MB
const MAX_NAME_LENGTH = 100;
const MAX_COMPANY_LENGTH = 100;
const SITE_DATA_KEY = 'site-data';
const CV_KEYWORDS = /\b(cv|résumé|resume|curriculum vitae)\b/i;

const LOCALHOST_ORIGIN = /^https?:\/\/localhost:\d+$/;

function isAllowedOrigin(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) {
    return false;
  }
  return allowedOrigins.includes(origin) || LOCALHOST_ORIGIN.test(origin);
}

function corsHeaders(origin: string | null, allowedOrigins: string[]): HeadersInit {
  const allowed = isAllowedOrigin(origin, allowedOrigins) ? origin! : allowedOrigins[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

function handleCvRequest(
  cv: { url?: string; fileName?: string } | undefined,
  headers: HeadersInit
): Response {
  if (!cv?.url) {
    return json(
      {
        reply:
          "Linh hasn't uploaded his CV here yet — meow-kward! You can check out his work on GitHub or LinkedIn in the meantime. 🐾",
      },
      200,
      headers
    );
  }
  const attachment: Attachment = {
    type: 'file',
    url: cv.url,
    fileName: cv.fileName || 'Linh_Tran_CV.pdf',
  };
  return json(
    {
      reply: "Here's Linh's CV — feel free to download it! 🐾",
      attachment,
    },
    200,
    headers
  );
}

async function leadExists(env: Env, leadId: number): Promise<boolean> {
  const row = await env.LEADS_DB.prepare('SELECT id FROM leads WHERE id = ?')
    .bind(leadId)
    .first();
  return !!row;
}

async function logMessage(
  env: Env,
  leadId: number,
  role: ChatRole,
  text: string
): Promise<void> {
  await env.LEADS_DB.prepare(
    'INSERT INTO messages (lead_id, role, text, created_at) VALUES (?, ?, ?, ?)'
  )
    .bind(leadId, role, text, new Date().toISOString())
    .run();
}

async function handleCreateLead(request: Request, env: Env, headers: HeadersInit): Promise<Response> {
  let body: { name?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400, headers);
  }

  const name = (body.name ?? '').trim();
  const company = (body.company ?? '').trim();
  if (!name || !company) {
    return json({ error: 'name and company are required' }, 400, headers);
  }
  if (name.length > MAX_NAME_LENGTH || company.length > MAX_COMPANY_LENGTH) {
    return json({ error: 'name or company too long' }, 400, headers);
  }

  const result = await env.LEADS_DB.prepare(
    'INSERT INTO leads (name, company, created_at) VALUES (?, ?, ?)'
  )
    .bind(name, company, new Date().toISOString())
    .run();

  return json({ leadId: result.meta.last_row_id }, 200, headers);
}

async function handleChat(request: Request, env: Env, headers: HeadersInit): Promise<Response> {
  let body: { message?: string; history?: ChatMessage[]; leadId?: number };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400, headers);
  }

  const message = (body.message ?? '').trim();
  if (!message) {
    return json({ error: 'message is required' }, 400, headers);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return json({ error: `message too long (max ${MAX_MESSAGE_LENGTH} chars)` }, 400, headers);
  }

  const leadId =
    typeof body.leadId === 'number' && (await leadExists(env, body.leadId))
      ? body.leadId
      : null;
  if (leadId !== null) {
    await logMessage(env, leadId, 'user', message);
  }

  const siteDataRaw = await env.SITE_DATA.get(SITE_DATA_KEY);
  if (!siteDataRaw) {
    return json({ error: 'Sâu is napping right now, try again later.' }, 502, headers);
  }
  const siteData: SiteData = JSON.parse(siteDataRaw);

  if (CV_KEYWORDS.test(message)) {
    const res = handleCvRequest(siteData.cv, headers);
    if (leadId !== null) {
      const { reply } = await res.clone().json<{ reply: string }>();
      await logMessage(env, leadId, 'model', reply);
    }
    return res;
  }

  const history = (body.history ?? []).slice(-MAX_HISTORY_MESSAGES);
  const messages = [
    { role: 'system', content: buildSystemPrompt(siteData) },
    ...history.map((m) => ({
      role: m.role === 'model' ? 'assistant' : 'user',
      content: m.text,
    })),
    { role: 'user', content: message },
  ];

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: env.GROQ_MODEL,
      messages,
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!groqRes.ok) {
    console.error('Groq API error', groqRes.status, await groqRes.text());
    return json({ error: 'Sâu is napping right now, try again later.' }, 502, headers);
  }

  const data: {
    choices?: { message?: { content?: string } }[];
  } = await groqRes.json();
  const reply = data.choices?.[0]?.message?.content ?? "Meow? I couldn't think of a reply.";

  if (leadId !== null) {
    await logMessage(env, leadId, 'model', reply);
  }

  return json({ reply }, 200, headers);
}

async function handleGetData(env: Env, headers: HeadersInit): Promise<Response> {
  const raw = await env.SITE_DATA.get(SITE_DATA_KEY);
  if (!raw) {
    return json({ error: 'No site data found' }, 404, headers);
  }
  return new Response(raw, {
    status: 200,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

function isAuthorized(request: Request, env: Env): boolean {
  const auth = request.headers.get('Authorization') ?? '';
  const [scheme, token] = auth.split(' ');
  return scheme === 'Bearer' && !!token && token === env.ADMIN_PASSWORD;
}

async function handleGetLeads(request: Request, env: Env, headers: HeadersInit): Promise<Response> {
  if (!isAuthorized(request, env)) {
    return json({ error: 'Unauthorized' }, 401, headers);
  }

  const { results: leads } = await env.LEADS_DB.prepare(
    'SELECT id, name, company, created_at FROM leads ORDER BY created_at DESC'
  ).all<{ id: number; name: string; company: string; created_at: string }>();

  const { results: messages } = await env.LEADS_DB.prepare(
    'SELECT lead_id, role, text, created_at FROM messages ORDER BY created_at ASC'
  ).all<{ lead_id: number; role: ChatRole; text: string; created_at: string }>();

  const messagesByLead = new Map<number, { role: ChatRole; text: string; createdAt: string }[]>();
  for (const m of messages) {
    const list = messagesByLead.get(m.lead_id) ?? [];
    list.push({ role: m.role, text: m.text, createdAt: m.created_at });
    messagesByLead.set(m.lead_id, list);
  }

  const leadsWithMessages = leads.map((lead) => ({
    id: lead.id,
    name: lead.name,
    company: lead.company,
    createdAt: lead.created_at,
    messages: messagesByLead.get(lead.id) ?? [],
  }));

  return json({ leads: leadsWithMessages }, 200, headers);
}

function handleVerify(request: Request, env: Env, headers: HeadersInit): Response {
  if (!isAuthorized(request, env)) {
    return json({ error: 'Unauthorized' }, 401, headers);
  }
  return json({ ok: true }, 200, headers);
}

async function handlePutData(request: Request, env: Env, headers: HeadersInit): Promise<Response> {
  if (!isAuthorized(request, env)) {
    return json({ error: 'Unauthorized' }, 401, headers);
  }

  const contentLength = Number(request.headers.get('Content-Length') ?? '0');
  if (contentLength > MAX_DATA_BODY_BYTES) {
    return json({ error: 'Payload too large' }, 413, headers);
  }

  let parsed: unknown;
  const text = await request.text();
  if (text.length > MAX_DATA_BODY_BYTES) {
    return json({ error: 'Payload too large' }, 413, headers);
  }
  try {
    parsed = JSON.parse(text);
  } catch {
    return json({ error: 'Body must be valid JSON' }, 400, headers);
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return json({ error: 'Body must be a JSON object' }, 400, headers);
  }

  await env.SITE_DATA.put(SITE_DATA_KEY, JSON.stringify(parsed));
  return json({ ok: true }, 200, headers);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    const origin = request.headers.get('Origin');
    const headers = corsHeaders(origin, allowedOrigins);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (!isAllowedOrigin(origin, allowedOrigins)) {
      return json({ error: 'Origin not allowed' }, 403, headers);
    }

    const url = new URL(request.url);

    if (url.pathname === '/chat' && request.method === 'POST') {
      return handleChat(request, env, headers);
    }

    if (url.pathname === '/data' && request.method === 'GET') {
      return handleGetData(env, headers);
    }

    if (url.pathname === '/admin/data' && request.method === 'PUT') {
      return handlePutData(request, env, headers);
    }

    if (url.pathname === '/admin/verify' && request.method === 'GET') {
      return handleVerify(request, env, headers);
    }

    if (url.pathname === '/lead' && request.method === 'POST') {
      return handleCreateLead(request, env, headers);
    }

    if (url.pathname === '/admin/leads' && request.method === 'GET') {
      return handleGetLeads(request, env, headers);
    }

    return json({ error: 'Not found' }, 404, headers);
  },
};
