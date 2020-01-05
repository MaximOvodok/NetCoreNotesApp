using AutoMapper;
using NetCoreNotesApp.BLL.Core;

namespace NetCoreNotesApp.Web
{
    public class AutoMapping: Profile
    {
        public AutoMapping()
        {
            MappingsInitializer.Init(this);
        }
    }
}
