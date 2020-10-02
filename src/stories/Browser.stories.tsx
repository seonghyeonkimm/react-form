import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import type { ValueType } from "../createFormService";
import Form, { FormProps } from "../Form";
import FormConfigProvider from "../FormConfigProvider";
import FormItem from "../FormItem";

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
          <FormItem
            name="text"
            rules={{ required: { value: true }, pattern: { value: /^\w{3}$/ } }}
          >
            <Input label="Text" />
          </FormItem>
          <FormItem
            name="number"
            rules={{
              required: { value: true },
              min: { value: 3 },
              max: { value: 10 },
            }}
          >
            <Input type="number" label="Number" />
          </FormItem>
          <FormItem
            name="textarea"
            rules={{
              required: { value: true },
              minLength: { value: 2 },
              maxLength: { value: 5 },
            }}
          >
            <Input as="textarea" label="Textarea" />
          </FormItem>
          <FormItem
            name="checkbox"
            valuePropName="checked"
            rules={{ required: { value: true } }}
          >
            <Input type="checkbox" label="Checkbox" />
          </FormItem>
          <FormItem name="date" rules={{ required: { value: true } }}>
            <Input type="date" label="Date" />
          </FormItem>
          <FormItem
            name="file"
            valuePropName="files"
            rules={{ required: { value: true } }}
          >
            <Input type="file" label="File" />
          </FormItem>
          <FormItem name="select" rules={{ required: { value: true } }}>
            <Select label="Select" />
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
              <FormItem name={name} key={name}>
                <Input label={label} />
              </FormItem>
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

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    as?: keyof JSX.IntrinsicElements;
    helperText?: string;
    error?: boolean;
  } & JSX.IntrinsicElements["input"]
>(({ label, as = "input", helperText, error, ...inputProps }, ref) => {
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
      {React.createElement(as, {
        ref,
        ...inputProps,
      })}
      {error && (
        <div style={{ color: "red", marginTop: 4, whiteSpace: "pre-wrap" }}>
          {helperText}
        </div>
      )}
    </label>
  );
});
Input.displayName = "Input";

const Select = React.forwardRef<
  HTMLSelectElement,
  {
    label: string;
    helperText?: string;
    error?: boolean;
  } & JSX.IntrinsicElements["select"]
>(({ label, helperText, error, ...inputProps }, ref) => {
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
      <select ref={ref} {...inputProps}>
        <option value=""></option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
      {error && (
        <div style={{ color: "red", marginTop: 4, whiteSpace: "pre-line" }}>
          {helperText}
        </div>
      )}
    </label>
  );
});
Select.displayName = "Select";
