using MediatR;
using Personal.Contacts.Managing.App.Application.Dtos;

namespace Personal.Contacts.Managing.App.Application.Commands.Update
{
    public class UpdateContactCommand : IRequest<ContactDto>
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string IBAN { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
