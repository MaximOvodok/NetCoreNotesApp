using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
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
        public DbSet<NotesTag> NotesTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NotesTag>()
            .HasKey(t => new { t.NoteId, t.TagId });

            modelBuilder.Entity<NotesTag>()
                .HasOne(nt => nt.Note)
                .WithMany(n => n.NotesTags)
                .HasForeignKey(nt => nt.NoteId);

            modelBuilder.Entity<NotesTag>()
                .HasOne(nt => nt.Tag)
                .WithMany(t => t.NotesTags)
                .HasForeignKey(nt => nt.TagId);
        }
    }
}