import { getToken } from "./authManager";

const apiUrl = '/api/movie';

export const getMovies = () => {
    return getToken().then((token) => 
     fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
     }).then((res) => res.json()))
};

export const postMovie = (newMovie) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(newMovie),
    })
        .then(res => res.json()))
}
