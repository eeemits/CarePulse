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
import { ENGLISH } from "@/constants";

const { LABEL_FULL_NAME, LABEL_PHONE_NUMBER, PLACE_HOLDER } = ENGLISH;
const { PLACE_HOLDER_PHONE_NUMBER } = PLACE_HOLDER;

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  TEXT_AREA = "textarea",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETON = "skeleton"
}

export const PatientForm: FunctionComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof userFormValidation>) => {
    try {
      const request = { ...values };
      setLoading(true);
      const response = await createUser(request);

      if (response) {
        router.push(`patients/${response.$id}/register`);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There! 🥰</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          placeholder="John Doe"
          label={LABEL_FULL_NAME}
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
          placeholder={PLACE_HOLDER_PHONE_NUMBER}
          label={LABEL_PHONE_NUMBER}
        />
        <SubmitButton isLoading={loading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
