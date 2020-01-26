using System.Collections.Generic;

namespace NetCoreNotesApp.DAL.Entities
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }
        public ICollection<Note> Notes { get; set; }
        public Tag()
        {
            Notes = new HashSet<Note>();
        }
    }
}