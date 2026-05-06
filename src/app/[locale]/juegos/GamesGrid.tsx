'use client';

import { useState, useMemo } from 'react';
import { GameCard } from '@/components/GameCard';
import type { Game, Category, Locale } from '@/data/types';

export function GamesGrid({
  games,
  categories,
  locale,
}: {
  games: Game[];
  categories: Category[];
  locale: Locale;
}) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [players, setPlayers] = useState('');

  const filtered = useMemo(() => {
    return games.filter((g) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        g.title[locale].toLowerCase().includes(q) ||
        g.tagline[locale].toLowerCase().includes(q);
      const matchCat =
        !activeCategory || g.categories.includes(activeCategory);
      const matchPlayers =
        !players ||
        (players === '1' && g.minPlayers <= 1) ||
        (players === '2' && g.maxPlayers >= 2) ||
        (players === '4' && g.maxPlayers >= 4);
      return matchSearch && matchCat && matchPlayers;
    });
  }, [games, search, activeCategory, players, locale]);

  const lc = locale;
  const inputCls = 'rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-cyan-500 transition';
  const btnCls = (active: boolean) =>
    `rounded-full px-3 py-1 text-xs font-medium transition ${
      active
        ? 'bg-fuchsia-500 text-zinc-950'
        : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
    }`;

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder={lc === 'es' ? 'Buscar juego...' : 'Search game...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputCls} w-full sm:w-64`}
        />
        <select
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
          className={`${inputCls} w-full sm:w-auto`}
        >
          <option value="">{lc === 'es' ? 'Todos los jugadores' : 'All players'}</option>
          <option value="1">{lc === 'es' ? 'Solo' : 'Solo'}</option>
          <option value="2">{lc === 'es' ? '2+ jugadores' : '2+ players'}</option>
          <option value="4">{lc === 'es' ? '4+ jugadores' : '4+ players'}</option>
        </select>
      </div>

      {/* Category pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('')}
          className={btnCls(!activeCategory)}
        >
          {lc === 'es' ? 'Todos' : 'All'}
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActiveCategory(c.slug === activeCategory ? '' : c.slug)}
            className={btnCls(c.slug === activeCategory)}
          >
            {c.icon} {c.name[lc]}
          </button>
        ))}
      </div>

      {/* Results count */}
      {(search || activeCategory || players) && (
        <p className="mb-4 text-sm text-zinc-500">
          {filtered.length} {lc === 'es' ? 'juego(s) encontrado(s)' : 'game(s) found'}
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-zinc-500">
          {lc === 'es' ? 'No hay juegos con ese filtro.' : 'No games match that filter.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((g) => (
            <GameCard key={g.slug} game={g} locale={lc} />
          ))}
        </div>
      )}
    </>
  );
}
