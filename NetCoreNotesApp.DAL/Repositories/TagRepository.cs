using Microsoft.EntityFrameworkCore;

public class TagRepository : BaseRepository<Tag>, ITagRepository
{
    public TagRepository(DbContext dbContext) : base(dbContext)
    {
    }
}