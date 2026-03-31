using System;

namespace Application.Profiles.DTOs;

public class EditProfileRequest
{
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
}
