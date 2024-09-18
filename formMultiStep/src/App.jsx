import './App.css'
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import {FiSend} from 'react-icons/fi'

//components
import {UserForm} from './components/UserForm'
import {ReviewForm} from './components/ReviewForm'
import {Thanks} from './components/Thanks'
import {Steps} from './components/Steps'


//hooks
import {UseForm} from './hooks/UseForm'
import { useState } from 'react'

const formTemplate = {
  name: '',
  email: '',
  review: '',
  comment: '',
};

function App() {

  const [data, setData] = useState(formTemplate)

  const updateFieldHandler = (key,value) =>{
    setData((prev) => {
      return {...prev, [key]: value};
    });
  };

  const formComponents = [
    <UserForm data = {data} updateFieldHandler={updateFieldHandler}/>
    , <ReviewForm data = {data} updateFieldHandler={updateFieldHandler}/>
    , <Thanks data = {data}/>]

  const {currentStep, currentComponent, changeStep, isLastStep, isFirstStep} = UseForm(formComponents)

  return (
    <>
      <div className="header">
        <h1>Formulário MultiStep</h1> 
        <h2>Deixe sua avaliação referente a sua compra</h2>
      </div>
      <div className="formcontainer">
        <Steps currentStep={currentStep}/>
        <div className="inputscontainer">
            {currentComponent}
        </div>
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="actions">
            {!isFirstStep && (
              <button type='button' onClick={() => changeStep(currentStep -1)}>
              <GrFormPrevious />
              <span>Voltar</span>
              </button>)}
            {!isLastStep ? (<button type='submit'>
              <span>Avançar</span>
              <GrFormNext />  
            </button>) :
            <button type='submit'>
            <span>Enviar</span>
            <FiSend />  
          </button>}
          </div>
        </form>
      </div>
    </>
  )
}

export default App
