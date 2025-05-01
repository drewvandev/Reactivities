using System;
using System.Windows.Input;
using AutoMapper;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.Activity.Id], cancellationToken) 
                    ?? throw new Exception("Connot find activity");

            mapper.Map(request.Activity, activity);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
