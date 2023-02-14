using FilmSpot.Models;
using FilmSpot.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmSpot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        public MovieController(IMovieRepository movieRepository) 
        {
            _movieRepository = movieRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_movieRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Movie movie)
        {
            _movieRepository.AddMovie(movie);
            return CreatedAtAction("Get", new { id = movie.Id }, movie);
        }
    }
}
