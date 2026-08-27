import { clearSessionCookie, requireSameOrigin } from '../server/admin.js';

export default function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed.' });
  if (!requireSameOrigin(request, response)) return;
  clearSessionCookie(response);
  return response.status(200).json({ authenticated: false });
}
