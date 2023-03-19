using FluentValidation;
using Personal.Contacts.Managing.App.Application.Commands.Delete;

namespace Personal.Contacts.Managing.App.Application.Validators.Commands
{
    public class DeleteContactCommandValidator : AbstractValidator<DeleteContactCommand>
    {
        public DeleteContactCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotNull()
                .NotEmpty()
                .NotEqual(Guid.Empty)
                    .WithMessage("Provide valid id");
        }
    }
}
