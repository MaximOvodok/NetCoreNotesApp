using AutoMapper;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.DAL.Core;
using NetCoreNotesApp.DAL.Entities;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreNotesApp.BLL.Services
{
    public class TagService : ITagService
    {
        private readonly IRepositoryContext _context;
        private readonly IMapper _mapper;
        public TagService(IRepositoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<TagDTO> SearchTags(string term)
        {
            IQueryable<Tag> tags = null;
            if (!string.IsNullOrEmpty(term))
            {
                tags = _context.Tags.GetAll().Where(t => t.Name.StartsWith(term));
            }
            else
            {
                tags = _context.Tags.GetAll().Take(10);
            }
            return _mapper.ProjectTo<TagDTO>(tags);
        }

        public ICollection<Tag> SetTags(ICollection<TagDTO> tagDTOs)
        {
            var tags = new List<Tag>();

            foreach (var tagDTO in tagDTOs)
            {
                var tag = _mapper.Map<TagDTO, Tag>(tagDTO);

                if (!(tag.Id > 0))
                {
                    _context.Tags.Create(tag);
                }

                tags.Add(tag);
            }

            _context.Commit();

            return tags;
        }
    }
}