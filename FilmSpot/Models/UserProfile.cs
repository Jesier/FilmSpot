﻿using System.Collections.Generic;

namespace FilmSpot.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        

    }
}
