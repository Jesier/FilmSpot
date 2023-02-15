Use [FilmSpot]
Go

set identity_insert [UserProfile] on;
INSERT INTO "UserProfile" ("Id","FirebaseUserId","Email","FirstName","LastName","IsAdmin") VALUES ('1','5czYrA2F2xVsLZqMsM55bEPIGK83','jesier@test.com','Jesier','Santiago','1'),
('2','p2cL3zQKXlR8w7kGECitd1k2THk2','santiago@test.com','Billy','Bob','0');
set identity_insert [UserProfile] off;

set identity_insert [Genre] on;
insert into "Genre" ("Id", "Genre") Values ('28', 'Action'),
('12', 'Adventure'),
('16', 'Animation'),
('35', 'Comedy'),
('80', 'Crime'),
('99', 'Documentary'),
('18', 'Drama'),
('10751', 'Family'),
('14', 'Fantasy'),
('36', 'History'),
('27', 'Horror'),
('10402', 'Music'),
('9648', 'Mystery'),
('10749', 'Romance'),
('848', 'Science Fiction'),
('10770', 'TV Movie'),
('53', 'Thriller'),
('10752', 'War'),
('37', 'Western');
set identity_insert [Genre] off ;

set identity_insert [Movie] on;
insert into "Movie" ("Id", "Title", "Info", "Poster", "ReleaseDate","GenreId","UserCreated") Values ('772071','Cuando Sea Joven','70-year-old Malena gets a second chance at life when she magically turns into her 22-year-old self.',
'/6gIJuFHh5Lj4dNaPG3TzIMl7L68.jpg','2022-09-14','35','1'),
('238','The Godfather','Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.','/3bhkrj58Vtu7enYsRolD1fZdja1.jpg','1972-03-14','80','1')
set identity_insert [Movie] off ;

