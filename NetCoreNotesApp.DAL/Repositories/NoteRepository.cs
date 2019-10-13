using Microsoft.EntityFrameworkCore;

public class NoteRepository : BaseRepository<Note>, INoteRepository
{
    public NoteRepository(DbContext dbContext) : base(dbContext)
    {
    }
}