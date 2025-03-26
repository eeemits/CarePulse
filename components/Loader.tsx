import React, { Fragment, type FunctionComponent } from "react";

interface LoaderProps {
  loading: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({ loading }: LoaderProps) => {
  return (
    <Fragment>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : null}
    </Fragment>
  );
};
