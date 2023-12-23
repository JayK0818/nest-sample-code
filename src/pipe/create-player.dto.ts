import { z } from 'zod';

/* export class CreatePlayerDot {
  name: string
  age: number
  team: string
} */

export const createPlayerSchema = z
  .object({
    name: z.string(),
    age: z.coerce.number(),
    team: z.string(),
  })
  .required();

export type createPlayerDto = z.infer<typeof createPlayerSchema>;
