import z from "zod";

const createSpecialtySchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});
export type CreateSpecialtyType = z.infer<typeof createSpecialtySchema>;

export const SpecialtySchema = {
  createSpecialtySchema,
};
