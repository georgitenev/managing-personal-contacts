using MediatR;
using Microsoft.AspNetCore.Mvc;
using Personal.Contacts.Managing.App.Application.Commands.Create;
using Personal.Contacts.Managing.App.Application.Commands.Delete;
using Personal.Contacts.Managing.App.Application.Commands.Update;
using Personal.Contacts.Managing.App.Application.Queries;

namespace Personal.Contacts.Managing.App.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<ContactsController> _logger;

        public ContactsController(IMediator mediator, ILogger<ContactsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var command = new GetAllContactsQuery();
                var response = await _mediator.Send(command);

                return response is not null ? Ok(response) : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(Guid id)
        {
            try
            {
                var command = new GetContactByIdQuery()
                {
                    Id = id
                };
                var response = await _mediator.Send(command);

                return response is not null ? Ok(response) : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateContactCommand command)
        {
            try
            {
                var response = await _mediator.Send(command);

                return response is not null ? Ok(response) : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(Guid id, [FromBody] UpdateContactCommand command)
        {
            try
            {
                command.Id = id;
                var response = await _mediator.Send(command);

                return response is not null ? Ok(response) : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var command = new DeleteContactCommand()
                {
                    Id = id
                };
                var result = await _mediator.Send(command);

                return result is not false ? Ok(result) : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
