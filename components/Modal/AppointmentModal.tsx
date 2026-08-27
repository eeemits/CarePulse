"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useState, type FunctionComponent } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { AppointmentForm } from "../forms";

interface AppointmentModalProps {
  type: "cancel" | "create" | "schedule";
  data: any;
  onPress?: () => void;
}
export const AppointmentModal: FunctionComponent<AppointmentModalProps> = ({
  type,
  data,
  onPress
}: AppointmentModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const { userId, patientId } = data;

  const handlePress = async () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={clsx("capitalize", {
            "text-green-black": type === "schedule"
          })}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>Please fill in the following details to {type} an appointment</DialogDescription>
        </DialogHeader>
        <AppointmentForm
          patientId={patientId}
          type={type}
          userId={userId}
          setOpen={setOpen}
          onPress={handlePress}
          appointment={data}
        />
      </DialogContent>
    </Dialog>
  );
};
