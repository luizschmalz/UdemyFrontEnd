import './Home.css'

import { useState, useContext } from 'react'
import { CountdownContext } from '../context/CountdownContext'

import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [img, setImg] = useState('')
    const [color, setColor] = useState('')

    const {setEvent} = useContext(CountdownContext)

    const handleSubmit = (e) => {
        e.preventDefault();

        const eventObject = {
            title,
            date,
            img,
            color
        };

        setEvent(eventObject)

        navigate('/countdown')
        
    }

  return (
    <div className='home'>
        <h2>Monte sua contagem regressiva</h2>
        <form className="countdown-form" onSubmit={handleSubmit}>
            <label>
                <span>Título:</span>
                <input type="text"
                 name='title' 
                 placeholder="Digite o título do evento"
                 onChange={(e) => setTitle(e.target.value)}
                 required />
            </label>
            <label>
                <span>Data do evento:</span>
                <input type="date" 
                name='date' 
                placeholder="Digite a data evento" 
                onChange={(e) => setDate(e.target.value)}
                required />
            </label>
            <label>
                <span>Imagem:</span>
                <input type="text" 
                name='img'
                 placeholder="Insira a URL da imagem" 
                 onChange={(e) => setImg(e.target.value)}/>
            </label>
            <label>
                <span>Cor do tema:</span>
                <input type="color"
                 name='color'
                 onChange={(e) => setColor(e.target.value)}/>
            </label>
            <input type="submit" value="Enviar"/>
        </form>
    </div>
  )
}

export default Home