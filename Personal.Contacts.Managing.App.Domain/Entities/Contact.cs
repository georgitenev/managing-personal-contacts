using Personal.Contacts.Managing.App.Domain.SharedKernel;

namespace Personal.Contacts.Managing.App.Domain.Entities
{
    public class Contact: BaseEntity
    {
        private Contact() { }

        public Contact(
            string firstName,
            string surname,
            DateTime dateOfBirth,
            string address,
            string phoneNumber,
            string iban)
        {
            FirstName = firstName;
            Surname = surname;
            DateOfBirth = dateOfBirth;
            Address = address;
            PhoneNumber = phoneNumber;
            IBAN = iban;
        }

        public string FirstName { get; private set; }

        public string Surname { get; private set; }

        public DateTime DateOfBirth { get; private set; }

        public string Address { get; private set; }

        public string PhoneNumber { get; private set; }

        public string IBAN { get; private set; }

        public void Update(
            string firstName,
            string surname,
            DateTime dateOfBirth,
            string address,
            string phoneNumber,
            string iban)
        {
            FirstName = firstName;
            Surname = surname;
            DateOfBirth = dateOfBirth;
            Address = address;
            PhoneNumber = phoneNumber;
            IBAN = iban;
        }

        public void SetFullName(string firstName, string lastName)
        {
            FirstName = firstName;
            Surname = lastName;  
        }

        public void ChangeAddress(string address)
        {
            Address = address;
        }

        public bool IsUpdated() => this.UpdatedAt > this.CreatedAt;

        public bool HasIBANProvided() => !string.IsNullOrEmpty(this.IBAN);
    }
}
