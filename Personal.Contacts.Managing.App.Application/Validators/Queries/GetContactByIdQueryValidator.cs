using FluentValidation;
using Personal.Contacts.Managing.App.Application.Queries;

namespace Personal.Contacts.Managing.App.Application.Validators.Queries
{
    public class GetContactByIdQueryValidator : AbstractValidator<GetContactByIdQuery>
    {
        public GetContactByIdQueryValidator()
        {
            RuleFor(x => x.Id)
                .NotNull()
                .NotEmpty()
                .NotEqual(Guid.Empty)
                    .WithMessage("Provide valid id");
        }
    }
}
