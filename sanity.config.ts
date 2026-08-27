import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { studioDataset, studioProjectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'wonderists',
  title: 'The Wonderists CMS',
  projectId: studioProjectId,
  dataset: studioDataset,
  basePath: '/studio',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
