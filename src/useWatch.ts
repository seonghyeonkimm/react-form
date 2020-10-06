import { ItemPathType } from "createFormService";
import { useEffect, useState } from "react";

import useForm from "./useForm";

const useWatch = (name: string | ItemPathType) => {
  const form = useForm();
  const [watchValue, setWatchValue] = useState(() => {
    const itemPath = typeof name === "string" ? [name] : name;
    form.getItemValue(itemPath as ItemPathType);
  });

  useEffect(() => {
    form.subscribe(name, setWatchValue);
  }, [form, name]);

  return watchValue;
};

export default useWatch;
