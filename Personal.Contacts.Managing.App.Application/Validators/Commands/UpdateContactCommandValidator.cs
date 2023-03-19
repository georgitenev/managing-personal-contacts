using FluentValidation;
using Personal.Contacts.Managing.App.Application.Commands.Update;

namespace Personal.Contacts.Managing.App.Application.Validators.Commands
{
    public class UpdateContactCommandValidator : AbstractValidator<UpdateContactCommand>
    {
        public UpdateContactCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotNull()
                .NotEmpty()
                .NotEqual(Guid.Empty)
                    .WithMessage("Provide valid id");
            RuleFor(x => x.FirstName)
                .NotEmpty()
                    .WithMessage("First name cannot be empty")
                .MaximumLength(ValuesLengthValidators.NameMaximumValueLength)
                    .WithMessage($"Maximum allowed length is {ValuesLengthValidators.NameMaximumValueLength}");

            RuleFor(x => x.Surname)
                .NotEmpty()
                    .WithMessage("Surname cannot be empty")
                .MaximumLength(ValuesLengthValidators.NameMaximumValueLength)
                    .WithMessage($"Maximum allowed length is {ValuesLengthValidators.NameMaximumValueLength}");

            RuleFor(x => x.Address)
                .NotEmpty()
                    .WithMessage("Address cannot be empty")
                .MaximumLength(ValuesLengthValidators.AddressMaximumValueLength)
                    .WithMessage($"Maximum allowed length is {ValuesLengthValidators.AddressMaximumValueLength}");

            RuleFor(x => x.PhoneNumber)
                .NotEmpty()
                    .WithMessage("PhoneNumber cannot be empty")
                .Length(ValuesLengthValidators.PhoneNumberValueLength)
                    .WithMessage($"Length should be exact {ValuesLengthValidators.PhoneNumberValueLength} characters");

            RuleFor(x => x.IBAN)
                .NotEmpty()
                    .WithMessage("IBAN cannot be empty")
                .Length(ValuesLengthValidators.IBANValueLength)
                    .WithMessage($"Length should be exact {ValuesLengthValidators.IBANValueLength} characters");

            RuleFor(x => x.DateOfBirth)
                .NotEmpty()
                    .WithMessage("DateOfBirth cannot be empty");
        }
    }
}
