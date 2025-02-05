import { questionnaire, type EnhancedQuestion } from "../data/data";
import { useEffect, useState } from "react";
import "./GamePoder.css";
import Modal from "./Modal";
import useAudios from "@/hooks/useAudios";
import executeAudio from "@/utils/executeAudio";
import QuestionArticle from "./Question";
import confetti from "canvas-confetti";


const GamePoder = () => {
  const [questions, setQuestions] = useState<EnhancedQuestion[]>(() => {
    return questionnaire.map((question) => {
      return {
        ...question,
        isActive: false,
        isAnswered: false,
        userSelected: null,
      };
    });
  });
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seconds, setSeconds] = useState<number | null>(null);
  const { tictacAudio, successAudio, errorAudio, successEndAudio, confettiAudio } = useAudios();

  const handleClickArticle = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation();
    // obtener el question que se ha clickeado
    const question = questions.find((question) => question.id === id);
    if(question?.isAnswered) return;
  
    setSeconds(20);
    executeAudio(tictacAudio, 0.4);
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          isActive: true,
        };
      }
      return {
        ...question,
        isActive: false,
      };
    });
    setQuestions(updatedQuestions);
  };

  const LaunchModalAndAudio = (title: string, message: string, audio: HTMLAudioElement | null) => {
    setTitle(title);
    setMessage(message);
    setIsModalOpen(true);
    setSeconds(null);    
    tictacAudio?.pause();
    executeAudio(audio);
  }

  const handleresponse = (e: React.MouseEvent<HTMLButtonElement>, id: string, response: boolean) => {
    // prevenir el click en los padres
    e.stopPropagation();
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          isAnswered: true,
          userSelected: response,
        };
      }
      return question;
    });

    setQuestions(updatedQuestions);

    const question = updatedQuestions.find((question) => question.id === id);
    if (question) {
      if (question.correctAnswer === response) {
        const isAllAnswered = updatedQuestions.every((question) => question.isAnswered);
        if (isAllAnswered) return;
        LaunchModalAndAudio("¡Correcto! ¡Has acertado!", "☺️", successAudio);
      } else {
        LaunchModalAndAudio("¡Incorrecto! ¡Inténtalo de nuevo!", "😔", errorAudio);
      }
    }
  }

  useEffect(() => {
    // si ya responde todas las preguntas lanzar el modal de fin de juego
    const isAllAnswered = questions.every((question) => question.isAnswered);
    if (!isAllAnswered) return;
    // saber si todas estan conrrectas
    const isAllCorrect = questions.every((question) => question.correctAnswer === question.userSelected);
    if (isAllCorrect) {
      LaunchModalAndAudio("¡Felicidades! ¡Has terminado el juego!", "🎉🎉🎉", successEndAudio);

      executeAudio(confettiAudio);

      confetti({
        particleCount: 200,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.9 },
      });
      confetti({
        particleCount: 200,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.9 },
      });
    }else{
      LaunchModalAndAudio("Terminaste el juego, pero hay preguntas mal respondidas", "😓", errorAudio);
    }
  }, [questions]);

  useEffect(() => {
    const question = questions.find((question) => question.isActive);
    if (seconds === 0 && question) {
      if (tictacAudio) {
        tictacAudio.pause();
      }
      setTitle("¡Se acabó el tiempo!");
      setMessage("😔");
      setIsModalOpen(true);
      executeAudio(errorAudio);
      // cambiar el isActive del question
      const updatedQuestions = questions.map((question) => {
        if (question.isActive) {
          return {
            ...question,
            isActive: false,
          };
        }
        return question;
      });
      setQuestions(updatedQuestions);
      return
    };
    if (seconds === null) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds !== null ? prevSeconds - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 pb-4 md:pb-8 font-brandon">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
          {questions.map((question) => (
            <QuestionArticle 
              key={question.id}
              question={question}
              handleClickArticle={handleClickArticle}
              handleresponse={handleresponse}
              seconds={seconds}
            />
          ))}
        </div>
      </section>

      {
        isModalOpen && <Modal title={title} message={message} closeModal={closeModal} />
      }
    </>
  );
};

export default GamePoder;
