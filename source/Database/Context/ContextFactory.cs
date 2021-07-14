using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Architecture.Database
{
    public sealed class ContextFactory : IDesignTimeDbContextFactory<Context>
    {
        public Context CreateDbContext(string[] args)
        {
            const string connectionString = "Server=(localdb)\\MSSQLLocalDB;Database=Database;";

            return new Context(new DbContextOptionsBuilder<Context>().UseSqlServer(connectionString).Options);
        }
    }
}
