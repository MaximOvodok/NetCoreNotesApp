using System.Collections.Generic;

public class Note: BaseEntity
{
    public string Text { get; set; }
    public int Severity { get; set; }
    public int UserId { get; set; }
    public ICollection<Tag> Tags { get; set; }

    public Note()
    {
        Tags = new HashSet<Tag>();
    }
}