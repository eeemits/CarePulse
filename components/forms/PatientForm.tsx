"use client";
import { z } from "zod"; // use for validation NOTES:
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { useState, type FunctionComponent } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  TEXT_AREA = "textarea",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export const PatientForm: FunctionComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userFormValidation>) => {
    try {
      setLoading(true);

      const request = { ...values };

      const response = await createUser(request);
      if (response) {
        router.push(`patients/${response.$id}/register`);
      }
      setLoading(false);
      // if (!response) return console.log("error wtf?");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There! 🥰</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          placeholder="John Doe"
          label="Full name"
          icon="/assets/icons/user.svg"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          placeholder="JohnDoe@gmail.com"
          label="email"
          icon="/assets/icons/email.svg"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          placeholder="(555) 1234567"
          label="Phone number"
        />
        <SubmitButton isLoading={loading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
