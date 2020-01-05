namespace NetCoreNotesApp.BLL.BusinessEntities
{
    public class TagDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public NoteDTO Note { get; set; }
    }
}