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

const titles = ["carId", "carType", "dailyRate", "overRate", "officeId", "vin"];

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

const useStyles = makeStyles(styles);

export default function CarList() {
  const classes = useStyles();

  // TODO: need to change the following logics 
  // bug called twice
  const [imgUrls, setImgUrls] = React.useState([]);
  const [cars, setCars] = React.useState([]);
  useEffect(() => {
    retrieveCars();
  }, []);

  const [pickup, setPickup] = React.useState("");
  const [dropoff, setDropoff] = React.useState("");
  const [pDate, setPDate] = React.useState("");
  const [dDate, setDDate] = React.useState("");

  const retrieveCars = () => {
    return CarDataService.getAll()
      .then(response => setCars(() => {
        const carData = [];
        const urlData = [];
        Array.from(response.data).forEach(e => {
          carData.push([e.carId.toString(), e.carType.toString(), e.dailyRate.toString(), e.overRate.toString(), e.officeId.toString(), e.vin.toString()]);
          urlData.push(e.imgUrl.toString());
        });
        setImgUrls(urlData);
        return carData;
      }));
  };

  const updateCarList = () => {
    retrieveCars();
  };

  const onChangePickup = (e) => {
    setPickup(e.target.value);
  }

  const onChangeDropoff = (e) => {
    setDropoff(e.target.value);
  }

  const onChangePDate = (e) => {
    setPDate(new Date(e).toLocaleDateString());
  }

  const onChangeDDate = (e) => {
    setDDate(new Date(e).toLocaleDateString());
  }
  
  const handleClickButton = () => {
    let data = {
      pickup: pickup,
      dropoff: dropoff,
      pDate: pDate,
      dDate: dDate,
    };
    console.log(data);
    updateCarList();
    return CarDataService.create(data).then(response => setCars(response.data));
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
                      value={pickup}
                      onChange={onChangePickup}
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
                      value={dropoff}
                      onChange={onChangeDropoff}
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
                        value: pDate,
                      }}
                      onChange={onChangePDate}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MKDatePicker 
                      input={{
                        label: "Drop-off date",
                        placeholder: "Drop-off date",
                        variant: "standard",
                        value: dDate,
                      }}
                      onChange={onChangeDDate}
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
              tableHead={titles}
              tableData={cars}
              imgUrls={imgUrls}
            />
          </CardBody>
        </Card>
      </Grid>
    </Grid>
    );

}
