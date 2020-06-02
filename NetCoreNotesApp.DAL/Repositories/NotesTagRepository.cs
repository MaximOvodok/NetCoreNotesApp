using Microsoft.EntityFrameworkCore;
using NetCoreNotesApp.DAL.Entities;
using NetCoreNotesApp.DAL.Interfaces;

namespace NetCoreNotesApp.DAL.Repositories
{
    public class NotesTagRepository : BaseRepository<NotesTag>, INotesTagRepository
    {
        public NotesTagRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
