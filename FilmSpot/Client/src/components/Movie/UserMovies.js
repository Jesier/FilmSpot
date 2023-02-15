import { useEffect, useState } from "react"
import { getUserMovies } from "../../modules/movieManager"
import { Card } from "react-bootstrap"

export const UserMovies = () => {
const [userMovies, setUserMovies] = useState([])

const imgPath = "https://image.tmdb.org/t/p/w500";

useEffect(() => {
    getUserMovies()
    .then((data) => {
        setUserMovies(data)
    })
}, [])

return (
    <>
    <div className="Cards">
        {userMovies.map((userMovie) => {
            return <Card style={{width:200}}>
    <Card.Img src={imgPath + userMovie.image}  onClick={() => {}}/>
    <Card.Title title={userMovie.title}  />
            </Card>
        })}
    </div>
    </>
        )
}