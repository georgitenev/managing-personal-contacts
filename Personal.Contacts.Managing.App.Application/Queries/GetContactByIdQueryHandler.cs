using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Personal.Contacts.Managing.App.Application.Dtos;
using Personal.Contacts.Managing.App.Infrastructure.Data;

namespace Personal.Contacts.Managing.App.Application.Queries
{
    public class GetContactByIdQueryHandler : IRequestHandler<GetContactByIdQuery, ContactDto>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GetContactByIdQueryHandler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ContactDto> Handle(GetContactByIdQuery request, CancellationToken cancellationToken)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            return _mapper.Map<ContactDto>(contact);
        }
    }
}
