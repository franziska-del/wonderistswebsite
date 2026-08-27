import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  imageField,
  paragraphsField,
  sectionObject,
  stringField,
  stringsField,
  textField,
} from './fields';

export const wildIdeasPage = defineType({
  name: 'wildIdeasPage',
  title: 'WILD IDEAS Page',
  type: 'document',
  groups: [
    { name: 'seo', title: 'Search & Browser' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'content', title: 'Page Content', default: true },
    { name: 'booking', title: 'Booking' },
  ],
  fields: [
    sectionObject('meta', 'Search and browser details', [
      stringField('title', 'Browser title'),
      textField('description', 'Search description'),
    ], 'seo'),
    sectionObject('navigation', 'Navigation', [
      stringField('experience', 'Experience label'),
      stringField('whyItWorks', 'Why it works label'),
      stringField('hosts', 'Hosts label'),
      stringField('book', 'Booking label'),
    ], 'navigation'),
    sectionObject('hero', 'Hero', [
      stringField('title', 'Heading'),
      textField('subtitle', 'Subtitle'),
      stringField('dates', 'Dates'),
      stringField('location', 'Location'),
      stringField('attribution', 'Attribution'),
      stringField('primaryCta', 'Primary button'),
      stringField('secondaryCta', 'Secondary button'),
      imageField(),
      stringField('imageAlt', 'Image description'),
      stringField('caption', 'Image caption'),
    ]),
    sectionObject('intro', 'Introduction', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      paragraphsField(),
      textField('statement', 'Closing statement'),
    ]),
    defineField({
      name: 'facts',
      title: 'Experience facts',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [stringField('label', 'Label'), stringField('value', 'Value')],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),
    sectionObject('futureSkills', 'Future skills', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      paragraphsField(),
      imageField(),
      stringField('imageAlt', 'Image description'),
      stringField('caption', 'Image caption'),
    ]),
    sectionObject('experience', 'Weekend experience', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      textField('intro', 'Introduction'),
      stringsField('items', 'Activities'),
      textField('outro', 'Closing paragraph'),
    ]),
    sectionObject('venture', 'First venture', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      paragraphsField(),
      stringsField('items', 'Learning outcomes'),
      textField('outro', 'Closing paragraph'),
    ]),
    sectionObject('reasons', 'Why WILD IDEAS works', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      defineField({
        name: 'items',
        title: 'Reasons',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [stringField('title', 'Title'), paragraphsField()],
            preview: { select: { title: 'title' } },
          }),
        ],
      }),
    ]),
    sectionObject('inclusions', 'What’s included', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      stringsField('items', 'Inclusions'),
      stringField('suitability', 'Age suitability'),
    ]),
    sectionObject('hosts', 'Hosts', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      defineField({
        name: 'items',
        title: 'Host profiles',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [stringField('name', 'Name'), paragraphsField()],
            preview: { select: { title: 'name', subtitle: 'body.0' } },
          }),
        ],
      }),
    ]),
    sectionObject('audience', 'Who it’s for', [
      stringField('label', 'Section label'),
      stringField('title', 'Heading'),
      textField('intro', 'Introduction'),
      stringsField('items', 'Parent goals'),
      textField('outro', 'Closing paragraph'),
    ]),
    sectionObject('closing', 'Closing story', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      paragraphsField(),
      stringField('cta', 'Button label'),
    ]),
    sectionObject('booking', 'Booking section', [
      stringField('label', 'Section label'),
      textField('title', 'Heading'),
      stringField('dates', 'Dates'),
      stringField('location', 'Location'),
      stringField('price', 'Price'),
      textField('includes', 'Included summary'),
      stringField('capacity', 'Capacity'),
      stringField('formCta', 'Form button'),
      textField('success', 'Success message'),
    ], 'booking'),
  ],
  preview: { prepare: () => ({ title: 'WILD IDEAS Page' }) },
});
