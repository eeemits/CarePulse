import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge: FunctionComponent<StatusBadgeProps> = ({ status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-100": status === "scheduled",
        "bg-red-500": status === "cancelled",
        "bg-sky-600": status === "pending"
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="status"
        height={24}
        width={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-red-500": status === "cancelled",
          "text-sky-300": status === "pending"
        })}
      >
        {status}
      </p>
    </div>
  );
};
