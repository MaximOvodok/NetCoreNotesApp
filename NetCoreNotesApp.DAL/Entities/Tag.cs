using System.Collections.Generic;

namespace NetCoreNotesApp.DAL.Entities
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }
        public IList<NotesTag> NotesTags { get; set; }

        public Tag()
        {
            NotesTags = new List<NotesTag>();
        }
    }
}