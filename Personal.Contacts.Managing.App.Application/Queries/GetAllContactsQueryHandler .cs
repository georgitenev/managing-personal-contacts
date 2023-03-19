using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Personal.Contacts.Managing.App.Application.Dtos;
using Personal.Contacts.Managing.App.Infrastructure.Data;

namespace Personal.Contacts.Managing.App.Application.Queries
{
    public class GetAllContactsQueryHandler : IRequestHandler<GetAllContactsQuery, IEnumerable<ContactDto>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GetAllContactsQueryHandler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ContactDto>> Handle(GetAllContactsQuery request, CancellationToken cancellationToken)
        {
            var contacts = await _context.Contacts.ToListAsync();

            return _mapper.Map<IEnumerable<ContactDto>>(contacts);
        }
    }
}
