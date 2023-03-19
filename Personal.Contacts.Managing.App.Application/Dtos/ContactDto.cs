using AutoMapper;
using Personal.Contacts.Managing.App.Application.Mappings;
using Personal.Contacts.Managing.App.Domain.Entities;

namespace Personal.Contacts.Managing.App.Application.Dtos
{
    public class ContactDto : IMapFrom<Contact>
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string IBAN { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<Contact, ContactDto>();
        }
    }
}
