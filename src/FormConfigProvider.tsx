import React, { ReactNode, useMemo } from "react";

export type ValidateModeType = "blur" | "change";
export interface FormConfigProps {
  children: ReactNode;
  validateMode?: ValidateModeType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  makeErrorProps?: (errors: string[]) => Record<string, any>;
  validateMessage?: {
    required?: string;
    maxLength?: string;
    minLength?: string;
    max?: string;
    min?: string;
    pattern?: string;
  };
}

export const FormConfigContext = React.createContext<{
  validateMode: ValidateModeType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  makeErrorProps: (errors: string[]) => Record<string, any>;
  validateMessage: Exclude<
    Required<FormConfigProps["validateMessage"]>,
    undefined
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}>(null as any);

const DEFAULT_VALIDATE_MESSAGE = {
  required: "This field is required",
  maxLength: "Should not be longer than maximum length",
  minLength: "Should not be shorter than minimum length",
  max: "Should not be greater than maximum value",
  min: "Should not be smaller than minimum value",
  pattern: "Not correct pattern",
};

const makeDefaultErrorProps = (errors: string[]) => ({
  helperText: errors.join(", "),
  error: errors.length > 0,
});

function FormConfigProvider({
  children,
  validateMode = "blur",
  validateMessage = {},
  makeErrorProps = makeDefaultErrorProps,
}: FormConfigProps) {
  const value = useMemo(() => {
    return {
      validateMode,
      makeErrorProps,
      validateMessage: { ...DEFAULT_VALIDATE_MESSAGE, ...validateMessage },
    };
  }, [validateMessage, makeErrorProps, validateMode]);

  return (
    <FormConfigContext.Provider value={value}>
      {children}
    </FormConfigContext.Provider>
  );
}

export default FormConfigProvider;
