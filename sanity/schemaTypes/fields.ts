import { defineArrayMember, defineField } from 'sanity';

export const stringField = (name: string, title: string, group?: string) =>
  defineField({ name, title, type: 'string', group });

export const textField = (name: string, title: string, group?: string) =>
  defineField({ name, title, type: 'text', rows: 3, group });

export const paragraphsField = (name = 'body', title = 'Paragraphs') =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'text', rows: 3 })],
  });

export const stringsField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  });

export const imageField = (name = 'image', title = 'Image') =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'fallbackUrl',
        title: 'Existing site image path',
        type: 'string',
        description: 'Used until an image is uploaded here. Usually leave this unchanged.',
      }),
    ],
  });

export const sectionObject = (
  name: string,
  title: string,
  fields: ReturnType<typeof defineField>[],
  group = 'content',
) =>
  defineField({
    name,
    title,
    type: 'object',
    group,
    options: { collapsible: true, collapsed: true },
    fields,
  });
