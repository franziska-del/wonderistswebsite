import { adminClient, readRawBody, requireAdmin, requireSameOrigin } from '../server/admin.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed.' });
  if (!requireAdmin(request, response) || !requireSameOrigin(request, response)) return;

  try {
    const body = await readRawBody(request);
    if (!body.length) return response.status(400).json({ message: 'Choose an image to upload.' });
    if (body.length > 8 * 1024 * 1024) return response.status(413).json({ message: 'Images must be smaller than 8 MB.' });

    const filename = decodeURIComponent(request.headers['x-file-name'] || 'website-image');
    const asset = await adminClient().assets.upload('image', body, {
      filename,
      contentType: request.headers['content-type'] || undefined,
    });

    return response.status(200).json({ asset: { _id: asset._id, url: asset.url } });
  } catch (error) {
    console.error('Admin upload error', error);
    return response.status(500).json({ message: 'The image could not be uploaded.' });
  }
}
