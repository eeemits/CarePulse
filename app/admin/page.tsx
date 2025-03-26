"use client";

import { Loader } from "@/components/Loader";
import { StateCard } from "@/components/StateCard";
import { getRecentAppointment } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState, type FunctionComponent } from "react";
import { set } from "zod";

const AdminPage: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);

  let stat = useRef<StatsProps | null>(null);

  useEffect(() => {
    (async () => {
      const appointments: StatsProps = await getRecentAppointment();
      stat.current = appointments;
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link
          href="/"
          className="cursor-pointer"
        >
          <Image
            src="/assets/icons/logo-full.svg"
            width={136}
            height={32}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dasboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Start day with managing new appointments</p>
        </section>

        {loading ? (
          <Loader loading={loading} />
        ) : (
          <section className="admin-stat">
            <StateCard
              type="appointments"
              icon="/assets/icons/appointments.svg"
              label="Scheduled appointments"
              count={stat.current!.appointments}
            />
            <StateCard
              type="pending"
              icon="/assets/icons/pending.svg"
              label="Pending appointments"
              count={stat.current!.pending}
            />
            <StateCard
              type="cancelled"
              icon="/assets/icons/cancelled.svg"
              label="Cancelled appointments"
              count={stat.current!.cancelled}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
