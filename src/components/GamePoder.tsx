import { questionnaire } from "../data/data";
import { useEffect, useState } from "react";
import "./GamePoder.css";
import Modal from "./Modal";
import useAudios from "@/hooks/useAudios";
import executeAudio from "@/utils/executeAudio";
import QuestionArticle from "./Question";


const GamePoder = () => {
  const [questions, setQuestions] = useState(questionnaire);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seconds, setSeconds] = useState<number | null>(null);
  const { tictacAudio, successAudio, errorAudio } = useAudios();

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
        setTitle("¡Correcto! ¡Has acertado!");
        setMessage("🎉");
        setSeconds(null);
        tictacAudio?.pause();
        executeAudio(successAudio);
      } else {
        setTitle("¡Incorrecto! ¡Inténtalo de nuevo!");
        setMessage("😔");
        setSeconds(null);
        tictacAudio?.pause();
        executeAudio(errorAudio);
      }
      setIsModalOpen(true);
    }
  }

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
      <section className="max-w-7xl mx-auto px-4 pb-4 md:px-8 md:pb-8 font-brandon">
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
