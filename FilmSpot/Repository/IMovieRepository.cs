using FilmSpot.Models;
using System.Collections.Generic;

namespace FilmSpot.Repository
{
    public interface IMovieRepository
    {
        void AddMovie(Movie movie);
        Movie GetUserMovie(int id);
        void DeleteMovie(int id);
        List<Movie> GetAll();
        void UpdateMovie(Movie movie);
        public List<Movie> GetUserMovies(int id);
    }
}