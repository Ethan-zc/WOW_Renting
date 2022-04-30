import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKDatePicker from "components/MKDatePicker";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

export default function FormSearchCars(props) {
  const {
    onChangePickUp,
    onChangePdate,
    onChangeDdate,
    onClickButton,
  } = props;

  const [pickUp, setPickUp] = React.useState("");
  const [dropOff, setDropOff] = React.useState("");
  const [pdate, setPdate] = React.useState("");
  const [ddate, setDdate] = React.useState("");

  const handleOnChangePickUp = (e) => {
    setPickUp(e.target.value);
    setDropOff(e.target.value);
    onChangePickUp(e);
  }

  const handleOnChangePdate = (e) => {
    setPdate(new Date(e).toLocaleDateString());
    onChangePdate(e);
  }

  const handleOnChangeDdate = (e) => {
    setDdate(new Date(e).toLocaleDateString());
    onChangeDdate(e);
  }
  
  const handleOnClickButton = () => {
    onClickButton();
  };

  return (
    <Grid container>
      <MKBox 
        height="100%" width="100%" 
        component="section" 
        py={4} px={4}
        coloredShadow="dark"
      >
        <Grid container >
          <Grid item xs={12} sm={12} md={12} mx="auto" textAlign="left">
            <MKTypography variant="h4" mb={1}>
              Reserve A Car
            </MKTypography>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" sx={{ mx: "auto" }}>
            <MKBox 
              width="100%" height="100%"
              component="form" method="post" 
              autocomplete="off" sx={{ m: "auto"}} px={3} py={3}
            >
              <Grid 
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="baseline"
                spacing={4}
              >
                <Grid item xs={12} md={4}>
                  <MKInput 
                    variant="standard"
                    placeholder="Pick-off"
                    label="Pick-up" 
                    fullWidth
                    value={pickUp}
                    onChange={handleOnChangePickUp}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <MKInput 
                    variant="standard"
                    placeholder="Drop-off"
                    label="Drop-off"
                    fullWidth 
                    disabled
                    value={dropOff}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <MKDatePicker 
                    input={{
                      label: "Pick-up date",
                      placeholder: "Pick-up date",
                      variant: "standard",
                      value: pdate,
                    }}
                    onChange={handleOnChangePdate}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <MKDatePicker 
                    input={{
                      label: "Drop-off date",
                      placeholder: "Drop-off date",
                      variant: "standard",
                      value: ddate,
                    }}
                    onChange={handleOnChangeDdate}
                  />
                </Grid>
              </Grid>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <Grid>
              <MKButton 
                type="submit"
                variant="gradient"
                color="dark"
                fullWidth
                onClick={handleOnClickButton}
                >
                Search
              </MKButton>
            </Grid>
          </Grid>
        </Grid>
      </MKBox>
    </Grid>
  );
}
