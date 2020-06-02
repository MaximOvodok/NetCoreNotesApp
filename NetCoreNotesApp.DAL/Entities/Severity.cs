using System.Collections.Generic;

namespace NetCoreNotesApp.DAL.Entities
{
    public class Severity : BaseEntity
    {
        public string Text { get; set; }

        public ICollection<Note> Notes { get; set; }

        public Severity()
        {
            Notes = new HashSet<Note>();
        }
    }
}
