using FilmSpot.Models;
using FilmSpot.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FilmSpot.Repository
{
    public class UserCatalogRepository : BaseRepository, IUserCatalogRepository
    {
        public UserCatalogRepository(IConfiguration config) : base(config) { }

        public List<UserCatalog> GetUsersFavorites(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select C.Id, C.UserProfileId, C.MovieId, C.MovieTitle, C.MoviePoster, C.Favorite,
                                        up.Id as UserId                                        

                                        FROM UserCatalog C
                                        JOIN UserProfile up ON C.UserProfileId = up.Id
                                        Where up.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);


                    var reader = cmd.ExecuteReader();

                    var favorites = new List<UserCatalog>();

                    while (reader.Read())
                    {
                        favorites.Add (new UserCatalog()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            MovieId = reader.GetInt32(reader.GetOrdinal("MovieId")),
                            MoviePoster = reader.GetString(reader.GetOrdinal("MoviePoster")),
                            MovieTitle = reader.GetString(reader.GetOrdinal("MovieTitle")),
                            Favorite = reader.GetBoolean(reader.GetOrdinal("Favorite")),
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId"))
                            }
                        });


                    }
                    reader.Close();

                    return favorites;
                }
            }
        }

        public void AddFavorite(UserCatalog userCatalog)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO UserCatalog (UserProfileId, MovieId, MovieTitle, Favorite, MoviePoster)
                    OUTPUT INSERTED.ID
                    VALUES (@userProfileId, @movieId, @movieTitle, @favorite, @moviePoster);
                ";


                    cmd.Parameters.AddWithValue("@userProfileId", userCatalog.UserProfileId);
                    cmd.Parameters.AddWithValue("@movieId", userCatalog.MovieId);
                    cmd.Parameters.AddWithValue("@movieTitle", userCatalog.MovieTitle);
                    cmd.Parameters.AddWithValue("@moviePoster", userCatalog.MoviePoster);
                    cmd.Parameters.AddWithValue("@favorite", userCatalog.Favorite);
                    int id = (int)cmd.ExecuteScalar();

                    userCatalog.Id = id;
                }
            }
        }

        public void DeleteFavorite(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM UserCatalog
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
