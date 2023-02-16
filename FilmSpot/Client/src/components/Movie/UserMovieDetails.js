import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getUserMovie } from "../../modules/movieManager"


export const UserMovieDetails = () => {
    const [movie, setMovie] = useState({})
    const {movieId} = useParams()


    useEffect(() => {
        getUserMovie(movieId)
        .then((res) => {
            setMovie(res)
        })
    }, [])

    console.log(movie) 

    return <>
      <div>
        <h1>{movie.title}</h1>
        {movie.info}
      </div>
      </>
}