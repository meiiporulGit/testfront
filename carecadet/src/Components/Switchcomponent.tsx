import React, { FC } from "react";
import { at } from "lodash";
import { useField ,ErrorMessage} from "formik";
import {
  Switch,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "@mui/material";
import ErrorProps from "./Errorprops"
interface PropsType {
  name: string;
  label?: string;
 
}

const SwitchComponent: FC<PropsType> = (props) => {
  const { label, ...restProps } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;
 

  function renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.checked);
  }

  return (
    <>
    <FormControl {...restProps}>
      <FormControlLabel
        value={field.checked}
        checked={field.value}
        
        control={<Switch {...field} onChange={onChange} />}
        label={label}
      />
      {/* {renderHelperText()} */}
    </FormControl>
    
   </>
  );
};

export default SwitchComponent;
