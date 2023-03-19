using MediatR;
using Personal.Contacts.Managing.App.Application.Dtos;

namespace Personal.Contacts.Managing.App.Application.Queries
{
    public class GetAllContactsQuery : IRequest<IEnumerable<ContactDto>>
    {
    }
}
