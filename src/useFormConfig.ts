import { useContext } from "react";

import { FormConfigContext } from "./FormConfigProvider";

const useFormConfig = () => {
  const config = useContext(FormConfigContext);

  if (!config) {
    console.warn(
      "[REACT-FORM Wanring] You need to wrap FormConfigProvider in your root component"
    );
  }

  return config;
};

export default useFormConfig;
