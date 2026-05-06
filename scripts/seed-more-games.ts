import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

const games = [
  {
    slug: 'raft-wars',
    title_es: 'Raft Wars', title_en: 'Raft Wars',
    tagline_es: 'Defiende tu tesoro en una balsa con tu hermano. ¡A cañonazos!',
    tagline_en: 'Defend your treasure on a raft with your brother. Cannonball fight!',
    description_es: 'Raft Wars es un juego de estrategia por turnos para 2 jugadores. Tú y tu hermano Simon habéis encontrado un tesoro enterrado en la playa... y ahora todo el mundo quiere quitároslo. Disparad bolas de cañón, usad el rebote del agua y eliminad a todos los rivales para proteger vuestras riquezas.',
    description_en: 'Raft Wars is a turn-based strategy game for 2 players. You and your brother Simon found buried treasure on the beach... and now everyone wants to take it. Fire cannonballs, use water bounces and eliminate all rivals to protect your riches.',
    instructions_es: 'Arrastra para apuntar, ajusta la fuerza y suelta para disparar. Turno alternado con el rival.',
    instructions_en: 'Drag to aim, adjust force and release to shoot. Alternate turns with the opponent.',
    embed_url: 'https://www.crazygames.com/embed/raft-wars',
    thumb_url: '/thumbs/raft-wars.svg',
    min_players: 1, max_players: 2,
    category_slugs: ['dos-jugadores', 'estrategia'],
  },
  {
    slug: 'moto-x3m-pool-party',
    title_es: 'Moto X3M Pool Party', title_en: 'Moto X3M Pool Party',
    tagline_es: 'Carreras de moto con obstáculos acuáticos. Resistencia y velocidad.',
    tagline_en: 'Motorbike racing with water obstacles. Endurance and speed.',
    description_es: 'Moto X3M Pool Party es la versión veraniega del famoso juego de motos con obstáculos. Supera rampas, piscinas, toboganes y obstáculos locos con tu moto. 25 niveles llenos de caos acuático. Puedes competir con un amigo en modo de tiempo.',
    description_en: 'Moto X3M Pool Party is the summer version of the famous obstacle motorbike game. Beat ramps, pools, slides and crazy obstacles with your bike. 25 levels full of water chaos.',
    instructions_es: 'Flechas arriba/abajo para acelerar/frenar. Izquierda/derecha para inclinar la moto.',
    instructions_en: 'Up/down arrows to accelerate/brake. Left/right to tilt the bike.',
    embed_url: 'https://www.crazygames.com/embed/moto-x3m-pool-party',
    thumb_url: 'https://imgs.crazygames.com/moto-x3m-pool-party_16x9/20241128073648/moto-x3m-pool-party_16x9-cover?metadata=none&quality=100&width=800&height=450&fit=crop',
    min_players: 1, max_players: 1,
    category_slugs: ['carreras', 'accion'],
  },
  {
    slug: 'penalty-shooters-2',
    title_es: 'Penalty Shooters 2', title_en: 'Penalty Shooters 2',
    tagline_es: 'Tanda de penaltis multijugador: ¿quién tiene mejor puntería?',
    tagline_en: 'Multiplayer penalty shootout: who has the best aim?',
    description_es: 'Penalty Shooters 2 es el juego de penaltis más completo del navegador. Apunta y chuta, o controla al portero para parar el disparo. Torneo de 8 equipos, copa del mundo, o modo 2 jugadores en el mismo teclado. Física de balón realista y porteros con IA adaptativa.',
    description_en: 'Penalty Shooters 2 is the most complete browser penalty game. Aim and shoot, or control the goalkeeper to stop the shot. 8-team tournament, world cup, or 2-player mode on the same keyboard.',
    instructions_es: 'Haz click y arrastra para apuntar y chutar. Como portero: mueve el ratón para lanzarte.',
    instructions_en: 'Click and drag to aim and shoot. As goalkeeper: move mouse to dive.',
    embed_url: 'https://www.crazygames.com/embed/penalty-shooters-2',
    thumb_url: 'https://imgs.crazygames.com/penalty-shooters-2_16x9/20240726040713/penalty-shooters-2_16x9-cover?metadata=none&quality=100&width=800&height=450&fit=crop',
    min_players: 1, max_players: 2,
    category_slugs: ['deportes', 'dos-jugadores'],
  },
  {
    slug: 'defly-io',
    title_es: 'Defly.io', title_en: 'Defly.io',
    tagline_es: 'Helicóptero multijugador: conquista territorio disparando y construyendo.',
    tagline_en: 'Multiplayer helicopter: conquer territory by shooting and building.',
    description_es: 'Defly.io combina disparos y construcción de territorio: controlas un helicóptero que puede disparar a otros y construir torres para capturar zonas del mapa. El equipo con más territorio al final gana. Tiene modo equipo para coordinar con amigos.',
    description_en: 'Defly.io combines shooting and territory building: control a helicopter that shoots others and builds towers to capture map zones. The team with the most territory wins. Has team mode to coordinate with friends.',
    instructions_es: 'WASD o flechas para mover. Click izq para disparar. Click der para construir torre.',
    instructions_en: 'WASD or arrows to move. Left click to shoot. Right click to build tower.',
    embed_url: 'https://defly.io',
    thumb_url: '/thumbs/defly-io.svg',
    min_players: 2, max_players: 50,
    category_slugs: ['multijugador', 'estrategia', 'accion'],
  },
  {
    slug: 'stabfish2-io',
    title_es: 'Stabfish 2', title_en: 'Stabfish 2',
    tagline_es: 'Pez con lanza: crece eliminando rivales en el océano multijugador.',
    tagline_en: 'Fish with a lance: grow by eliminating rivals in the multiplayer ocean.',
    description_es: 'Stabfish 2 es un juego multijugador de peces armados con lanzas. Nada por el océano, recoge comida para crecer y usa tu lanza para eliminar a otros peces. Física de rotación divertida — tienes que girar para apuntar. Muy original y adictivo.',
    description_en: 'Stabfish 2 is a multiplayer game of fish armed with lances. Swim through the ocean, collect food to grow and use your lance to eliminate other fish. Fun rotation physics — you have to spin to aim.',
    instructions_es: 'Mueve el ratón para nadar. La lanza apunta en la dirección de movimiento. Click para impulso.',
    instructions_en: 'Move mouse to swim. The lance points in the movement direction. Click for boost.',
    embed_url: 'https://stabfish2.io',
    thumb_url: '/thumbs/stabfish2-io.svg',
    min_players: 2, max_players: 100,
    category_slugs: ['multijugador', 'accion'],
  },
  {
    slug: 'superhex-io',
    title_es: 'SuperHex.io', title_en: 'SuperHex.io',
    tagline_es: 'Conquista hexágonos en este .io de territorio multijugador.',
    tagline_en: 'Conquer hexagons in this multiplayer territory .io game.',
    description_es: 'SuperHex.io es un juego de conquista de territorio con hexágonos. Expande tu zona coloreando el tablero hexagonal. Si alguien te corta mientras estás fuera de tu zona, mueres. Mecánica similar a Splix.io pero con rejilla hexagonal que cambia completamente la estrategia.',
    description_en: 'SuperHex.io is a hexagon territory conquest game. Expand your zone by coloring the hexagonal board. If someone cuts you while outside your zone, you die. Similar to Splix.io but with hex grid.',
    instructions_es: 'Mueve el ratón para dirigir tu personaje. Expande tu territorio con cuidado.',
    instructions_en: 'Move mouse to steer your character. Expand your territory carefully.',
    embed_url: 'https://superhex.io',
    thumb_url: '/thumbs/superhex-io.svg',
    min_players: 2, max_players: 100,
    category_slugs: ['multijugador', 'estrategia'],
  },
  {
    slug: 'brutes-io',
    title_es: 'Brutes.io', title_en: 'Brutes.io',
    tagline_es: 'Arena multijugador online: elige tu arma y lucha hasta el final.',
    tagline_en: 'Online multiplayer arena: choose your weapon and fight to the end.',
    description_es: 'Brutes.io es un juego de arena multijugador con mecánicas de recogida de armas. Empieza pequeño, recoge potenciadores para crecer y elige entre espadas, mazas, hachas y más. El mayor bruto del mapa gana. Partidas rápidas e intensas.',
    description_en: 'Brutes.io is a multiplayer arena game with weapon-pickup mechanics. Start small, collect power-ups to grow and choose from swords, maces, axes and more. The biggest brute on the map wins.',
    instructions_es: 'WASD o flechas para mover. Click izq para atacar. Click der o Q para esquivar.',
    instructions_en: 'WASD or arrows to move. Left click to attack. Right click or Q to dodge.',
    embed_url: 'https://brutes.io',
    thumb_url: '/thumbs/brutes-io.svg',
    min_players: 2, max_players: 50,
    category_slugs: ['multijugador', 'accion'],
  },
];

async function run() {
  for (const g of games) {
    await sql`
      INSERT INTO games (
        slug, source, featured, title_es, title_en, tagline_es, tagline_en,
        description_es, description_en, instructions_es, instructions_en,
        embed_url, thumb_url, min_players, max_players, category_slugs,
        plays_count, rating_avg, published_at, updated_at
      ) VALUES (
        ${g.slug}, 'manual', false, ${g.title_es}, ${g.title_en},
        ${g.tagline_es}, ${g.tagline_en}, ${g.description_es}, ${g.description_en},
        ${g.instructions_es}, ${g.instructions_en}, ${g.embed_url}, ${g.thumb_url},
        ${g.min_players}, ${g.max_players}, ${g.category_slugs},
        0, '0', NOW(), NOW()
      ) ON CONFLICT (slug) DO NOTHING
    `;
    console.log(`✓ ${g.slug}`);
  }
}
run().catch(console.error);
