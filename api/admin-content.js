import { adminClient, requireAdmin, requireSameOrigin } from '../server/admin.js';

const query = `{
  "home": *[_id == "homePage"][0]{
    ...,
    hero{..., image{..., "url": asset->url}},
    adventures{..., items[]{..., image{..., "url": asset->url}}},
    wondercards{..., image{..., "url": asset->url}}
  },
  "wildIdeas": *[_id == "wildIdeasPage"][0]{
    ...,
    hero{..., image{..., "url": asset->url}},
    futureSkills{..., image{..., "url": asset->url}}
  }
}`;

const documents = {
  homePage: 'homePage',
  wildIdeasPage: 'wildIdeasPage',
};

const cleanContent = (value, root = false) => {
  if (Array.isArray(value)) return value.map((item) => cleanContent(item));
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !['__proto__', 'prototype', 'constructor', '_rev', '_createdAt', '_updatedAt', 'url'].includes(key))
      .filter(([key]) => !root || !['_id', '_type'].includes(key))
      .map(([key, child]) => [key, cleanContent(child)]),
  );
};

export default async function handler(request, response) {
  if (!requireAdmin(request, response)) return;

  try {
    const client = adminClient();

    if (request.method === 'GET') {
      response.setHeader('Cache-Control', 'no-store');
      return response.status(200).json(await client.fetch(query));
    }

    if (request.method === 'POST') {
      if (!requireSameOrigin(request, response)) return;
      const { id, content } = request.body || {};
      const type = documents[id];
      if (!type || !content || typeof content !== 'object' || Array.isArray(content)) {
        return response.status(400).json({ message: 'Invalid content update.' });
      }

      await client.createIfNotExists({ _id: id, _type: type });
      const result = await client.patch(id).set(cleanContent(content, true)).commit({ autoGenerateArrayKeys: true });
      return response.status(200).json({ updated: true, documentId: result._id });
    }

    return response.status(405).json({ message: 'Method not allowed.' });
  } catch (error) {
    console.error('Admin content error', error);
    return response.status(500).json({ message: 'The CMS could not complete that request.' });
  }
}
