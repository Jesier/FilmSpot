import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Favorite } from "./Favorite"
import { postUserFavorite } from "../../modules/userCatalogManager"

export const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const [video,setVideo] = useState({})

  const favorite = {
    movieId: movie.id,
    moviePoster: movie.poster_path,
    movieTitle: movie.title,
    Favorite: true,
    Later: false

  }
  const imgPath = "https://image.tmdb.org/t/p/w500";
  const apiKey = "efd0ff32160fa99cfcda71cd93209624";
  const youtube = "https://www.youtube.com/watch?v="
  useEffect(() => {
    //fetching the movies individual info from the MovieDB
    axios.get(`
        https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then(res => {
        setMovie(res.data)

      })
  }, [])

  useEffect(() => {
  axios.get(`
  https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`)
      .then(res => {
        setVideo(res.data.results)

      })
  }, [])

  const handleFavoriteClick = (event) => {
    event.preventDefault()
    postUserFavorite(favorite)

  }

  return <>
    <div>
      <h1>{movie.title}</h1>
      <img width={"200"} src={imgPath + movie.poster_path}/>
      <h5>{movie.release_date}</h5>
      <div>
        {movie.overview}
      </div>
      <button class="btn btn-outline-danger" onClick={(clickEvent) => handleFavoriteClick(clickEvent)}>
        <Favorite />
      </button>
    </div>
  </>
}