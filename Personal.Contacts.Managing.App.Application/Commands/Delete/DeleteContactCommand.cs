using MediatR;

namespace Personal.Contacts.Managing.App.Application.Commands.Delete
{
    public class DeleteContactCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
    }
}
