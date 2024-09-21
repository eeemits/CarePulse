import { RegisterForm } from "@/components/forms";
import { getUser } from "@/lib";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

const RegisterPage: FunctionComponent<SearchParamProps> = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO:  OTP verification modal / passkey */}
      <section className="remove-scrollbar w-full">
        <div className="sub-container px-[32px]">
          <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className="mb-12 h-10 w-fit" />
          <RegisterForm user={user} />
          {/* <div className="text-14-regular mt-20 flex justify-between ">
            <p className="justify-items-end text-dark-600 xl:text-left"> © 2024 CarePulse</p>
            <Link href={"/?admin=true"} className="text-blue-800">
              Admin
            </Link>
          </div> */}
        </div>
      </section>
      <Image src={"/assets/images/register-img.png"} height={1000} width={1000} alt="patient" className="side-img max-w-[390px]" />
    </div>
  );
};

export default RegisterPage;
