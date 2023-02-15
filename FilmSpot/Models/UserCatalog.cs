using System.Collections.Generic;

namespace FilmSpot.Models
{
    public class UserCatalog
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int MovieId { get; set; }
        public string MovieTitle { get; set; }
        public string MoviePoster { get; set; }
        public bool Favorite { get; set; }
        public bool Later { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
