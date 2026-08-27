import { createHmac, timingSafeEqual } from 'node:crypto';
import { createClient } from '@sanity/client';

const COOKIE_NAME = 'wonderists_admin';
const SESSION_SECONDS = 60 * 60 * 8;

const parseCookies = (header = '') => Object.fromEntries(
  header.split(';').map((item) => item.trim().split('=').map(decodeURIComponent)).filter(([key]) => key),
);

const sessionSecret = () => process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';

const signatureFor = (payload) => createHmac('sha256', sessionSecret()).update(payload).digest('base64url');

const safeEqual = (left, right) => {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && timingSafeEqual(a, b);
};

export const createSession = () => {
  const payload = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${payload}.${signatureFor(payload)}`;
};

export const isAuthenticated = (request) => {
  const token = parseCookies(request.headers.cookie)[COOKIE_NAME];
  if (!token || !sessionSecret()) return false;
  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature || Number(expiresAt) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, signatureFor(expiresAt));
};

export const passwordMatches = (password) => Boolean(process.env.ADMIN_PASSWORD) && safeEqual(password, process.env.ADMIN_PASSWORD);

export const setSessionCookie = (response) => response.setHeader(
  'Set-Cookie',
  `${COOKIE_NAME}=${encodeURIComponent(createSession())}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`,
);

export const clearSessionCookie = (response) => response.setHeader(
  'Set-Cookie',
  `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
);

export const requireAdmin = (request, response) => {
  if (isAuthenticated(request)) return true;
  response.status(401).json({ message: 'Please log in again.' });
  return false;
};

export const requireSameOrigin = (request, response) => {
  const origin = request.headers.origin;
  const host = request.headers['x-forwarded-host'] || request.headers.host;
  if (!origin) return true;
  try {
    if (new URL(origin).host === host) return true;
  } catch {
    // Malformed origins are rejected below.
  }
  response.status(403).json({ message: 'Invalid request origin.' });
  return false;
};

export const adminClient = () => {
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production';
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) throw new Error('Admin CMS environment is incomplete.');

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: process.env.VITE_SANITY_API_VERSION || '2026-08-01',
    useCdn: false,
    perspective: 'published',
  });
};

export const readRawBody = async (request) => {
  if (Buffer.isBuffer(request.body)) return request.body;
  if (typeof request.body === 'string') return Buffer.from(request.body);
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
};
