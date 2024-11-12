import axios from '../axios-config'

import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import './Home.css'

const Home = () => {

  const [memories, setMemories] = useState([])

  useEffect(() => {
    const getMemories = async () => {
      const response = await axios.get('/memories')
      setMemories(response.data)
    }

    getMemories()
    console.log(memories)
  }, [])

  return (
    <div className='home'>
        <h2>Confira suas memórias</h2>
        <div className='memories'>
        {memories.length > 0 ? (
          memories.map((memory) => (
            <div className='memory' key={memory._id}>
              <img src={`${axios.defaults.baseURL}/${memory.src}`} alt={memory.title} />
              <h3>{memory.title}</h3>
              <Link className='btn' to={`/memories/${memory._id}`}>Comentar </Link>
            </div>
          ))
        ) : (
          <p>Não há memórias para mostrar.</p>
        )}
        </div>
    </div>
  )
}

export default Home