using NetCoreNotesApp.DAL.Interfaces;

namespace NetCoreNotesApp.DAL.Core
{
    public interface IRepositoryContext
    {
        INoteRepository Notes { get; }
        ISeverityRepository Severities { get; }
        ITagRepository Tags { get; }

        void Commit();
    }
}
