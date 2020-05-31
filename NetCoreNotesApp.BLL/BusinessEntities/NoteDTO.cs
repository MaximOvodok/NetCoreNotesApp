using System.Collections.Generic;

namespace NetCoreNotesApp.BLL.BusinessEntities
{
    public class NoteDTO
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public string SeverityId { get; set; }

        public int UserId { get; set; }

        public SeverityDTO Severity { get; set; }

        public ICollection<TagDTO> Tags { get; set; }
    }
}