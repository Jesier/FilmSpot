using FilmSpot.Models;
using FilmSpot.Repositories;
using FilmSpot.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FilmSpot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public MovieController(IMovieRepository movieRepository,
            IUserProfileRepository userProfileRepository)
        {
            _movieRepository = movieRepository;
            _userProfileRepository = userProfileRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_movieRepository.GetAll());
        }

        [HttpGet("UserMovies")]
        public IActionResult GetById()
        {
            var user = GetCurrentUserProfile();
            return Ok(_movieRepository.GetUserMovies(user.Id));
        }

        [HttpPost]
        public IActionResult Post(Movie movie)
        {
            _movieRepository.AddMovie(movie);
            return CreatedAtAction("Get", new { id = movie.Id }, movie);
        }
    }
}
