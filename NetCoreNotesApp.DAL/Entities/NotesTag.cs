using System;
using System.Collections.Generic;
using System.Text;

namespace NetCoreNotesApp.DAL.Entities
{
    public class NotesTag
    {
        public int NoteId { get; set; }
        public Note Note { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
