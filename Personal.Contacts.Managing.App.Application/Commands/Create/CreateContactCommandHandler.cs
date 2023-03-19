using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Personal.Contacts.Managing.App.Application.Dtos;
using Personal.Contacts.Managing.App.Domain.Entities;
using Personal.Contacts.Managing.App.Infrastructure.Data;

namespace Personal.Contacts.Managing.App.Application.Commands.Create
{
    public class CreateContactCommandHandler : IRequestHandler<CreateContactCommand, ContactDto>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<CreateContactCommandHandler> _logger;

        public CreateContactCommandHandler(AppDbContext context, IMapper mapper, ILogger<CreateContactCommandHandler> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ContactDto> Handle(CreateContactCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var contact = new Contact(request.FirstName, request.Surname, request.DateOfBirth, request.Address, request.PhoneNumber, request.IBAN);

                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();

                return _mapper.Map<ContactDto>(contact);
            }
            catch(Exception ex)
            {
                _logger.LogWarning(ex.Message);

                return default;
            }
        }
    }
}
