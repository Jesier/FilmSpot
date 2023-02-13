import { useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router-dom"
import axios from "axios"

export const MovieDetails = () => {
    const [movie, setMovie] = useState({})
    const {movieId} = useParams()
    const navigate = useNavigate()
    const apiKey = "efd0ff32160fa99cfcda71cd93209624"
    

    useEffect(() => {
        //fetching the movies individual info from the MovieDB
        axios.get(`
        https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
        .then(res => {
          setMovie(res.data)
          
        })
      },[])

      return <>
      <div>
        {movie.title}
        {movie.release_date}
        {movie.overview}
      </div>
      </>
}