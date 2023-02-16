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
        public IActionResult GetByAllId()
        {
            var user = GetCurrentUserProfile();
            return Ok(_movieRepository.GetUserMovies(user.Id));
        }

        [HttpGet("UserMovie")]
        public IActionResult GetUserMovieId(int id)
        {
            var movie = _movieRepository.GetUserMovie(id);
            return Ok(movie);
        }

        [HttpPost]
        public IActionResult Post(Movie movie)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

            movie.UserProfileId = userProfile.Id;

            _movieRepository.AddMovie(movie);
            return CreatedAtAction("Get", new { id = movie.Id }, movie);
        }

        [HttpPut("{id}/edit")]
        public IActionResult Put(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }

            _movieRepository.UpdateMovie(movie);
            return NoContent();
        }
    }
}
