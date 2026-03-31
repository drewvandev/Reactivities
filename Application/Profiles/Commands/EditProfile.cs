using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string UserId { get; set; }
        public required EditProfileRequest EditRequest { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var profile = await userAccessor.GetUserAsync();

            if (profile == null){
                return Result<Unit>.Failure("Could not find a matching profile", 400);
            }

            profile.DisplayName = request.EditRequest.DisplayName;
            profile.Bio = request.EditRequest.Bio;

            context.Entry(profile).State = EntityState.Modified;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("There was an issue updating the profile.", 400);
        }
    }
}