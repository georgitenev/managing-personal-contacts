using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Personal.Contacts.Managing.App.Application.Dtos;
using Personal.Contacts.Managing.App.Infrastructure.Data;

namespace Personal.Contacts.Managing.App.Application.Commands.Update
{
    public class UpdateContactCommandHandler : IRequestHandler<UpdateContactCommand, ContactDto>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<UpdateContactCommandHandler> _logger;

        public UpdateContactCommandHandler(AppDbContext context, IMapper mapper, ILogger<UpdateContactCommandHandler> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ContactDto> Handle(UpdateContactCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var contact = await _context.Contacts.FirstOrDefaultAsync(p => p.Id == request.Id);

                if (contact is null)
                    return default;

                contact.Update(request.FirstName, request.Surname, request.DateOfBirth, request.Address, request.PhoneNumber, request.IBAN);

                await _context.SaveChangesAsync();

                return _mapper.Map<ContactDto>(contact);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex.Message);

                return default;
            }
        }
    }
}
