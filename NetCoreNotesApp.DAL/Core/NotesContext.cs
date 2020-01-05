using Microsoft.EntityFrameworkCore;
using NetCoreNotesApp.DAL.Entities;

namespace NetCoreNotesApp.DAL.Core
{
    public class NotesContext : DbContext
    {
        public NotesContext(DbContextOptions<NotesContext> options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Severity> Severities { get; set; }
    }
}