using Architecture.Domain;
using System;
using System.Linq.Expressions;

namespace Architecture.Database
{
    public static class AuthExpression
    {
        public static Expression<Func<Auth, bool>> Login(string login)
        {
            return auth => auth.Login == login;
        }
    }
}
