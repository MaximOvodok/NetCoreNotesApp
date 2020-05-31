using System.Collections.Generic;

namespace NetCoreNotesApp.DAL.Entities
{
    public class Note : BaseEntity
    {
        public string Text { get; set; }

        public int SeverityId { get; set; }

        public Severity Severity { get; set; }

        public int UserId { get; set; }

        public IList<NotesTag> NotesTags { get; set; }

        public Note()
        {
            NotesTags = new List<NotesTag>();
        }
    }
}