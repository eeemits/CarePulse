import React, { Fragment, type FunctionComponent, ReactNode } from "react";
import { E164Number } from "libphonenumber-js/core";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import type { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export interface CustomFormFieldProps {
  children?: ReactNode;
  control: Control<any>;
  dateFormat?: string;
  disabled?: boolean;
  fieldType: FormFieldType;
  icon?: string;
  label?: string;
  name: string;
  placeholder: string;
  showTimeSelect?: boolean;
  skeletonItem?: (field: any) => ReactNode;
}

const FieldItemComponent = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
  const { fieldType, icon: iconSrc, placeholder } = props;

  let children: ReactNode = <Fragment />;
  switch (fieldType) {
    case FormFieldType.CHECKBOX:
      children = <div></div>;
      break;
    case FormFieldType.INPUT:
      children = (
        <div className="flex rounded-md border border-green-500 bg-dark-400">
          {iconSrc !== undefined ? <Image src={iconSrc} height={24} width={24} alt={"icon"} className="ml-2" /> : null}
          <FormControl>
            <Input placeholder={placeholder} {...field} className="shad-input border-0" />
          </FormControl>
        </div>
      );
      break;
    case FormFieldType.PHONE_INPUT:
      children = (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
      break;
    case FormFieldType.SELECT:
      break;
    case FormFieldType.SKELETON:
      break;
    case FormFieldType.DATE_PICKER:
      break;
    case FormFieldType.TEXT_AREA:
      break;
  }
  return children;
};

export const CustomFormField: FunctionComponent<CustomFormFieldProps> = (props: CustomFormFieldProps) => {
  const { control, fieldType, label, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label !== undefined ? <FormLabel>{label}</FormLabel> : null}
          <FieldItemComponent field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
