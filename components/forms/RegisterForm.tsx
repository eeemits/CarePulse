"use client";
import { z } from "zod"; // use for validation NOTES:
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { Fragment, useState, type FunctionComponent } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib";
import { FormFieldType } from "./PatientForm";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { DATE_STANDARD_FORMAT, Doctors, ENGLISH, GENDER_OPTIONS } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { FormGroup, type FormGroupProps } from "./FormGroup";
import moment from "moment";

const {
  GENDER,
  LABEL_FULL_NAME,
  DOB,
  ADDRESS,
  OCCUPATION,
  LABEL_PERSONAL_INFORMATION,
  LABEL_PHONE_NUMBER,
  PLACE_HOLDER,
  _LABEL_INSURANCE_PROVIDER,
  LABEL_MEDICAL_INFORMATION,
  LABEL_EMAIL,
  LABEL_PRIMARY_CARE_PHYSICIAN,
  LABEL_EMERGENCY_CONTACT,
  LABEL_ALLERGIES_IF_ANY,
  LABEL_CURRENT_MEDICATION,
  LABEL_FAMILY_MEDICAL_HISTORY,
  LABEL_PAST_MEDICAL_HISTORY,
  LABEL_BUTTON_ACTION,
} = ENGLISH;

const {
  PLACE_HOLDER_EMERGENCY_CONTACT,
  PLACE_HOLDER_ADDRESS,
  PLACE_HOLDER_OCCUPATION,
  PLACE_HOLDER_PHONE_NUMBER,
  PLACE_HOLDER_INSURANCE_PROVIDER,
  PLACE_HOLDER_ALLERGIES,
  PLACE_HOLDER_CURRENT_MEDICATION,
  PLACE_HOLDER_FAMILY_MEDICAL_HISTORY,
  PLACE_HOLDER_PAST_MEDICAL_HISTORY,
  PLACE_HOLDER_GENDER,
  PLACE_HOLDER_EMAIL,
} = PLACE_HOLDER;

const { LABEL_SUBMIT_CONTINUE } = LABEL_BUTTON_ACTION;

