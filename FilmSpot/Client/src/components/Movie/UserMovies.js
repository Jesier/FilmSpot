import { useEffect, useState } from "react"
import { getUserMovies } from "../../modules/movieManager"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export const UserMovies = () => {
    const [userMovies, setUserMovies] = useState([])
    
    const imgPath = "https://image.tmdb.org/t/p/w500";
    const navigate = useNavigate()

    useEffect(() => {
        getUserMovies()
            .then((data) => {
                setUserMovies(data)
            })
    }, [])

    const navigateToMovieDetails = (movieId) => {
        navigate(`/${movieId}`)
    }

    const navigateToMovieEdit = (movieId) => {
        navigate(`/${movieId}/edit`)
    }

    
    const navigateToUserMovieDetails = (movieId) => {
        navigate(`/YourMovies/${movieId}`)
    }

    return (
        <>
            <div className="Cards">
                {userMovies.map((userMovie) => {
                    return <Card style={{ width: 200 }} key={userMovie.id} >
                        <Card.Img src={imgPath + userMovie.poster} onClick={() => {navigateToUserMovieDetails(userMovie.id)}}/>
                        <Card.Title title={userMovie.title} />
                        <button onClick={() => {navigateToMovieEdit(userMovie.id)}}>
                            Edit
                        </button>
                    </Card>
                    
                })}
            </div>
        </>
    )
}