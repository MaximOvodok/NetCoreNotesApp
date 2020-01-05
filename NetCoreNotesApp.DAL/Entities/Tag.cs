namespace NetCoreNotesApp.DAL.Entities
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }
        public int NoteId { get; set; }
        public Note Note { get; set; }
    }
}