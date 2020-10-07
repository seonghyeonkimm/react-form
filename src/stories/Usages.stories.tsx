import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import type { ValueType } from "../createFormService";
import Form from "../Form";
import FormConfigProvider from "../FormConfigProvider";
import FormItem, { FormItemProps } from "../FormItem";
import useFormItem from "../useFormItem";
import useWatch from "../useWatch";

export default {
  title: "react-form/Usages",
  component: Form,
  subcomponents: { Form, FormItem, FormConfigProvider },
} as Meta;

const FormItemTemplate: Story<FormItemProps> = (args) => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const handleFormFinish = (values: Record<string, ValueType>) => {
    setValues(values);
  };

  return (
    <FormConfigProvider validateMode="change">
      <Form onSubmit={handleFormFinish}>
        <FormLabel component="div">FormItem HOC</FormLabel>
        <FormItem {...args}>
          <TextField size="small" fullWidth />
        </FormItem>
        <FormButtonGroup values={values} />
      </Form>
    </FormConfigProvider>
  );
};

export const HOC = FormItemTemplate.bind({});
HOC.args = {
  name: "text",
  rules: {
    required: { value: true },
  },
};

const FormItemRenderPropsTemplate: Story<FormItemProps> = (args) => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const handleFormFinish = (values: Record<string, ValueType>) => {
    setValues(values);
  };

  return (
    <FormConfigProvider validateMode="change">
      <Form onSubmit={handleFormFinish}>
        <FormLabel component="div">FormItem RenderProps</FormLabel>
        <FormItem {...args}>
          {({ inputProps, errorProps }) => {
            return (
              <FormControl error={errorProps.error}>
                <FormControlLabel
                  label="checkbox"
                  control={<Checkbox {...inputProps} size="small" />}
                />
                <FormHelperText>{errorProps.helperText}</FormHelperText>
              </FormControl>
            );
          }}
        </FormItem>
        <FormButtonGroup values={values} />
      </Form>
    </FormConfigProvider>
  );
};

export const RenderProps = FormItemRenderPropsTemplate.bind({});
RenderProps.args = {
  name: "checkbox",
  valuePropName: "checked",
  rules: {
    required: { value: true },
  },
};

type HookParameters = Parameters<typeof useFormItem>[0];

const DatePickerFormItem: React.FC<HookParameters> = (args) => {
  const { value, errorProps, setValue, setErrors, ref } = useFormItem<
    ParsableDate
  >(args);

  const handleChange = (date: MaterialUiPickersDate) => {
    if (!date) {
      setErrors((prev) => [...prev, "This field is required"]);
    }

    setValue(date);
    if (errorProps.error) setErrors([]);
  };

  return (
    <DatePicker
      inputRef={ref}
      placeholder="Select date"
      value={value}
      onChange={handleChange}
      {...errorProps}
    />
  );
};

const HookTemplate: Story<HookParameters> = (args) => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const handleFormFinish = (values: Record<string, ValueType>) => {
    setValues(values);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormConfigProvider validateMode="change">
        <Form onSubmit={handleFormFinish}>
          <FormLabel component="div">useFormItem hook</FormLabel>
          <DatePickerFormItem {...args} />
          <FormButtonGroup values={values} />
        </Form>
      </FormConfigProvider>
    </MuiPickersUtilsProvider>
  );
};

export const Hook = HookTemplate.bind({});
Hook.args = {
  name: "date",
  defaultValue: null,
  rules: { required: { value: true } },
};

const WatchedComponent: React.FC<HookParameters> = (args) => {
  const text = useWatch(args.name);

  return <>Watched value: {text}</>;
};

const WatchTemplate: Story<HookParameters> = (args) => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const handleFormFinish = (values: Record<string, ValueType>) => {
    setValues(values);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormConfigProvider validateMode="change">
        <Form onSubmit={handleFormFinish}>
          <FormLabel component="div">useWatch hook</FormLabel>
          <FormItem {...args}>
            <TextField />
          </FormItem>
          <WatchedComponent {...args} />
          <FormButtonGroup values={values} />
        </Form>
      </FormConfigProvider>
    </MuiPickersUtilsProvider>
  );
};

export const Watch = WatchTemplate.bind({});
Watch.args = {
  name: "text",
};

const FormButtonGroup: React.FC<{ values: any }> = ({ values }) => {
  return (
    <Box my={2}>
      <Box mr={1} display="inline-block">
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </Box>
      <Button type="reset" variant="contained">
        reset
      </Button>
      {values && (
        <Box mt={2} style={{ wordBreak: "break-all" }}>
          <Typography variant="body1">Submitted value</Typography>
          <Typography variant="body2">{JSON.stringify(values)}</Typography>
        </Box>
      )}
    </Box>
  );
};
