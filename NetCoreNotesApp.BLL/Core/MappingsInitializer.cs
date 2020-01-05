using AutoMapper;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.DAL.Entities;

namespace NetCoreNotesApp.BLL.Core
{
    public class MappingsInitializer
    {
        public static void Init(Profile profile)
        {
            profile.CreateMap<Note, NoteDTO>();
            profile.CreateMap<Severity, SeverityDTO>();
            profile.CreateMap<Tag, TagDTO>();
            profile.CreateMap<NoteDTO, Note>();
            profile.CreateMap<SeverityDTO, Severity>();
            profile.CreateMap<TagDTO, Tag>();
        }
    }
}
