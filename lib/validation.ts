import { z, type ZodType } from "zod";

const defaultFieldSchema = (min?: number, max?: number) =>
  z
    .string()
    .min(min ?? 5, `Field must be at least ${min ?? "5"} characters`)
    .max(max ?? 20, `Field must be at most ${max ?? "20"} characters`);

const defaultDateSchema = z
  .object({
    startDate: z.coerce.date().refine((data) => data > new Date(), { message: "Start date must be in the future" }),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

export const userFormValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  address: defaultFieldSchema(1, 250),
  currentMedication: z.string().min(2, "Value must be at least 2 characters").max(50, "value must be at most 20 characters"),
  allergies: defaultFieldSchema(4, 20),
  familyMedication: defaultFieldSchema(10, 250),
  pastMedicationHistory: defaultFieldSchema(),
  insurance: defaultFieldSchema(5, 250),
  occupation: defaultFieldSchema(),
  primaryCare: defaultFieldSchema(),
  dateOfBirth: defaultDateSchema,
});
