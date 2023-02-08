import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const MakeMovie = () => {
    const navigate = useNavigate
    //inital state of a empty movie
    const [newMovie, setNewMovie] = useState({
        Title:"",
        Info:"",
        Image:"",
        Trailer:"",
        ReleaseDate:"",
        GenreId:""
    })



     return<>
    <form>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="title" class="form-control" value={newMovie.Title} placeholder="name@example.com" onChange={
        (evt) => {const copy = {...newMovie}
        copy.Title = evt.target.value
        setNewMovie(copy)
    }}/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Example multiple select</label>
    <select multiple class="form-control" id="exampleFormControlSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
</>
}