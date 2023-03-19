using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Personal.Contacts.Managing.App.Domain.Entities;

namespace Personal.Contacts.Managing.App.Infrastructure.Data.Configurations
{
    public class ContactsConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.Property(t => t.FirstName)
                .IsRequired();
            builder.Property(t => t.Surname)
                .IsRequired();
            builder.Property(t => t.DateOfBirth)
                .IsRequired();
            builder.Property(t => t.Address)
                .IsRequired();
            builder.Property(t => t.PhoneNumber)
                .IsRequired();
            builder.Property(t => t.IBAN)
                .IsRequired();
        }
    }
}
