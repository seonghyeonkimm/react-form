import { ValidateModeType } from "FormConfigProvider";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ItemPathType, ValueType } from "./createFormService";
import useForm from "./useForm";
import useFormConfig from "./useFormConfig";

export type ItemRuleType = {
  required?: { value: boolean; message?: string };
  maxLength?: { value: number; message?: string };
  minLength?: { value: number; message?: string };
  max?: { value: number; message?: string };
  min?: { value: number; message?: string };
  pattern?: { value: RegExp; message?: string };
};

export type ValuePropNameType = "value" | "checked" | "files";

const useFormItem = (
  name: string | ItemPathType,
  options?: {
    rules?: ItemRuleType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (inputValue: ValueType) => void;
    validate?: (value: ValueType) => string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makeErrorProps?: (errors: string[]) => Record<string, any>;
    validateMode?: ValidateModeType;
    valuePropName?: ValuePropNameType;
  }
) => {
  const mountRef = useRef(false);
  const form = useForm();
  const { validateMessage, makeErrorProps, validateMode } = useFormConfig();
  const [errors, setErrors] = useState<string[]>([]);
  const [value, setValue] = useState<ValueType>(() =>
    form.getItemInitialValue(name) || options?.valuePropName === "checked"
      ? false
      : ""
  );
  const itemRef = useRef();
  const storeRef = useMemo(() => form.createOrGetItemRef(name), [form, name]);

  const handleItemValidate = useCallback(
    (inputValue: ValueType) => {
      const { required, maxLength, minLength, max, min, pattern } =
        options?.rules || {};

      // custom validation
      if (options?.validate) {
        const nextErrors = options.validate(inputValue);

        setErrors(nextErrors);

        return nextErrors.length === 0;
      }

      // built-in validation
      const nextErrors = [] as string[];

      if (!inputValue && required?.value) {
        const message = required?.message || validateMessage.required;
        !nextErrors.includes(message) && nextErrors.push(message);
      }

      if (
        typeof maxLength?.value === "number" &&
        typeof inputValue === "string" &&
        inputValue.length > maxLength.value
      ) {
        const message = maxLength?.message || validateMessage.maxLength;
        !nextErrors.includes(message) && nextErrors.push(message);
      }

      if (
        typeof minLength?.value === "number" &&
        typeof inputValue === "string" &&
        inputValue.length < minLength.value
      ) {
        const message = minLength?.message || validateMessage.minLength;
        !nextErrors.includes(message) && nextErrors.push(message);
      }

      if (
        typeof max?.value === "number" &&
        parseInt(inputValue?.toString() || "", 10) > max.value
      ) {
        const message = max?.message || validateMessage.max;
        !nextErrors.includes(message) && nextErrors.push(message);
      }

      if (
        typeof min?.value === "number" &&
        parseInt(inputValue?.toString() || "", 10) < min.value
      ) {
        const message = min?.message || validateMessage.min;
        !nextErrors.includes(message) && nextErrors.push(message);
      }

      if (
        pattern?.value instanceof RegExp &&
        typeof inputValue === "string" &&
        !pattern?.value.test(inputValue)
      ) {
        const message = pattern?.message || validateMessage.pattern;
        !nextErrors.includes(message) && nextErrors.push(message);
      }

      setErrors(nextErrors);

      return nextErrors.length === 0;
    },
    [
      options,
      validateMessage.max,
      validateMessage.maxLength,
      validateMessage.min,
      validateMessage.minLength,
      validateMessage.pattern,
      validateMessage.required,
    ]
  );

  const handleItemBlur = useCallback(() => {
    const itemValidateMode = options?.validateMode || validateMode;
    if (itemValidateMode !== "blur") return;
    handleItemValidate(value);
  }, [handleItemValidate, options?.validateMode, validateMode, value]);

  const handleItemChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target[options?.valuePropName || "value"];
      if (typeof inputValue === "undefined") return;

      setValue(inputValue);

      if (validateMode === "change") {
        handleItemValidate(inputValue);
      }
    },
    [handleItemValidate, options?.valuePropName, validateMode]
  );

  const handleCustomItemChange = useCallback(
    (inputValue) => {
      if (!options?.onChange) return;

      options.onChange(inputValue);

      if (validateMode === "change") {
        handleItemValidate(inputValue);
      }
    },
    [handleItemValidate, options, validateMode]
  );

  // register FormItem in FormService
  useImperativeHandle(storeRef, () => ({
    value,
    errors,
    setValue,
    setErrors,
    validate: handleItemValidate,
    valuePropName: options?.valuePropName || "value",
    instance: itemRef.current,
  }));

  // unregister FormItem in FormService
  useEffect(() => {
    return () => form.removeItemRef(name);
  }, [form, name]);

  useEffect(() => {
    mountRef.current = true;
  }, []);

  return {
    form,
    value,
    errors,
    errorProps: options?.makeErrorProps
      ? options.makeErrorProps(errors)
      : makeErrorProps(errors),
    setValue,
    setErrors,
    ref: itemRef,
    onBlur: handleItemBlur,
    onChange: options?.onChange ? handleCustomItemChange : handleItemChange,
  };
};

export default useFormItem;
