import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { RepoProps } from "../types/Repo"

import Loader from "../components/Loader"
import Repo from "../components/Repo"

import classes from "./Repos.module.css"

const Repos = () => {
    const { username } = useParams<{username:string}>()
    const navigate = useNavigate()

    const [repos, setRepos] = useState<RepoProps[] | [] | null>(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        const loadRepos = async function(username:string) {

            setIsLoading(true)

            const res = await fetch(`https://api.github.com/users/${username}/repos`)

            const data = await res.json()

            setIsLoading(false)

            let orderedRepos = data.sort((a:RepoProps, b:RepoProps) => b.stargazers_count - a.stargazers_count)

            orderedRepos = orderedRepos.slice(0, 5)

            setRepos(orderedRepos)
        }

        if(username){
            loadRepos(username)
        }

            

    }, [])

    if(!repos && isLoading) return <Loader/>

  return (
    <div className={classes.repos}>
        <button onClick={() => navigate(-1)} className={classes.backBtn}>Voltar</button>
        <h2>Explore os repositórios do usuário: {username}</h2>
        {repos && repos.length === 0 && <p>Este usuário não possui repositórios</p>}
        {repos && repos.length > 0 &&(
            <div className={classes.repos_container}>
                {repos.map((repo: RepoProps) =>(
                    <Repo key={repo.name} {...repo}/>
                ))}
            </div>
        )}
    </div>
  )
}

export default Repos