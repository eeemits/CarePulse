import clsx from "clsx";
import { Fragment, type FunctionComponent } from "react";

interface LoaderProps {
  loading: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
}

export const Loader: FunctionComponent<LoaderProps> = ({ loading, size = "md", color = "primary" }: LoaderProps) => {
  return (
    <Fragment>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <div
            className={clsx(
              "animate-spin rounded-full",
              {
                "h-8 w-8": size === "sm",
                "h-12 w-12": size === "md",
                "h-16 w-16": size === "lg"
              },
              {
                "border-t-2 border-b-2 border-primary": color === "primary",
                "border-t-2 border-b-2 border-secondary": color === "secondary"
              }
            )}
          />
        </div>
      ) : null}
    </Fragment>
  );
};
