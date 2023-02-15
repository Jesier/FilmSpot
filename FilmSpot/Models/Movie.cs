using System;

namespace FilmSpot.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Info { get; set; }
        public string Image { get; set; }
        public string Trailer { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int GenreId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
