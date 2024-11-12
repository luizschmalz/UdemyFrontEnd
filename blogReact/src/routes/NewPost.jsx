import './NewPost.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import blogFetch from '../axios/config' 

const NewPost = () => {
  
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const createPost = async (e) => {

    e.preventDefault()

    console.log(title, content)

    const post = {title, content, userId: 1}

    await blogFetch.post('/posts', {
      body: post,
    })

    navigate('/')

  }

  return (
    <div className='newpost'>
      <h2>Criar um post:</h2>
      <form onSubmit={(e) =>createPost(e) }>
      <div className="form-control">
        <label htmlFor="title">Título:</label>
        <input type="text" 
        name='title'
        id='title'
        placeholder='Digite o título do post'
        onChange = {(e) => setTitle(e.target.value)}
        required
        />
      </div>
      <div className="form-control">
        <label htmlFor="content">Contéudo:</label>
        <textarea type="text" 
        name='content'
        id='content'
        placeholder='Digite o post'
        onChange = {(e) => setContent(e.target.value)}
        required
        />
      </div>
      <input type="submit" value='Criar post' className='sendpostbtn'/>

      </form>
    </div>
  )
}

export default NewPost