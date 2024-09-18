import { useContext } from "react"
import { QuizContext } from "../context/quiz.jsx"
import Category from "../img/category.svg" 

import './PickCategory.css'

const PickCategory = () => {

    const [quizState, dispatch] = useContext(QuizContext)

    const chooseCategory = (category) => {
        dispatch({ type: 'StartGame', payload: category})

        dispatch({type: 'ReorderQuestions'})
    }

  return (
    <div id='category'>
        <h2>Escolha uma categoria</h2>
        <p>As perguntas serão referente às linguagens abaixo:</p>
        <div>
            {quizState.questions.map((question) => (
                <button 
                onClick={() => chooseCategory(question.category)}
                key={question.category}>{question.category}</button>
            ))}
        </div>
        <img src={Category} alt="" />
    </div>
  )
}

export default PickCategory