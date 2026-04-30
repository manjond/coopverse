/**
 * Shared game form (create + edit). Renders all the locale-aware fields
 * + meta. The action prop receives the FormData; parent decides whether
 * it's createGame or updateGame.bind(null, slug).
 */
type Game = {
  slug?: string;
  source?: string;
  featured?: boolean;
  titleEs?: string; titleEn?: string;
  taglineEs?: string; taglineEn?: string;
  descriptionEs?: string; descriptionEn?: string;
  instructionsEs?: string; instructionsEn?: string;
  embedUrl?: string;
  thumbUrl?: string;
  minPlayers?: number;
  maxPlayers?: number;
  categorySlugs?: string[];
};

export function GameForm({
  initial = {},
  action,
  submitLabel,
  showSlug = true,
}: {
  initial?: Game;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  showSlug?: boolean;
}) {
  return (
    <form action={action} className="grid gap-4">
      {showSlug && (
        <Field
          label="slug (URL — kebab-case, no spaces)"
          name="slug"
          defaultValue={initial.slug}
          required
          mono
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title (ES)"   name="titleEs"   defaultValue={initial.titleEs}   required />
        <Field label="Title (EN)"   name="titleEn"   defaultValue={initial.titleEn}   required />
        <Field label="Tagline (ES)" name="taglineEs" defaultValue={initial.taglineEs} required />
        <Field label="Tagline (EN)" name="taglineEn" defaultValue={initial.taglineEn} required />
      </div>

      <Area label="Description (ES)" name="descriptionEs" defaultValue={initial.descriptionEs} required rows={5} />
      <Area label="Description (EN)" name="descriptionEn" defaultValue={initial.descriptionEn} required rows={5} />
      <Area label="Instructions (ES)" name="instructionsEs" defaultValue={initial.instructionsEs} rows={3} />
      <Area label="Instructions (EN)" name="instructionsEn" defaultValue={initial.instructionsEn} rows={3} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Embed URL (iframe src)" name="embedUrl"  defaultValue={initial.embedUrl}  required />
        <Field label="Thumbnail URL or path"  name="thumbUrl"  defaultValue={initial.thumbUrl ?? '/thumbs/placeholder.svg'} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Min players" name="minPlayers" type="number" defaultValue={initial.minPlayers ?? 1} />
        <Field label="Max players" name="maxPlayers" type="number" defaultValue={initial.maxPlayers ?? 1} />
        <Field
          label="Source"
          name="source"
          defaultValue={initial.source ?? 'manual'}
          mono
        />
      </div>

      <Field
        label="Category slugs (comma-separated)"
        name="categorySlugs"
        defaultValue={(initial.categorySlugs ?? []).join(', ')}
        mono
      />

      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={initial.featured}
          className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
        />
        Featured (shows on the home spotlight)
      </label>

      <div className="pt-4">
        <button
          type="submit"
          className="rounded-md bg-cyan-500 px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-cyan-400"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required,
  mono,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-zinc-500">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={`mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-cyan-500 ${
          mono ? 'font-mono' : ''
        }`}
      />
    </label>
  );
}

function Area({
  label,
  name,
  defaultValue,
  rows = 4,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-zinc-500">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-cyan-500"
      />
    </label>
  );
}
