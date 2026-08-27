import type { StructureResolver } from 'sanity/structure';

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title('The Wonderists CMS')
    .items([
      singleton(S, 'homePage', 'Main Page'),
      singleton(S, 'wildIdeasPage', 'WILD IDEAS Page'),
    ]);
