using AutoMapper;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.DAL.Entities;
using System.Linq;

namespace NetCoreNotesApp.BLL.Core
{
    public class MappingsInitializer
    {
        public static void Init(Profile profile)
        {
            profile.CreateMap<Note, NoteDTO>()
                .ForMember(m => m.Tags,
                    opt => opt.MapFrom(m => m.NotesTags.Select(nt => nt.Tag)));
            profile.CreateMap<Severity, SeverityDTO>();
            profile.CreateMap<Tag, TagDTO>();
            profile.CreateMap<NoteDTO, Note>();
            profile.CreateMap<SeverityDTO, Severity>();
            profile.CreateMap<TagDTO, Tag>();
        }
    }
}
