import { Link } from "react-router-dom"
import { useState, useEffect} from 'react'
import blogFetch from '../axios/config'
import './Admin.css'


const Admin = () => {

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
    
        try{

        const response = await blogFetch.get('/posts')
        
        const data = response.data
        setPosts(data)

        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    const deletePost = async (id) => {

        await blogFetch.delete(`/posts/${id}`)

        const filteredPosts = posts.filter(post => post.id !== id)

        setPosts(filteredPosts)

    }

  return (
    <div className='admin-page'>
        <h1>Gerenciar Posts</h1>
        {posts.lenght === 0 ? (<p>carregando</p>) : (
            posts.map(post => (
                <div className="post" key={post.id}>
                    <h2>{post.title}</h2>
                    <div className="actions">
                        <Link to={`/posts/edit/${post.id}`} className='edit-btn'>Editar</Link>
                        <button className='delete-btn' onClick={() => deletePost(post.id)}>Excluir</button>
                    </div>

                </div>
            ))
        )}
    </div>
  )
}

export default Admin