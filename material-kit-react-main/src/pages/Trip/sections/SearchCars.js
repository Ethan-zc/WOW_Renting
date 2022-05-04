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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Trip page components
import FormSearchCars from "pages/trip/components/FormSearchCars";
import TableViewCars from "pages/trip/components/TableViewCars";

// FIXME: use another table if have time
// import TableCars from "pages/Trip/components/TableCars";
// import TableSample from "pages/Trip/components/TableSample";

// Services
import CarDataService from "services/trip.service";

const dataHead = {
  carId: "Car ID",
  carType: "Car Type",
  dailyRate: "Daily Price($)",
  overRate: "Overly Price($)",
  street: "Office Location",
}

export default function SearchCars() {
  const [dataFilter, setDataFilters] = useState({
    ddate: "",
    orderBy: "",
    pdate: "",
    pickUp: ""
  });

  const [dataImgUrls, setDataImgUrls] = React.useState([]);
  const [dataImgNames, setDataImgNames] = React.useState([]);
  const [dataImgInfos, setDataImgInfos] = React.useState([]);
  const [dataCars, setDataCars] = React.useState([]);
  useEffect(() => {
    // console.log("[SearchCars] useEffect called!")
    postGetCarData(dataFilter);
  }, []);

  const postGetCarData = (dataFilter) => {
    return CarDataService.post(dataFilter)
      .then(response => {
        console.log("[SearchCars] postGetCarData dataFilter: " + Object.values(dataFilter));
        console.log(response);
        // console.log("[SearchCars] postGetCarData response data: " + response.data);
        let carData = [];
        let imgUrlData = [];
        let imgNameData = [];
        let imgInfoData = [];
        Array.from(response.data).forEach((e) => {
          carData.push(Object.keys(dataHead).map((head) => {
            return e[head].toString();
          }));
          imgUrlData.push(e.imgUrl);
          imgNameData.push(e.carType);
          imgInfoData.push(`This is ${e.carType}!`);
        });
        setDataCars(carData);
        setDataImgUrls(imgUrlData);
        setDataImgNames(imgNameData);
        setDataImgInfos(imgInfoData);
      });
  }

  const updateTableCarByOrder = (orderBy) => {
    setDataFilters({
      ...dataFilter,
      orderBy: orderBy,
    })
    return postGetCarData(dataFilter);
  };

  const onChangePickUp = (e) => {
    setDataFilters({
      ...dataFilter,
      pickUp: e.target.value,
    })
  }

  const onChangePdate = (e) => {
    setDataFilters({
      ...dataFilter,
      pdate: new Date(e).toLocaleDateString(),
    })
  }

  const onChangeDdate = (e) => {
    setDataFilters({
      ...dataFilter,
      ddate: new Date(e).toLocaleDateString(),
    })
  }

  const onClickButton = () => {
    updateTableCarByOrder();
  };

  const onChangeOrderBy = (e) => {
    console.log("[SearchCars] onChangeOrderBy: " + e)
    updateTableCarByOrder(e);
  }

  return (
    <Grid 
      container item 
      justifyContent="center" 
      alignContent="center"
      alignItems="center"
      textAlign="left"
      xs={12} lg={12} mx="auto" >
      <Grid item xs={12} sm={12} md={12} >
        <FormSearchCars
          onChangePickUp={onChangePickUp}
          onChangePdate={onChangePdate}
          onChangeDdate={onChangeDdate}
          onClickButton={onClickButton}
        />
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
            />
          </MKBox>
        </MKBox>
      </Grid>
    </Grid>
  );
}
