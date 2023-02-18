import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { postMovie } from "../../modules/movieManager"

export const MakeMovie = () => {
    const navigate = useNavigate()
    const [genres, setGenres] = useState([])
    //inital state of a empty movie
    const [newMovie, setNewMovie] = useState({
        Title: "",
        Info: "",
        Poster: "",
        Trailer: "",
        ReleaseDate: "",
        GenreId: "",
    })

    useEffect(() => {
        //fetching the genres from the MovieDB
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=efd0ff32160fa99cfcda71cd93209624&language=en-US`)
            .then(res => {
                setGenres(res.data.genres)

            }).catch(err => { console.log(err) })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        postMovie(newMovie)
            .then(() => {
                navigate("/")
            })
    }

    return <>
        <form>
            <div className="form-group w-25">
                <label htmlFor="title">Title</label>
                <input type="title" className="form-control" value={newMovie.Title} placeholder="Title of film" required onChange={
                    (evt) => {
                        const copy = { ...newMovie }
                        copy.Title = evt.target.value
                        setNewMovie(copy)
                    }} />
            </div>
            <div className="form-group w-25">
                <label htmlFor="Info">Info</label>
                <textarea type="Info" className="form-control" value={newMovie.Info} required placeholder="Whats the film about" onChange={
                    (evt) => {
                        const copy = { ...newMovie }
                        copy.Info = evt.target.value
                        setNewMovie(copy)
                    }} />
            </div>
            <div className="form-group w-25">
                <label htmlFor="Image">Image</label>
                <input type="text" className="form-control" value={newMovie.Poster} placeholder="Image Link" required onChange={
                    (evt) => {
                        const copy = { ...newMovie }
                        copy.Poster = evt.target.value
                        setNewMovie(copy)
                    }} />
            </div>
            <div className="form-group w-25">
                <label htmlFor="ReleaseDate">ReleaseDate</label>
                <input type="Date" className="form-control" value={newMovie.ReleaseDate} required onChange={
                    (evt) => {
                        const copy = { ...newMovie }
                        copy.ReleaseDate = evt.target.value
                        setNewMovie(copy)
                    }} />
            </div>
            <div className="form-group w-25">
                <label htmlFor="GenreId">Genre</label>
                <select className="form-control" id="FormControlSelect1" onChange={(evt) => {
                    const copy = { ...newMovie }
                    copy.GenreId = evt.target.value
                    setNewMovie(copy)
                }} >
                    {genres.map(genre => {
                        return <option key={genre.id} value={genre.id} >{genre.name}</option>
                    })}
                </select>
            </div>
            <button class="btn btn-outline-dark" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}> Submit </button>
        </form>
    </>
}