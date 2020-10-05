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
          style={{
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormItem
            name="text"
            rules={{ required: { value: true }, pattern: { value: /^\w{3}$/ } }}
          >
            {({ inputProps, errorProps }) => {
              return (
                <FormControlLabel
                  label="Text"
                  error={errorProps.error}
                  helperText={errorProps.helperText}
                >
                  <input {...inputProps} />
                </FormControlLabel>
              );
            }}
          </FormItem>
          <FormItem
            name="number"
            rules={{
              required: { value: true },
              min: { value: 3 },
              max: { value: 10 },
            }}
          >
            {({ inputProps, errorProps }) => {
              return (
                <FormControlLabel
                  label="Number"
                  error={errorProps.error}
                  helperText={errorProps.helperText}
                >
                  <input {...inputProps} type="number" />
                </FormControlLabel>
              );
            }}
          </FormItem>
          <FormItem
            name="textarea"
            rules={{
              required: { value: true },
              minLength: { value: 2 },
              maxLength: { value: 5 },
            }}
          >
            {({ inputProps, errorProps }) => {
              return (
                <FormControlLabel
                  label="Textarea"
                  error={errorProps.error}
                  helperText={errorProps.helperText}
                >
                  <textarea {...inputProps} />
                </FormControlLabel>
              );
            }}
          </FormItem>
          <FormItem
            name="checkbox"
            valuePropName="checked"
            rules={{ required: { value: true } }}
          >
            {({ inputProps, errorProps }) => {
              return (
                <FormControlLabel
                  label="Checkbox"
                  error={errorProps.error}
                  helperText={errorProps.helperText}
                >
                  <input {...inputProps} type="checkbox" />
                </FormControlLabel>
              );
            }}
          </FormItem>
          <FormItem name="date" rules={{ required: { value: true } }}>
            {({ inputProps, errorProps }) => {
              return (
                <FormControlLabel
                  label="Date"
                  error={errorProps.error}
                  helperText={errorProps.helperText}
                >
                  <input {...inputProps} type="date" />
                </FormControlLabel>
              );
            }}
          </FormItem>
          <FormItem
            name="file"
            valuePropName="files"
            rules={{ required: { value: true } }}
          >
            {({ inputProps, errorProps }) => {
              return (
                <FormControlLabel
                  label="File"
                  error={errorProps.error}
                  helperText={errorProps.helperText}
                >
                  <input {...inputProps} type="file" />
                </FormControlLabel>
              );
            }}
          </FormItem>
          <FormItem name="select" rules={{ required: { value: true } }}>
            {({ inputProps, errorProps }) => {
              return (
                <FormControlLabel
                  label="Select"
                  error={errorProps.error}
                  helperText={errorProps.helperText}
                >
                  <select {...inputProps}>
                    <option value=""></option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </FormControlLabel>
              );
            }}
          </FormItem>
        </div>
        <FormButtonGroup values={values} />
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
                {({ inputProps, errorProps }) => {
                  return (
                    <FormControlLabel
                      label={label}
                      error={errorProps.error}
                      helperText={errorProps.helperText}
                    >
                      <input {...inputProps} />
                    </FormControlLabel>
                  );
                }}
              </FormItem>
            );
          })}
        </div>
        <FormButtonGroup values={values} />
      </Form>
    </FormConfigProvider>
  );
};

export const Default = Exmaple1Template.bind({});
export const ManyInputs = Exmaple2Template.bind({});

const FormControlLabel: React.FC<{
  label: string;
  error: boolean;
  helperText?: string;
}> = ({ label, error, helperText, children }) => {
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
      {children}
      {error && <div style={{ color: "red", marginTop: 4 }}>{helperText}</div>}
    </label>
  );
};

const FormButtonGroup: React.FC<{ values: any }> = ({ values }) => {
  return (
    <>
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
    </>
  );
};
