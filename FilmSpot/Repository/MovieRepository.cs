using FilmSpot.Models;
using FilmSpot.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FilmSpot.Repository
{
    public class MovieRepository : BaseRepository, IMovieRepository
    {
        public MovieRepository(IConfiguration config) : base(config) { }

        public List<Movie> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Title, Info, Poster, ReleaseDate, GenreId, UserCreated FROM Movie";
                    var reader = cmd.ExecuteReader();

                    var movies = new List<Movie>();

                    while (reader.Read())
                    {
                        movies.Add(new Movie()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Info = reader.GetString(reader.GetOrdinal("Info")),
                            Image = reader.GetString(reader.GetOrdinal("Poster")),
                            ReleaseDate = reader.GetDateTime(reader.GetOrdinal("ReleaseDate")),
                            GenreId = reader.GetInt32(reader.GetOrdinal("GenreId")),
                            UserCreated = reader.GetBoolean(reader.GetOrdinal("UserCreated"))
                        });
                    }

                    reader.Close();

                    return movies;
                }
            }
        }

        public List<Movie> GetUserMoviesl()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT M.Id, M.Title, M.Info, M.Poster, M.ReleaseDate, M.GenreId, M.UserProfileId,
                                        up.Id as UserId
                                        FROM Movie M 
                                        join UserProfile up on M.UserProfile = up.Id
                                        ";

                    

                    var reader = cmd.ExecuteReader();

                    var movies = new List<Movie>();

                    while (reader.Read())
                    {
                        movies.Add(new Movie()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Info = reader.GetString(reader.GetOrdinal("Info")),
                            Image = reader.GetString(reader.GetOrdinal("Poster")),
                            ReleaseDate = reader.GetDateTime(reader.GetOrdinal("ReleaseDate")),
                            GenreId = reader.GetInt32(reader.GetOrdinal("GenreId")),
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId"))
                            }
                        });
                    }

                    reader.Close();

                    return movies;
                }
            }
        }

        public void AddMovie(Movie movie)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Movie ([Title], Info, Image, Trailer, ReleaseDate, GenreId, UserCreated)
                    OUTPUT INSERTED.ID
                    VALUES (@title, @info, @image, @trailer, @releaseDate, @genreId, @userCreated);
                ";


                    cmd.Parameters.AddWithValue("@title", movie.Title);
                    cmd.Parameters.AddWithValue("@info", movie.Info);
                    cmd.Parameters.AddWithValue("@image", movie.Image);
                    cmd.Parameters.AddWithValue("@trailer", movie.Trailer);
                    cmd.Parameters.AddWithValue("@releaseDate", movie.ReleaseDate);
                    cmd.Parameters.AddWithValue("@genreId", movie.GenreId);
                    cmd.Parameters.AddWithValue("@userCreated", true);
                    int id = (int)cmd.ExecuteScalar();

                    movie.Id = id;
                }
            }
        }

        public void UpdateMovie(Movie movie)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Movie
                            SET 
                                [Title] = @title,
                                Info = @info,
                                Image = @image,
                                Trailer = @trailer
                                ReleaseDate = @releaseDate
                                GenreId = @genreId
                                
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", movie.Title);
                    cmd.Parameters.AddWithValue("@info", movie.Info);
                    cmd.Parameters.AddWithValue("@image", movie.Image);
                    cmd.Parameters.AddWithValue("@trailer", movie.Trailer);
                    cmd.Parameters.AddWithValue("@realeaseDate", movie.ReleaseDate);
                    cmd.Parameters.AddWithValue("@genreId", movie.GenreId);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteMovie(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Movie
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
