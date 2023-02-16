using FilmSpot.Models;
using FilmSpot.Repositories;
using FilmSpot.Utils;
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
                    cmd.CommandText = "SELECT Id, Title, Info, Poster, ReleaseDate, GenreId FROM Movie";
                    var reader = cmd.ExecuteReader();

                    var movies = new List<Movie>();

                    while (reader.Read())
                    {
                        movies.Add(new Movie()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Info = reader.GetString(reader.GetOrdinal("Info")),
                            Poster = reader.GetString(reader.GetOrdinal("Poster")),
                            ReleaseDate = reader.GetDateTime(reader.GetOrdinal("ReleaseDate")),
                            GenreId = reader.GetInt32(reader.GetOrdinal("GenreId"))
                        });
                    }

                    reader.Close();

                    return movies;
                }
            }
        }

        public List<Movie> GetUserMovies(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT M.Id, M.Title, M.Info, M.Poster, M.ReleaseDate, M.GenreId, M.UserProfileId,
                                        up.Id as UserId
                                        FROM Movie M 
                                        join UserProfile up ON M.UserProfileId = up.Id
                                        Where up.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    var movies = new List<Movie>();

                    while (reader.Read())
                    {
                        movies.Add(new Movie()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Info = reader.GetString(reader.GetOrdinal("Info")),
                            Poster = reader.GetString(reader.GetOrdinal("Poster")),
                            ReleaseDate = reader.GetDateTime(reader.GetOrdinal("ReleaseDate")),
                            GenreId = reader.GetInt32(reader.GetOrdinal("GenreId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
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
                    INSERT INTO Movie ([Title], Info, Poster, Trailer, ReleaseDate, GenreId, UserProfileId)
                    OUTPUT INSERTED.ID
                    VALUES (@title, @info, @poster, @trailer, @releaseDate, @genreId, @userProfileId);
                ";


                    cmd.Parameters.AddWithValue("@title", movie.Title);
                    cmd.Parameters.AddWithValue("@info", movie.Info);
                    cmd.Parameters.AddWithValue("@poster", movie.Poster);
                    cmd.Parameters.AddWithValue("@trailer", movie.Trailer);
                    cmd.Parameters.AddWithValue("@releaseDate", movie.ReleaseDate);
                    cmd.Parameters.AddWithValue("@genreId", movie.GenreId);
                    cmd.Parameters.AddWithValue("@userProfileId", movie.UserProfileId);
                    int id = (int)cmd.ExecuteScalar();

                    movie.Id = id;
                }
            }
        }

        public Movie GetUserMovie(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select M.Id, M.Title, M.Info, M.Poster, M.ReleaseDate, M.GenreId, M.UserProfileId,
                                        up.Id as UserId                                        

                                        FROM Movie M
                                        JOIN UserProfile up ON M.UserProfileId = up.Id
                                        Where M.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Movie movie = null;
                        if (reader.Read())
                        {
                            movie = new Movie()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Info = reader.GetString(reader.GetOrdinal("Info")),
                                Poster = reader.GetString(reader.GetOrdinal("Poster")),
                                ReleaseDate = reader.GetDateTime(reader.GetOrdinal("ReleaseDate")),
                                GenreId = reader.GetInt32(reader.GetOrdinal("GenreId")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                UserProfile = new UserProfile()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserId"))
                                }
                            };
                        }

                        return movie;
                    }
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
                                Poster = @poster,
                                Trailer = @trailer,
                                ReleaseDate = @releaseDate,
                                GenreId = @genreId
                                
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", movie.Title);
                    cmd.Parameters.AddWithValue("@info", movie.Info);
                    cmd.Parameters.AddWithValue("@poster", movie.Poster);
                    cmd.Parameters.AddWithValue("@trailer", movie.Trailer);
                    cmd.Parameters.AddWithValue("@releaseDate", movie.ReleaseDate);
                    cmd.Parameters.AddWithValue("@genreId", movie.GenreId);
                    cmd.Parameters.AddWithValue("@id", movie.Id);

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
