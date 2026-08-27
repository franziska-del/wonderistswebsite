import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-08-01';

const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null;

const imageProjection = `coalesce(image.asset->url, image.fallbackUrl)`;

const homePageQuery = `*[_id == "homePage" && _type == "homePage"][0]{
  meta,
  navigation,
  hero{..., "image": ${imageProjection}},
  manifesto,
  adventures{..., items[]{..., "image": ${imageProjection}}},
  adventureStory,
  wondercards{..., "image": ${imageProjection}},
  philosophy,
  closing,
  contact,
  footer
}`;

const wildIdeasPageQuery = `*[_id == "wildIdeasPage" && _type == "wildIdeasPage"][0]{
  meta,
  navigation,
  hero{..., "image": ${imageProjection}},
  intro,
  facts,
  futureSkills{..., "image": ${imageProjection}},
  experience,
  venture,
  reasons,
  inclusions,
  hosts,
  audience,
  closing,
  booking
}`;

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const mergeWithFallback = (fallback, content) => {
  if (Array.isArray(content)) return content;
  if (!isObject(content)) return content ?? fallback;

  return Object.fromEntries(
    new Set([...Object.keys(fallback || {}), ...Object.keys(content)]).values().map((key) => [
      key,
      mergeWithFallback(fallback?.[key], content[key]),
    ]),
  );
};

const loadSingleton = async (query, fallback) => {
  if (!client) return fallback;

  try {
    const content = await client.fetch(query);
    return content ? mergeWithFallback(fallback, content) : fallback;
  } catch (error) {
    console.warn('Sanity content could not be loaded; using the local fallback.', error);
    return fallback;
  }
};

export const loadHomePage = (fallback) => loadSingleton(homePageQuery, fallback);
export const loadWildIdeasPage = (fallback) => loadSingleton(wildIdeasPageQuery, fallback);
