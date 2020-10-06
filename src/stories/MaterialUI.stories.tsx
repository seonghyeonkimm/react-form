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
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import type { ValueType } from "../createFormService";
import Form, { FormProps } from "../Form";
import FormConfigProvider from "../FormConfigProvider";
import FormItem from "../FormItem";

export default {
  title: "react-form/Material-UI",
  component: Form,
  subcomponents: { Form, FormItem, FormConfigProvider },
} as Meta;

const DefaultTemplate: Story<FormProps> = (args) => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const handleFormSubmit = (storeValues: Record<string, ValueType>) => {
    setValues(storeValues);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormConfigProvider validateMode="change">
        <Form {...args} onSubmit={handleFormSubmit}>
          <FormGroup style={{ maxWidth: 500 }}>
            <Box my={2}>
              <FormLabel component="div">Text</FormLabel>
              <FormItem
                name="Text"
                rules={{
                  minLength: { value: 3 },
                  maxLength: { value: 10 },
                  required: { value: true },
                }}
              >
                <TextField size="small" fullWidth />
              </FormItem>
            </Box>
            <Box my={2}>
              <FormLabel component="div">Select</FormLabel>
              <FormItem name="select" rules={{ required: { value: true } }}>
                <TextField select label="Age" size="small" fullWidth>
                  <MenuItem value="10">Ten</MenuItem>
                  <MenuItem value="20">Twenty</MenuItem>
                  <MenuItem value="30">Thirty</MenuItem>
                </TextField>
              </FormItem>
            </Box>
            <Box my={2}>
              <FormLabel component="div">Checkbox</FormLabel>
              <FormItem
                name="checkbox"
                valuePropName="checked"
                rules={{ required: { value: true } }}
              >
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
            </Box>
            <Box my={2}>
              <FormLabel component="div">Radio</FormLabel>
              <FormItem name="radio" rules={{ required: { value: true } }}>
                {({ inputProps, errorProps }) => {
                  return (
                    <FormControl error={errorProps.error}>
                      <RadioGroup {...inputProps}>
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
                      <FormHelperText>{errorProps.helperText}</FormHelperText>
                    </FormControl>
                  );
                }}
              </FormItem>
            </Box>
            <Box my={2}>
              <FormLabel component="div">Switch</FormLabel>
              <FormItem
                name="switch"
                valuePropName="checked"
                rules={{ required: { value: true } }}
              >
                {({ inputProps, errorProps }) => {
                  return (
                    <FormControl error={errorProps.error}>
                      <FormControlLabel
                        label="Switch"
                        control={<Switch {...inputProps} size="small" />}
                      />
                      <FormHelperText>{errorProps.helperText}</FormHelperText>
                    </FormControl>
                  );
                }}
              </FormItem>
            </Box>
            <Box my={2}>
              <FormLabel component="div">DatePicker</FormLabel>
              <FormItem
                name="date"
                defaultValue={null}
                rules={{ required: { value: true } }}
              >
                {({ inputProps, errorProps, formProps }) => {
                  const { setValue, setErrors } = formProps;
                  const {
                    value,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onChange,
                    ref,
                    ...resetInputProps
                  } = inputProps;

                  const handleChange = (date: MaterialUiPickersDate) => {
                    if (!date) {
                      setErrors((prev) => [...prev, "This field is required"]);
                    }

                    setValue(date);
                    if (errorProps.error) setErrors([]);
                  };

                  return (
                    <DatePicker
                      clearable
                      inputRef={ref}
                      placeholder="Select date"
                      value={value || null}
                      onChange={handleChange}
                      {...errorProps}
                      {...resetInputProps}
                    />
                  );
                }}
              </FormItem>
            </Box>
          </FormGroup>
          <FormButtonGroup values={values} />
        </Form>
      </FormConfigProvider>
    </MuiPickersUtilsProvider>
  );
};

const ManyInputsTemplate: Story<FormProps> = (args) => {
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
        <FormButtonGroup values={values} />
      </Form>
    </FormConfigProvider>
  );
};

export const Default = DefaultTemplate.bind({});
export const ManyInputs = ManyInputsTemplate.bind({});

const FormButtonGroup: React.FC<{ values: any }> = ({ values }) => {
  return (
    <>
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
    </>
  );
};
