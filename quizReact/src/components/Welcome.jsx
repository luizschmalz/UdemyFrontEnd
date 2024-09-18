import { QuizContext } from '../context/quiz'
import { useContext } from 'react'


import './Welcome.css'
import Quiz from '../img/quiz.svg'

const Welcome = () => {

  const [quizState, dispatch] = useContext(QuizContext)



  return (
    <div id='welcome'>
        <h2>Seja bem-vindo</h2>
        <p>Clique no botão abaixo para começar</p>
        <button onClick={() => dispatch({type: "ChangeState"})}>Iniciar</button>
        <img src={Quiz} alt="Inicío do quiz" />
    </div>
  )
}

export default Welcome