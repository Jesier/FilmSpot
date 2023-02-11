import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MovieList from "./Movie/MovieList";
import { MakeMovie } from "./Movie/MakeMovie";
import { MovieDetails } from "./Movie/MovieDetails";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <MovieList /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path=":movieId" element={<MovieDetails />} />
          <Route path="MakeMovie" element={<MakeMovie />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
