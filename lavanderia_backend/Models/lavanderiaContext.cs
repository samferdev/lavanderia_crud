using Microsoft.EntityFrameworkCore;

namespace lavanderia_backend.Models
{
    public class LavanderiaContext : DbContext
    {
        public LavanderiaContext(DbContextOptions<LavanderiaContext> options)
            : base(options)
        {
        }

        public DbSet<Roupa> Roupas { get; set; }

        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>().HasData(new Usuario
            {
                Id = 1,
                NomeUsuario = "admin",
                Senha = "admin123" // depois a gente pode fazer com hash
            });
        }


    }
}
