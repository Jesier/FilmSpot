using FilmSpot.Models;
using System.Collections.Generic;

namespace FilmSpot.Repository
{
    public interface IUserCatalogRepository
    {
        void AddFavorite(UserCatalog userCatalog);
        List<UserCatalog> GetUsersFavorites(int id);
        void DeleteFavorite(int id);
    }
}