interface RegisterFormProps {
  user: User;
}
export const RegisterForm: FunctionComponent<RegisterFormProps> = ({ user }: RegisterFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const today = moment();
  const maxDate = today.clone().subtract(18, "years").toDate();
  const minDate = moment().subtract(50, "years").toDate();

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      currentMedication: "",
      familyMedication: "",
      insurance: "",
      occupation: "",
      //   gender:""
    },
  });

  const onSubmit = async (values: z.infer<typeof userFormValidation>) => {
    try {
      setLoading(true);

      const request = { ...values };

      const response = await createUser(request);
      if (!response) throw new Error("Not found");
      router.push(`patients/${response.$id}/register`);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const skeletonItem: FunctionComponent = (form: any) => {
    const { value, onChange } = form;
    return (
      <FormControl>
        <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={onChange} defaultValue={value}>
          {GENDER_OPTIONS.map((item, index) => (
            <div key={index} className="radio-group">
              <RadioGroupItem value={item} id={`${index}`} />
              <Label htmlFor={item} className="cursor-pointer">
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  const personalInformationProps: FormGroupProps = {
    title: LABEL_PERSONAL_INFORMATION,
    columns: [
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        name: "email",
        placeholder: PLACE_HOLDER_EMAIL,
        label: LABEL_EMAIL,
        icon: "/assets/icons/email.svg",
      },
      {
        control: form.control,
        fieldType: FormFieldType.PHONE_INPUT,
        name: "phone",
        placeholder: PLACE_HOLDER_PHONE_NUMBER,
        label: LABEL_PHONE_NUMBER,
        icon: "/assets/icons/email.svg",
      },
      {
        control: form.control,
        fieldType: FormFieldType.DATE_PICKER,
        name: "dateOfBirth",
        placeholder: DATE_STANDARD_FORMAT,
        label: DOB,
        minDate,
        maxDate,
        icon: "/assets/icons/calendar.svg",
      },
      {
        control: form.control,
        fieldType: FormFieldType.SKELETON,
        name: "gender",
        label: GENDER,
        placeholder: PLACE_HOLDER_GENDER,
        skeletonItem: (item) => skeletonItem(item),
        icon: "/assets/icons/user.svg",
      },
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        name: "address",
        label: ADDRESS,
        placeholder: PLACE_HOLDER_ADDRESS,
      },
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        name: "occupation",
        label: OCCUPATION,
        placeholder: PLACE_HOLDER_OCCUPATION,
      },
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        name: "emergency",
        label: LABEL_EMERGENCY_CONTACT,
        placeholder: PLACE_HOLDER_EMERGENCY_CONTACT,
      },
      {
        control: form.control,
        fieldType: FormFieldType.PHONE_INPUT,
        name: "phone",
        label: LABEL_PHONE_NUMBER,
        placeholder: PLACE_HOLDER_PHONE_NUMBER,
      },
    ],
  };

  const medicalInformationProps: FormGroupProps = {
    title: LABEL_MEDICAL_INFORMATION,
    columns: [
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        placeholder: PLACE_HOLDER_INSURANCE_PROVIDER,
        label: _LABEL_INSURANCE_PROVIDER,
        icon: "/assets/icons/user.svg",
        name: "insurance",
      },
      {
        control: form.control,
        fieldType: FormFieldType.PHONE_INPUT,
        name: "insurancePhoneNo",
        placeholder: LABEL_PHONE_NUMBER,
        label: LABEL_PHONE_NUMBER,
        icon: "/assets/icons/user.svg",
      },
      {
        control: form.control,
        fieldType: FormFieldType.TEXT_AREA,
        name: "allergies",
        maxLength: 50,
        label: LABEL_ALLERGIES_IF_ANY,
        placeholder: PLACE_HOLDER_ALLERGIES,
      },
      {
        control: form.control,
        fieldType: FormFieldType.TEXT_AREA,
        name: "currentMedication",
        label: LABEL_CURRENT_MEDICATION,
        maxLength: 50,
        placeholder: PLACE_HOLDER_CURRENT_MEDICATION,
      },
      {
        control: form.control,
        fieldType: FormFieldType.TEXT_AREA,
        name: "familyMedication",
        label: LABEL_FAMILY_MEDICAL_HISTORY,
        maxLength: 250,
        placeholder: PLACE_HOLDER_FAMILY_MEDICAL_HISTORY,
      },
      {
        control: form.control,
        fieldType: FormFieldType.TEXT_AREA,
        name: "pastMedicationHistory",
        label: LABEL_PAST_MEDICAL_HISTORY,
        maxLength: 250,
        placeholder: PLACE_HOLDER_PAST_MEDICAL_HISTORY,
      },
    ],
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 max-w-full">
        <section className=" space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <Fragment>
          <FormGroup title={personalInformationProps.title} columns={personalInformationProps.columns}>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="name"
              placeholder="John Doe"
              label={LABEL_FULL_NAME}
              icon="/assets/icons/user.svg"
            />
          </FormGroup>
        </Fragment>
        <Fragment>
          <FormGroup title={medicalInformationProps.title} columns={medicalInformationProps.columns}>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryCare"
              placeholder={PLACE_HOLDER_INSURANCE_PROVIDER}
              label={LABEL_PRIMARY_CARE_PHYSICIAN}
              icon="/assets/icons/user.svg"
            >
              {Doctors.map((doctor, index) => (
                <SelectItem key={index} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image src={doctor.image} width={32} height={32} alt="doctor" className="rounded-full border border-dark-500" />
                    <p className="text-md text-fuchsia-50">{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </FormGroup>
        </Fragment>
        <SubmitButton label={"PLEASE WAIT"} isLoading={loading}>
          {LABEL_SUBMIT_CONTINUE}
        </SubmitButton>
      </form>
    </Form>
  );
};
