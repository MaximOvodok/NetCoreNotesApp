using NetCoreNotesApp.BLL.BusinessEntities;
using System.Collections.Generic;

namespace NetCoreNotesApp.BLL.Core
{
    public interface INoteService
    {
        IList<NoteDTO> GetNotes();
        IList<SeverityDTO> GetSeverities();
        void EnsureNote(NoteDTO note);
    }
}