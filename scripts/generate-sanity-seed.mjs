import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));

const toSanityImage = (value) => ({ _type: 'image', fallbackUrl: value });

const withKeys = (value, prefix = 'item') => {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      const transformed = withKeys(item, `${prefix}-${index + 1}`);
      return transformed && typeof transformed === 'object' && !Array.isArray(transformed)
        ? { _key: `${prefix}-${index + 1}`, ...transformed }
        : transformed;
    });
  }

  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      key === 'image' && typeof child === 'string'
        ? toSanityImage(child)
        : withKeys(child, key),
    ]),
  );
};

const home = withKeys(await readJson('src/content/home.json'));
const wildIdeas = withKeys(await readJson('src/content/wild-ideas.json'));

const documents = [
  { _id: 'homePage', _type: 'homePage', ...home },
  { _id: 'wildIdeasPage', _type: 'wildIdeasPage', ...wildIdeas },
];

const output = resolve(root, 'sanity-seed/wonderists-seed.ndjson');
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`);

console.log(`Prepared ${documents.length} Sanity documents at ${output}`);
