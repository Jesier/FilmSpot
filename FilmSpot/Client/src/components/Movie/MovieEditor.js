import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { editMovie } from "../../modules/movieManager"
import { getUserMovie } from "../../modules/movieManager"
import axios from "axios"
export const MovieEditor = () => {
const [movie, setMovie] = useState({
    Title:"",
    Info:"",
    Poster:"",
    Trailer:"",
    ReleaseDate:"",
    GenreId:"",
})
const [genres, setGenres] = useState([])
const navigate = useNavigate()

useEffect(() => {
    getUserMovie(movie)
    .then((data) => {
        setMovie(data)
    })
},[])

const handleSaveButtonClick = (event) => {
    event.preventDefault()
    editMovie(movie)
        .then(() => {
            navigate("/")
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
                <input type="title" className="form-control" value={movie.Title} placeholder="Title of film" required onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.Title = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="Info">Info</label>
                <textarea type="Info" className="form-control" value={movie.Info} required placeholder="Whats the film about" onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.Info = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="Image">Image</label>
                <input type="text" className="form-control" value={movie.Image} placeholder="Image Link" required onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.Image = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="trailer">Trailer</label>
                <input type="text" className="form-control" value={movie.Trailer} required onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.Trailer = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="ReleaseDate">ReleaseDate</label>
                <input type="Date" className="form-control" value={movie.ReleaseDate} required onChange={
                    (evt) => {
                        const copy = { ...movie }
                        copy.ReleaseDate = evt.target.value
                        setMovie(copy)
                    }} />
            </div>
            <div className="form-group">
                <label htmlFor="GenreId">Genre</label>
                <select className="form-control" id="FormControlSelect1" onChange={(evt) => {
                    const copy = { ...movie }
                    copy.GenreId = evt.target.value
                    setMovie(copy)
                }} >
                    {genres.map(genre => {
                        return <option key={genre.id} value={genre.id} >{genre.name}</option>
                    })}
                </select>
            </div>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}> yea </button>
        </form>
    </>
}