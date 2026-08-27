import React, { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import './wonderistsAdmin.css';

type ContentDocument = Record<string, any>;
type AdminData = { home: ContentDocument; wildIdeas: ContentDocument };

const apiVersion = '2026-08-01';

const ADMIN_QUERY = `{
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

const sections = [
  { id: 'dashboard', label: 'Dashboard', description: 'Shortcuts and publishing status.' },
  { id: 'main', label: 'Main Page', description: 'Hero, manifesto and closing message.' },
  { id: 'adventures', label: 'Adventures', description: 'Adventure cards and enquiry copy.' },
  { id: 'wondercards', label: 'Wondercards', description: 'Product story, image and links.' },
  { id: 'philosophy', label: 'Philosophy', description: 'Wonderism message and definitions.' },
  { id: 'contact', label: 'Contact & Footer', description: 'Form messages and social links.' },
  { id: 'wild-intro', label: 'WILD IDEAS', description: 'Hero, overview and event facts.' },
  { id: 'wild-journey', label: 'WILD Journey', description: 'Activities and entrepreneurial learning.' },
  { id: 'wild-details', label: 'WILD Details', description: 'Reasons, inclusions, hosts and audience.' },
  { id: 'booking', label: 'Booking', description: 'Closing story, dates, price and capacity.' },
] as const;

type SectionId = (typeof sections)[number]['id'];

const deepClone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const setAtPath = (target: ContentDocument, path: string, value: unknown) => {
  const parts = path.split('.');
  let cursor: any = target;

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      cursor[part] = value;
      return;
    }

    if (cursor[part] == null) cursor[part] = /^\d+$/.test(parts[index + 1]) ? [] : {};
    cursor = cursor[part];
  });
};

const cleanForSave = (value: any, isRoot = false): any => {
  if (Array.isArray(value)) return value.map((item) => cleanForSave(item));
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !['_rev', '_createdAt', '_updatedAt', 'url'].includes(key))
      .filter(([key]) => !isRoot || !['_id', '_type'].includes(key))
      .map(([key, child]) => [key, cleanForSave(child)]),
  );
};

const paragraphs = (value?: string[]) => (value || []).join('\n\n');
const lines = (value?: string[]) => (value || []).join('\n');

function Field({ label, name, value, type = 'text', help }: { label: string; name: string; value?: string; type?: string; help?: string }) {
  return (
    <label className="wa-field">
      <span>{label}</span>
      <input name={name} type={type} defaultValue={value || ''} />
      {help ? <small>{help}</small> : null}
    </label>
  );
}

function TextArea({ label, name, value, kind = 'text', rows = 4, help }: { label: string; name: string; value?: string | string[]; kind?: 'text' | 'paragraphs' | 'lines'; rows?: number; help?: string }) {
  const text = Array.isArray(value) ? (kind === 'paragraphs' ? paragraphs(value) : lines(value)) : value || '';
  return (
    <label className="wa-field wa-field--wide">
      <span>{label}</span>
      <textarea name={name} data-kind={kind} defaultValue={text} rows={rows} />
      {help ? <small>{help}</small> : null}
    </label>
  );
}

function ImageField({ label, name, image }: { label: string; name: string; image?: ContentDocument }) {
  const src = image?.url || image?.fallbackUrl;
  return (
    <div className="wa-image-field">
      <div className="wa-image-preview">
        {src ? <img src={src} alt="" /> : <span>No image</span>}
      </div>
      <label className="wa-field">
        <span>{label}</span>
        <input name={name} data-image type="file" accept="image/*" />
        <small>Choose a file only when replacing the current image.</small>
      </label>
    </div>
  );
}

function Panel({ eyebrow = 'Simple editor', title, description, preview, children }: { eyebrow?: string; title: string; description: string; preview?: string; children: ReactNode }) {
  return (
    <section className="wa-panel">
      <header className="wa-panel__header">
        <div>
          <p className="wa-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {preview ? <a className="wa-button wa-button--secondary" href={preview} target="_blank" rel="noreferrer">Preview page</a> : null}
      </header>
      <div className="wa-panel__body">{children}</div>
    </section>
  );
}

function SaveButton({ busy }: { busy: boolean }) {
  return <button className="wa-button" type="submit" disabled={busy}>{busy ? 'Publishing…' : 'Save & publish'}</button>;
}

function Status({ message, error }: { message?: string; error?: string }) {
  if (!message && !error) return null;
  return <div className={`wa-status ${error ? 'wa-status--error' : ''}`} role="status">{error || message}</div>;
}

export function WonderistsAdmin({ client, onLogout }: { client: any; onLogout?: () => void }) {
  const [data, setData] = useState<AdminData | null>(null);
  const [active, setActive] = useState<SectionId>('dashboard');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadContent = useCallback(async () => {
    setError('');
    try {
      const result = await client.fetch(ADMIN_QUERY) as AdminData;
      setData(result);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Content could not be loaded.');
    }
  }, [client]);

  useEffect(() => { void loadContent(); }, [loadContent]);

  const currentMeta = useMemo(() => sections.find((section) => section.id === active) || sections[0], [active]);

  const saveDocument = async (documentKey: keyof AdminData, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!data) return;

    setBusy(true);
    setMessage('');
    setError('');

    try {
      const form = event.currentTarget;
      const nextDocument = deepClone(data[documentKey]);
      const elements = Array.from(form.elements) as HTMLInputElement[];

      for (const element of elements) {
        if (!element.name || element.type === 'submit') continue;

        if (element.dataset.image !== undefined) {
          const file = element.files?.[0];
          if (!file) continue;
          const previous = element.name.split('.').reduce((value, key) => value?.[key], nextDocument);
          const asset = await client.assets.upload('image', file, { filename: file.name, contentType: file.type });
          setAtPath(nextDocument, element.name, {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
            ...(previous?.fallbackUrl ? { fallbackUrl: previous.fallbackUrl } : {}),
          });
          continue;
        }

        const kind = element.dataset.kind;
        const raw = element.value.trim();
        const value = kind === 'paragraphs'
          ? raw.split(/\n\s*\n/g).map((item) => item.trim()).filter(Boolean)
          : kind === 'lines'
            ? raw.split('\n').map((item) => item.trim()).filter(Boolean)
            : raw;
        setAtPath(nextDocument, element.name, value);
      }

      const id = documentKey === 'home' ? 'homePage' : 'wildIdeasPage';
      const type = id;
      await client.createIfNotExists({ _id: id, _type: type });
      await client.patch(id).set(cleanForSave(nextDocument, true)).commit({ autoGenerateArrayKeys: true });
      setData((previous) => previous ? { ...previous, [documentKey]: nextDocument } : previous);
      setMessage('Published successfully. The website will show the update shortly.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'The update could not be published.');
    } finally {
      setBusy(false);
    }
  };

  if (!data) {
    return <div className="wa-loading"><div className="wa-loader" /><p>{error || 'Loading website content…'}</p></div>;
  }

  const home = data.home || {};
  const wild = data.wildIdeas || {};

  return (
    <div className="wa-admin">
      <header className="wa-topbar">
        <div>
          <p className="wa-eyebrow">The Wonderists</p>
          <h1>Website control room.</h1>
          <p>Edit the content people see most, without navigating the full CMS.</p>
        </div>
        <div className="wa-topbar__actions">
          <a className="wa-button wa-button--secondary" href="/" target="_blank" rel="noreferrer">View website</a>
          <a className="wa-button wa-button--dark" href="/studio" target="_blank" rel="noreferrer">Advanced Studio</a>
          {onLogout ? <button className="wa-button wa-button--dark" type="button" onClick={onLogout}>Log out</button> : null}
        </div>
      </header>

      <div className="wa-layout">
        <aside className="wa-sidebar">
          <p className="wa-sidebar__label">Edit areas</p>
          <nav>
            {sections.map((section) => (
              <button key={section.id} className={active === section.id ? 'is-active' : ''} onClick={() => { setActive(section.id); setMessage(''); setError(''); }}>
                <span>{section.label}</span>
                <small>{section.description}</small>
              </button>
            ))}
          </nav>
        </aside>

        <main className="wa-content">
          <Status message={message} error={error} />

          {active === 'dashboard' ? (
            <Panel title="Management dashboard" description="Choose an area below. Each save publishes directly to the website." preview="/">
              <div className="wa-stats">
                <div><span>Editable pages</span><strong>2</strong><small>Main Page and WILD IDEAS</small></div>
                <div><span>Adventure cards</span><strong>{home.adventures?.items?.length || 0}</strong><small>Currently on the main page</small></div>
                <div><span>WILD hosts</span><strong>{wild.hosts?.items?.length || 0}</strong><small>Host profiles in the CMS</small></div>
              </div>
              <div className="wa-dashboard-grid">
                {sections.filter((section) => section.id !== 'dashboard').map((section) => (
                  <button key={section.id} onClick={() => setActive(section.id)}>
                    <span>{section.label}</span><p>{section.description}</p><strong>Open editor →</strong>
                  </button>
                ))}
              </div>
            </Panel>
          ) : null}

          {active === 'main' ? (
            <Panel title="Main Page" description={currentMeta.description} preview="/">
              <form className="wa-form" onSubmit={(event) => void saveDocument('home', event)}>
                <h3>Search and navigation</h3>
                <Field label="Browser title" name="meta.title" value={home.meta?.title} />
                <TextArea label="Search description" name="meta.description" value={home.meta?.description} />
                <Field label="Adventures menu label" name="navigation.adventures" value={home.navigation?.adventures} />
                <Field label="Wondercards menu label" name="navigation.wondercards" value={home.navigation?.wondercards} />
                <Field label="Philosophy menu label" name="navigation.philosophy" value={home.navigation?.philosophy} />
                <Field label="Contact menu label" name="navigation.contact" value={home.navigation?.contact} />
                <h3>Hero</h3>
                <TextArea label="Hero heading" name="hero.title" value={home.hero?.title} rows={3} help="Line breaks are preserved." />
                <TextArea label="Hero paragraphs" name="hero.body" value={home.hero?.body} kind="paragraphs" rows={7} help="Leave a blank line between paragraphs." />
                <Field label="Primary button" name="hero.primaryCta" value={home.hero?.primaryCta} />
                <Field label="Secondary button" name="hero.secondaryCta" value={home.hero?.secondaryCta} />
                <ImageField label="Replace hero image" name="hero.image" image={home.hero?.image} />
                <Field label="Image description" name="hero.imageAlt" value={home.hero?.imageAlt} />
                <Field label="Image caption" name="hero.caption" value={home.hero?.caption} />
                <h3>Manifesto</h3>
                <Field label="Side text" name="manifesto.texture" value={home.manifesto?.texture} />
                <TextArea label="Heading" name="manifesto.title" value={home.manifesto?.title} />
                <TextArea label="Paragraphs" name="manifesto.body" value={home.manifesto?.body} kind="paragraphs" rows={10} />
                <Field label="Closing statement" name="manifesto.statement" value={home.manifesto?.statement} />
                <Field label="Emphasised statement" name="manifesto.statementStrong" value={home.manifesto?.statementStrong} />
                <h3>Closing section</h3>
                <TextArea label="Heading" name="closing.title" value={home.closing?.title} />
                <TextArea label="Paragraph" name="closing.body" value={home.closing?.body} />
                <TextArea label="Emphasised statement" name="closing.statement" value={home.closing?.statement} />
                <Field label="First button" name="closing.primaryCta" value={home.closing?.primaryCta} />
                <Field label="Second button" name="closing.secondaryCta" value={home.closing?.secondaryCta} />
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}

          {active === 'adventures' ? (
            <Panel title="Adventures" description={currentMeta.description} preview="/#adventures">
              <form className="wa-form" onSubmit={(event) => void saveDocument('home', event)}>
                <TextArea label="Section heading" name="adventures.title" value={home.adventures?.title} />
                <TextArea label="Introduction" name="adventures.intro" value={home.adventures?.intro} />
                <div className="wa-card-stack">
                  {(home.adventures?.items || []).map((item: ContentDocument, index: number) => (
                    <details key={item._key || item.id} className="wa-editor-card" open={index === 0}>
                      <summary><span>{item.number}</span>{item.title}</summary>
                      <div className="wa-editor-card__body">
                        <Field label="Number" name={`adventures.items.${index}.number`} value={item.number} />
                        <Field label="Title" name={`adventures.items.${index}.title`} value={item.title} />
                        <Field label="Button label" name={`adventures.items.${index}.cta`} value={item.cta} />
                        <Field label="Page link" name={`adventures.items.${index}.href`} value={item.href} help="Leave blank to open the enquiry form." />
                        <TextArea label="Description" name={`adventures.items.${index}.description`} value={item.description} rows={5} />
                        <ImageField label="Replace card image" name={`adventures.items.${index}.image`} image={item.image} />
                      </div>
                    </details>
                  ))}
                </div>
                <h3>Adventure story</h3>
                <TextArea label="Heading" name="adventureStory.title" value={home.adventureStory?.title} />
                <TextArea label="Paragraphs" name="adventureStory.body" value={home.adventureStory?.body} kind="paragraphs" rows={8} />
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}

          {active === 'wondercards' ? (
            <Panel title="Wondercards" description={currentMeta.description} preview="/#wondercards">
              <form className="wa-form" onSubmit={(event) => void saveDocument('home', event)}>
                <TextArea label="Heading" name="wondercards.title" value={home.wondercards?.title} />
                <TextArea label="Paragraphs" name="wondercards.body" value={home.wondercards?.body} kind="paragraphs" rows={10} />
                <Field label="Shipping note" name="wondercards.shipping" value={home.wondercards?.shipping} />
                <Field label="Wondercards button" name="wondercards.cta" value={home.wondercards?.cta} />
                <Field label="Unspoken button" name="wondercards.unspokenCta" value={home.wondercards?.unspokenCta} />
                <Field label="Unspoken deck URL" name="wondercards.unspokenUrl" value={home.wondercards?.unspokenUrl} type="url" />
                <ImageField label="Replace Wondercards image" name="wondercards.image" image={home.wondercards?.image} />
                <Field label="Image description" name="wondercards.imageAlt" value={home.wondercards?.imageAlt} />
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}

          {active === 'philosophy' ? (
            <Panel title="Philosophy" description={currentMeta.description} preview="/#philosophy">
              <form className="wa-form" onSubmit={(event) => void saveDocument('home', event)}>
                <TextArea label="Heading" name="philosophy.title" value={home.philosophy?.title} rows={4} />
                <TextArea label="Paragraphs" name="philosophy.body" value={home.philosophy?.body} kind="paragraphs" rows={10} />
                {(home.philosophy?.definitions || []).map((item: ContentDocument, index: number) => (
                  <div className="wa-subpanel" key={item._key || index}>
                    <Field label="Term" name={`philosophy.definitions.${index}.term`} value={item.term} />
                    <TextArea label="Definition" name={`philosophy.definitions.${index}.definition`} value={item.definition} />
                  </div>
                ))}
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}

          {active === 'contact' ? (
            <Panel title="Contact & Footer" description={currentMeta.description} preview="/#say-hi">
              <form className="wa-form" onSubmit={(event) => void saveDocument('home', event)}>
                <h3>Contact form</h3>
                <Field label="Default heading" name="contact.defaultTitle" value={home.contact?.defaultTitle} />
                <TextArea label="Default description" name="contact.defaultDescription" value={home.contact?.defaultDescription} />
                <Field label="Wondercards heading" name="contact.wondercardsTitle" value={home.contact?.wondercardsTitle} />
                <TextArea label="Wondercards description" name="contact.wondercardsDescription" value={home.contact?.wondercardsDescription} />
                <Field label="Form button" name="contact.formCta" value={home.contact?.formCta} />
                <TextArea label="Success message" name="contact.success" value={home.contact?.success} />
                <h3>Footer links</h3>
                <Field label="Instagram label" name="footer.instagramLabel" value={home.footer?.instagramLabel} />
                <Field label="Instagram URL" name="footer.instagramUrl" value={home.footer?.instagramUrl} type="url" />
                <Field label="LinkedIn label" name="footer.linkedinLabel" value={home.footer?.linkedinLabel} />
                <Field label="LinkedIn URL" name="footer.linkedinUrl" value={home.footer?.linkedinUrl} type="url" />
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}

          {active === 'wild-intro' ? (
            <Panel title="WILD IDEAS" description={currentMeta.description} preview="/wild-ideas/">
              <form className="wa-form" onSubmit={(event) => void saveDocument('wildIdeas', event)}>
                <h3>Search and navigation</h3>
                <Field label="Browser title" name="meta.title" value={wild.meta?.title} />
                <TextArea label="Search description" name="meta.description" value={wild.meta?.description} />
                <Field label="Experience menu label" name="navigation.experience" value={wild.navigation?.experience} />
                <Field label="Why it works menu label" name="navigation.whyItWorks" value={wild.navigation?.whyItWorks} />
                <Field label="Hosts menu label" name="navigation.hosts" value={wild.navigation?.hosts} />
                <Field label="Booking menu label" name="navigation.book" value={wild.navigation?.book} />
                <h3>Hero</h3>
                <Field label="Heading" name="hero.title" value={wild.hero?.title} />
                <TextArea label="Subtitle" name="hero.subtitle" value={wild.hero?.subtitle} />
                <Field label="Dates" name="hero.dates" value={wild.hero?.dates} />
                <Field label="Location" name="hero.location" value={wild.hero?.location} />
                <Field label="Attribution" name="hero.attribution" value={wild.hero?.attribution} />
                <Field label="Primary button" name="hero.primaryCta" value={wild.hero?.primaryCta} />
                <Field label="Secondary button" name="hero.secondaryCta" value={wild.hero?.secondaryCta} />
                <ImageField label="Replace hero image" name="hero.image" image={wild.hero?.image} />
                <Field label="Image description" name="hero.imageAlt" value={wild.hero?.imageAlt} />
                <Field label="Image caption" name="hero.caption" value={wild.hero?.caption} />
                <h3>Introduction</h3>
                <Field label="Section label" name="intro.label" value={wild.intro?.label} />
                <TextArea label="Heading" name="intro.title" value={wild.intro?.title} />
                <TextArea label="Paragraphs" name="intro.body" value={wild.intro?.body} kind="paragraphs" rows={12} />
                <TextArea label="Closing statement" name="intro.statement" value={wild.intro?.statement} />
                <h3>Experience facts</h3>
                {(wild.facts || []).map((fact: ContentDocument, index: number) => (
                  <div className="wa-subpanel" key={fact._key || index}>
                    <Field label="Label" name={`facts.${index}.label`} value={fact.label} />
                    <Field label="Value" name={`facts.${index}.value`} value={fact.value} />
                  </div>
                ))}
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}

          {active === 'wild-journey' ? (
            <Panel title="WILD Journey" description={currentMeta.description} preview="/wild-ideas/#experience">
              <form className="wa-form" onSubmit={(event) => void saveDocument('wildIdeas', event)}>
                <h3>Future skills</h3>
                <Field label="Section label" name="futureSkills.label" value={wild.futureSkills?.label} />
                <TextArea label="Heading" name="futureSkills.title" value={wild.futureSkills?.title} />
                <TextArea label="Paragraphs" name="futureSkills.body" value={wild.futureSkills?.body} kind="paragraphs" rows={9} />
                <ImageField label="Replace section image" name="futureSkills.image" image={wild.futureSkills?.image} />
                <Field label="Image description" name="futureSkills.imageAlt" value={wild.futureSkills?.imageAlt} />
                <Field label="Image caption" name="futureSkills.caption" value={wild.futureSkills?.caption} />
                <h3>Weekend experience</h3>
                <Field label="Section label" name="experience.label" value={wild.experience?.label} />
                <TextArea label="Heading" name="experience.title" value={wild.experience?.title} />
                <TextArea label="Introduction" name="experience.intro" value={wild.experience?.intro} />
                <TextArea label="Activities" name="experience.items" value={wild.experience?.items} kind="lines" rows={12} help="Use one activity per line." />
                <TextArea label="Closing paragraph" name="experience.outro" value={wild.experience?.outro} rows={5} />
                <h3>Entrepreneurial learning</h3>
                <Field label="Section label" name="venture.label" value={wild.venture?.label} />
                <TextArea label="Heading" name="venture.title" value={wild.venture?.title} />
                <TextArea label="Paragraphs" name="venture.body" value={wild.venture?.body} kind="paragraphs" rows={10} />
                <TextArea label="Learning outcomes" name="venture.items" value={wild.venture?.items} kind="lines" rows={12} help="Use one outcome per line." />
                <TextArea label="Closing paragraph" name="venture.outro" value={wild.venture?.outro} rows={5} />
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}

          {active === 'wild-details' ? (
            <Panel title="WILD Details" description={currentMeta.description} preview="/wild-ideas/#why-it-works">
              <form className="wa-form" onSubmit={(event) => void saveDocument('wildIdeas', event)}>
                <h3>Why it works</h3>
                <Field label="Section label" name="reasons.label" value={wild.reasons?.label} />
                <TextArea label="Heading" name="reasons.title" value={wild.reasons?.title} />
                <div className="wa-card-stack">
                  {(wild.reasons?.items || []).map((reason: ContentDocument, index: number) => (
                    <details key={reason._key || index} className="wa-editor-card">
                      <summary>{reason.title}</summary>
                      <div className="wa-editor-card__body">
                        <Field label="Title" name={`reasons.items.${index}.title`} value={reason.title} />
                        <TextArea label="Paragraphs" name={`reasons.items.${index}.body`} value={reason.body} kind="paragraphs" rows={10} />
                      </div>
                    </details>
                  ))}
                </div>
                <h3>What’s included</h3>
                <Field label="Section label" name="inclusions.label" value={wild.inclusions?.label} />
                <TextArea label="Heading" name="inclusions.title" value={wild.inclusions?.title} />
                <TextArea label="Inclusions" name="inclusions.items" value={wild.inclusions?.items} kind="lines" rows={14} help="Use one inclusion per line." />
                <Field label="Age suitability" name="inclusions.suitability" value={wild.inclusions?.suitability} />
                <h3>Hosts</h3>
                <Field label="Section label" name="hosts.label" value={wild.hosts?.label} />
                <TextArea label="Heading" name="hosts.title" value={wild.hosts?.title} />
                <div className="wa-card-stack">
                  {(wild.hosts?.items || []).map((host: ContentDocument, index: number) => (
                    <details key={host._key || index} className="wa-editor-card">
                      <summary>{host.name}</summary>
                      <div className="wa-editor-card__body">
                        <Field label="Name" name={`hosts.items.${index}.name`} value={host.name} />
                        <TextArea label="Biography" name={`hosts.items.${index}.body`} value={host.body} kind="paragraphs" rows={12} />
                      </div>
                    </details>
                  ))}
                </div>
                <h3>Audience</h3>
                <Field label="Section label" name="audience.label" value={wild.audience?.label} />
                <Field label="Heading" name="audience.title" value={wild.audience?.title} />
                <TextArea label="Introduction" name="audience.intro" value={wild.audience?.intro} />
                <TextArea label="Parent goals" name="audience.items" value={wild.audience?.items} kind="lines" rows={9} help="Use one goal per line." />
                <TextArea label="Closing paragraph" name="audience.outro" value={wild.audience?.outro} rows={5} />
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}

          {active === 'booking' ? (
            <Panel title="Booking" description={currentMeta.description} preview="/wild-ideas/#book">
              <form className="wa-form" onSubmit={(event) => void saveDocument('wildIdeas', event)}>
                <h3>Closing story</h3>
                <Field label="Section label" name="closing.label" value={wild.closing?.label} />
                <TextArea label="Heading" name="closing.title" value={wild.closing?.title} />
                <TextArea label="Paragraphs" name="closing.body" value={wild.closing?.body} kind="paragraphs" rows={8} />
                <Field label="Button label" name="closing.cta" value={wild.closing?.cta} />
                <h3>Booking details</h3>
                <Field label="Section label" name="booking.label" value={wild.booking?.label} />
                <TextArea label="Heading" name="booking.title" value={wild.booking?.title} />
                <Field label="Dates" name="booking.dates" value={wild.booking?.dates} />
                <Field label="Location" name="booking.location" value={wild.booking?.location} />
                <Field label="Price" name="booking.price" value={wild.booking?.price} />
                <TextArea label="Included summary" name="booking.includes" value={wild.booking?.includes} rows={5} />
                <Field label="Capacity" name="booking.capacity" value={wild.booking?.capacity} />
                <Field label="Form button" name="booking.formCta" value={wild.booking?.formCta} />
                <TextArea label="Success message" name="booking.success" value={wild.booking?.success} />
                <SaveButton busy={busy} />
              </form>
            </Panel>
          ) : null}
        </main>
      </div>
    </div>
  );
}
