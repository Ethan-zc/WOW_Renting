import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";

// import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import ExampleCar from "pages/Trip/components/ExampleCar";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

// custom table pagination
function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box width="100%" sx={{ flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
      <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
      <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
      <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
      <LastPageIcon />
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles(styles);

export default function TableViewCars(props) {
  const classes = useStyles();
  const { 
    tableHead,
    tableData,
    tableHeaderColor,
    imgUrls,
    imgNames,
    imgInfos,
    onChangeOrderBy
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [imgBg, setImageBg] = React.useState("");
  const [imgName, setImageName] = React.useState("");
  const [imgInfo, setImageInfo] = React.useState("");

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOnRow = (e) => {
    setImageBg(imgUrls[page * rowsPerPage + e]);
    setImageName(imgNames[page * rowsPerPage + e]);
    setImageInfo(imgInfos[page * rowsPerPage + e]);
  };

  const handleOnChangeOrderBy = (e) => {
    console.log("[TableViewCars] handleOnChangeOrderBy: " + e)
    onChangeOrderBy(e);
  }

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} sm={8} md={8}>
        <TableContainer>
          <Table>
            {tableHead !== undefined ? (
              <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                <TableRow>
                  {Object.keys(tableHead).map((prop, index) => {
                    return (
                      <TableCell 
                        size="medium"
                        key={index}>
                        <TableSortLabel
                          hideSortIcon={true}
                          onClick={() => handleOnChangeOrderBy(prop)}
                        >
                          {tableHead[prop]}
                        </TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {(rowsPerPage > 0
                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : tableData
                ).map((prop, key) => {
                return (
                  <TableRow 
                    key={key}
                    className={classes.tableBodyRow}
                    hover
                    onClick={() => handleClickOnRow(key)}
                    >
                    {prop.map((prop, key) => {
                      return (
                        <TableCell 
                          size="small"
                          key={key}
                        >
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={7}
                  count={tableData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    // className: classes.TablePagination,
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        {imgBg === "" ?
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            minHeight="10rem"
            sx={{
              overflow: "hidden",
              transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
              transformOrigin: "50% 0",
              backfaceVisibility: "hidden",
              willChange: "transform, box-shadow",
              transition: "transform 200ms ease-out",
            }}
          >
            <MKTypography variant="h1" color="dark" fontWeight="bold" ml={2}>
              Please click see more
            </MKTypography>
          </MKBox>
          :
          <Link to={"/authentication/sign-in"}>
            {/* FIXME: check authentication */}
            <ExampleCar image={imgBg} name={imgName} info={imgInfo}/>
          </Link>
        }
      </Grid>
    </Grid>
  );
}

TableViewCars.defaultProps = {
  tableHeaderColor: "gray",
};

TableViewCars.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.object,
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  imgUrls: PropTypes.arrayOf(PropTypes.string),
  imgNames: PropTypes.arrayOf(PropTypes.string),
  imgInfos: PropTypes.arrayOf(PropTypes.string),
};
