import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "./MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [url, setUrl] = useState('https://api.themoviedb.org/3/movie/top_rated?api_key=efd0ff32160fa99cfcda71cd93209624&language=en-US&page=1');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const apiKey = "efd0ff32160fa99cfcda71cd93209624"



  const searchMovie = (e) => {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=efd0ff32160fa99cfcda71cd93209624&language=en-US&query=${query}&page=1&include_adult=false`;
    setUrl(searchUrl);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setUrl(`https://api.themoviedb.org/3/movie/top_rated?api_key=efd0ff32160fa99cfcda71cd93209624&language=en-US&page=${newPage}
    `);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    //fetching the movies from the MovieDB
    axios.get(`${url}&offset=${(page - 1) * 20}&limit=20`)
      .then(res => {
        setMovies(res.data.results);
        setPage(res.data.page);
      })
  }, [url, page])


  return (
    <>
      <form>
        <div className="movie_search_bar">
          <input type="search" placeholder='Search Here' id="movie_search"
            className="form-control"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={searchMovie}
          />
        </div>
      </form>
      <div className="MoviesContainer">
        {movies.map(movie => {
          return <MovieCard movie={movie} key={movie.id} />

        })}
      </div>
      <div className="page_buttons">
        <button id="prev_button" className="btn btn-light" onClick={() => handlePageChange(page - 1)}>Prev</button>
        <button id="next_button" className="btn btn-light" onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </>
  );
}