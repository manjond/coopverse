import { notFound } from 'next/navigation';
import { GameForm } from '@/components/GameForm';
import { getGameBySlug } from '@/db/queries';
import { updateGame } from '../../actions';

export default async function EditGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit · {game.titleEs}</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Slug <code className="text-cyan-400">{game.slug}</code> is immutable —
        delete + recreate to rename.
      </p>
      <div className="mt-6 max-w-3xl">
        <GameForm
          initial={{
            slug: game.slug,
            source: game.source,
            featured: game.featured,
            titleEs: game.titleEs, titleEn: game.titleEn,
            taglineEs: game.taglineEs, taglineEn: game.taglineEn,
            descriptionEs: game.descriptionEs, descriptionEn: game.descriptionEn,
            instructionsEs: game.instructionsEs, instructionsEn: game.instructionsEn,
            embedUrl: game.embedUrl, thumbUrl: game.thumbUrl,
            minPlayers: game.minPlayers, maxPlayers: game.maxPlayers,
            categorySlugs: game.categorySlugs,
          }}
          action={updateGame.bind(null, game.slug)}
          submitLabel="Save changes"
          showSlug={false}
        />
      </div>
    </div>
  );
}
