// schema.ts
import { z } from 'zod';

export const QuestionnaireSchema = z.object({
  age: z.string().min(1,"※入力必須項目です"),
  gender: z.string().min(1,"※入力必須項目です"),
  area: z.string().min(1,"※入力必須項目です"),
  meate: z.array(z.string()).min(1,"※1つ以上選択してください"),
  nowang: z.array(z.string()).min(1,"※1つ以上選択してください"),
  futureang: z.array(z.string()).min(1,"※1つ以上選択してください"),
  history:z.string().min(1,"※1つ以上選択してください"),

  hosi: z
  .coerce
  .number()
  .refine((v) => v >= 1 && v <= 5, {
    message: "※1つ以上選択してください",
  })
});


export type QuestionnaireInput = z.infer<typeof QuestionnaireSchema>;

export type FormErrors =
  Partial<Record<keyof z.infer<typeof QuestionnaireSchema>, string[]>>;

export const LocalDataSchema = z.object({
	time: z.number().int(),
	isSubmit: z.boolean(),
	yet: z.boolean(),
});