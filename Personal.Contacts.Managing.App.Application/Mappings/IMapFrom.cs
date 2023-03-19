using AutoMapper;

namespace Personal.Contacts.Managing.App.Application.Mappings
{
    public interface IMapFrom<T>
    {
        void Mapping(Profile profile) => profile.CreateMap(typeof(T), GetType());
    }

}
