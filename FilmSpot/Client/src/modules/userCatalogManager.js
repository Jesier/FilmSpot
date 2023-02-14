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

export const postUserFavorite = (token, Movie) => {
    return fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(Movie),
    })
        .then(res => res.json())
}