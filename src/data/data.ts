export interface Question {
  id: string;
  question: string;
  reference: string;
  correctAnswer: boolean;
  isActive: boolean;
  isAnswered: boolean;
  userSelected: boolean | null;
}

export const questionnaire: Question[] = [
  {
    id: "1",
    question:
      "Los anticonceptivos orales combinados contienen dos tipos de hormonas llamadas estrógenos y progestágenos",
    reference: "1",
    correctAnswer: true,
    isActive: false,
    isAnswered: false,
    userSelected: null,
  },
  {
    id: "2",
    question:
      "Todas las mujeres deben tomarse un descanso después de usar anticonceptivos orales combinados durante cierto tiempo",
    reference: "1",
    correctAnswer: false,
    isActive: false,
    isAnswered: false,
    userSelected: null,
  },
  {
    id: "3",
    question:
      "Los anticonceptivos orales combinados hacen que las mujeres aumenten de peso",
    reference: "1",
    correctAnswer: false,
    isActive: false,
    isAnswered: false,
    userSelected: null,
  },
  {
    id: "4",
    question:
      "El uso de un anticonceptivo oral combinado puede ayudar a mejorar los síntomas emocionales relacionados con el ciclo menstrual",
      reference: "2",
    correctAnswer: true,
    isActive: false,
    isAnswered: false,
    userSelected: null,
  },
  {
    id: "5",
    question:
      "Algunos anticonceptivos orales combinados se utilizan como tratamiento del acné",
    reference: "3",
    correctAnswer: true,
    isActive: false,
    isAnswered: false,
    userSelected: null,
  },
  {
    id: "6",
    question:
      "Las mujeres mayores de 35 años no pueden usar anticonceptivos orales combinados",
    reference: "1",
    correctAnswer: false,
    isActive: false,
    isAnswered: false,
    userSelected: null,
  },
];
