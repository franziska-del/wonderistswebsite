export const studioProjectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  'wonderists';

export const studioDataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  'production';
