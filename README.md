# Purpose and Motivation
I made FilmSpot as a way to browse movies that you would want to watch given the vast array of movies on the site. The reason I decided to make FilmSpot was when a user watched a movie they could store it into their Favorites so they could remember what movies to reccomend to their friends by checking their favorites! It also provides the user to store a movie to their own movie list if the movie is somehow not on the database.

# How It Works

## Login Or Register
When you first visit the site, it will prompt you to login. If you don't have an account already there will be a register link under the *Login* Button that will allow you to make your account.

## Film List
This is where all of the sites movies will be shown so a user can decide which movie they would like to watch or store into their favorites.

Right under the nav bar there is the search function, where if you type in what ever movie your thinking about, it will choose movies with every keyboard press till you have found the one you want.

Every movie listed is clickable where when you click on a movie it will take you to a page where it will give you the information of *clicked* movie.

## Adding a Favorite
When you click on a Film image from the list mentioned above, you will taken the films information. At the bottom of the synopsis there will be a favorite button that will add that movie to the users favorites that are stored in the *Favoties* section of the navbar.

## Creating a Film
Users have the capability to create and post new films for their own accounts. This is done by going to StoreFilms on the navbar and by filing out the fields then clicking the submit button to have it stored.

## Editing a Film
Users can edit their own film. The user can edit their film by going over to **YourFilms**. Once they are there every movie they have created should have a edit button right under it where they can change what they want by changing whats on the input forms. Once done click the *Save* button.

## Deleting a Film
From the editing portion above the user will also find the delete button right next to the edit button. If they were to click it it would delete the film out of the database.

## Logout
When the user clicks the *Logout* on the navbar, they will no longer be in their account anymore and will be taken to the Login page.

### How FilmSpot was Developed
I developed FilmSpot as a school project this erd was the planning before the code.

ERD
![ERD image](https://i.ibb.co/2ZN4z3K/chrome-Oq-Mc-Q4-I5-Xn.png)
**Note that the review table was included for further development purposes

The front end was designed with React and React-router-dom, with bootstrap and css for styling.  The Login and Register components as well as the authManager module were mostly borrowed code from Nashville Software School.

Firebase was used for Authentication, using the borrowed code mentioned above to get it working.

The back end is a Web API developed using ASP.NET in C#. For the database I used SQL Server. ADO.NET was used to communicate with the database.

### How to Install and Run
You will need to have SQL Server installed to run this application. You will also need to setup your own Firebase project to use with this application as well.

After cloning the repository to your machine, go ahead and run the SQL create script found in FilmSpot/SQL, followed by the seed script.

After setting up your database, you will need to change some files. First, in appsettings.json, make sure your default connection string is set up to connect to your database. Then add your Firebase project ID. Then move insided the client directory and make sure you have a file named .env with the Web API key for your Firebase project.

After this, navigate to the Filmspot/FilmSpot/client directory in your terminal. Then run the command "npm install".

With all of this setup out of the way, run the server, and then run the react app using "npm start".
