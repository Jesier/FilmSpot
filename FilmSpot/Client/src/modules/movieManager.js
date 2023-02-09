

const apiUrl = '/api/movie';

export const getMovies = () => {
    return fetch(apiUrl)
    .then((res) => res.json())
};

export const postMovie = (newMovie) => {
    return fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newMovie),
    })
        .then(res => res.json())
}


// export const getBikeById = (id) => {
//     return fetch(`${apiUrl}/${id}`).then((res) => res.json())
// }

// export const getBikesInShopCount = () => {
//     //add implementation here... 
// }