
import { WebQuest, Platform } from '../types';

export const webQuests: WebQuest[] = [
  {
    id: 1,
    title: "Pensamiento Computacional y Normas Digitales",
    description: "Computergestütztes Denken und digitale Regeln. ¡Aprende a programar con orden!",
    platform: Platform.CODESPARK,
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000",
    kmkDefinition: "KMK 1.2: Analizar y evaluar información y datos. Los estudiantes aprenden a identificar estructuras lógicas en entornos digitales.",
    introduction: "En esta WebQuest aprenderás que programar no solo es jugar, sino también pensar con orden, respetar normas digitales y trabajar con cuidado en entornos virtuales. Usaremos plataformas de programación como un espacio seguro para crear y aprender.",
    task: "Crear un avatar digital y un pequeño recorrido guiado donde se muestren reglas básicas de uso responsable dentro de una plataforma de programación.",
    process: [
      "1. Explorar CodeSpark y observar cómo los personajes siguen reglas.",
      "2. Ingresar a Hora del Código – Minecraft y completar un reto introductorio.",
      "3. Identificar qué pasa cuando no se siguen instrucciones.",
      "4. Crear un recorrido simple respetando normas digitales.",
      "--- METODOLOGÍA THINK-PAIR-SHARE ---",
      "Think: ¿Qué pasa si no sigo las reglas del juego?",
      "Pair: Conversa con un compañero sobre lo que observaste.",
      "Share: Comparte una regla digital importante."
    ],
    resources: [
      "Plataforma CodeSpark Academy (Acceso con QR)",
      "Sitio Web: Hora del Código – Minecraft",
      "Guía de Normas Digitales del Colegio Alemán",
      "Libreta Digital Canvas para bocetos"
    ],
    evaluation: [
      { question: "¿Qué es lo más importante al trabajar en entornos virtuales?", options: ["Jugar rápido", "Respetar las normas digitales", "Gritar", "No hacer nada"], correctAnswer: 1 },
      { question: "En el método Think-Pair-Share, ¿qué haces en 'Pair'?", options: ["Pienso solo", "Comparto con todo el salón", "Converso con un compañero", "Me duermo"], correctAnswer: 2 },
      { question: "¿Por qué los personajes de CodeSpark siguen reglas?", options: ["Porque es aburrido", "Para que el programa funcione correctamente", "Porque no tienen otra opción", "Para comer donuts"], correctAnswer: 1 },
      { question: "Si no sigues las instrucciones en programación...", options: ["El código funciona igual", "El programa puede tener errores (Bugs)", "Ganas un premio", "Te vuelves invisible"], correctAnswer: 1 },
      { question: "¿Qué plataforma usamos para el reto introductorio?", options: ["YouTube", "Minecraft – Hora del código", "Instagram", "WhatsApp"], correctAnswer: 1 }
    ],
    conclusion: "¡Excelente! Has comprendido que las reglas ayudan a que la tecnología funcione mejor y a que todos podamos aprender de forma segura.",
    color: "from-emerald-500 to-teal-700"
  },
  {
    id: 2,
    title: "Arquitectos de Mundos II: Lógica Espacial",
    description: "Construcción avanzada y lógica de espacio en Minecraft Edu.",
    platform: Platform.MINECRAFT,
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1000",
    kmkDefinition: "KMK 3.1: Desarrollar y producir contenido digital. Los estudiantes utilizan herramientas de modelado para representar soluciones.",
    introduction: "¡Arquitectos al poder! Hoy vamos a llevar nuestras construcciones al siguiente nivel usando lógica espacial y materiales sustentables para cuidar nuestro planeta virtual.",
    task: "Construir una aldea que sea amigable con el medio ambiente, utilizando bloques que representen energías limpias.",
    process: [
      "1. Planear el diseño en papel o Canvas antes de poner el primer bloque.",
      "2. Seleccionar materiales en el inventario creativo de Minecraft.",
      "3. Construir respetando el espacio de tus compañeros de clase.",
      "4. Tomar una foto (Screenshot) de tu construcción final."
    ],
    resources: [
      "Minecraft Education Edition (Licencia Escolar)",
      "Mundo: 'Eco-System Challenges'",
      "Libreta Digital Canvas (Para el portafolio de evidencias)",
      "Cámara interna de Minecraft"
    ],
    evaluation: [
      { question: "¿Qué material es sustentable?", options: ["Lava", "Madera reforestada", "Dinamita", "Plástico"], correctAnswer: 1 },
      { question: "¿Para qué sirve el plan en papel?", options: ["Para nada", "Para organizar ideas", "Para tirar a la basura", "Para dibujar gatitos"], correctAnswer: 1 },
      { question: "¿Cómo evitas molestar a otros constructores?", options: ["Construyendo lejos", "Rompiendo sus bloques", "Respetando los límites de terreno", "No entrando al servidor"], correctAnswer: 2 },
      { question: "¿Qué herramienta usamos para documentar?", options: ["Minecraft", "Canvas", "Papel", "Memoria"], correctAnswer: 1 },
      { question: "¿Es importante el trabajo en equipo?", options: ["No", "Solo a veces", "Sí, siempre", "Prefiero solo"], correctAnswer: 2 }
    ],
    conclusion: "¡Felicidades! Tu aldea es un ejemplo de innovación y respeto digital. ¡Eres un gran arquitecto!",
    color: "from-blue-500 to-indigo-800"
  }
];

// Generar el resto de misiones con datos por defecto enriquecidos
for (let i = 3; i <= 16; i++) {
  const base = webQuests[i % 2];
  webQuests.push({
    ...base,
    id: i,
    title: `${base.title} - Misión ${i}`,
    imageUrl: i % 2 === 0 ? "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" : "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000",
    description: `Continuación de la aventura digital nivel ${i}.`,
    kmkDefinition: "KMK 6.1: Resolución de problemas técnicos mediante el pensamiento computacional.",
    resources: ["Plataformas K3", "Manual de Aventurero", "Lienzo Digital"],
    color: i % 3 === 0 ? "from-pink-500 to-rose-700" : i % 3 === 1 ? "from-amber-500 to-orange-700" : "from-purple-500 to-violet-800"
  });
}
