using AutoMapper;

public class TagService : ITagService
{
    private readonly ITagRepository _tagRepository;
    public TagService(ITagRepository tagRepository)
    {
        _tagRepository = tagRepository;
    }
    public void EnsureTag(TagDTO tag)
    {
        Mapper.Initialize(cfg =>
        {
            cfg.CreateMap<TagDTO, Tag>();
        });
        var tagEntity = Mapper.Map<TagDTO, Tag>(tag);

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