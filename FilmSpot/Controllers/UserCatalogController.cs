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
    public class UserCatalogController : ControllerBase
    {
        private readonly IUserCatalogRepository _userCatalogRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public UserCatalogController(IUserCatalogRepository userCatalogRepository,
            IUserProfileRepository userProfileRepository)
        {
            _userCatalogRepository = userCatalogRepository;
            _userProfileRepository = userProfileRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet()]
        public IActionResult Get()
        {

            var user = GetCurrentUserProfile();
            return Ok(_userCatalogRepository.GetUsersFavorites(user.Id));
        }

        [HttpPost]
        public IActionResult Post(UserCatalog favorite)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

            favorite.UserProfileId = userProfile.Id;
            _userCatalogRepository.AddFavorite(favorite);
            return CreatedAtAction(nameof(Get), new { id = favorite.Id }, favorite);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _userCatalogRepository.DeleteFavorite(id);
            return NoContent();
        }


    }
}
