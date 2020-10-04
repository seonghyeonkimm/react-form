import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import type { ValueType } from "../createFormService";
import Form, { FormProps } from "../Form";
import FormConfigProvider from "../FormConfigProvider";
import FormItem, { FormItemProps } from "../FormItem";
import useFormItem from "../useFormItem";

export default {
  title: "react-form/Material-UI",
  component: Form,
  subcomponents: { Form, FormItem, FormConfigProvider },
} as Meta;

const Exmaple1Template: Story<FormProps> = (args) => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const handleFormSubmit = (storeValues: Record<string, ValueType>) => {
    setValues(storeValues);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormConfigProvider validateMode="change">
        <Form {...args} onSubmit={handleFormSubmit}>
          <FormGroup style={{ maxWidth: 500 }}>
            <FormGroupItem>
              <FormLabel>Text</FormLabel>
              <FormItem
                name="Text"
                rules={{
                  minLength: { value: 3 },
                  maxLength: { value: 10 },
                  required: { value: true },
                }}
              >
                <TextField size="small" />
              </FormItem>
            </FormGroupItem>
            <FormGroupItem>
              <FormItem name="select" rules={{ required: { value: true } }}>
                <TextField select label="Select" size="small">
                  <MenuItem value="10">Ten</MenuItem>
                  <MenuItem value="20">Twenty</MenuItem>
                  <MenuItem value="30">Thirty</MenuItem>
                </TextField>
              </FormItem>
            </FormGroupItem>
            <FormGroupItem>
              <FormLabel>Checkbox</FormLabel>
              <InputFormItem
                label="checkbox"
                name="checkbox"
                valuePropName="checked"
                rules={{ required: { value: true } }}
              >
                <Checkbox size="small" />
              </InputFormItem>
            </FormGroupItem>
            <FormGroupItem>
              <FormLabel>Radio</FormLabel>
              <InputFormItem name="radio" rules={{ required: { value: true } }}>
                <RadioGroup>
                  <FormControlLabel
                    value="1"
                    label="option 1"
                    control={<Radio size="small" />}
                  />
                  <FormControlLabel
                    value="2"
                    label="option 2"
                    control={<Radio size="small" />}
                  />
                </RadioGroup>
              </InputFormItem>
            </FormGroupItem>
            <FormGroupItem>
              <FormLabel>Switch</FormLabel>
              <InputFormItem
                name="switch"
                label="Switch"
                valuePropName="checked"
                rules={{ required: { value: true } }}
              >
                <Switch size="small" />
              </InputFormItem>
            </FormGroupItem>
            <FormGroupItem>
              <DatePickerFormItem name="date" />
            </FormGroupItem>
          </FormGroup>
          <Box mt={1}>
            <Box mr={0.5} display="inline-block">
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Box>
            <Button type="reset" color="default" variant="contained">
              Reset
            </Button>
          </Box>
          {values && (
            <Box mt={2} style={{ wordBreak: "break-all" }}>
              <Typography variant="body1">Submitted value</Typography>
              <Typography variant="body2">{JSON.stringify(values)}</Typography>
            </Box>
          )}
        </Form>
      </FormConfigProvider>
    </MuiPickersUtilsProvider>
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
                <TextField size="small" placeholder={label} />
              </FormItem>
            );
          })}
        </div>
        <Box mt={1}>
          <Box mr={0.5} display="inline-block">
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </Box>
          <Button type="reset" color="default" variant="contained">
            Reset
          </Button>
        </Box>
        {values && (
          <Box mt={2} style={{ wordBreak: "break-all" }}>
            <Typography variant="body1">Submitted value</Typography>
            <Typography variant="body2">{JSON.stringify(values)}</Typography>
          </Box>
        )}
      </Form>
    </FormConfigProvider>
  );
};

export const Default = Exmaple1Template.bind({});
export const ManyInputs = Exmaple2Template.bind({});

const FormGroupItem: React.FC = ({ children }) => {
  return (
    <Box mb={2} display="flex" flexDirection="column">
      {children}
    </Box>
  );
};

const InputFormItem: React.FC<
  {
    label?: string;
  } & FormItemProps
> = ({ name, label, valuePropName = "value", children, ...props }) => {
  const { errorProps, ref, onBlur, onChange, value } = useFormItem({
    name,
    valuePropName,
    ...props,
  });

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (index > 0) return null;

    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ref,
        onBlur,
        onChange,
        [valuePropName]: value,
      });
    }

    return child;
  });

  return (
    <FormControl error={errorProps.error}>
      {label ? (
        <FormControlLabel label={label} control={<>{childrenWithProps}</>} />
      ) : (
        childrenWithProps
      )}
      <FormHelperText>{errorProps.helperText}</FormHelperText>
    </FormControl>
  );
};
InputFormItem.displayName = "InputFormItem";

const DatePickerFormItem: React.FC<{ name: string }> = ({ name }) => {
  const { value, ref, onBlur, setValue, errorProps, setErrors } = useFormItem<
    ParsableDate
  >({
    name,
    defaultValue: null,
    rules: {
      required: { value: true },
    },
  });

  const handleChange = (date: MaterialUiPickersDate) => {
    if (!date) {
      setErrors((prev) => [...prev, "This field is required"]);
    }

    setValue(date);
    if (errorProps.error) setErrors([]);
  };

  return (
    <DatePicker
      {...errorProps}
      inputRef={ref}
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
    />
  );
};
