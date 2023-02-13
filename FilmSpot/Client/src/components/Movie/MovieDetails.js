import { useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import { Favorite } from "./Favorite"

export const MovieDetails = () => {
    const [movie, setMovie] = useState({});
    const {movieId} = useParams();
    const [favorites, setFavorite] = useState([]);
    const navigate = useNavigate();
    const apiKey = "efd0ff32160fa99cfcda71cd93209624";

    useEffect(() => {
        //fetching the movies individual info from the MovieDB
        axios.get(`
        https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
        .then(res => {
          setMovie(res.data)
          
        })
      },[])

      const addFavoriteMovie = (movie) => {
        const newFavoriteList = [...favorites, movie] ;
        setFavorite(newFavoriteList);
      };

       console.log(favorites) 

      return <>
      <div>
        {movie.title}
        {movie.release_date}
        {movie.overview}
        <button onClick={() => addFavoriteMovie(movie)}>
        <Favorite/>
        </button>
      </div>
      </>
}