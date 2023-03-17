import { useEffect, useState } from "react";
import { getUserFavorites } from "../../modules/userCatalogManager";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteMovie } from "../../modules/movieManager";
import "./UserProfile.css";

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

    const imgPath = "https://image.tmdb.org/t/p/w500";
    return (
        <>
        <div className="Cards">
            {favorites.map((favorite) => {
                return <Card className="Card" style={{width:200}} key={favorite.id}>
        <Card.Img src={imgPath + favorite.moviePoster}  onClick={() => {navigateToMovieDetails(favorite.movieId)}}/>
                </Card>
                
            })}
        </div>
        </>
    )
}