import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  Container,
  Divider,
  Avatar
} from "@mui/material";

import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";

// import useStyles from "./style";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";

import CreateService from "./Createmanually";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
interface props {
  textalign: string;
  children: JSX.Element;
}

type CloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";
interface DialogProps extends MuiDialogProps {
  onClose: (reason: CloseReason) => void;
}

const Dialog = ({ title, open, onClose, children, ...props }: DialogProps) => {
  return (
    <MuiDialog
      onClose={(_, reason) => onClose(reason)}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("closeButtonClick")} color="primary">
          Close
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

function Pricelist() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: CloseReason) => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const data = useAppSelector(
    (state: { providerAuth: { login: any } }) => state.providerAuth.login
  );
  const navigateToupload = () => {
    // This will navigate to second component
    navigate("/provider/service/PricelistUpload");
  };
 const navigateToFacility = ()=>{
  navigate("/provider/facility/viewfacility");
 }
  return (
    <Box
   
      sx={{
        backgroundColor: "primary.light",
        padding: "1rem",
        // borderRadius: "15px",
      }}
    >
      {/* <Typography
        variant="h6"
        textAlign={"right"}
        justifyItems={"right"}
        sx={{ color: "Black" }}
        margin={"40px"}
        marginBottom={"5px"}
      >
      
      </Typography> */}
      {/* <div
        style={{
          flex: 1,
          height: "3px",
          backgroundColor: "darkgray",
        }}
      /> */}
      <Avatar  variant="rounded" sx={{bgcolor:"secondary.dark"}}>
      <KeyboardBackspaceIcon onClick={navigateToFacility} fontSize="large" />
</Avatar>
      <Typography
        variant="h6"
        
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
         
        }}
      >
        {/* <p className="para" style={{ paddingTop: "50px" }}> */}
        Please upload a discounted cash price information for procedures
        performed in your facility
        {/* </p> */}
      </Typography>

      <Typography
        variant="h6"
        margin={"40px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {/* <p className="para" style={{ paddingTop: "0" }}> */}I want to...
        {/* </p> */}
      </Typography>
      <Typography align="center">
        <Buttoncomponent
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: "secondary.dark",
            width: {xs:"30vw",sm:"10vw"},
            color: "#fff",
            "&:hover": {
              color: "secondary.dark",
              border: "1px solid blue",
              // letterSpacing: "0.2rem",
              // fontSize: "1rem",
            },
          }}
          onClick={navigateToupload}
        >
          Upload Price List
        </Buttoncomponent>
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        />

        <div>
          <p style={{ width: "70px", textAlign: "center", fontSize: "20px" }}>
            Or
          </p>
        </div>

        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        />
      </div>
      <Typography align="center">
        <Buttoncomponent
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: "secondary.dark",
            width: {xs:"30vw",sm:"10vw"},
            color: "#fff",
            "&:hover": {
              color: "secondary.dark",
              border: "1px solid blue",
              // letterSpacing: "0.2rem",
              // fontSize: "1rem",
            },
          }}
          onClick={handleClickOpen}
          // className={classes.button}
          // sx={{ mt: 5 }}
        >
          Create Manually
        </Buttoncomponent>
        <Dialog
          open={open}
          onClose={handleClose}
          children={
            <div>
              <CreateService />
            </div>
          }
        />
      </Typography>
      <Typography
        variant="h6"
        margin={"40px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {/* <p className="para"> */}
        If you have more than one facility, you will be prompted to select files
        corresponding to each facility
        {/* </p> */}
      </Typography>
    </Box>
  );
}

export default Pricelist;
