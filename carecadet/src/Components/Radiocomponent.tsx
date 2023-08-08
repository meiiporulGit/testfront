import React, { FC } from "react";
import { at } from "lodash";
import { useField } from "formik";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";

interface PropsType {
  name: string;
  label?: string;
//   radioarray: PropsRadio[];

  radioarray: Array<{ label: string;}>;
}
// interface PropsRadio {
//   label: string;
// }

const RadioComp = (props: PropsType) => {
  const { label, ...restProps } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  console.log(field, "file");
  function renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return <FormHelperText sx={{ textAlign: "left",
      color: "red",
      fontSize: "0.9rem",
      marginTop: "0.5rem"}}>{error}</FormHelperText>;
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target, "event");
    setValue(e.target.value);
  }

  return (
    <FormGroup>
      <FormControl {...restProps}>
        <RadioGroup name={props.name} value={field.value} onChange={onChange}>
          {props.radioarray.map((che,i)=>(
            <FormControlLabel key={i} value={che.label} control={<Radio />} label={che.label} />
          ))}
        </RadioGroup>
        {renderHelperText()}
      </FormControl>
    </FormGroup>
  );
};

export default RadioComp;
