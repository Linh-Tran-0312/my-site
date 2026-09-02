export const WORKER_BASE_URL =
  import.meta.env.VITE_WORKER_BASE_URL ||
  'https://my-site-ai-assistant.linh-tran-0312.workers.dev';

export const CHAT_API_URL = `${WORKER_BASE_URL}/chat`;
export const DATA_API_URL = `${WORKER_BASE_URL}/data`;
export const ADMIN_DATA_API_URL = `${WORKER_BASE_URL}/admin/data`;
export const LEAD_API_URL = `${WORKER_BASE_URL}/lead`;
export const ADMIN_LEADS_API_URL = `${WORKER_BASE_URL}/admin/leads`;
