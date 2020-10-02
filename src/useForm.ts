import { useContext } from "react";

import { FormContext } from "./Form";

const useForm = () => {
  const form = useContext(FormContext);

  if (!form) {
    console.error(
      "[REACT-FORM Error] You need to wrap Form Component in parent Component of FormItem or useFormItem"
    );
  }

  return form;
};

export default useForm;
