"use client";
import { z } from "zod"; // use for validation NOTES:
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { Fragment, useState, type FunctionComponent } from "react";
import { createAppointment, getAppointmentSchema } from "@/lib";
import { useRouter } from "next/navigation";
import { DATE_STANDARD_FORMAT, Doctors, ENGLISH } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { FormFieldType } from ".";

const { LABEL_REASON_OF_APPOINTMENT, LABEL_DOCTOR, PLACE_HOLDER } = ENGLISH;
const { PLACE_HOLDER_CHOOSE_DOCTOR, PLACE_HOLDER_REASON_OF_APPOINTMENT } = PLACE_HOLDER;

export interface AppointmentFormProps {
  patientId: string;
  type: "create" | "cancel" | "schedule";
  userId: string;
}

export const AppointmentForm: FunctionComponent<AppointmentFormProps> = ({ patientId, type, userId }: AppointmentFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const appointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof appointmentFormValidation>>({
    resolver: zodResolver(appointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      note: "",
      schedule: new Date(),
      reason: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof appointmentFormValidation>) => {
    console.log("values", values);
    try {
      let status: Status = "pending";

      switch (type) {
        case "cancel":
          status = "cancelled";
          break;

        case "schedule":
          status = "scheduled";
          break;
        default:
          status = "pending";
          break;
      }

      setLoading(true);

      const request = {
        userId,
        patient: patientId,
        primaryPhysician: values.primaryPhysician,
        reason: values.reason!,
        note: values.note,
        schedule: new Date(values.schedule),
        status
      };

      const response = await createAppointment(request);

      if (response) {
        form.reset();
        router.push(`/patients/${userId}/new-appointment/success?appointmentId=${response.$id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;

    case "create":
      buttonLabel = "Create Apppointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1"
      >
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Hey There! 🧬</h1>
            <p className="sub-label">Request a new appointment in 10 seconds</p>
          </section>
        )}

        {type !== "cancel" && (
          <Fragment>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              placeholder={PLACE_HOLDER_CHOOSE_DOCTOR}
              label={LABEL_DOCTOR}
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

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name={"schedule"}
              showTimeSelect
              placeholder={DATE_STANDARD_FORMAT}
              label={"Expected appointment date"}
              dateFormat="MM/dd/yyyy h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXT_AREA}
                name={"reason"}
                maxLength={250}
                placeholder={PLACE_HOLDER_REASON_OF_APPOINTMENT}
                label={LABEL_REASON_OF_APPOINTMENT}
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXT_AREA}
                name={"note"}
                maxLength={250}
                placeholder={"Enter notes"}
                label={"Notes"}
              />
            </div>
          </Fragment>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXT_AREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={loading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
