using AutoMapper;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.DAL.Entities;
using NetCoreNotesApp.DAL.Interfaces;

namespace NetCoreNotesApp.BLL.Services
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;
        public TagService(ITagRepository tagRepository, IMapper mapper)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
        }
        public void EnsureTag(TagDTO tag)
        {
            var tagEntity = _mapper.Map<TagDTO, Tag>(tag);

            if (tagEntity.Id > 0)
            {
                _tagRepository.Update(tagEntity);
            }
            else
            {
                _tagRepository.Create(tagEntity);
            }
        }
    }
}