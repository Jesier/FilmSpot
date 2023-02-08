import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "./MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([])

const apiKey = "efd0ff32160fa99cfcda71cd93209624"

  useEffect(() => {
    //fetching the movies from the MovieDB
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
    .then(res => {
      setMovies(res.data.results)
      
    }).catch(err => {console.log(err)}) 
  },[])
  
  
  return (
    <>
    <div className="MoviesContainer">
      {movies.map(movie => {
        return <MovieCard movie={movie} key={movie.id} />
        
      })}
    </div>
    </>
  );
}