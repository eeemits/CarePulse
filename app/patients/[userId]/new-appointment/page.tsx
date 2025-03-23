"use client";

import React, { useEffect, useRef, type FunctionComponent } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { AppointmentForm } from "@/components/forms";
import { getPatients } from "@/lib";

const NewAppointmentPage: FunctionComponent<SearchParamProps> = ({ params: { userId } }: SearchParamProps) => {
  const patients = useRef<any>(null);
  useEffect(() => {
    const fetchPatient = async () => {
      patients.current = await getPatients(userId);
    };
    fetchPatient();
    return () => {};
  }, [userId]);

  return (
    <Fragment>
      <div className="flex h-screen max-h-screen">
        {/* TODO:  OTP verification modal / passkey */}
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[860px] flex-1 justify-between">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />
            <AppointmentForm
              type="create"
              userId={userId}
              patientId={patients.current?.$id}
            />
            <p className="copyright mt-10 py-12"> © 2024 CarePulse</p>
          </div>
        </section>
        <Image
          src={"/assets/images/appointment-img.png"}
          height={1000}
          width={1000}
          alt="appointment"
          className="side-img max-w-[390px] bg-bottom"
        />
      </div>
    </Fragment>
  );
};

export default NewAppointmentPage;
