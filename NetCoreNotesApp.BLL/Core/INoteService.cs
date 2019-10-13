using System.Collections.Generic;

public interface INoteService
{
    IList<NoteDTO> GetNotes();
    void EnsureNote(NoteDTO note);
}