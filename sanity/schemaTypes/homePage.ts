import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  imageField,
  paragraphsField,
  sectionObject,
  stringField,
  textField,
} from './fields';

export const homePage = defineType({
  name: 'homePage',
  title: 'Main Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'Search & Browser' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'content', title: 'Page Content', default: true },
    { name: 'contact', title: 'Contact & Footer' },
  ],
  fields: [
    sectionObject('meta', 'Search and browser details', [
      stringField('title', 'Browser title'),
      textField('description', 'Search description'),
    ], 'seo'),
    sectionObject('navigation', 'Navigation', [
      stringField('adventures', 'Adventures label'),
      stringField('wondercards', 'Wondercards label'),
      stringField('philosophy', 'Philosophy label'),
      stringField('contact', 'Contact label'),
    ], 'navigation'),
    sectionObject('hero', 'Hero', [
      textField('title', 'Heading'),
      paragraphsField(),
      stringField('primaryCta', 'Primary button'),
      stringField('secondaryCta', 'Secondary button'),
      imageField(),
      stringField('imageAlt', 'Image description'),
      stringField('caption', 'Image caption'),
    ]),
    sectionObject('manifesto', 'Manifesto', [
      stringField('texture', 'Side text'),
      textField('title', 'Heading'),
      paragraphsField(),
      stringField('statement', 'Closing statement'),
      stringField('statementStrong', 'Emphasised statement'),
    ]),
    sectionObject('adventures', 'Adventures', [
      textField('title', 'Section heading'),
      textField('intro', 'Introduction'),
      defineField({
        name: 'items',
        title: 'Adventure cards',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              stringField('id', 'ID'),
              stringField('number', 'Number'),
              stringField('title', 'Title'),
              stringField('cta', 'Button label'),
              stringField('href', 'Page link'),
              imageField(),
              textField('description', 'Description'),
            ],
            preview: {
              select: { title: 'title', subtitle: 'number', media: 'image' },
            },
          }),
        ],
      }),
    ]),
    sectionObject('adventureStory', 'Adventure story', [
      textField('title', 'Heading'),
      paragraphsField(),
    ]),
    sectionObject('wondercards', 'Wondercards and Unspoken cards', [
      textField('title', 'Heading'),
      paragraphsField(),
      stringField('shipping', 'Shipping note'),
      stringField('cta', 'Wondercards button'),
      stringField('unspokenCta', 'Unspoken button'),
      stringField('unspokenUrl', 'Unspoken deck URL'),
      imageField(),
      stringField('imageAlt', 'Image description'),
    ]),
    sectionObject('philosophy', 'Philosophy', [
      textField('title', 'Heading'),
      paragraphsField(),
      defineField({
        name: 'definitions',
        title: 'Definitions',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              stringField('term', 'Term'),
              textField('definition', 'Definition'),
            ],
            preview: { select: { title: 'term', subtitle: 'definition' } },
          }),
        ],
      }),
    ]),
    sectionObject('closing', 'Closing section', [
      textField('title', 'Heading'),
      textField('body', 'Paragraph'),
      textField('statement', 'Emphasised statement'),
      stringField('primaryCta', 'First button'),
      stringField('secondaryCta', 'Second button'),
    ]),
    sectionObject('contact', 'Contact form', [
      stringField('defaultTitle', 'Default heading'),
      textField('defaultDescription', 'Default description'),
      stringField('wondercardsTitle', 'Wondercards heading'),
      textField('wondercardsDescription', 'Wondercards description'),
      stringField('formCta', 'Form button'),
      textField('success', 'Success message'),
    ], 'contact'),
    sectionObject('footer', 'Footer', [
      stringField('instagramLabel', 'Instagram label'),
      stringField('instagramUrl', 'Instagram URL'),
      stringField('linkedinLabel', 'LinkedIn label'),
      stringField('linkedinUrl', 'LinkedIn URL'),
    ], 'contact'),
  ],
  preview: { prepare: () => ({ title: 'Main Page' }) },
});
