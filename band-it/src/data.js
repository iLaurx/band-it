// Resistencias nominales transcritas de la imagen del usuario.
export const bands = [
  { id: 'yellow', name: 'Amarilla', lbs: 10, color: '#edca53' },
  { id: 'blue', name: 'Azul', lbs: 20, color: '#5b9bf0' },
  { id: 'green', name: 'Verde', lbs: 30, color: '#67b982' },
  // Grafito aclarado para distinguir la banda negra sobre el fondo oscuro del visor.
  { id: 'black', name: 'Negra', lbs: 40, color: '#858b90' },
  { id: 'red', name: 'Roja', lbs: 50, color: '#ee766d' },
];

export const exercises = [
  {
    id: 'curl', name: 'Curl de bíceps', group: 'Brazos', motion: 'curl',
    summary: 'Un movimiento sencillo para explorar la flexión de los codos.',
    equipment: 'Banda y dos agarraderas', support: 'Centro bajo ambos pies con calzado, solo si lo permite el fabricante.',
    source: { label: 'British Heart Foundation · Curl', url: 'https://www.bhf.org.uk/informationsupport/heart-matters-magazine/activity/resistance-bands' },
    steps: ['Si el fabricante permite pisarla, coloca el centro bajo ambos pies con calzado. Sujeta las agarraderas a los lados, con las palmas al frente y las rodillas suaves.', 'Conserva los codos junto al torso y las muñecas alineadas. Flexiona los codos acercando las manos hacia los hombros, sin balancearte.', 'Baja con control hacia la posición inicial y conserva el torso estable. No sueltes las agarraderas bajo tensión.'],
    cues: ['Codos junto al cuerpo', 'Muñecas alineadas', 'Torso estable'],
  },
  {
    id: 'lateral', name: 'Elevación lateral', group: 'Hombros', motion: 'lateral',
    summary: 'Observa cómo los brazos se elevan hacia los lados.',
    equipment: 'Banda y dos agarraderas', support: 'Centro bajo ambos pies con calzado, solo si lo permite el fabricante.',
    source: { label: 'THERABAND · Elevación lateral (manual)', url: 'https://www.ottawaosteopath.com/images/TherabandExercises.pdf' },
    steps: ['Si el fabricante permite pisarla, coloca el centro bajo ambos pies con calzado. Sujeta las agarraderas a los lados, con las palmas al frente y las rodillas suaves.', 'Con una ligera flexión de codos constante y los pulgares hacia arriba al subir, eleva los brazos hacia los lados hasta una altura cómoda, como máximo los hombros.', 'Regresa lentamente. Mantén las muñecas alineadas, sin encoger los hombros ni dar tirones.'],
    cues: ['Hombros relajados', 'Codos suaves', 'Sin impulso'],
  },
  {
    id: 'front', name: 'Elevación frontal', group: 'Hombros', motion: 'front',
    summary: 'Una vista clara de la elevación de los brazos al frente.',
    equipment: 'Banda y dos agarraderas', support: 'Centro bajo ambos pies con calzado, solo si lo permite el fabricante.',
    source: { label: 'THERABAND · Elevación frontal (manual)', url: 'https://www.ottawaosteopath.com/images/TherabandExercises.pdf' },
    steps: ['Si el fabricante permite pisarla, coloca el centro bajo ambos pies con calzado. Sujeta las agarraderas delante de los muslos, con las palmas hacia dentro y las rodillas suaves.', 'Eleva los brazos al frente con los pulgares hacia arriba y los codos suaves. Detente a una altura cómoda, sin superar los hombros.', 'Desciende con control, conservando las muñecas alineadas y sin arquear la espalda ni elevar los hombros.'],
    cues: ['Espalda estable', 'Movimiento cómodo', 'Bajada controlada'],
  },
];
