import React, { Fragment, type FunctionComponent } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  isLoading: boolean | undefined;
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ isLoading, children, className, label }: SubmitButtonProps) => {
  return (
    <Fragment>
      <Button type="submit" disabled={isLoading} className={className ?? "shad-primary-btn w-full"}>
        {isLoading ? (
          <div className="flex items-center gap-4">
            {label ? <span className="shad-input-label">{label}</span> : null}
            <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="animate-spin" />
            Loading...
          </div>
        ) : (
          children
        )}
      </Button>
    </Fragment>
  );
};
