using System.Collections.Generic;
namespace NetCoreNotesApp.BLL.BusinessEntities
{
    public class SeverityDTO
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public ICollection<NoteDTO> Notes { get; set; }
    }
}
