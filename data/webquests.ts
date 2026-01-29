
import { WebQuest, Platform } from '../types';

export const webQuests: WebQuest[] = [
  {
    id: 1,
    title: "TECNOLOGIA ACTIVIDAD 1: Guardianes de Kodu 3D",
    description: "Iniciación en la creación de terrenos y lógica visual When-Do.",
    platform: Platform.KODU,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
    kmkDefinition: "KMK 3.1: Desarrollar contenido digital. Programación de mundos 3D.",
    introduction: "¡Bienvenido, Creador! En Kodu Game Lab, tú mandas sobre la tierra y la vida digital.",
    task: "Diseñar una isla con montañas y programar un Kodu que coma manzanas.",
    process: [
      "1. Abre Kodu Game Lab y crea un 'Nuevo Mundo'.",
      "2. Usa el pincel de suelo para dar forma a tu isla.",
      "3. Añade montañas usando la herramienta de elevación de terreno.",
      "4. Coloca un objeto Kodu y varias manzanas en el mapa.",
      "5. Programa al Kodu: CUANDO [Teclado: Flechas] -> HACER [Mover].",
      "6. Programa la interacción: CUANDO [Chocar: Manzana] -> HACER [Comer]."
    ],
    resources: ["Software Kodu Game Lab", "Ratón y Teclado", "Guía de Iconos"],
    evaluation: [
      { question: "¿Qué lenguaje visual utiliza Kodu?", options: ["Scratch", "When-Do (Cuando-Hacer)", "Python", "C++"], correctAnswer: 1 },
      { question: "¿Cuál es el objetivo principal del Kodu en esta misión?", options: ["Saltar", "Comer manzanas", "Nadar", "Volar"], correctAnswer: 1 }
    ],
    conclusion: "¡Excelente! Has creado vida en 3D.",
    color: "from-purple-600 to-indigo-800"
  },
  {
    id: 2,
    title: "TECNOLOGIA ACTIVIDAD 2: Algoritmos con CodeSpark",
    description: "Aprende a pensar en pasos ordenados para resolver puzzles.",
    platform: Platform.CODESPARK,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000",
    kmkDefinition: "KMK 1.2: Analizar datos. Identificación de secuencias lógicas.",
    introduction: "Los 'Foos' necesitan tu ayuda. Utiliza CodeSpark Academy para programar sus pasos con precisión.",
    task: "Completar el nivel 'Donut Detective' usando secuencias lógicas de bloques.",
    process: [
      "1. Inicia sesión en CodeSpark y entra a 'Puzzles'.",
      "2. Selecciona la categoría de Secuencias.",
      "3. Arrastra los bloques de movimiento hacia la derecha y saltos.",
      "4. Evita los obstáculos observando el camino antes de ejecutar.",
      "5. Pulsa el botón 'Play' para ver a tu Foo en acción."
    ],
    resources: ["CodeSpark Academy", "Tablet o PC", "Bloques de Secuencia"],
    evaluation: [
      { question: "¿Qué es una secuencia en CodeSpark?", options: ["Un error", "Una serie de pasos ordenados", "Un sonido", "Un color"], correctAnswer: 1 }
    ],
    conclusion: "¡Detective de Donuts nivel Pro!",
    color: "from-blue-500 to-cyan-700"
  },
  {
    id: 3,
    title: "TECNOLOGIA ACTIVIDAD 3: Agentes en Minecraft Edu",
    description: "Usa el agente para construir estructuras automáticamente.",
    platform: Platform.MINECRAFT,
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000",
    kmkDefinition: "KMK 6.1: Resolución de problemas técnicos.",
    introduction: "Tu Agente es tu mejor aliado robot dentro del mundo de Minecraft Education.",
    task: "Programar al Agente para que construya una torre de 4 bloques automáticamente.",
    process: [
      "1. Abre Minecraft Education y pulsa 'C' para entrar al Code Builder.",
      "2. Crea un nuevo proyecto llamado 'TorreAgente'.",
      "3. Usa el bloque 'Al comando de chat torre'.",
      "4. Dentro, coloca un bucle de 4 repeticiones.",
      "5. Añade: 'Agente colocar bloque' y 'Agente mover arriba'."
    ],
    resources: ["Minecraft Education", "Code Builder (MakeCode)", "Mundo de Práctica"],
    evaluation: [
      { question: "¿Cómo se abre el constructor de código?", options: ["Tecla T", "Tecla E", "Tecla C", "Tecla Z"], correctAnswer: 2 }
    ],
    conclusion: "¡Ingeniero de bloques activado!",
    color: "from-emerald-600 to-green-800"
  },
  {
    id: 4,
    title: "TECNOLOGIA ACTIVIDAD 4: Bucles Espaciales con Kodable",
    description: "Optimiza tu código usando repeticiones infinitas.",
    platform: Platform.KODABLE,
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1000",
    kmkDefinition: "KMK 1.1: Búsqueda y filtrado de información lógica.",
    introduction: "Los Smeeborgs de Kodable están atrapados. Usa bucles para optimizar el código.",
    task: "Atravesar el laberinto de 'Smeeborg' minimizando la cantidad de bloques usados.",
    process: [
      "1. Entra a Kodable y elige el mundo Smeeborg.",
      "2. Observa si hay patrones de movimiento que se repitan.",
      "3. Usa el bloque rosa de 'Loop'.",
      "4. Introduce las flechas de dirección dentro del bloque de bucle.",
      "5. Verifica que el alien llegue a la meta con menos bloques."
    ],
    resources: ["Kodable Web/App", "Lógica de repetición", "Nivel 1-10"],
    evaluation: [
      { question: "¿Para qué sirve el bloque rosa de Bucle?", options: ["Para borrar todo", "Para repetir instrucciones", "Para saltar", "Para finalizar"], correctAnswer: 1 }
    ],
    conclusion: "¡Ahorrador de código maestro!",
    color: "from-pink-500 to-rose-700"
  },
  {
    id: 5,
    title: "TECNOLOGIA ACTIVIDAD 5: Sensores en Kodu",
    description: "Haz que los objetos reaccionen a la vista y al tacto.",
    platform: Platform.KODU,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000",
    kmkDefinition: "KMK 3.1: Creación de interactividad digital.",
    introduction: "¿Cómo sabe un robot dónde está? En Kodu usamos sensores para darle 'ojos'.",
    task: "Programar un Rover que persiga a un Kodu cada vez que lo vea.",
    process: [
      "1. Crea un terreno plano y añade un Rover y un Kodu.",
      "2. Selecciona al Rover y ve a 'Programar'.",
      "3. Linea 1: CUANDO [Ver: Kodu] -> HACER [Mover: Hacia].",
      "4. Linea 2: CUANDO [Chocar: Kodu] -> HACER [Sonido: Victoria].",
      "5. Maneja al Kodu con el teclado para ver cómo el Rover te sigue."
    ],
    resources: ["Sensores de Visión", "Objeto Rover", "Mundo interactivo"],
    evaluation: [
      { question: "¿Qué sensor permite 'ver' otros objetos?", options: ["Bump", "See (Ver)", "Hear", "Timer"], correctAnswer: 1 }
    ],
    conclusion: "¡Has creado inteligencia artificial básica!",
    color: "from-amber-500 to-orange-700"
  },
  {
    id: 6,
    title: "TECNOLOGIA ACTIVIDAD 6: Variables en CodeSpark",
    description: "Aprende a contar puntos y objetos en tu juego.",
    platform: Platform.CODESPARK,
    imageUrl: "https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=1000",
    kmkDefinition: "KMK 6.1: Uso de variables para resolver problemas.",
    introduction: "Las variables son como cajas que guardan números. ¡Úsalas para contar estrellas!",
    task: "Crear un minijuego en el modo 'Create' que sume puntos al recolectar objetos.",
    process: [
      "1. Abre el modo 'Create' y añade un personaje Foo.",
      "2. Coloca estrellas por el mapa.",
      "3. Busca el bloque de variable (marcador de puntos).",
      "4. Programa: Al recolectar estrella -> Cambiar variable en +1.",
      "5. Juega el nivel y verifica que el contador suba."
    ],
    resources: ["CodeSpark Create Mode", "Variable Blocks", "Objetos de juego"],
    evaluation: [
      { question: "¿Qué guarda un valor que puede cambiar?", options: ["Un bloque fijo", "Una Variable", "La pantalla", "El fondo"], correctAnswer: 1 }
    ],
    conclusion: "¡Matemático de videojuegos!",
    color: "from-indigo-500 to-purple-700"
  },
  {
    id: 7,
    title: "TECNOLOGIA ACTIVIDAD 7: Redstone y Energía en Minecraft",
    description: "Circuitos básicos para abrir puertas automáticas.",
    platform: Platform.MINECRAFT,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    kmkDefinition: "KMK 6.1: Entender sistemas técnicos complejos.",
    introduction: "La Redstone es como la electricidad en Minecraft. Con ella puedes automatizar tu mundo.",
    task: "Construir un mecanismo que abra una puerta de hierro usando Redstone y una palanca.",
    process: [
      "1. Coloca una Puerta de Hierro en tu construcción.",
      "2. Crea una línea de Polvo de Redstone en el suelo.",
      "3. Conecta la línea a una Palanca.",
      "4. Activa la palanca y observa cómo la energía viaja por la línea.",
      "5. Verifica que la puerta se abra y cierre al accionar la palanca."
    ],
    resources: ["Polvo de Redstone", "Palanca o Botón", "Puerta de Hierro"],
    evaluation: [
      { question: "¿Qué material transmite energía en Minecraft?", options: ["Arena", "Piedra Roja (Redstone)", "Madera", "Lana"], correctAnswer: 1 }
    ],
    conclusion: "¡Electricista de Minecraft!",
    color: "from-red-600 to-orange-800"
  },
  {
    id: 8,
    title: "TECNOLOGIA ACTIVIDAD 8: Mi Libreta Digital en Canvas",
    description: "Diseño gráfico y organización de ideas.",
    platform: Platform.CANVAS,
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1000",
    kmkDefinition: "KMK 3.1: Diseñar productos mediáticos.",
    introduction: "Canvas es tu lienzo digital. Aquí organizarás todas tus misiones.",
    task: "Crear una portada creativa para tu portafolio de tecnología.",
    process: [
      "1. Accede a Canvas y elige un tamaño libre.",
      "2. Usa la herramienta de 'Texto' para escribir tu nombre.",
      "3. Sube o busca imágenes relacionadas con programación.",
      "4. Aplica colores y marcos para que se vea profesional.",
      "5. Descarga tu diseño final en formato JPG o PNG."
    ],
    resources: ["Herramienta Canvas", "Banco de Iconos", "Editor de Texto"],
    evaluation: [
      { question: "¿Qué podemos crear en Canvas?", options: ["Solo juegos", "Diseños, portadas e infografías", "Circuitos", "Códigos"], correctAnswer: 1 }
    ],
    conclusion: "¡Diseñador gráfico certificado!",
    color: "from-blue-400 to-indigo-600"
  },
  {
    id: 9,
    title: "TECNOLOGIA ACTIVIDAD 9: Caminos y Rutas en Kodu",
    description: "Crea rutas de patrullaje para tus personajes.",
    platform: Platform.KODU,
    imageUrl: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=1000",
    kmkDefinition: "KMK 3.1: Programar comportamientos autónomos.",
    introduction: "A veces no queremos controlar al personaje, sino que siga una ruta fija.",
    task: "Diseñar una ruta de patrullaje para un personaje tipo Cycle.",
    process: [
      "1. Selecciona la herramienta de 'Ruta' (Path Tool).",
      "2. Dibuja un camino cerrado en el suelo.",
      "3. Coloca un Cycle sobre el camino.",
      "4. Programa: CUANDO [Siempre] -> HACER [Mover: En la ruta].",
      "5. Ajusta la velocidad de la ruta en las opciones del objeto."
    ],
    resources: ["Herramienta Ruta (Path)", "Objeto Cycle", "Ajustes de Velocidad"],
    evaluation: [
      { question: "¿Qué herramienta crea caminos fijos?", options: ["Brocha", "Path (Ruta)", "Agua", "Borrar"], correctAnswer: 1 }
    ],
    conclusion: "¡Maestro de las rutas!",
    color: "from-teal-500 to-emerald-700"
  },
  {
    id: 10,
    title: "TECNOLOGIA ACTIVIDAD 10: Eventos en CodeSpark",
    description: "Haz que los personajes hablen entre ellos.",
    platform: Platform.CODESPARK,
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
    kmkDefinition: "KMK 2.1: Comunicación y colaboración digital.",
    introduction: "Los eventos permiten que un objeto active a otro mediante mensajes.",
    task: "Programar un interruptor que abra una puerta lejana usando mensajes.",
    process: [
      "1. En el modo 'Create', añade un interruptor y una puerta.",
      "2. Al interruptor: CUANDO [Tocar] -> HACER [Enviar Mensaje 1].",
      "3. A la puerta: CUANDO [Recibir Mensaje 1] -> HACER [Abrir].",
      "4. Prueba que el mensaje viaje correctamente al tocar el botón.",
      "5. Intenta cambiar el color del mensaje para usar varios interruptores."
    ],
    resources: ["Mensajería entre objetos", "Eventos de toque", "Interactividad"],
    evaluation: [
      { question: "¿Qué bloque permite activar algo a distancia?", options: ["Mover", "Mensaje (Evento)", "Fondo", "Tamaño"], correctAnswer: 1 }
    ],
    conclusion: "¡Comunicador de códigos!",
    color: "from-violet-500 to-fuchsia-700"
  },
  {
    id: 11,
    title: "TECNOLOGIA ACTIVIDAD 11: Lógica Condicional en Minecraft",
    description: "Si pasa esto, entonces haz aquello.",
    platform: Platform.MINECRAFT,
    imageUrl: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1000",
    kmkDefinition: "KMK 6.1: Pensamiento computacional avanzado.",
    introduction: "La lógica condicional permite al Agente tomar decisiones por sí solo.",
    task: "Programar al Agente para que solo ponga un bloque si detecta aire adelante.",
    process: [
      "1. Abre el Code Builder y busca el bloque 'IF (SI)'.",
      "2. Añade la condición: 'SI el agente detecta bloque adelante'.",
      "3. En la parte 'ENTONCES', programa 'Agente girar'.",
      "4. En la parte 'SINO', programa 'Agente colocar bloque'.",
      "5. Observa cómo el Agente navega evitando obstáculos."
    ],
    resources: ["Code Builder", "Lógica IF/THEN/ELSE", "Detección de bloques"],
    evaluation: [
      { question: "¿Qué bloque sirve para que el Agente decida?", options: ["Bucle", "SI (Condicional)", "Inicio", "Fin"], correctAnswer: 1 }
    ],
    conclusion: "¡Héroe de la lógica!",
    color: "from-orange-600 to-red-700"
  },
  {
    id: 12,
    title: "TECNOLOGIA ACTIVIDAD 12: Depuración en Kodable",
    description: "Encuentra y arregla los errores en el código.",
    platform: Platform.KODABLE,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000",
    kmkDefinition: "KMK 6.1: Identificar y corregir errores técnicos.",
    introduction: "A veces el código tiene 'bugs'. ¡Tu misión es encontrarlos!",
    task: "Corregir los errores en 3 niveles avanzados de Kodable.",
    process: [
      "1. Entra a 'Bug World' en Kodable.",
      "2. Mira el código que ya está puesto y detecta dónde falla.",
      "3. Arrastra los bloques correctos para sustituir los erróneos.",
      "4. Ejecuta el código paso a paso para verificar el cambio.",
      "5. Logra las 3 estrellas en cada nivel corregido."
    ],
    resources: ["Kodable Debug Mode", "Lógica de observación", "Herramienta Paso a Paso"],
    evaluation: [
      { question: "¿Qué significa 'Debug'?", options: ["Añadir errores", "Corregir fallos en el código", "Hacer el juego más rápido", "Cambiar la música"], correctAnswer: 1 }
    ],
    conclusion: "¡Experto en limpieza de código!",
    color: "from-yellow-500 to-amber-600"
  },
  {
    id: 13,
    title: "TECNOLOGIA ACTIVIDAD 13: Clonación en Kodu",
    description: "Crea ejércitos de objetos con un solo clic.",
    platform: Platform.KODU,
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000",
    kmkDefinition: "KMK 3.1: Producción avanzada de contenido.",
    introduction: "En lugar de poner objetos uno por uno, ¡haz que el mundo los cree solo!",
    task: "Programar una fábrica que cree robots cada 10 segundos.",
    process: [
      "1. Coloca un edificio (Fábrica) y un robot.",
      "2. Configura al robot para que sea 'Invisible'.",
      "3. A la Fábrica: CUANDO [Temporizador: 10s] -> HACER [Crear: Robot].",
      "4. Añade un límite de creación para que el mundo no se llene demasiado.",
      "5. Mira cómo aparecen tus nuevos personajes solos."
    ],
    resources: ["Temporizador (Timer)", "Acción Crear (Create)", "Configuración de Objetos"],
    evaluation: [
      { question: "¿Qué comando crea copias de un objeto?", options: ["Delete", "Create", "Move", "Jump"], correctAnswer: 1 }
    ],
    conclusion: "¡Mago de la clonación!",
    color: "from-lime-500 to-green-700"
  },
  {
    id: 14,
    title: "TECNOLOGIA ACTIVIDAD 14: Ciudadanía Digital en Canvas",
    description: "Reglas para ser un buen explorador en internet.",
    platform: Platform.CANVAS,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
    kmkDefinition: "KMK 4.1: Protección y conducta en entornos digitales.",
    introduction: "Ser un buen ciudadano digital significa usar la tecnología con respeto y seguridad.",
    task: "Crear una infografía con los 3 consejos de seguridad más importantes.",
    process: [
      "1. Elige una plantilla de 'Infografía' en Canvas.",
      "2. Escribe títulos claros: Privacidad, Respeto y Tiempo.",
      "3. Añade descripciones cortas para cada uno.",
      "4. Usa elementos gráficos (iconos) para ilustrar los puntos.",
      "5. Publica tu trabajo en el mural digital de la clase."
    ],
    resources: ["Plantillas de Infografía", "Iconos de Seguridad", "Reglas de Netiqueta"],
    evaluation: [
      { question: "¿Qué es la seguridad digital?", options: ["No usar computadora", "Proteger mis datos y respetar a otros", "Jugar mucho", "Tener cables sucios"], correctAnswer: 1 }
    ],
    conclusion: "¡Ciudadano digital ejemplar!",
    color: "from-sky-500 to-blue-700"
  },
  {
    id: 15,
    title: "TECNOLOGIA ACTIVIDAD 15: Colaboración en Minecraft",
    description: "Construye con tus compañeros en un mundo compartido.",
    platform: Platform.MINECRAFT,
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000",
    kmkDefinition: "KMK 2.2: Compartir y colaborar.",
    introduction: "El trabajo en equipo nos permite construir grandes ciudades mucho más rápido.",
    task: "Trabajar en un servidor multijugador para construir una base espacial.",
    process: [
      "1. Únete al código de sesión proporcionado por el profesor.",
      "2. Reúnete con tu equipo en el punto de encuentro.",
      "3. Reparte las tareas: unos recolectan, otros diseñan, otros programan.",
      "4. Usa los comandos de chat para coordinar los movimientos.",
      "5. Tomen una foto grupal al terminar la estructura."
    ],
    resources: ["Modo Multijugador", "Código de Sesión", "Chat de Equipo"],
    evaluation: [
      { question: "¿Qué es fundamental al trabajar en equipo?", options: ["Hacerlo todo solo", "Comunicación y respeto", "No escuchar", "Borrar el trabajo ajeno"], correctAnswer: 1 }
    ],
    conclusion: "¡Gran Maestro Constructor!",
    color: "from-stone-500 to-slate-700"
  },
  {
    id: 16,
    title: "TECNOLOGIA ACTIVIDAD 16: Gran Reto Final",
    description: "Demuestra todo lo aprendido en una misión libre.",
    platform: Platform.CANVAS,
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000",
    kmkDefinition: "KMK 6.1: Resolución de problemas y pensamiento crítico.",
    introduction: "¡Llegaste al final del camino! Es hora de demostrar que eres un experto en tecnología.",
    task: "Crear un proyecto final usando al menos 2 herramientas del Hub.",
    process: [
      "1. Elige tu plataforma de programación favorita (Kodu, Minecraft o CodeSpark).",
      "2. Diseña un nivel que incluya Bucles y Sensores.",
      "3. Usa Canvas para crear una presentación de tu proyecto.",
      "4. Explica cómo solucionaste los errores (bugs) que tuviste.",
      "5. Presenta tu creación ante tus compañeros."
    ],
    resources: ["Todas las plataformas", "Portafolio en Canvas", "Pensamiento Lógico"],
    evaluation: [
      { question: "¿Qué has aprendido en este Hub de Tecnología?", options: ["Solo a jugar", "A crear, pensar y resolver con tecnología", "A mirar la pantalla", "Nada nuevo"], correctAnswer: 1 }
    ],
    conclusion: "¡FELICITACIONES! ERES UN EXPERTO EN TECNOLOGIA KLASSEN 3.",
    color: "from-yellow-500 via-red-500 to-blue-600"
  }
];
