import './EditPost.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import blogFetch from '../axios/config' 

const EditPost = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState()
    const [content, setContent] = useState()

    const { id } = useParams()

    const getPost = async () => {

        try{
            const response = await blogFetch.get(`/posts/${id}`)
            const data = response.data
            setTitle(data.title)
            setContent(data.body)

        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() =>{
        getPost()
    }, [])

    const editPost = async (e) => {

        e.preventDefault();

        const post = {title, content, userId: 1 }

        await blogFetch.put(`/posts/${id}`, {
            body: post, 
        })

    }

  return (
    <div className='newpost'>
      <h2>Editando: {title}</h2>
      <form onSubmit={(e) =>editPost(e) }>
      <div className="form-control">
        <label htmlFor="title">Título:</label>
        <input type="text" 
        name='title'
        id='title'
        placeholder='Digite o título do post'
        value = {title || ''}
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
        value = {content || ''}
        onChange = {(e) => setContent(e.target.value)}
        required
        />
      </div>
      <input type="submit" value='Editar post' className='sendpostbtn'/>

      </form>
    </div>
  )
}

export default EditPost