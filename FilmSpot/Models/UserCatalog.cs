namespace FilmSpot.Models
{
    public class UserCatalog
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int MovieId { get; set; }
        public bool Favorite { get; set; }
        public bool Later { get; set; }
    }
}
