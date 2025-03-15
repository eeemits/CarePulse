import { GENDER_OPTIONS } from "@/constants";
import { Label } from "@radix-ui/react-label";
import type { FunctionComponent } from "react";
import { FormControl } from "../ui/form";
import { FileUploader } from "../FileUploader";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const RadioGroupComponent: FunctionComponent = (form: any) => {
  const { value, onChange } = form;
  return (
    <FormControl>
      <RadioGroup
        className="flex h-11 gap-6 xl:justify-between"
        onValueChange={onChange}
        defaultValue={value}
      >
        {GENDER_OPTIONS.map((item, index) => (
          <div
            key={index}
            className="radio-group"
          >
            <RadioGroupItem
              value={item}
              id={`${index}`}
            />
            <Label
              htmlFor={item}
              className="cursor-pointer"
            >
              {item}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export const FileUpload: FunctionComponent = (form: any) => {
  const { value, onChange } = form;
  return (
    <FormControl>
      <FileUploader
        {...form}
        files={value}
        onChange={onChange}
      />
    </FormControl>
  );
};
