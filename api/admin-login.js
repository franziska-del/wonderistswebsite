import { passwordMatches, requireSameOrigin, setSessionCookie } from '../server/admin.js';

export default function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed.' });
  if (!requireSameOrigin(request, response)) return;
  if (!passwordMatches(request.body?.password)) return response.status(401).json({ message: 'That password is not correct.' });
  setSessionCookie(response);
  return response.status(200).json({ authenticated: true });
}
