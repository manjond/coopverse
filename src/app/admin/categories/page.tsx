import { db } from '@/db/client';
import { categories } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { createCategory, deleteCategory } from '../actions';

export default async function CategoriesAdmin() {
  const all = await db.select().from(categories).orderBy(asc(categories.sort));

  return (
    <div>
      <h1 className="text-2xl font-bold">Categories ({all.length})</h1>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/60 text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-3 py-2 text-left">Icono</th>
              <th className="px-3 py-2 text-left">Slug</th>
              <th className="px-3 py-2 text-left">Nombre (ES)</th>
              <th className="px-3 py-2 text-left">Nombre (EN)</th>
              <th className="px-3 py-2 text-left">Orden</th>
              <th className="px-3 py-2 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {all.map((c) => (
              <tr key={c.slug}>
                <td className="px-3 py-2 text-2xl">{c.icon}</td>
                <td className="px-3 py-2 font-mono text-xs text-zinc-400">{c.slug}</td>
                <td className="px-3 py-2 text-zinc-200">{c.nameEs}</td>
                <td className="px-3 py-2 text-zinc-400">{c.nameEn}</td>
                <td className="px-3 py-2 text-zinc-400">{c.sort}</td>
                <td className="px-3 py-2 text-right">
                  <form action={deleteCategory.bind(null, c.slug)} className="inline">
                    <button className="text-rose-400 hover:text-rose-300">Borrar</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-lg font-bold">+ Nueva categoría</h2>
      <form
        action={createCategory}
        className="mt-4 grid max-w-2xl gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="URL de la categoría" name="slug" required />
          <Input label="Icono" name="icon" />
          <Input label="Nombre (ES)" name="nameEs" required />
          <Input label="Nombre (EN)" name="nameEn" required />
          <Input label="Explicación corta (ES)" name="descriptionEs" required />
          <Input label="Short explanation (EN)" name="descriptionEn" required />
          <Input label="Orden" name="sort" type="number" />
        </div>
        <div>
          <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-cyan-400">
            Crear categoría
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-zinc-500">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-100 outline-none focus:border-cyan-500"
      />
    </label>
  );
}
