using NetCoreNotesApp.BLL.BusinessEntities;
using System.Collections.Generic;

namespace NetCoreNotesApp.BLL.Utils
{
    public class NoteTagPairComparer : IEqualityComparer<NoteTagDTO>
    {
        public bool Equals(NoteTagDTO x, NoteTagDTO y)
        {
            return (x == null && y == null) || (x.NoteId == y.NoteId && x.TagId == y.TagId);
        }

        public int GetHashCode(NoteTagDTO obj)
        {
            return (obj.NoteId ^ obj.TagId).GetHashCode();
        }
    }
}
