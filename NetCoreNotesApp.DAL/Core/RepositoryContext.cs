using Microsoft.EntityFrameworkCore;
using NetCoreNotesApp.DAL.Interfaces;

namespace NetCoreNotesApp.DAL.Core
{
    public class RepositoryContext : IRepositoryContext
    {
        private DbContext _dbContext;

        public INoteRepository Notes { get; private set; }

        public ISeverityRepository Severities { get; private set; }

        public ITagRepository Tags { get; private set; }

        public INotesTagRepository NotesTags { get; private set; }

        public RepositoryContext(DbContext dbContext, INoteRepository notes, ISeverityRepository severities, ITagRepository tags, INotesTagRepository notesTags)
        {
            _dbContext = dbContext;
            Notes = notes;
            Severities = severities;
            Tags = tags;
            NotesTags = notesTags;
        }

        public void Commit()
        {
            _dbContext.SaveChanges();
        }
    }
}
