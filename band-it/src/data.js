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
    id: 'row', name: 'Remo inclinado', group: 'Espalda', motion: 'row',
    summary: 'Lleva las agarraderas hacia las costillas con el torso inclinado.',
    equipment: 'Banda y dos agarraderas', support: 'Centro bajo ambos pies con calzado, solo si lo permite el fabricante.',
    source: { label: 'Meglio · Bent-over row', url: 'https://mymeglio.com/pages/resistance-tube-exercise-guide' },
    steps: ['Si el fabricante permite pisarla, fija el centro bajo ambos pies. Inclínate desde las caderas, con rodillas suaves y espalda larga; deja las manos debajo de los hombros.', 'Lleva las agarraderas hacia las costillas bajas, desplazando los codos hacia atrás junto al cuerpo.', 'Extiende los brazos con control sin cambiar la inclinación del torso.'],
    cues: ['Codos hacia atrás', 'Sin tirones', 'Torso quieto'],
    keywords: 'espalda remo costillas',
  },
  {
    id: 'pullapart', name: 'Apertura de banda', group: 'Espalda', motion: 'pullapart',
    summary: 'Pull apart: abre los brazos con la banda entre las agarraderas.',
    equipment: 'Banda y dos agarraderas', support: 'Entre ambas manos; sin apoyo bajo los pies. Confirma este uso con el fabricante.',
    source: { label: 'Meglio · Pull apart', url: 'https://mymeglio.com/pages/resistance-tube-exercise-guide' },
    steps: ['De pie, sujeta una agarradera en cada mano con los brazos al frente, por debajo de los hombros.', 'Abre los brazos hacia los lados con los codos suaves. Mantén la banda por debajo de la cara.', 'Vuelve despacio. No enrolles la banda en las manos para acortarla ni fuerces el recorrido si su longitud no encaja.'],
    cues: ['Apertura horizontal', 'Codos suaves', 'Regreso lento'],
    keywords: 'pull apart espalda apertura',
  },
  {
    id: 'upright', name: 'Remo vertical', group: 'Hombros', motion: 'upright',
    summary: 'También llamado remo al mentón; aquí se ilustra un recorrido corto hasta el pecho bajo.',
    equipment: 'Banda y dos agarraderas', support: 'Centro bajo ambos pies con calzado, solo si lo permite el fabricante. Tramos sin cruzar.',
    source: { label: 'Fitbod · Handle Band Upright Row', url: 'https://fitbod.me/exercises/handle-band-upright-row' },
    steps: ['Si el fabricante permite pisarla, coloca el centro bajo ambos pies y toma las agarraderas delante de los muslos, con las palmas hacia el cuerpo. No cruces los tramos.', 'Guía los codos hacia fuera y arriba, acercando las manos al pecho bajo. Detente antes si resulta incómodo y no eleves los codos sobre los hombros.', 'Baja lentamente sin balancearte. Mantén las manos cerca del torso y las muñecas sin doblarlas de forma forzada.'],
    cues: ['Codos por debajo de hombros', 'Recorrido cómodo', 'Sin balanceo'],
    keywords: 'remo al menton vertical hombros trapecio',
  },
  {
    id: 'hammer', name: 'Curl martillo', group: 'Brazos', motion: 'hammer',
    summary: 'Flexión de codos con agarre neutro; también participa el braquiorradial del antebrazo.',
    equipment: 'Banda y dos agarraderas', support: 'Centro bajo ambos pies con calzado, solo si lo permite el fabricante.',
    source: { label: 'Bodylastics · Hammer Curl (p. 82–83 del PDF)', url: 'https://storage.googleapis.com/msgsndr/XvPdGEgSd8SLZjFiaiaQ/media/678d836801b601124c15cda0.pdf#page=82' },
    steps: ['Si el fabricante permite pisarla, coloca el centro bajo ambos pies. Toma las mismas agarraderas a los lados, con las palmas hacia dentro y los pulgares al frente.', 'Flexiona los codos sin separarlos del torso. Mantén las palmas enfrentadas y los pulgares hacia arriba al acercar las manos al pecho.', 'Desciende despacio sin girar las muñecas ni balancear el cuerpo. El movimiento ocurre en los codos, no doblando las muñecas.'],
    cues: ['Agarre neutro', 'Codos quietos', 'Muñecas alineadas'],
    keywords: 'antebrazo braquiorradial martillo hammer curl',
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
