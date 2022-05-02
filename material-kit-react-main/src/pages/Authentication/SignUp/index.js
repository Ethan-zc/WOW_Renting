/*
* Data package
* @postData: corpUser
{
  "accname": "string",
  "pwd": "string",
  "email": "string",
  "phone": "string",
  "corpname": "string",
  "regnum": "string",
  "empid": "string",
  "street": "string",
  "state": "string",
  "country": "string",
  "zipcode": null
}
* @postData: indiUser
{
  "accname": "string",
  "pwd": "string",
  "fname": "string",
  "lname": "string",
  "licensenum": 0,
  "insname": "string",
  "insnum": 0,
  "email": "string",
  "phone": "string",
  "street": "string",
  "country": "string",
  "state": "string",
  "zipcode": "0"
}
* @responseData
? what is it?
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Authentication layout components
import SignUpLayout from "pages/Authentication/components/SignUpLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// Services
import AuthDataService from "services/authentication.service";

const labelCorp = {
  accname: "Account",
  pwd: "Password",
  email: "Email",
  phone: "Phone",
  corpname: "Corporation Name",
  regnum: "Register Number",
  empid: "Employee ID",
  street: "Street",
  state: "State",
  country: "Country",
  zipcode: "Zipcode",
};

const labelIndi = {
  accname: "Account",
  pwd: "Password",
  fname: "First Name",
  lname: "Last Name",
  licensenum: "License Number",
  insname: "Insurance Company",
  insnum: "Insurance Number",
  email: "Email",
  phone: "Phone",
  street: "Street",
  state: "State",
  country: "Country",
  zipcode: "Zipcode",
};

export default function SignUp() {
  // const navigate = useNavigate();

  // corp data package
  const initCorpData = {
    accname: "",
    pwd: "",
    email: "",
    phone: "",
    corpname: "",
    regnum: "",
    empid: "",
    street: "",
    state: "",
    country: "",
    zipcode: "",
  };
  // corp numeric values
  const initCorpNum = {
    licensenum: true,
    insnum: true,
    zipcode: true,
  };

  // indi data package
  const initIndiData = {
    accname: "",
    pwd: "",
    fname: "",
    lname: "",
    licensenum: "",
    insname: "",
    insnum: "",
    email: "",
    phone: "",
    street: "",
    state: "",
    country: "",
    zipcode: "",
  };
  // indi numeric values
  const initIndiNum = {
    licensenum: true,
    insnum: true,
    zipcode: true,
  };

  const [isCorp, setIsCorp] = useState(false);
  const [dataCorp, setDataCorp] = useState(initCorpData);
  const [dataIndi, setDataIndi] = useState(initIndiData);
  const [isComplete, setIsComplete] = useState(null);
  const [isNumCorp, setIsNumCorp] = useState(initCorpNum);
  const [isNumIndi, setIsNumIndi] = useState(initIndiNum);
  const [isSubmit, setIsSubmit] = useState(false);

  const clearCorp = () => {
    setDataCorp(initCorpData);
    setIsNumCorp(initCorpNum);
  }

  const clearIndi = () => {
    setDataIndi(initIndiData);
    setIsNumIndi(initIndiNum);
  }

  const postCorpData = () => {
    console.log("[SignUp] postCorpData data package");
    console.log(dataCorp);
    return AuthDataService.postCorpRegister(dataCorp)
      .then((response) => {
        // TODO: some work left here
        console.log(response.data.message);
        setIsSubmit(!isSubmit);
      })
      .catch(error => {
        console.error("[SignUp] postCorpData ERROR ", error);
      });
  }

  const postIndiData = () => {
    console.log("[SignUp] postIndiData data package");
    console.log(dataIndi);
    return AuthDataService.postIndiRegister(dataIndi)
      .then((response) => {
        // TODO: if success, pop out message
        // TODO: how to deal with message?
        console.log(response.data.message);
        setIsSubmit(!isSubmit);
      })
      .catch(error => {
        console.error("[SignUp] postIndiData ERROR ", error);
      });
  }

  const handleOnChangeCorp = (e, prop) => {
    setDataCorp({
      ...dataCorp,
      [prop]: e.target.value,
    });
    if (prop in isNumCorp) {
      isNaN(e.target.value) 
      ? setIsNumCorp({...isNumCorp, [prop]: false})
      : setIsNumCorp({...isNumCorp, [prop]: true});
    }
  }

  const handleOnChangeIndi = (e, prop) => {
    setDataIndi({
      ...dataIndi,
      [prop]: e.target.value,
    });
    if (prop in isNumIndi) {
      isNaN(e.target.value) 
      ? setIsNumIndi({...isNumIndi, [prop]: false})
      : setIsNumIndi({...isNumIndi, [prop]: true});
    }
  }

  const handleOnClickCheckbox = () => {
    isCorp ? clearCorp() : clearIndi();
    setIsComplete(null);
    setIsCorp(!isCorp);
  }

  const handleOnClickRegister = () => {
    // check if filled all blanks
    let isFilled = false;
    if (isCorp && !Object.values(dataCorp).includes("")) {
      isFilled = true;
    } else if (!isCorp && !Object.values(dataIndi).includes("")) {
      isFilled = true;
    }

    if (!isFilled) {
      setIsComplete(false);
    }
    else {
      setIsComplete(true);
      // check if required blanks are number
      if (isCorp && !Object.values(isNumCorp).includes(false)) {
        postCorpData();
      } else if (!isCorp && !Object.values(isNumIndi).includes(false)){
        postIndiData();
      }
    }
  }

  const handleCloseModal = () => {
    // TODO: login account with tonken
    console.log("[SignUp] handleCloseModal");
    setIsSubmit(!isSubmit);
    // navigate("/dashboard");
  }

  return (
    <SignUpLayout image={bgImage}>
      <Card sx={{ minWidth: 400 }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={0}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join Us Today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your information to register
          </MDTypography>
        </MDBox>
        <MDBox pt={3} pb={2} px={5}>
          <MDBox component="form" role="form">
            {isComplete != null && !isComplete ?
            <MDBox display="flex" justifyContent="left" alignItems="center" mt={-1} mb={1}>
              <MDTypography variant="caption" color="error" >
                *All blanks must be filled
              </MDTypography>
            </MDBox>
            : null}
            {isCorp ?
              (
                Object.keys(isNumCorp).map((prop) => {
                  return (
                    !isNumCorp[prop] ? 
                    <MDBox display="flex" justifyContent="left" alignItems="center" mt={-1} mb={1} key={prop}>
                      <MDTypography variant="caption" color="error" >
                        *{labelCorp[prop]} must be number
                      </MDTypography>
                    </MDBox>
                    : null
                  )
                })
              )
              :
              (
                Object.keys(isNumIndi).map((prop) => {
                  return (
                    !isNumIndi[prop] ? 
                    <MDBox display="flex" justifyContent="left" alignItems="center" mt={-1} mb={1} key={prop}>
                      <MDTypography variant="caption" color="error" >
                        *{labelIndi[prop]} must be number
                      </MDTypography>
                    </MDBox>
                    : null
                  )
                })
              )
            }
            {isCorp ?
            // * corp layout
            <MDBox>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {Object.keys(labelCorp).map((prop, index) => {
                    return (
                      <Grid
                      item
                      key={index}
                      xs={prop === "corpname" ? 6 : 3}
                      >
                        <MDBox>
                          <MDInput
                            type={prop === "pwd" ? "password" : "text"}
                            label={labelCorp[prop]}
                            error={
                              (
                                (
                                  isComplete != null 
                                  && !isComplete 
                                  && dataCorp[prop] === ""
                                ) 
                                ||
                                (
                                  (prop in isNumCorp) && !isNumCorp[prop]
                                )
                              )
                              ? true : false}
                            variant="standard"
                            fullWidth
                            value={dataCorp[prop]}
                            onChange={(e) => handleOnChangeCorp(e, prop)}/>
                        </MDBox>
                      </Grid>
                    );
                })}
              </Grid>
            </MDBox>
            :
            // * indi layout
            <MDBox>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {Object.keys(labelIndi).map((prop, index) => {
                    return (
                      <Grid 
                        item
                        key={index}
                        xs={prop === "accname" || prop === "pwd" ? 6 : 
                            (prop === "fname" || prop === "lname" || prop === "licensenum" ? 4 : 3)}
                      >
                        <MDBox>
                          <MDInput
                            type={prop === "pwd" ? "password" : "text"}
                            label={labelIndi[prop]}
                            error={
                              (
                                (
                                  isComplete != null 
                                  && !isComplete 
                                  && dataIndi[prop] === ""
                                ) 
                                ||
                                (
                                  (prop in isNumIndi) && !isNumIndi[prop]
                                )
                              )
                              ? true : false}
                            variant="standard"
                            fullWidth
                            value={dataIndi[prop]}
                            onChange={(e) => handleOnChangeIndi(e, prop)}/>
                        </MDBox>
                      </Grid>
                    );
                })}
              </Grid>
            </MDBox>
            }
            <MDBox>
              <MDBox display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Checkbox
                  checked={!isCorp}
                  onClick={handleOnClickCheckbox}
                />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  onClick={handleOnClickCheckbox}
                >
                  &nbsp;&nbsp;Individual user&nbsp;&nbsp;&nbsp;&nbsp;
                </MDTypography>
                <Checkbox
                  checked={isCorp}
                  onClick={handleOnClickCheckbox}
                />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  onClick={handleOnClickCheckbox}
                >
                  &nbsp;&nbsp;Corporation user
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox mt={2} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth
                onClick={handleOnClickRegister}>
                Register
              </MDButton>
            </MDBox>
            <MDBox mt={2} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <Modal open={isSubmit} onClose={handleCloseModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={isSubmit} timeout={400}>
            <MKBox
              position="relative"
              width="500px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h5">Success</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleCloseModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={2}>
                <MKTypography variant="body2" color="secondary" fontWeight="regular">
                  Thank your for your registration
                </MKTypography>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" justifyContent="center" p={1.5}>
                <MKButton variant="gradient" color="info" onClick={handleCloseModal}>
                  enter
                </MKButton>
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
      </Card>
    </SignUpLayout>
  );
}
