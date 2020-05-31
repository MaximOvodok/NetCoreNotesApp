using NetCoreNotesApp.BLL.BusinessEntities;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreNotesApp.BLL.Core
{
    public interface INoteTagService
    {
        IList<NoteTagDTO> GetRelationshipsToAdd(NoteDTO note);

        IList<NoteTagDTO> GetRelationshipsToDelete(NoteDTO note);
    }
}
