using System.Collections.Generic;

public class NoteDTO
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string UserId { get; set; }
    public ICollection<TagDTO> Tags { get; set; }
}