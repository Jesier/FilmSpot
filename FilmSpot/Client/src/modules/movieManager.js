import { getToken } from "./authManager";

const apiUrl = '/api/Movie';

export const getMovies = () => {
    return getToken().then((token) => 
     fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
     }).then((res) => res.json()))
};

export const getUserMovies = () => {
    return getToken().then((token) => 
     fetch(`${apiUrl}/UserMovies`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
     }).then((res) => res.json()))
};

export const getUserMovie = (id) => {
    return getToken().then((token) => 
     fetch(`${apiUrl}/${id}`, {
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

export const editMovie = (movie) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}/${movie.id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(movie),
    })
        .then(res => res.json()))
}

export const deleteMovie = (id) => {
    return getToken().then((token) => 
     fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
     }))
};