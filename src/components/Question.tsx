import { type Question } from '@/data/data';


interface Props {
  question: Question;
  handleClickArticle: (e: React.MouseEvent<HTMLElement>, id: string) => void;
  handleresponse: (e: React.MouseEvent<HTMLButtonElement>, id: string, response: boolean) => void;
  seconds: number | null;
}


const QuestionArticle = ({ question, handleClickArticle, handleresponse, seconds }: Props) => {
  return (
    <article
    key={question.id}
    className="flip-card text-white rounded-lg cursor-pointer"
    onClick={(e) => handleClickArticle(e, question.id)}
  >
    <div
      className={`flip-card-container ${question.isActive || question.isAnswered ? "active" : "noActive"}`}
    >
      <div className="bg-rosado-wh-abbott front p-20 grid place-content-center">
        <h2 className="text-9xl font-bold">{question.id}</h2>
      </div>
      <div className="bg-rosado-wh-abbott back p-4 flex flex-col justify-between gap-2">
        <div>
          <p className="text-4xl">{question.isActive && seconds}</p>
          {
            question.isAnswered && (
              <p className="text-4xl">
                {
                  question.correctAnswer === question.userSelected ? "✅" : " ❌"
                }
              </p>
            )
          }
        </div>
        <div className="flex-1 grid place-content-center">
          <h3 className="text-3xl text-pretty">
            {question.question}<span className='text-base align-top pl-px'>{question.reference}</span>
          </h3>
        </div>
        <div className="options text-3xl space-x-4">
          <button className="bg-morado-wh-abbott text-white px-4 py-2 rounded-full relative"
            onClick={(e) => handleresponse(e, question.id, true)}
          >
            Verdadero
          </button>
          <button className="bg-white text-morado-wh-abbott px-4 py-2 rounded-full relative"
            onClick={(e) => handleresponse(e, question.id, false)}
          >
            Falso
          </button>
        </div>
      </div>
    </div>
  </article>
  )
};

export default QuestionArticle;