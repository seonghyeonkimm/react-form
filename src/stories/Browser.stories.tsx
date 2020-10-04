import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import type { ValueType } from "../createFormService";
import Form, { FormProps } from "../Form";
import FormConfigProvider from "../FormConfigProvider";
import FormItem, { FormItemProps } from "../FormItem";
import useFormItem from "../useFormItem";

export default {
  title: "react-form/Browser",
  component: Form,
  subcomponents: { Form, FormItem, FormConfigProvider },
} as Meta;

const Exmaple1Template: Story<FormProps> = (args) => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const handleFormSubmit = (storeValues: Record<string, ValueType>) => {
    setValues(storeValues);
  };

  return (
    <FormConfigProvider validateMode="change">
      <Form {...args} onSubmit={handleFormSubmit}>
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <InputFormItem
            label="Text"
            name="text"
            rules={{ required: { value: true }, pattern: { value: /^\w{3}$/ } }}
          >
            <input />
          </InputFormItem>
          <InputFormItem
            label="Number"
            name="number"
            rules={{
              required: { value: true },
              min: { value: 3 },
              max: { value: 10 },
            }}
          >
            <input type="number" />
          </InputFormItem>
          <InputFormItem
            label="Textare"
            name="textarea"
            rules={{
              required: { value: true },
              minLength: { value: 2 },
              maxLength: { value: 5 },
            }}
          >
            <textarea />
          </InputFormItem>
          <InputFormItem
            label="Checkbox"
            name="checkbox"
            valuePropName="checked"
            rules={{ required: { value: true } }}
          >
            <input type="checkbox" />
          </InputFormItem>
          <InputFormItem
            label="Date"
            name="date"
            rules={{ required: { value: true } }}
          >
            <input type="date" />
          </InputFormItem>
          <InputFormItem
            label="File"
            name="file"
            valuePropName="files"
            rules={{ required: { value: true } }}
          >
            <input type="file" />
          </InputFormItem>
          <FormItem name="select" rules={{ required: { value: true } }}>
            {({ inputProps, errorProps }) => {
              return (
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 4,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ padding: 4 }}>Select</span>
                  <select {...inputProps}>
                    <option value=""></option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  {errorProps.error && (
                    <div style={{ color: "red", marginTop: 4 }}>
                      {errorProps.helperText}
                    </div>
                  )}
                </label>
              );
            }}
          </FormItem>
        </div>
        <div style={{ marginTop: 10 }}>
          <div style={{ marginRight: 10, display: "inline-block" }}>
            <button type="submit">Submit</button>
          </div>
          <button type="reset">Reset</button>
        </div>
        {values && (
          <div style={{ wordBreak: "break-all" }}>
            <div>Submitted value</div>
            <div>{JSON.stringify(values)}</div>
          </div>
        )}
      </Form>
    </FormConfigProvider>
  );
};

const Exmaple2Template: Story<FormProps> = (args) => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const handleFormSubmit = (storeValues: Record<string, ValueType>) => {
    setValues(storeValues);
  };

  return (
    <FormConfigProvider validateMode="change">
      <Form {...args} onSubmit={handleFormSubmit}>
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
          {Array.from({ length: 100 }).map((_, index) => {
            const seq = index + 1;
            const name = `text${seq}`;
            const label = `Text${seq}`;

            return (
              <InputFormItem label={label} name={name} key={name}>
                <input />
              </InputFormItem>
            );
          })}
        </div>
        <div style={{ marginTop: 10 }}>
          <div style={{ marginRight: 10, display: "inline-block" }}>
            <button type="submit">Submit</button>
          </div>
          <button type="reset">Reset</button>
        </div>
        {values && (
          <div style={{ wordBreak: "break-all" }}>
            <div>Submitted value</div>
            <div>{JSON.stringify(values)}</div>
          </div>
        )}
      </Form>
    </FormConfigProvider>
  );
};

export const Default = Exmaple1Template.bind({});
export const ManyInputs = Exmaple2Template.bind({});

const InputFormItem: React.FC<{ label: string } & FormItemProps> = ({
  label,
  children,
  ...props
}) => {
  const { errorProps, ref, onBlur, onChange, value } = useFormItem(props);
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (index > 0) return null;

    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ref,
        onBlur,
        onChange,
        [props.valuePropName || "value"]: value,
      });
    }

    return child;
  });

  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <span style={{ padding: 4 }}>{label}</span>
      {childrenWithProps}
      {errorProps.error && (
        <div style={{ color: "red", marginTop: 4 }}>
          {errorProps.helperText}
        </div>
      )}
    </label>
  );
};
InputFormItem.displayName = "InputFormItem";
