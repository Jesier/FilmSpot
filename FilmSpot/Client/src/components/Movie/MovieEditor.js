import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editMovie } from "../../modules/movieManager"
import { getUserMovie } from "../../modules/movieManager"
import axios from "axios"
import { deleteMovie } from "../../modules/movieManager"

export const MovieEditor = () => {
const [movie, setMovie] = useState({
    title:"",
    info:"",
    poster:"",
    trailer:"",
    releaseDate:"",
    genreId:"",
})
const [genres, setGenres] = useState([])
const navigate = useNavigate()
const {movieId} = useParams();

useEffect(() => {
    getUserMovie(movieId)
    .then((data) => {
        setMovie(data)
    })
},[])

const handleSaveButtonClick = (event) => {
    event.preventDefault()
    editMovie(movie)
        .then(() => {
            navigate(`/YourMovies`)
        })
}

const buttonDeleteMovie = (event) => {
    event.preventDefault()
    deleteMovie(movie.id)
    .then(() => {
        navigate(`/YourMovies`)
    })
}

useEffect(() => {
    //fetching the genres from the MovieDB
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=efd0ff32160fa99cfcda71cd93209624&language=en-US`)
        .then(res => {
            setGenres(res.data.genres)

        }).catch(err => { console.log(err) })
}, [])

return <>
        <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="title" className="form-control" value={movie.title} placeholder="Title of film" required onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.title = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="Info">Info</label>
                <textarea type="Info" className="form-control" value={movie.info} required placeholder="Whats the film about" onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.info = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="poster">Image</label>
                <input type="text" className="form-control" value={movie.poster} placeholder="Image Link" required onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.poster = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="releaseDate">ReleaseDate</label>
                <input type="datetime-local" className="form-control" value={movie.releaseDate} required onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.releaseDate = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="GenreId">Genre</label>
                <select className="form-control" value={movie.genreId} id="FormControlSelect1" onChange={(evt) => {
                    const copy = { ...movie }
                    copy.genreId = evt.target.value
                    setMovie(copy)
                }} >
                    {genres.map(genre => {
                        return <option key={genre.id} value={genre.id} >{genre.name}</option>
                    })}
                </select>
            </div>
            <button onClick={(event) => handleSaveButtonClick(event)}> Edit </button>
            <button onClick={(event) => {buttonDeleteMovie(event)}} >Delete</button> 
        </form>
    </>
}