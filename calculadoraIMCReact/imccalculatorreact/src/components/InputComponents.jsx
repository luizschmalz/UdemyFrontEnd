import { useState } from "react"
import './InputComponents.css'

export const InputComponents = ({ calcImc }) => {

    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');


    const clearForm = (e) =>{

        e.preventDefault();

        setAltura(''); 
        setPeso('');
    }   
    
    const validDigits = (text) => {
        return text.replace(/[^0-9.]/g, '');
    }

    const handleAlturaChange = (e) => {

        const altura = validDigits(e.target.value);

        setAltura(altura);
    }

    const handlePesoChange = (e) => {

        const peso  = validDigits(e.target.value);

        setPeso(peso);
    }



  return (
    <div className="maindiv">
        <h1>Preencha os dados para ter seu IMC</h1>
        <form id='mainform'>
            <label className="input">
                <span>Altura:</span>
                <input type="text" name="altura" placeholder='No formato 1.80' onChange={(e) => handleAlturaChange(e)} value={altura}/>
            </label>
            <label className="input">
                <span>Peso:</span>
                <input type="text" name="peso" placeholder='No formato 81.7' onChange={(e) => handlePesoChange(e)} value={peso}/>
            </label>
            <div className="buttondiv">
                <button onClick={ (e) => calcImc(e, peso, altura) } id='submitbtn'>Enviar</button>
                <button onClick={clearForm} id='clearbtn'>Limpar</button>
            </div>
        </form>
    </div>
  )
}
