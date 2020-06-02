using System.Collections.Generic;

namespace NetCoreNotesApp.BLL.BusinessEntities
{
    public class TagDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<NoteDTO> Notes { get; set; }
    }
}