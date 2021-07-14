using Architecture.Domain;
using Architecture.Model;
using System;
using System.Linq.Expressions;

namespace Architecture.Database
{
    public static class UserExpression
    {
        public static Expression<Func<User, long>> AuthId => user => user.Auth.Id;

        public static Expression<Func<User, UserModel>> Model => user => new UserModel
        {
            Id = user.Id,
            FirstName = user.Name.FirstName,
            LastName = user.Name.LastName,
            Email = user.Email.Value
        };

        public static Expression<Func<User, bool>> Id(long id)
        {
            return user => user.Id == id;
        }
    }
}
