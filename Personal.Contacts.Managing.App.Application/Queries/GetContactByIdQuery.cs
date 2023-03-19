using MediatR;
using Personal.Contacts.Managing.App.Application.Dtos;

namespace Personal.Contacts.Managing.App.Application.Queries
{
    public class GetContactByIdQuery: IRequest<ContactDto>
    {
        public Guid Id { get; set; }
    }
}
