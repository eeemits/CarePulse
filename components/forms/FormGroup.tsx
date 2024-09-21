"use client";
import React, { Fragment, type FunctionComponent, type ReactNode } from "react";
import { CustomFormField, type CustomFormFieldProps } from "../CustomFormField";

export interface FormGroupProps {
  title: string;
  columns: CustomFormFieldProps[];
}

export const FormGroup: FunctionComponent<FormGroupProps & { children?: ReactNode }> = ({ title, children, columns }) => {
  children = children ? children : <div></div>;

  return (
    <Fragment>
      <section className=" space-y-4">
        <div className="mb-9 space-y-1">
          <h2 className="sub-header">{title}</h2>
        </div>
      </section>
      {children && <Fragment>{children}</Fragment>}
      <div className="flex-1 flex flex-col gap-4 sm:grid sm:grid-cols-2">
        {columns.map((column, index) => (
          <CustomFormField
            key={index} // Adding the key prop
            control={column.control}
            fieldType={column.fieldType}
            name={column.name}
            maxLength={column.maxLength}
            placeholder={column.placeholder}
            label={column.label}
            skeletonItem={(field) => column.skeletonItem!(field) ?? undefined}
            icon={column.icon}
          />
        ))}
      </div>
    </Fragment>
  );
};
