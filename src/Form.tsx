import React, { ReactNode, useMemo } from "react";

import createFormService, { FormServiceProps } from "./createFormService";

export const FormContext = React.createContext<
  ReturnType<typeof createFormService>
>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  null as any
);

export interface FormProps extends FormServiceProps {
  children: ReactNode;
}

function Form({ children, ...props }: FormProps) {
  const form = useMemo(() => {
    const formService = createFormService(props);

    return formService;
  }, [props]);

  return (
    <FormContext.Provider value={form}>
      <form onSubmit={form.submit} onReset={form.reset}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
