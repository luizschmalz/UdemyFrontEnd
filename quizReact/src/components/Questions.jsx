import { useContext } from "react"
import { QuizContext } from "../context/quiz"

import Options from "./Options"
import './Questions.css'

const Questions = () => {
  
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestion]

  const onSelectOption = (option) => {
    dispatch({type: "SelectAnswer", payload: {answer: currentQuestion.answer, option}})
  }

  return (
  <div id='question'>
      <p>Pergunta {quizState.currentQuestion+1} de {quizState.questions.length}</p>
      <h2>{currentQuestion.question}</h2>
      <div className="options-container">
          {currentQuestion.options.map((option) =>(
            <Options option={option} 
            key={option} 
            answer={currentQuestion.answer}
            selectOption = {() => onSelectOption(option)} />
          ))}
      </div>
      {!quizState.answerSelected && quizState.help==="" &&(
        <>{currentQuestion.tip && <button
        onClick={() => dispatch({type: 'ShowTip'})}>Dica</button>}
        {quizState.remove === true &&
        (<button onClick={() => dispatch({type: 'RemoveOption', payload: {options: currentQuestion.options, resp:currentQuestion.answer}})}>Excluir uma</button>)}
        </>
      )}
      {!quizState.answerSelected && quizState.help === 'tip' && 
      (<p>{currentQuestion.tip}</p>)
      }
      {quizState.answerSelected && (
        <button onClick={()=> dispatch({type: "ChangeQuestion"}) }>Continuar</button>
      )}
  </div>
  )
}

export default Questions