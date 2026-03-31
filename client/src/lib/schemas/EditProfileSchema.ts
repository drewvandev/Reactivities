import {z} from 'zod';
import { requiredString } from '../util/util';

export const editProfileSchema = z.object({
    DisplayName: requiredString('Display Name'),
    Bio: z.string().optional()
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>;