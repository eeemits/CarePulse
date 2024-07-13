import React, { Fragment, type FunctionComponent } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface SubmitButtonProps {
  isLoading: boolean | undefined;
  className?: string;
  children: React.ReactNode;
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  isLoading,
  children,
  className,
}: SubmitButtonProps) => {
  return (
    <Fragment>
      <Button type="submit" disabled={isLoading} className={className ?? "shad-primary-btn w-full"}>
        {isLoading ? (
          <div className="flex items-center gap-4">
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
