import { useForm } from "react-hook-form";
import { editProfileSchema, EditProfileSchema } from "../../lib/schemas/EditProfileSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "../../lib/hooks/useProfile.tsx";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import { useParams } from "react-router";
    
    type Props = {
        setEditMode: (editMode: boolean) => void;
    }

    export default function ProfileEdit({ setEditMode }: Props) {
        const { id } = useParams();
        const { editProfile, profile } = useProfile(id);
        const {control, handleSubmit, reset, formState: {isDirty, isValid } } = useForm<EditProfileSchema>({
            resolver: zodResolver(editProfileSchema),
            mode: 'onTouched'
        });

        const onSubmit = (data: EditProfileSchema) => {
            editProfile.mutate({ userId: id!, profile: data }, {
                onSuccess: () => setEditMode(false)
                
            });
        }

        useEffect(() => {
            reset({
                DisplayName: profile?.displayName,
                Bio: profile?.bio || ''
            });
        }, [profile, reset]);

  return (
    <Box component='form'
    onSubmit={handleSubmit(onSubmit)}
    display='flex'
    flexDirection='column'
    alignContent='center'
    gap={3}
    mt={3}
    >
    <TextInput label='Display Name' name='DisplayName' control={control}/>
    <TextInput 
        label='Add your bio'
        name='Bio'
        control={control}
        multiline
        rows={4}
    />
    <Button
    type='submit'
    onSubmit={handleSubmit(onSubmit)}
    variant='contained'
    disabled={!isValid || !isDirty || editProfile.isPending}
    >
        Update Profile
    </Button>
    </Box>
  );
}