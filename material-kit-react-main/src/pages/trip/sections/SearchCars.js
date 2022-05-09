/*
* Data package
* @dataFilter
{
  "ddate": "string",
  "orderBy": "string",
  "pdate": "string",
  "pickUp": "string"
}
* @responseData
[
  {
    "addrId": 0,
    "carId": 0,
    "carType": "string",
    "country": "string",
    "dailyRate": 0,
    "imgUrl": "string",
    "officeId": 0,
    "overRate": 0,
    "phone": "string",
    "state": "string",
    "street": "string",
    "vin": "string",
    "zipcode": "string"
  }
]
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MDTypography from "components/MDTypography";
import MKDatePicker from "components/MKDatePicker";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

// Trip page components
import TableViewCars from "pages/trip/components/TableViewCars";

// Services
import CarDataService from "services/trip.service";
import AccountDataService from "services/account.service";

export default function SearchCars() {
  const navigate = useNavigate();

  const dataHead = {
    carType: "Car Type",
    dailyRate: "Daily Price($)",
    overRate: "Overly Price($)",
    street: "Office Location",
  }
  
  const dataHeadExtra = {
    carId: "Car ID",
    officeId: "Office ID",
  }

  const [pickUp, setPickUp] = React.useState("");
  const [dropOff, setDropOff] = React.useState("");
  const [pdate, setPdate] = React.useState("");
  const [ddate, setDdate] = React.useState("");

  const [dataImgUrls, setDataImgUrls] = React.useState([]);
  const [dataImgNames, setDataImgNames] = React.useState([]);
  const [dataImgInfos, setDataImgInfos] = React.useState([]);
  const [dataCars, setDataCars] = React.useState([]);
  const [dataCarsExtra, setDataCarsExtra] = React.useState([]);
  const [isComplete, setIsComplete] = React.useState(null);

  const [status, setStatus] = useState(false);

  useEffect(() => {
    // console.log("[SearchCars] useEffect called!")
    postGetCarData();
  }, []);

  useEffect(() => {
    AccountDataService.isLogin()
    .then((response) => {
        console.log("[App] ", response.data.message);
        if (response.data.success) {
        setStatus(true);
        }
    });
  }, []);

  const postGetCarData = (orderBy) => {
    const dataFilter = {
      ddate: ddate,
      orderBy: orderBy && orderBy !== "" ? orderBy : "",
      pdate: pdate,
      pickUp: pickUp
    };
    CarDataService.post(dataFilter)
      .then(response => {
        console.log("[SearchCars] postGetCarData dataFilter: " + Object.values(dataFilter));
        console.log(response);
        let carData = [];
        let carDataExtra = [];
        let imgUrlData = [];
        let imgNameData = [];
        let imgInfoData = [];
        Array.from(response.data).forEach((e) => {
          carData.push(Object.keys(dataHead).map((head) => {
            return e[head].toString();
          }));
          carDataExtra.push(Object.keys(dataHeadExtra).map((head) => {
            return e[head].toString();
          }));
          imgUrlData.push(e.imgUrl);
          imgNameData.push(e.carType);
          imgInfoData.push(`This is ${e.carType}!`);
        });
        setDataCars(carData);
        setDataCarsExtra(carDataExtra);
        setDataImgUrls(imgUrlData);
        setDataImgNames(imgNameData);
        setDataImgInfos(imgInfoData);
      });
  }

  const updateTableCarByOrder = (orderBy) => {
    postGetCarData(orderBy);
  };

  const handleOnChangePickUp = (e) => {
    setPickUp(e.target.value);
    setDropOff(e.target.value);
  }

  const handleOnChangePdate = (e) => {
    let date = new Date(e).toLocaleDateString();
    setPdate(date);
  }

  const handleOnChangeDdate = (e) => {
    let date = new Date(e).toLocaleDateString();
    setDdate(date);
  }

  const handleOnClickButton = () => {
    setIsComplete(null);
    updateTableCarByOrder();
  };

  const onChangeOrderBy = (e) => {
    console.log("[SearchCars] onChangeOrderBy: " + e)
    updateTableCarByOrder(e);
  }

  const onClickCreateOrder = (e) => {
    console.log("[SearchCars] onClickCreateOrder: index ", e);
    console.log("[SearchCars] onClickCreateOrder: dataHead ", dataHead);
    console.log("[SearchCars] onClickCreateOrder: dataCars ", dataCars[e]);
    console.log("[SearchCars] onClickCreateOrder: pdate ", pdate);
    console.log("[SearchCars] onClickCreateOrder: ddate ", ddate);
    console.log("[SearchCars] onClickCreateOrder: pickUp ", pickUp);
    
    let head = Object.assign(dataHead, dataHeadExtra);
    head.pdate = "Pickup date";
    head.ddate = "Dropoff date";
    head.pickUp = "Pickup location";
    head.dropOff = "Dropoff location";
    let data = [...dataCars[e], ...dataCarsExtra[e]];
    data.push(pdate);
    data.push(ddate);
    data.push(pickUp);
    data.push(dropOff);
    let orderDetail = {
      dataHead: head,
      data: data,
    }

    if (pickUp === "" || pdate === "" || ddate === "") {
      console.error("[SearchCars] onClickCreateOrder: error");
      setIsComplete(false);
    } else {
      console.log("[SearchCars] onClickCreateOrder: success")
      if (true) {
        sessionStorage.setItem("__orderDetail__", JSON.stringify(orderDetail));
        console.log(orderDetail);
        if (status) {
          navigate("/order")
        }
        else {
          navigate("/authentication/sign-in")
        }
      }
    }
  }

  return (
    <Grid 
      container item 
      justifyContent="center" 
      alignContent="center"
      alignItems="center"
      textAlign="left"
      xs={12} lg={12} mx="auto" 
    >
      <Grid item xs={12} sm={12} md={12} >
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
            {isComplete != null && !isComplete ?
            <Grid item xs={12} sm={12} md={12} >
              <MDTypography variant="caption" color="error" >
                *Please provide full information to create order
              </MDTypography>
            </Grid>
            : null}
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
      {/* <Grid item xs={12} sm={12} md={12} >
        <TableCars 
          columns={Object.keys(dataHead)}
          rows={Object.keys(dataCars)}
        />
        <TableSample />
      </Grid> */}
      <Grid item xs={12} sm={12} md={12}>
        <MKBox
          bgColor="white"
          shadow="lg"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mt={{ xs: 6, sm: 6, md: 6 }}
        >
          <MKBox
            variant="gradient"
            borderRadius="md"
            bgColor="info"
            coloredShadow="info"
            p={3}
            mx={1}
            mt={-3}
          >
            <MKTypography variant="h5" color="white">
              Here are some recommended cars
            </MKTypography>
          </MKBox>
          <MKBox p={3}>
            <TableViewCars 
              tableHeaderColor="primary"
              tableHead={dataHead}
              tableData={dataCars}
              imgUrls={dataImgUrls}
              imgNames={dataImgNames}
              imgInfos={dataImgInfos}
              onChangeOrderBy={onChangeOrderBy}
              onClickCreateOrder={onClickCreateOrder}
            />
          </MKBox>
        </MKBox>
      </Grid>
    </Grid>
  );
}
