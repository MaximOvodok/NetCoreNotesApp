using NetCoreNotesApp.BLL.BusinessEntities;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreNotesApp.BLL.Core
{
    public interface INoteService
    {
        IQueryable<NoteDTO> GetNotes();
        IQueryable<SeverityDTO> GetSeverities();
        int CreateNote(NoteDTO note);
        int UpdateNote(NoteDTO note);
    }
}