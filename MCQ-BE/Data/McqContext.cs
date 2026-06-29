using MCQ.Models;
using Microsoft.EntityFrameworkCore;
namespace MCQ.Data
{
    public class McqContext : DbContext
    {
        public McqContext(DbContextOptions<McqContext> options) : base(options)
        {

        }

        public DbSet<Question> question { get; set; }
        public DbSet<Answer> answer { get; set; }

    }
}
