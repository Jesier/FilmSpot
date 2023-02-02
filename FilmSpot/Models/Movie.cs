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
        public DateTime RealeaseDate { get; set; }
        public Genre GenreId { get; set; }
        public bool UserCreated { get; set; }
    }
}
