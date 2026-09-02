export type Lead = {
  id: number;
  name: string;
  company: string;
};

export const LEAD_STORAGE_KEY = 'chat_lead';

export function loadStoredLead(): Lead | null {
  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeLead(lead: Lead): void {
  localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(lead));
}
