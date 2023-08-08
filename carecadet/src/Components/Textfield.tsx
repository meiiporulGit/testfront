import React from "react";
import { Field, ErrorMessage } from "formik";
import {TextField, FormControl, InputLabel, MenuItem, Select} from "@mui/material"
import ErrorProps from "./Errorprops";

interface props {
  name: string;
  placeholder: string;
  type: string;
  fullWidth?: boolean;
  container:any;
  sx?:any;
  inputProps?:any;
  label?:string;
  multirow?:number;
  multiline?:boolean;
  autoComplete?:any;
}
const FormTextField = (props: props) => {
  return (
    <FormControl sx={{ width: "100%" }}>
       
      <Field
      label={props.label}
        as={props.container}
        sx = {props.sx}
        inputProps={{
          sx: props.sx,
        }}
        fullWidth={props.fullWidth}
        name={props.name}
        placeholder={props.placeholder}
        rows={props.multirow}
        type={props.type}
        multiline={props.multiline}
        autoComplete={props.autoComplete}
  
                
        helperText={
          <ErrorMessage name={props.name}>
            {(error) => <ErrorProps>{error}</ErrorProps>}
          </ErrorMessage>
        }
      />
    </FormControl>
  );
};

export default FormTextField;
