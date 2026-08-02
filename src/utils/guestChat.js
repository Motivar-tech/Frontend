import chatService from '../Services/ChatService';

const STORAGE_KEY = 'motivar-guest-chat';

// A guest conversation lives in localStorage rather than sessionStorage because
// signup crosses tabs: the verification email opens a new tab, and the claim can
// only run once the account exists there. The guest token is a bearer credential
// and the only copy — the server keeps just a hash and drops the whole session
// after GUEST_SESSION_TTL_HOURS.
export function readGuestChat() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw);
    return record?.session_id && record?.guest_token ? record : null;
  } catch {
    return null;
  }
}

export function writeGuestChat(patch) {
  const next = { ...(readGuestChat() || {}), ...patch };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage full or blocked — the conversation still works for this page view */
  }
  return next;
}

export function clearGuestChat() {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasGuestChat() {
  return !!readGuestChat();
}

/**
 * Attaches a stored guest conversation to the signed-in account.
 *
 * Safe to call on any post-login path: it no-ops without a guest record or an
 * auth token, and never throws. Returns the claim payload
 * ({ transcript, profile, carried_recommendations, ... }) on success, else null.
 */
export async function claimGuestChat() {
  const record = readGuestChat();
  if (!record) return null;
  if (!localStorage.getItem('motivar-token')) return null;

  // Claim needs a learner profile; a sponsor account will never be able to take
  // this conversation, so stop holding the credential.
  const role = localStorage.getItem('motivar-user-role');
  if (role && role !== 'learner') {
    clearGuestChat();
    return null;
  }

  try {
    const data = await chatService.claimGuestChat(record.guest_token);
    clearGuestChat(); // single-use — burned server-side
    return data;
  } catch (error) {
    // 409: already claimed or expired — nothing left to attach.
    // 400/401: no learner profile yet, or the email isn't verified. Keep the
    // token so the next dashboard visit can retry once that is settled.
    if (error.status === 409) clearGuestChat();
    return null;
  }
}
