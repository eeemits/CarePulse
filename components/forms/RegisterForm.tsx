"use client";
import { z } from "zod"; // use for validation NOTES:
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { Fragment, useState, type FunctionComponent } from "react";
import { patientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

import { FormFieldType } from "./PatientForm";
import { DATE_STANDARD_FORMAT, Doctors, ENGLISH, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { FormGroup, type FormGroupProps } from "./FormGroup";
import moment from "moment";
import { FileUpload, RadioGroupComponent } from "../skeletons";
import { registerPatient } from "@/lib";

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
  LABEL_IDENTIFICATION_INFORMATION,
  LABEL_MEDICAL_INFORMATION,
  LABEL_CONSENT_PRIVACY_INFORMATION,
  LABEL_EMAIL,
  LABEL_PRIMARY_CARE_PHYSICIAN,
  LABEL_EMERGENCY_CONTACT,
  LABEL_ALLERGIES_IF_ANY,
  LABEL_CURRENT_MEDICATION,
  LABEL_FAMILY_MEDICAL_HISTORY,
  LABEL_PAST_MEDICAL_HISTORY,
  LABEL_BUTTON_ACTION,
  LABEL_IDENTIFICATION_TYPE,
  LABEL_EMERGENCY_PHONE
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
  PLACE_HOLDER_IDENTIFICATION_NUMBER,
  PLACE_HOLDER_EMAIL,
  PLACE_HOLDER_IDENTIFICATION_TYPE
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

  const form = useForm<z.infer<typeof patientFormValidation>>({
    resolver: zodResolver(patientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof patientFormValidation>) => {
    let formData = new FormData();

    console.log("values", values);
    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type
      });

      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      setLoading(true);
      const request = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData // <-- important
      };

      // @ts-ignore
      const response = await registerPatient(request);

      if (response) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
        icon: "/assets/icons/email.svg"
      },
      {
        control: form.control,
        fieldType: FormFieldType.PHONE_INPUT,
        name: "phone",
        placeholder: PLACE_HOLDER_PHONE_NUMBER,
        label: LABEL_PHONE_NUMBER,
        icon: "/assets/icons/email.svg"
      },
      {
        control: form.control,
        fieldType: FormFieldType.DATE_PICKER,
        name: "birthDate",
        placeholder: DATE_STANDARD_FORMAT,
        label: DOB,
        minDate,
        maxDate,
        icon: "/assets/icons/calendar.svg"
      },
      {
        control: form.control,
        fieldType: FormFieldType.SKELETON,
        name: "gender",
        label: GENDER,
        placeholder: PLACE_HOLDER_GENDER,
        skeletonItem: (item) => RadioGroupComponent(item),
        icon: "/assets/icons/user.svg"
      },
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        name: "address",
        label: ADDRESS,
        placeholder: PLACE_HOLDER_ADDRESS
      },
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        name: "occupation",
        label: OCCUPATION,
        placeholder: PLACE_HOLDER_OCCUPATION
      },
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        name: "emergencyContactName",
        label: LABEL_EMERGENCY_CONTACT,
        placeholder: PLACE_HOLDER_EMERGENCY_CONTACT
      },
      {
        control: form.control,
        fieldType: FormFieldType.PHONE_INPUT,
        name: "emergencyContactNumber",
        label: LABEL_PHONE_NUMBER,
        placeholder: LABEL_EMERGENCY_PHONE
      }
    ]
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
        name: "insuranceProvider"
      },
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        name: "insurancePolicyNumber",
        placeholder: "ABC01818318",
        label: "Insurance Policy Number"
      },
      {
        control: form.control,
        fieldType: FormFieldType.TEXT_AREA,
        name: "allergies",
        maxLength: 50,
        label: LABEL_ALLERGIES_IF_ANY,
        placeholder: PLACE_HOLDER_ALLERGIES
      },
      {
        control: form.control,
        fieldType: FormFieldType.TEXT_AREA,
        name: "currentMedication",
        label: LABEL_CURRENT_MEDICATION,
        maxLength: 50,
        placeholder: PLACE_HOLDER_CURRENT_MEDICATION
      },
      {
        control: form.control,
        fieldType: FormFieldType.TEXT_AREA,
        name: "familyMedication",
        label: LABEL_FAMILY_MEDICAL_HISTORY,
        maxLength: 250,
        placeholder: PLACE_HOLDER_FAMILY_MEDICAL_HISTORY
      },
      {
        control: form.control,
        fieldType: FormFieldType.TEXT_AREA,
        name: "pastMedicationHistory",
        label: LABEL_PAST_MEDICAL_HISTORY,
        maxLength: 250,
        placeholder: PLACE_HOLDER_PAST_MEDICAL_HISTORY
      }
    ]
  };

  const identificationInformationProps: FormGroupProps = {
    title: LABEL_IDENTIFICATION_INFORMATION,
    columns: [
      {
        control: form.control,
        fieldType: FormFieldType.INPUT,
        placeholder: PLACE_HOLDER_IDENTIFICATION_NUMBER,
        label: "Identification Number",
        icon: "/assets/icons/user.svg",
        name: "identificationNumber"
      },
      {
        control: form.control,
        fieldType: FormFieldType.SKELETON,
        name: "identificationDocument",
        label: "Scanned copy of identification documents",
        placeholder: "Please upload a file",
        skeletonItem: (item) => FileUpload(item),
        icon: "/assets/icons/user.svg"
      }
    ]
  };

  const consentInformationProps: FormGroupProps = {
    title: LABEL_CONSENT_PRIVACY_INFORMATION,
    columns: [
      {
        control: form.control,
        fieldType: FormFieldType.CHECKBOX,
        placeholder: PLACE_HOLDER_IDENTIFICATION_NUMBER,
        label: "I consent to treatment",
        name: "treatmentConsent"
      },
      {
        control: form.control,
        fieldType: FormFieldType.CHECKBOX,
        placeholder: PLACE_HOLDER_IDENTIFICATION_NUMBER,
        label: "I consent to disclosure of information",
        name: "disclosureConsent"
      },
      {
        control: form.control,
        fieldType: FormFieldType.CHECKBOX,
        placeholder: PLACE_HOLDER_IDENTIFICATION_NUMBER,
        label: "I consent to privacy information",
        name: "privacyConsent"
      }
    ]
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}
        className="space-y-12 flex-1 max-w-full"
      >
        <section className=" space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <Fragment>
          <FormGroup
            title={personalInformationProps.title}
            columns={personalInformationProps.columns}
          >
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
          <FormGroup
            title={medicalInformationProps.title}
            columns={medicalInformationProps.columns}
          >
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              placeholder={PLACE_HOLDER_INSURANCE_PROVIDER}
              label={LABEL_PRIMARY_CARE_PHYSICIAN}
              icon="/assets/icons/user.svg"
            >
              {Doctors.map((doctor, index) => (
                <SelectItem
                  key={index}
                  value={doctor.name}
                >
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p className="text-md text-fuchsia-50">{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </FormGroup>
        </Fragment>
        <Fragment>
          <FormGroup
            title={identificationInformationProps.title}
            columns={identificationInformationProps.columns}
            isRowLayout={true}
          >
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="identificationType"
              placeholder={PLACE_HOLDER_IDENTIFICATION_TYPE}
              label={LABEL_IDENTIFICATION_TYPE}
              icon="/assets/icons/user.svg"
            >
              {IdentificationTypes.map((type, index) => (
                <SelectItem
                  key={index}
                  value={type}
                >
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>
          </FormGroup>
        </Fragment>
        <Fragment>
          <FormGroup
            title={consentInformationProps.title}
            columns={consentInformationProps.columns}
            isRowLayout={true}
          />
        </Fragment>
        <SubmitButton
          label={"PLEASE WAIT"}
          isLoading={loading}
        >
          {LABEL_SUBMIT_CONTINUE}
        </SubmitButton>
      </form>
    </Form>
  );
};
