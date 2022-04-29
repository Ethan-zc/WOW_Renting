import React, { useEffect } from "react";
import CarDataService from "services/trip.service";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@mui/material/MenuItem';

// core components
// import GridItem from "components/Grid/GridItem";
// import GridContainer from "components/Grid/GridContainer";
import CarTable from "components/Table/CarTable";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

// @mui material components
// import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKDatePicker from "components/MKDatePicker";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const offices = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
];


const heads = {
  carId: "carId",
  officeId: "officeId",
  carType: "carType",
  dailyRate: "dailyRate",
  overRate: "overRate",
  vin: "vin",
}

const useStyles = makeStyles(styles);

export default function CarList() {
  const classes = useStyles();

  const [pickUp, setPickUp] = React.useState("");
  const [dropOff, setDropOff] = React.useState("");
  const [pdate, setPdate] = React.useState("");
  const [ddate, setDdate] = React.useState("");

  const [imgUrls, setImgUrls] = React.useState([]);
  
  // TODO: could be better
  const [carList, setCarList] = React.useState([]);
  useEffect(() => {
    console.log("useEffect called!")
    let postData = {
      ddate: "",
      orderBy: "",
      pdate: "",
      pickUp: ""
    };
    getCarListData(postData);
  }, []);

  const getCarListData = (postData) => {
    return CarDataService.post(postData)
      .then(response => {
        console.log("getCarList response data: " + response.data);
        let carData = [];
        let urlData = [];
        Array.from(response.data).forEach((prop) => {
          carData.push(Object.keys(heads).map((key) => {
            return prop[key].toString();
          }));
          urlData.push(prop.imgUrl.toString());
        });
        setImgUrls(urlData);
        setCarList(carData);
      });
  }
  //
  const updateCarListDataByOrder = (orderBy) => {
    // post data
    let postData = {
      ddate: ddate,
      orderBy: orderBy ? orderBy : "",
      pdate: pdate,
      pickUp: pickUp
    };
    console.log("updateCarListData postData: " + Object.values(postData));
    return getCarListData(postData);
  };

  const onChangePickUp = (e) => {
    setPickUp(e.target.value);
  }

  const onChangeDropOff = (e) => {
    setDropOff(e.target.value);
  }

  const onChangePdate = (e) => {
    setPdate(new Date(e).toLocaleDateString());
  }

  const onChangeDdate = (e) => {
    setDdate(new Date(e).toLocaleDateString());
  }

  const onChangeOrderBy = (e) => {
    updateCarListDataByOrder(e);
  }
  
  const handleClickButton = () => {
    updateCarListDataByOrder();
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <MKBox component="section" py={4} px={4} coloredShadow="dark">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12} mx="auto" textAlign="left">
              <MKTypography variant="h4" mb={1}>
                Reserve A Car
              </MKTypography>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{ mx: "auto" }}>
              <MKBox width="100%" height="100%" component="form" method="post" autocomplete="off" sx={{ m: "auto"}} p={3}>
                <Grid 
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="baseline"
                  spacing={4} >
                  <Grid item xs={12} md={3}>
                    <MKInput 
                      variant="standard"
                      placeholder="Pick-off"
                      label="Pick-up" 
                      fullWidth
                      value={pickUp}
                      onChange={onChangePickUp}
                      >
                        {offices.map((option) => (
                          <MenuItem key={option.value} value={option.value} >
                            {option.label}
                          </MenuItem>
                        ))}
                    </MKInput>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MKInput 
                      variant="standard"
                      placeholder="Drop-off"
                      label="Drop-off"
                      fullWidth 
                      select
                      value={dropOff}
                      onChange={onChangeDropOff}
                      >
                        {offices.map((option) => (
                          <MenuItem key={option.value} value={option.value} >
                            {option.label}
                          </MenuItem>
                        ))}
                    </MKInput>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MKDatePicker 
                      input={{
                        label: "Pick-up date",
                        placeholder: "Pick-up date",
                        variant: "standard",
                        value: pdate,
                      }}
                      onChange={onChangePdate}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MKDatePicker 
                      input={{
                        label: "Drop-off date",
                        placeholder: "Drop-off date",
                        variant: "standard",
                        value: ddate,
                      }}
                      onChange={onChangeDdate}
                    />
                  </Grid>
                </Grid>
              </MKBox>
            </Grid>
            <Grid item xs={4} lg={4} sx={{ mx: "auto" }}>
              <Grid>
                <MKButton 
                  type="submit"
                  variant="gradient"
                  color="dark"
                  fullWidth
                  onClick={handleClickButton}
                  >
                  Search
                </MKButton>
              </Grid>
            </Grid>
          </Grid>
        </MKBox>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h2 className={classes.cardTitleWhite}>Here are some recommended cars</h2>
          </CardHeader>
          <CardBody>
            <CarTable 
              tableHeaderColor="primary"
              tableHead={Object.values(heads)}
              tableData={carList}
              imgUrls={imgUrls}
            //   orderBy={orderBy}
              onChange={onChangeOrderBy}
            />
          </CardBody>
        </Card>
      </Grid>
    </Grid>
    );

}
