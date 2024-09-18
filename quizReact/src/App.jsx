import { useContext, useEffect } from 'react'
import { QuizContext } from './context/quiz'
import './App.css'
import Welcome from './components/Welcome'
import Questions from './components/Questions'
import GameOver from './components/GameOver' 
import PickCategory from './components/PickCategory'

function App() {
  
  const [quizState, dispatch] = useContext(QuizContext) 



  return (
    <div className='App'>
      <h1>Quiz app</h1>
      {quizState.gameStage === "start" && <Welcome />}
      {quizState.gameStage === "category" && <PickCategory />}
      {quizState.gameStage === "playing" && <Questions />}
      {quizState.gameStage === "end" && <GameOver />}
    </div>
  )
}

export default App
