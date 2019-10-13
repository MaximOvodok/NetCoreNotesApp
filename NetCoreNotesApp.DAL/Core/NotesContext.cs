using Microsoft.EntityFrameworkCore;

public class NotesContext: DbContext
{
    public NotesContext(DbContextOptions<NotesContext> options): base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Note> Notes { get; set; }
    public DbSet<Tag> Tags { get; set; }
}