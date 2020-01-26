using AutoMapper;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.DAL.Core;
using NetCoreNotesApp.DAL.Entities;
using NetCoreNotesApp.DAL.Interfaces;
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

        public IList<TagDTO> SearchTags(string term)
        {
            IList<Tag> tags = null;
            if (!string.IsNullOrEmpty(term))
            {
                tags = _context.Tags.GetAll().Where(t => t.Name.StartsWith(term)).ToList();
            }
            else
            {
                tags = _context.Tags.GetAll().Take(10).ToList();
            }
            return _mapper.Map<IList<Tag>, IList<TagDTO>>(tags);
        }

        public void SetTags(ICollection<TagDTO> tagDTOs)
        {
            foreach (var tagDTO in tagDTOs)
            {
                if (!(tagDTO.Id > 0))
                {
                    var tag = _mapper.Map<TagDTO, Tag>(tagDTO);

                    _context.Tags.Create(tag);
                }
            }

            _context.Commit();
        }
    }
}