Use [FilmSpot]
Go

set identity_insert [UserProfile] on;
INSERT INTO "UserProfile" ("Id","FirebaseUserId","Email","FirstName","LastName","IsAdmin") VALUES ('1','5czYrA2F2xVsLZqMsM55bEPIGK83','jesier@test.com','Jesier','Santiago','1'),
('2','p2cL3zQKXlR8w7kGECitd1k2THk2','santiago@test.com','Billy','Bob','0');
set identity_insert [UserProfile] off;