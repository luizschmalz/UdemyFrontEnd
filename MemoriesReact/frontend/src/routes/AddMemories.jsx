import axios from '../axios-config'
import { useState } from 'react';
import './AddMemories.css'

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';


const AddMemories = () => {

  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    formData.append('image', image);

    try{

      const response = await axios.post('/memories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toast.success(response.data.msg)
      navigate('/')

    }catch(error){0
      console.log(error)
      toast.error(error.response.data.msg)
    }
  }

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === 'image') {
      setImage(event.target.files[0]);
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value
      })
    }
  }  

  return (
    <div className='addMemPage'>
      <h2>Crie uma nova memória</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          <p>Título:</p>
          <input type='text' placeholder='Título' name='title' onChange={handleChange}/>
        </label>
        <label>
          <p>Descrição:</p>
          <textarea placeholder='Descreva a memória' name='description' onChange={handleChange} />
        </label>
        <label>
          <p>Foto:</p>
          <input type='file' name='image' onChange={handleChange}/>
        </label>
        <button type='submit' className='btn'>Enviar</button>
      </form>
    </div>
  )
}

export default AddMemories