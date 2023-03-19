using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Personal.Contacts.Managing.App.Infrastructure.Data;

namespace Personal.Contacts.Managing.App.Application.Commands.Delete
{
    public class DeleteContactCommandHandler : IRequestHandler<DeleteContactCommand, bool>
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DeleteContactCommandHandler> _logger;

        public DeleteContactCommandHandler(AppDbContext context, ILogger<DeleteContactCommandHandler> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> Handle(DeleteContactCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var contact = await _context.Contacts.FirstOrDefaultAsync(p => p.Id == request.Id);

                if (contact is null)
                    return false;

                _context.Remove(contact);

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex.Message);

                return false;
            }
        }
    }
}
