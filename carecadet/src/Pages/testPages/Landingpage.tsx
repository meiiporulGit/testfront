import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper, Grid } from "@mui/material";

//components
import Servicelandingpage from "../Services/servicelandpage";
import ViewFacility from "../Facility/ViewFacility";
import Pricelist from "../Services/pricelist";
import OrganizationLandingView from "../Organization/OrganizationLandingView";
import { useAppSelector } from "../../Redux/Hook";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
  };
}

export default function ProviderLandingPage() {
  // const tabValue = useAppSelector((state) => state.auth.tabValue);
  // const tab=tabValue!==undefined||null?tabValue:0
  // const [value, setValue] = React.useState(tabValue);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    // <Paper sx={{ backgroundColor: "primary.light" }}>
    <Box sx={{ m: 0, p: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Facility " {...a11yProps(0)} />
          <Tab label="Services" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ViewFacility />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Servicelandingpage />
      </TabPanel>
    </Box>
    // </Paper>
  );
}
