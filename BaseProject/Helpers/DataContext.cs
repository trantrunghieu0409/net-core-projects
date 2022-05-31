using BaseProject.Entity;
using Microsoft.EntityFrameworkCore;

namespace BaseProject.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
    }
}
