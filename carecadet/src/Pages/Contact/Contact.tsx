import * as React from "react";
import { ReactElement, FC } from "react";
import { Formik, Form } from "formik";
import { Box, Typography, Paper, Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import FormTextField from "../../Components/Textfield";
import * as Yup from "yup";
import { axiosPrivate } from "../../axios/axios";
import { toast } from "react-toastify";

interface forminitialValues {
  Subject: string;
  Message: string;
}

const Contact = () => {
  const data = useAppSelector(
    (state: { providerAuth: { login: any } }) => state.providerAuth.login
  );
console.log(data,"check")
  const initialValues: forminitialValues = {
    Subject: "",
    Message: "",
  };

  const onSubmit = (values: forminitialValues, actions: any) => {
    var check=""
    if(data.email===undefined||null||""){
      check="kavya.meiiporul@gmail.com"
     
    }
    else{
      check=data.email
    }

    const contactdata = {
      Subject: values.Subject,
      Message: values.Message,
      email:check
    };
    // alert(JSON.stringify(contactdata, null, 2));
    axiosPrivate.post("/contact/contactEmail",contactdata).then(res=>{
      toast.success(res.data.message)
      actions.resetForm({
        values: {
          Subject: "",
          Message: "",
        },
      });
    }).catch(error=>{toast.error(error.message)})
   
   
  };
  const validationSchema = Yup.object().shape({
    Subject: Yup.string().required("Required"),
    Message: Yup.string().required("Required"),
  });

  return (
    <Paper
      elevation={3}
      sx={{
        height:"89.5vh",
        backgroundColor: "primary.light",
        padding: "1.5rem",
        borderRadius: "15px",
      }}
    >
      <>
        {/* <Typography
          variant="h6"
          textAlign={"right"}
          justifyItems={"right"}
          sx={{ color: "Black" }}
          margin={"40px"}
          marginBottom={"5px"}
        >
          Hello {data.userID},
        </Typography>
        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        /> */}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Grid container justifyContent={"center"} >
              <Grid container justifyContent={"left"}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    mt: 4,
                    color: "#728AB7",
                  }}
                >
                  Subject
                </Typography>

                <FormTextField
                  container={TextField}
                  name="Subject"
                  placeholder="Subject"
                  type="text"
                  sx={{
                    width: "50vw",
                    "&::placeholder": {
                      color: "#728AB7",

                      letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                fullWidth={true}
                />
              </Grid>
              <Grid container justifyContent={"left"}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    mt: 4,
                    color: "#728AB7",
                  }}
                >
                  Message
                </Typography>

                <FormTextField
                  container={TextField}
                  name="Message"
                  placeholder="Message"
                  type="textArea"
                  sx={{
                    width: "50vw",
                    "&::placeholder": {
                      color: "#728AB7",

                      letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                  multirow={8}
                  multiline={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid container item justifyContent="center">
                <Buttoncomponent
                  type="submit"
                  size="large"
                  fullWidth={false}
                  variant="contained"
                  // onClick={() => {
                  //   // dispatch(organizationEdit({ ...data[0] }));
                  //   // // dispatch(editButton())
                  //   // navigate("/editOrg");
                  // }}
                  sx={{
                    fontSize: "1rem",
                    mt: 2,
                    mr: 40,
                    mb: "0.5rem",
                    backgroundColor: "secondary.dark",
                    width: "15vw",
                    color: "#fff",
                    "&:hover": {
                      color: "secondary.dark",
                      border: "1px solid blue",
                      // letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                >
                  Submit
                </Buttoncomponent>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </>
    </Paper>
  );
};

export default Contact;
