USE [master]

IF db_id('FilmSpot') IS NULl
  CREATE DATABASE [FilmSpot]
GO

USE [FilmSpot]
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) UNIQUE NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) UNIQUE NOT NULL,
  [IsAdmin] bit NOT NULL DEFAULT (1)
)
GO

CREATE TABLE [Movie] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Info] nvarchar(255),
  [Poster] nvarchar(255) NOT NULL,
  [Trailer] nvarchar(255),
  [ReleaseDate] datetime,
  [GenreId] int,
  [Rating] int,
  [UserCreated] bit
)
GO

CREATE TABLE [Review] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Text] nvarchar(255) NOT NULL,
  [UserProfileId] int NOT NULL,
  [MovieId] int NOT NULL,
  [PersonalRating] int
)
GO

CREATE TABLE [UserCatalog] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserProfileId] int NOT NULL,
  [MovieId] int NOT NULL,
  [MovieTitle] nvarchar(255),
  [MoviePoster] nvarchar(255),
  [Favorite] bit,
  [WatchLater] bit
)
GO

CREATE TABLE [Genre] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Genre] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Movie] ADD FOREIGN KEY ([GenreId]) REFERENCES [Genre] ([Id])
GO

ALTER TABLE [UserCatalog] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserCatalog] ADD FOREIGN KEY ([MovieId]) REFERENCES [Movie] ([Id])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([MovieId]) REFERENCES [Movie] ([Id])
GO
