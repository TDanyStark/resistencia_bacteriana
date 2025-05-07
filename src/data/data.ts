export interface Question {
  id: string;
  question: string;
  reference: string;
  correctAnswer: boolean;
}

export interface EnhancedQuestion extends Question {
  isActive: boolean;
  isAnswered: boolean;
  userSelected: boolean | null;
} 

export const questionnaire: Question[] = [
  {
    id: "1",
    question:
      "Los antibióticos sirven para tratar virus como la gripa",
    reference: "1",
    correctAnswer: false,
  
  },
  {
    id: "2",
    question:
      "Aumentar la dosis del antibiótico no ayuda a mejorar más rápido, por el contrario, pone en riesgo la salud debido a que se incrementa el riesgo de efectos secundarios.",
    reference: "1",
    correctAnswer: true,
   
  },
  {
    id: "3",
    question:
      "Un antibiótico recetado por el médico puede cambiarse por otro similar",
    reference: "1",
    correctAnswer: false,
    
  },
  {
    id: "4",
    question:
      "Los pacientes pueden suspender el tratamiento antibiótico cuando sientan que los síntomas han mejorado",
      reference: "2",
    correctAnswer: false,
   
  },
  {
    id: "5",
    question:
      "Suministrar un antibiótico sin receta médica a una persona que ya lo ha usado antes es un acto responsable",
    reference: "2",
    correctAnswer: false,

  }
];
