import React, { Fragment, type FunctionComponent, ReactNode } from "react";
import { E164Number } from "libphonenumber-js/core";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import type { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { DATE_STANDARD_FORMAT } from "@/constants";
import { Textarea } from "./ui/textarea";

export interface CustomFormFieldProps {
  children?: ReactNode;
  control: Control<any>;
  dateFormat?: string;
  disabled?: boolean;
  fieldType: FormFieldType;
  icon?: string;
  label?: string;
  maxLength?: number;
  minDate?: Date;
  maxDate?: Date;
  name: string;
  placeholder: string;
  showTimeSelect?: boolean;
  skeletonItem?: (field: any) => ReactNode;
}

const FieldItemComponent = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
  const { fieldType, icon: iconSrc, placeholder, showTimeSelect, dateFormat, skeletonItem, disabled, maxLength, maxDate, minDate } = props;

  const { onChange, value } = field;

  let children: ReactNode = <Fragment />;
  switch (fieldType) {
    case FormFieldType.CHECKBOX:
      children = <div></div>;
      break;
    case FormFieldType.INPUT:
      children = (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
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
            value={value as E164Number | undefined}
            onChange={onChange}
            className="input-phone"
          />
        </FormControl>
      );
      break;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={onChange} value={value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return skeletonItem ? skeletonItem(field) : null;
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md-border border-dark-500 bg-dark-400">
          <Image src="/assets/icons/calendar.svg" width={24} height={24} alt="calendar" className="ml-2" />
          <FormControl>
            <DatePicker
              selected={value}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => field.onChange(date)}
              dateFormatCalendar={dateFormat ?? DATE_STANDARD_FORMAT}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              placeholderText={placeholder ?? DATE_STANDARD_FORMAT}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXT_AREA:
      return (
        <FormControl>
          <div className="flex-1 flex flex-col">
            <Textarea {...field} placeholder={placeholder} className="shad-textArea" disabled={disabled} maxLength={maxLength} />
          </div>
        </FormControl>
      );
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
          <div className="flex-row justify-between items-center">
            <FormMessage className="shad-error" />
            {props.maxLength !== undefined && (
              <div className="text-right text-10-semibold py-2  ">
                <span>{`${field?.value?.length ?? 0}/${props.maxLength}`}</span>
              </div>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};
