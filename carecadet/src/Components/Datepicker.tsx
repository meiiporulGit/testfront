import React, { useState, useEffect } from "react";
import { useField ,ErrorMessage} from "formik";
import { Dayjs } from 'dayjs'
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { FormHelperText } from "@mui/material";
interface PropsType {
  name: string;
  label?: string;
//   inputFormat?: string;
}

const DatePickerField = (props: PropsType) => {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;

  function renderHelperText() {
    if (isError) {
      return <FormHelperText sx={{  textAlign: "left",
      color: "red",
      fontSize: "0.9rem",
      marginTop: "0.5rem"}}>{error}</FormHelperText>;
    }
  }
  return (
    
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        //   inputFormat={props.inputFormat}
          label={props.label}
          value={field.value}
          onChange={(newValue:any) => {
            setValue(newValue);
          }}
          renderInput={(params:any) => <TextField {...params} />}
        />
        {renderHelperText()}
      </LocalizationProvider> 
      
    
    
  );
};

export default DatePickerField;

