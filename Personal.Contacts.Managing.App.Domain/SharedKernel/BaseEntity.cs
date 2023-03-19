namespace Personal.Contacts.Managing.App.Domain.SharedKernel
{
    // BaseEntity is agreed and used for each entity. Modification of the base entity should be discussed in the team
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
