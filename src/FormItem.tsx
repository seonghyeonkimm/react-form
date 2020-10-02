import React, { useMemo } from "react";

import type { ItemPathType, ValueType } from "./createFormService";
import useFormItem, { ItemRuleType, ValuePropNameType } from "./useFormItem";

export interface FormItemProps {
  name: string | ItemPathType;
  valuePropName?: ValuePropNameType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  makeErrorProps?: (errors: string[]) => Record<string, any>;
  rules?: ItemRuleType;
  validate?: (value: ValueType) => string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (...args: any[]) => void;
}

const FormItem: React.FC<FormItemProps> = ({
  name,
  rules,
  children,
  onChange,
  validate,
  valuePropName = "value",
  makeErrorProps,
}) => {
  const options = useMemo(
    () => ({ rules, validate, valuePropName, makeErrorProps, onChange }),
    [rules, validate, valuePropName, makeErrorProps, onChange]
  );
  const {
    value,
    errorProps,
    ref,
    onChange: onItemChange,
    onBlur,
  } = useFormItem(name, options);

  if (React.Children.count(children) > 1) {
    console.warn(
      "[REACT-FORM Wanring] FormItem accepts only one child. other children will be dropped"
    );
  }

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (index > 0) return null;

    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ref,
        onBlur,
        onChange: onItemChange,
        [valuePropName]: value,
        ...errorProps,
      });
    }

    return child;
  });

  return <>{childrenWithProps}</>;
};

export default FormItem;
