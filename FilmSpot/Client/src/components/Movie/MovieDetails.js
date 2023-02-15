import { useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import { Favorite } from "./Favorite"
import { me } from "../../modules/authManager"
import { postUserFavorite } from "../../modules/userCatalogManager"

export const MovieDetails = () => {
    const [movie, setMovie] = useState({});
    const {movieId} = useParams();
    

   const favorite = {
    movieId: movie.id,
    moviePoster: movie.poster_path,
    movieTitle:movie.title,
    Favorite: true
    
   }

    const apiKey = "efd0ff32160fa99cfcda71cd93209624";
    
    

    useEffect(() => {
        //fetching the movies individual info from the MovieDB
        axios.get(`
        https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
        .then(res => {
          setMovie(res.data)
          
        })
      },[])

      const handleFavoriteClick = (event) => {
        event.preventDefault()
        postUserFavorite(favorite)

    }

      return <>
      <div>
        {movie.title}
        {movie.release_date}
        {movie.overview}
        <button onClick={(clickEvent) => handleFavoriteClick(clickEvent)}>
        <Favorite/>
        </button>
      </div>
      </>
}