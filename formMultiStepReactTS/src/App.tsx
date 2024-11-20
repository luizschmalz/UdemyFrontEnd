import {GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { FiSend } from 'react-icons/fi'
import './App.css'
import UserForm from './components/UserForm'
import ReviewForm from './components/ReviewForm'
import Thanks from './components/Thanks'
import { useForm } from './hooks/UseForm'
import Steps from './components/Steps'
import { useState } from 'react'

type FormFields = {
  name: string
  email: string
  review: string
  comment: string
}

const formtemplate: FormFields = {
  name: '',
  email: '',
  review: '',
  comment: '',
}

function App() {

  const [data, setData] = useState(formtemplate)

  const updateFieldHandler = (key: string, value: string) => {

    setData((prev) => {
      return { ...prev, [key]: value }
    })

  }

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler}/>,
    <Thanks data={data}/>
  ]

  const {currentStep, currentComponent, changeStep, isLastStep} = useForm(formComponents)

  return (
    <>
      <div className="header">
          <h2>Deixe sua avaliação</h2>
          <p>
            Ficamos felizes em saber que você gostou do nosso produto.
            Ultilize o formulário abaixo para deixar sua avaliação.
          </p>
      </div>
      <div className="formcontainer">  
          <Steps currentStep={currentStep} />
          <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
            <div className="inputscontainer">
              {currentComponent}
            </div>
            <div className="actions">
              <button type='button' onClick={() => changeStep(currentStep - 1)}>
                <GrFormPrevious />
                <span>Voltar</span>
              </button>
              {!isLastStep ? (<button type='submit'>
                <span>Avançar</span>
                <GrFormNext />
              </button>) : (<button>
                <span>Enviar</span>
                <FiSend />
              </button>)}
            </div>
          </form>
      </div>
    </>
  )
}

export default App
