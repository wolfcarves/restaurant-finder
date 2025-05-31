import { z } from 'zod';

export const searchFormSchema = z.object({
    keyword: z.string(),
});

export type SearchSchema = z.infer<typeof searchFormSchema>;
