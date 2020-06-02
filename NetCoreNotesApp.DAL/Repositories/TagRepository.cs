using Microsoft.EntityFrameworkCore;
using NetCoreNotesApp.DAL.Entities;
using NetCoreNotesApp.DAL.Interfaces;

namespace NetCoreNotesApp.DAL.Repositories
{
    public class TagRepository : BaseRepository<Tag>, ITagRepository
    {
        public TagRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}