using BaseProject.Entities;
using Microsoft.EntityFrameworkCore;

namespace BaseProject.Helpers
{
    public class DataContext: DbContext
    {
        private readonly IConfiguration _configuration;

        public DataContext(IConfiguration configuration) : base()
        {
            _configuration = configuration;
        }

        public DbSet<Account> Accounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("TestDB"); // change this later to use sql server
        }
    }
}
