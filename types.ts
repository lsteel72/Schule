
export enum Platform {
  CODESPARK = 'CodeSpark',
  MINECRAFT = 'Minecraft Edu',
  KODABLE = 'Kodable',
  CANVAS = 'Canvas (Libreta Digital)'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface WebQuest {
  id: number;
  title: string;
  description: string;
  platform: Platform;
  imageUrl: string;
  introduction: string;
  task: string;
  process: string[];
  resources: string[];
  evaluation: QuizQuestion[];
  conclusion: string;
  color: string;
  kmkDefinition: string; // Nueva definición breve de la competencia KMK
}

export interface AdminUser {
  username: string;
  passwordHash: string;
}

export interface StudentResult {
  id: string;
  studentName: string;
  klasse: string;
  questTitle: string;
  score: number;
  reflection: number; // Valor de 1 a 10
  date: string;
}
