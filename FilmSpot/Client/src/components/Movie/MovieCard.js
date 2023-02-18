import { Card } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom";


export const MovieCard = ({movie}) => {
    const imgPath = "https://image.tmdb.org/t/p/w500";
    const navigate = useNavigate()

    const navigateToMovieDetails = (movieId) => {
        navigate(`/${movieId}`)
    }

    return <div className="Cards">
        <Card style={{width:200}} >
        <Card.Img src={imgPath + movie.poster_path}  onClick={() => {navigateToMovieDetails(movie.id)}}/>
        </Card>
        
    </div>
}