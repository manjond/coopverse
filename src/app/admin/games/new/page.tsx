import { GameForm } from '@/components/GameForm';
import { createGame } from '../../actions';

export default function NewGamePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">New game</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Add a game to the catalog. Slug must be unique. ES + EN copy is required.
      </p>
      <div className="mt-6 max-w-3xl">
        <GameForm action={createGame} submitLabel="Create game" />
      </div>
    </div>
  );
}
