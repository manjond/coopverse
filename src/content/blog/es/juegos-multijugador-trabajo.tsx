import type { PostMeta } from '../types';

export const meta: PostMeta = {
  slug: 'juegos-multijugador-para-jugar-en-el-trabajo',
  title: 'Los mejores juegos multijugador para jugar en el trabajo (sin instalar nada)',
  description:
    'Juegos multijugador que puedes jugar en el trabajo desde el navegador: sin descargas, sin instalaciones, sin que IT se entere. Para la pausa del almuerzo o el descanso.',
  publishedAt: '2026-05-11',
  readingTimeMin: 4,
  tags: ['trabajo', 'multijugador', 'navegador', 'pausa'],
};

export default function Content() {
  return (
    <>
      <p>
        La pausa del almuerzo tiene 30-60 minutos. Quieres jugar algo con un compañero pero
        no puedes instalar nada en el ordenador del trabajo. El departamento de IT tiene
        bloqueadas las descargas. Esta guía es para ti.
      </p>

      <p>
        <em>
          Nota: esta guía asume que tu empresa permite navegar libremente en las pausas.
          Jugar durante el horario laboral en contra de las políticas de tu empresa es tu
          responsabilidad.
        </em>
      </p>

      <h2>Criterios para jugar en el trabajo</h2>
      <ul>
        <li><strong>Sin descargas ni instalaciones</strong> — solo navegador</li>
        <li><strong>Partidas cortas</strong> — 5-15 minutos máximo</li>
        <li><strong>Pausa discreta</strong> — sin efectos de sonido que molesten (o con auriculares)</li>
        <li><strong>Funciona en el hardware de oficina</strong> — sin necesidad de GPU potente</li>
      </ul>

      <h2>Los mejores para la pausa del almuerzo</h2>

      <h3>1. Wordle + variantes</h3>
      <p>
        El rey de las pausas laborales. Una palabra al día, máximo 6 intentos, se hace en
        3-5 minutos. Podéis jugarlo simultáneamente con un compañero y comparar resultados
        por WhatsApp. Sin sonido, sin registro, sin nada. También existe el Worldle
        (países por forma) y el Heardle (adivinar canciones).
      </p>

      <h3>2. Skribbl.io</h3>
      <p>
        Crea una sala privada, invita a tus compañeros de trabajo más cercanos por el chat
        interno, y jugad una ronda de Pictionary de 10 minutos. No requiere cuenta. Bajo
        consumo de CPU. Perfecto con auriculares si estáis en open space.
      </p>

      <h3>3. GeoGuessr (modo diario gratuito)</h3>
      <p>
        El desafío diario gratuito: una ubicación de Street View, tenéis que adivinar dónde
        es. Cada uno lo juega por separado y comparáis puntuaciones. Sin multijugador directo,
        pero la competición asíncrona funciona perfectamente.
      </p>

      <h3>4. Codenames online</h3>
      <p>
        Versión online del juego de mesa. Crea sala, comparte enlace por el chat de empresa,
        y tenéis una ronda de 15-20 minutos. Silencioso (no necesita sonido), visual, y
        perfecto para grupos de 4-8 personas de la oficina.
      </p>

      <h3>5. Chess.com / Lichess</h3>
      <p>
        Una partida de ajedrez de 5 minutos con control de tiempo. Lichess es gratis sin
        publicidad. El ajedrez blitz (3-5 minutos por jugador) está hecho para las pausas.
        Desafía a un compañero directamente con su usuario.
      </p>

      <h3>6. Gartic Phone (sesión rápida)</h3>
      <p>
        Con el modo de partida más corto, Gartic Phone cabe en 15 minutos con 4-5 personas.
        El momento de revelar todos los dibujos al final siempre genera risas, ideal para
        romper la monotonía de la tarde.
      </p>

      <h3>7. Trivia online (Kahoot o Quizwhizzer)</h3>
      <p>
        Kahoot permite crear quizzes gratis. Con un compañero que prepara 10 preguntas sobre
        el tema que queráis, tenéis 10 minutos de trivia competitiva. Muy popular en equipos
        remotos para hacer el viernes más llevadero.
      </p>

      <h2>Juegos a evitar en el trabajo</h2>
      <ul>
        <li>
          <strong>Juegos con mucho sonido:</strong> efectos de explosiones, música intensa.
          Aunque tengas auriculares, los compañeros pueden verlo.
        </li>
        <li>
          <strong>Juegos que consumen mucha CPU:</strong> si tu portátil ya va caliente con
          las 15 pestañas de trabajo, un juego 3D en WebGL puede bloquearlo todo.
        </li>
        <li>
          <strong>Juegos con partidas de 45+ minutos:</strong> lo que empieza en la pausa
          acaba consumiendo el resto de la tarde.
        </li>
        <li>
          <strong>Juegos con chat de voz obligatorio:</strong> en open space no siempre
          es viable, y el juego pierde la mitad de la gracia sin comunicación.
        </li>
      </ul>

      <h2>El setup ideal de pausa</h2>
      <p>
        El mejor setup para gaming en la pausa laboral: unos auriculares bluetooth, Discord
        en el móvil para la voz (para no usar el micrófono del ordenador del trabajo), y el
        juego en el navegador del portátil. Con esto tenéis comunicación en tiempo real sin
        tocar el equipo corporativo más de lo necesario.
      </p>

      <p>
        Los juegos cooperativos en navegador son especialmente buenos para el trabajo porque
        crean conversación y momentos de equipo fuera del contexto profesional. Muchos equipos
        de trabajo los han adoptado como ritual de viernes o de cierre de sprint.
      </p>
    </>
  );
}
