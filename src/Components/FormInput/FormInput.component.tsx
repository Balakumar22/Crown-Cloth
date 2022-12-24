import { FC, InputHTMLAttributes } from "react";
import { Group, FormInputLabel, Input } from "./FormInput.styles";

type FormInputProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherprops }) => {
  return (
    <Group>
      <Input {...otherprops} />
      {label && (
        <FormInputLabel shrink={Boolean(otherprops && typeof otherprops.value==='string' && otherprops.value.length)}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
