using System.Collections.Generic;
using System.Linq;
using AutoMapper;

public class NoteService: INoteService
{
    private readonly INoteRepository _noteRepository;
    public NoteService(INoteRepository noteRepository)
    {
        _noteRepository = noteRepository;
    }

    public void EnsureNote(NoteDTO note)
    {
        Mapper.Initialize(cfg =>
        {
            cfg.CreateMap<NoteDTO, Note>();
        });

        var noteEntity = Mapper.Map<NoteDTO, Note>(note);
        if (noteEntity.Id > 0)
        {
            _noteRepository.Update(noteEntity);
        }
        else 
        {
            _noteRepository.Create(noteEntity);
        }
    }

    public IList<NoteDTO> GetNotes()
    {
        Mapper.Initialize(cfg => {
            cfg.CreateMap<Note, NoteDTO>();
            cfg.CreateMap<Tag, TagDTO>();
        });

        var noteEntities = _noteRepository.GetAll().ToList();
        return Mapper.Map<IList<Note>, IList<NoteDTO>>(noteEntities);
    }
}