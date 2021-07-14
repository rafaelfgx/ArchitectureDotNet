using Architecture.Domain;
using Microsoft.EntityFrameworkCore;

namespace Architecture.Database
{
    public static class ContextSeed
    {
        public static void Seed(this ModelBuilder builder)
        {
            builder.SeedAuths();
            builder.SeedUsers();
        }

        private static void SeedAuths(this ModelBuilder builder)
        {
            builder.Entity<Auth>(auth =>
            {
                auth.HasData(new
                {
                    Id = 1L,
                    Login = "admin",
                    Password = "O34uMN1Vho2IYcSM7nlXEqn57RZ8VEUsJwH++sFr0i3MSHJVx8J3PQGjhLR3s5i4l0XWUnCnymQ/EbRmzvLy8uMWREZu7vZI+BqebjAl5upYKMMQvlEcBeyLcRRTTBpYpv80m/YCZQmpig4XFVfIViLLZY/Kr5gBN5dkQf25rK+u88gtSXAyPDkW+hVS+dW4AmxrnaNFZks0Zzcd5xlb12wcF/q96cc4htHFzvOH9jtN98N5EBIXSvdUVnFc9kBuRTVytATZA7gITbs//hkxvNQ3eody5U9hjdH6D+AP0vVt5unZlTZ+gInn8Ze7AC5o6mn0Y3ylGO1CBJSHU9c/BcFY9oknn+XYk9ySCoDGctMqDbvOBcvSTBkKcrCzev2KnX7xYmC3yNz1Q5oPVKgnq4mc1iuldMlCxse/IDGMJB2FRdTCLV5KNS4IZ1GB+dw3tMvcEEtmXmgT2zKN5+kUkOxhlv5g1ZLgXzWjVJeKb5uZpsn3WK5kt8T+kzMoxHd5i8HxsU2uvy9GopxAnaV0WNsBPqTGkRllSxARl4ZN3hJqUla553RT49tJxbs+N03OmkYhjq+L0aKJ1AC+7G+rdjegiAQZB+3mdE7a2Pne2kYtpMoCmNMKdm9jOOVpfXJqZMQul9ltJSlAY6LPrHFUB3mw61JBNzx+sZgYN29GfDY=",
                    Salt = "79005744-e69a-4b09-996b-08fe0b70cbb9",
                    Roles = Roles.User | Roles.Admin
                });
            });
        }

        private static void SeedUsers(this ModelBuilder builder)
        {
            builder.Entity<User>(user =>
            {
                user.HasData(new
                {
                    Id = 1L,
                    Status = Status.Active,
                    AuthId = 1L
                });

                user.OwnsOne(userName => userName.Name).HasData(new
                {
                    UserId = 1L,
                    FirstName = "Administrator",
                    LastName = "Administrator"
                });

                user.OwnsOne(userEmail => userEmail.Email).HasData(new
                {
                    UserId = 1L,
                    Value = "administrator@administrator.com"
                });
            });
        }
    }
}
