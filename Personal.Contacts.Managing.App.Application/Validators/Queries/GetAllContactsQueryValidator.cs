using FluentValidation;
using Personal.Contacts.Managing.App.Application.Queries;

namespace Personal.Contacts.Managing.App.Application.Validators.Queries
{
    public class GetAllContactsQueryValidator : AbstractValidator<GetAllContactsQuery>
    {
        public GetAllContactsQueryValidator()
        {
        }
    }
}
