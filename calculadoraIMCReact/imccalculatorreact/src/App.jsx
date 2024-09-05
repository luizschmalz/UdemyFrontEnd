import { useState } from 'react'
import { InputComponents } from './components/InputComponents'
import { data } from './data/data.js'
import {ImcTable} from './components/ImcTable'


function App() {
  const [imc, setImc] = useState('')
  const [info, setInfo] = useState('')
  const [infoClass, setInfoClass] = useState('')

  const calcImc = (e, peso, altura) => {
    e.preventDefault();

    if (!peso || !altura) return
  

    const imc = ((peso / (altura * altura)).toFixed(1))

    setImc(imc)

    data.forEach((item) => {
      if(imc >= item.min && imc <= item.max) {
        setInfo(item.info)
        setInfoClass(item.infoClass)
      }
      if(!info) return
    })

  }

  const resetCalc =(e) => {

    e.preventDefault()
    setImc('')
    setInfo('')
    setInfoClass('')
  }

  return (
    <>
      {!imc ? 
        <InputComponents calcImc={calcImc}/>
        : <ImcTable data={data} imc={imc} info={info} infoClass={infoClass} resetCalc={resetCalc}/>
      }
    </>
  )
}

export default App
