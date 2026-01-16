
import { WebQuest, Platform } from '../types';

export const webQuests: WebQuest[] = [
  {
    id: 1,
    title: "Guardianes de Kodu: Mi Primer Mundo 3D",
    description: "Creación de terrenos y lógica visual When-Do en Kodu Game Lab.",
    platform: Platform.KODU,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    kmkDefinition: "KMK 3.1: Desarrollar y producir contenido digital. Los estudiantes diseñan entornos lógicos en 3D.",
    introduction: "¡Bienvenidos al mundo de Kodu! Hoy serás un creador de videojuegos. Aprenderás a moldear la tierra, crear valles y darle vida a un personaje usando la lógica 'When-Do' (Cuando-Hacer).",
    task: "Diseñar un mundo con montañas y agua donde un Kodu pueda moverse y recolectar manzanas al tocarlas.",
    process: [
      "1. Abrir Kodu Game Lab y seleccionar 'New World'.",
      "2. Usar la herramienta de suelo para crear una isla con montañas.",
      "3. Agregar un personaje 'Kodu' y manzanas esparcidas por el mapa.",
      "4. Programar: WHEN [Keyboard: Arrows] -> DO [Move].",
      "5. Programar: WHEN [Bump: Apple] -> DO [Eat].",
      "--- METODOLOGÍA THINK-PAIR-SHARE ---",
      "Think: ¿Cómo puedo hacer que mi mundo sea más emocionante?",
      "Pair: Muestra tu terreno a un compañero.",
      "Share: Explica qué regla de programación fue la más difícil."
    ],
    resources: [
      "Software Kodu Game Lab",
      "Video Tutorial: Introducción a Kodu (Activo: https://www.youtube.com/watch?v=kY3PofnK7jY)",
      "Guía visual de comandos 'When-Do'",
      "Libreta Digital Canvas para el diseño previo"
    ],
    evaluation: [
      { question: "¿Cuál es la regla básica de programación en Kodu?", options: ["Si-Entonces", "When-Do (Cuando-Hacer)", "Click-Play", "Run-Stop"], correctAnswer: 1 },
      { question: "¿Qué herramienta usamos para crear montañas?", options: ["Lápiz", "Herramienta de Suelo / Elevación", "Borrador", "Cámara"], correctAnswer: 1 },
      { question: "Si quiero que Kodu se mueva con las flechas, ¿qué elijo en 'WHEN'?", options: ["See", "Keyboard (Arrows)", "Bump", "Timer"], correctAnswer: 1 },
      { question: "¿Qué pasa si no programo el 'DO'?", options: ["Kodu se mueve solo", "Nada sucede", "El juego explota", "Gano puntos"], correctAnswer: 1 },
      { question: "¿Cómo se llama el personaje principal que usamos?", options: ["Mario", "Kodu", "Robot", "Steve"], correctAnswer: 1 }
    ],
    conclusion: "¡Impresionante! Has creado tu primer videojuego 3D. Estás listo para ser un ingeniero de mundos.",
    color: "from-purple-500 to-indigo-700"
  },
  {
    id: 2,
    title: "Pensamiento Computacional y Normas Digitales",
    description: "Computergestütztes Denken und digitale Regeln. ¡Aprende a programar con orden!",
    platform: Platform.CODESPARK,
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000",
    kmkDefinition: "KMK 1.2: Analizar y evaluar información y datos. Los estudiantes aprenden a identificar estructuras lógicas.",
    introduction: "En esta WebQuest aprenderás que programar no solo es jugar, sino también pensar con orden y respetar normas digitales.",
    task: "Crear un avatar digital y un pequeño recorrido guiado donde se muestren reglas básicas de uso responsable.",
    process: [
      "1. Explorar CodeSpark y observar cómo los personajes siguen reglas.",
      "2. Ingresar a Hora del Código – Minecraft y completar un reto.",
      "3. Identificar qué pasa cuando no se siguen instrucciones.",
      "4. Crear un recorrido simple respetando normas digitales."
    ],
    resources: [
      "Plataforma CodeSpark Academy",
      "Sitio Web: Hora del Código – Minecraft",
      "Guía de Normas Digitales del Colegio Alemán"
    ],
    evaluation: [
      { question: "¿Qué es lo más importante al trabajar en entornos virtuales?", options: ["Jugar rápido", "Respetar las normas digitales", "Gritar", "No hacer nada"], correctAnswer: 1 },
      { question: "En el método Think-Pair-Share, ¿qué haces en 'Pair'?", options: ["Pienso solo", "Comparto con todo el salón", "Converso con un compañero", "Me duermo"], correctAnswer: 2 },
      { question: "¿Por qué los personajes de CodeSpark siguen reglas?", options: ["Porque es aburrido", "Para que el programa funcione", "Porque no tienen opción", "Para comer"], correctAnswer: 1 },
      { question: "Si no sigues las instrucciones en programación...", options: ["El código funciona", "El programa puede tener Bugs", "Ganas un premio", "Eres invisible"], correctAnswer: 1 },
      { question: "¿Qué plataforma usamos para el reto introductorio?", options: ["YouTube", "Minecraft – Hora del código", "Instagram", "WhatsApp"], correctAnswer: 1 }
    ],
    conclusion: "¡Excelente! Has comprendido que las reglas ayudan a que la tecnología funcione mejor.",
    color: "from-emerald-500 to-teal-700"
  }
];

for (let i = 3; i <= 16; i++) {
  const base = webQuests[i % 2];
  webQuests.push({
    ...base,
    id: i,
    title: `${base.title} - Misión ${i}`,
    imageUrl: i % 2 === 0 ? "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000" : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    description: `Continuación de la aventura digital nivel ${i}.`,
    kmkDefinition: "KMK 6.1: Resolución de problemas técnicos mediante el pensamiento computacional.",
    resources: ["Plataformas K3", "Manual de Aventurero", "Lienzo Digital"],
    color: i % 3 === 0 ? "from-pink-500 to-rose-700" : i % 3 === 1 ? "from-amber-500 to-orange-700" : "from-purple-500 to-violet-800"
  });
}
