import { getToken } from "./authManager";


const apiUrl =`/api/UserCatalog`;
export const getUserFavorites = () => {
    return getToken().then((token) => 
    fetch(`${apiUrl}`, {
       method: "GET",
       headers: {
           Authorization: `Bearer ${token}`
       }
    }).then((res) => res.json()))
}



export const postUserFavorite = (Movie) => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Movie),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new quote.",
          );
        }
      });
    });
  };
  