import { useEffect, useState } from "react";
import { getUserFavorites } from "../../modules/userCatalogManager";
import { Card } from "react-bootstrap";
import { onLoginStatusChange,me } from "../../modules/authManager";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
const [favorites, setFavorites] = useState([])
const navigate = useNavigate()

useEffect(() => {
    getUserFavorites()
    .then((data) => {
        setFavorites(data)
    })
}, [])

const navigateToMovieDetails = (movieId) => {
    navigate(`/${movieId}`)
}


 
// useEffect(() => {
//     //fetching the movies from the MovieDB
//     axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=efd0ff32160fa99cfcda71cd93209624&language=en-US&page=1`)
//       .then(res => {
//         setMovies(res.data.results);
//       })
//   }, [])

    const imgPath = "https://image.tmdb.org/t/p/w500";
    //navigateToMovieDetails(favorite.id)
    return (
        <>
        <div className="Cards">
            {favorites.map((favorite) => {
                return <Card style={{width:200}} key={favorite.id}>
        <Card.Img src={imgPath + favorite.moviePoster}  onClick={() => {navigateToMovieDetails(favorite.movieId)}}/>
        <Card.Title title={favorite.title}  />
                </Card>
            })}
        </div>
        </>
    )
}