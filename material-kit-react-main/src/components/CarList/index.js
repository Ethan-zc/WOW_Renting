import React, { Component } from "react";
import CarDataService from "services/trip.service";
import { Link } from "react-router-dom";

export default class CarList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchKeyword = this.onChangeSearchKeyword.bind(this);
    this.retrieveCar = this.retrieveCar.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCar = this.setActiveCar.bind(this);
    this.removeAllCar = this.removeAllCar.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);

    this.state = {
      car: [],
      currentCar: null,
      currentIndex: -1,
      searchKeyword: "",
    };
  }

  componentDidMount() {
    this.retrieveCar();
  }

  onChangeSearchKeyword(e) {
    const searchKeyword = e.target.value;

    this.setState({ searchKeyword: searchKeyword });
  }

  setActiveCar(car, index) {
    this.setState({
      currentCar: car,
      currentIndex: index,
    });
  }

  refreshList() {
    this.retrieveCar();
    this.setState({
      currentCar: null,
      currentIndex: -1,
    });
  }

  retrieveCar() {
    CarDataService.getAll()
      .then((response) => {
        this.setState({
          car: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeAllCar() {
    CarDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchKeyword() {
    this.setState({
      currentCar: null,
      currentIndex: -1,
    });

    CarDataService.findByKeyword(this.state.searchKeyword)
      .then(response => {
        this.setState({
          car: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchKeyword, car, currentCar, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchKeyword}
              onChange={this.onChangeSearchKeyword}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchKeyword}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Car List</h4>

          <ul className="list-group">
            {car &&
              car.map((car, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCar(car, index)}
                  key={index}
                >
                  {car.country}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCar}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCar ? (
            <div>
              <h4>Car</h4>
              <div>
                <label>
                  <strong>Street:</strong>
                </label>{" "}
                {currentCar.street}
              </div>
              <div>
                <label>
                  <strong>State:</strong>
                </label>{" "}
                {currentCar.state}
              </div>
              <div>
                <label>
                  <strong>Country:</strong>
                </label>{" "}
                {currentCar.country}
              </div>
              <div>
                <label>
                  <strong>Zipcode:</strong>
                </label>{" "}
                {currentCar.zipcode}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCar.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/car/" + currentCar.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Car...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
