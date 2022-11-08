import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TableNav = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

      
      const StyledTabs = styled((props) => (
        <Tabs
          {...props}
          TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
        />
      ))({
        "& .MuiTabs-indicator": {
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent"
        },
        "& .MuiTabs-indicatorSpan": {
          maxWidth: 40,
          width: "100%",
          backgroundColor: "white"
        }
      });
      
      const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
        ({ theme }) => ({
          textTransform: "none",
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: theme.typography.pxToRem(15),
          marginRight: theme.spacing(1),
          color: "white",
          "&.Mui-selected": {
            color: "white"
          },
          "&.Mui-focusVisible": {
            backgroundColor: "black"
          }
        })
      );

  return (
    
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "black" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="11월 8일" />
          <StyledTab label="11월 9일" />
          <StyledTab label="11월 10일" />
        </StyledTabs>
        <Box sx={{ p: 5 }} />
      </Box>
    </Box>
  )
}

export default TableNav