import { isAuthenticated } from '../server/admin.js';

export default function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ message: 'Method not allowed.' });
  if (!isAuthenticated(request)) return response.status(401).json({ authenticated: false });
  return response.status(200).json({ authenticated: true });
}
