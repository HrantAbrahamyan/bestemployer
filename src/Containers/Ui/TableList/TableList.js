import React, { Component } from "react";
import axios from "../../../axios-workers";

import notification from "../../../assets/img/notification.svg";
import user from "../../../assets/img/user.svg";
import "./TableList.css";

import Table from "../../../Components/Table/Table";
import Aux from "../../../hoc/Aux/Aux";
import Spinner from "../Spinner/Spinner";

class TableList extends Component {
  state = {
    workers: null,
    loading: false,
    purchaseFail: false,
    name: "",
    surname: "",
    month: 1,
    day: 1,
    year: 1864,
    gender: "Male",
    position: "front-end developer",
    salary: "",
    search: "",
    salaryFilter: "Max"
  };

  componentDidMount() {
    this.getWorkerHandler();
  }

  getWorkerHandler = () => {
    axios
    .get("https://bestemployeroftheworld.firebaseio.com/Employees.json")
    .then(response => {
      this.setState({
        workers: response.data,
        loading: false
      });
    })
    .catch(error => {
      this.setState({
        loading: false,
        purchaseFail: true
      });
    });
  }

  addWorkerHandler = () => {
    this.setState({
      loading: true,
      name: "",
      surname: "",
      month: 1,
      day: 1,
      year: 1864,
      gender: "Male",
      position: "front-end developer",
      salary: "",
    });
    let diff = new Date() - new Date(`${this.state.year}-${this.state.month}-${this.state.day}`);
    let diffdays = diff / 1000 / (60 * 60 * 24);
    let age = Math.floor(diffdays / 365.25) + '';
    const employe = {
      Id: (this.state.workers.length+1).toString(),
      Name: this.state.name,
      Surname: this.state.surname,
      Age: age,
      Gender: this.state.gender,
      Position: this.state.position,
      Salary: this.state.salary + '$'
    };
    axios
      .patch("/Employees/"+this.state.workers.length +".json", employe)
      .then(response => {
        this.getWorkerHandler();
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchaseFail: true
        });
      });
  };

  nameChangeHandler = event => {
    this.setState({
      name: event.target.value
    });
  };

  surnameChangeHandler = event => {
    this.setState({
      surname: event.target.value
    });
  };

  dayChangeHandler = event => {
    this.setState({
      day: event.target.value
    });
  };

  monthChangeHandler = event => {
    this.setState({
      month: event.target.value
    });
  };

  yearChangeHandler = event => {
    this.setState({
      year: event.target.value
    });
  };

  positionChangeHandler = event => {
    this.setState({
      position: event.target.value
    });
  };

  genderChangeHandler = event => {
    this.setState({
      gender: event.target.value
    });
  };

  mainSearchHandler = event => {
    this.setState({
      search: event.target.value
    });
  };

  salaryChangeHandler = (event) => {
    
      this.setState({
        salary: event.target.value
      })
    
  }
  
  salaryFilterChangeHandler = (event) => {
    this.setState({
      salaryFilter: event.target.value
    })
    let salary = [...this.state.workers];
    salary.sort((a, b) => {
          if(this.state.salaryFilter === 'Max') {
            return parseInt(a.Salary) - parseInt(b.Salary)
          }
          if(this.state.salaryFilter === 'Min') {
            return parseInt(b.Salary) - parseInt(a.Salary)
          }
    });
    this.setState({
      workers: salary
    })
  }

 

  render() {
    let tableList = <Spinner />;
    let workersTitleArray = [];
    let workersTitle = null;
    let filteredWorkList = null;
    let dayCountList = [];
    let dayCount = null;
    let mounthCountList = [];
    let mounthCount = null;
    let yearCountList = [];
    let yearCount = null;
    let workerList = null;

    if (this.state.workers) {
      for (let key in this.state.workers[0]) {
        workersTitleArray.push(key);
      }
      workersTitle = workersTitleArray.map(title => {
        if(title === 'Salary') {
          return (
            <th key={title} scope="col">
              <select value={this.state.salaryFilter} onChange={this.salaryFilterChangeHandler} className="w-100">
                <option value="Max">Max</option>
                <option value="Min">Min</option>
              </select>
              <label className="d-block">{title}</label>
          </th>
          )
        }
        return (
          <th key={title} scope="col">
            {title}
          </th>
        );
      });

      filteredWorkList = [...this.state.workers];
      filteredWorkList.sort((a, b) => {
        for (let key in a) {
          if (
            a[key]
              .toLocaleLowerCase()
              .indexOf(this.state.search.toLocaleLowerCase()) <
            b[key]
              .toLocaleLowerCase()
              .indexOf(this.state.search.toLocaleLowerCase())
          )
            return 1;
          if (
            a[key]
              .toLocaleLowerCase()
              .indexOf(this.state.search.toLocaleLowerCase()) >
            b[key]
              .toLocaleLowerCase()
              .indexOf(this.state.search.toLocaleLowerCase())
          )
            return -1;
        }
      });

      workerList = filteredWorkList.map(workerlist => {
        return (
          <Table
            key={workerlist.Id}
            age={workerlist.Age}
            gender={workerlist.Gender}
            id={workerlist.Id}
            name={workerlist.Name}
            position={workerlist.Position}
            salary={workerlist.Salary}
            surname={workerlist.Surname}
          />
        );
      });

      for (
        let i = 1;
        i <= new Date(this.state.year, this.state.month, 0).getDate();
        i++
      ) {
        dayCountList.push(i);
      }
      dayCount = dayCountList.map((item, i) => {
        return <option key={item + i}>{item}</option>;
      });

      for (let i = 1; i <= 12; i++) {
        mounthCountList.push(i);
      }

      mounthCount = mounthCountList.map((item, i) => {
        return <option key={item + i}>{item}</option>;
      });

      for (let i = 1964; i <= new Date().getFullYear()-18; i++) {
        yearCountList.push(i);
      }

      yearCount = yearCountList.map((item, i) => {
        return <option key={item + i}>{item}</option>;
      });

      tableList = (
        <Aux>
          <div className="row search__wrraper">
            <div className="col-12  d-flex justify-content-between">
              <div>
                <span>Lorem Ipsum</span>
                <img className="profile_icons pl-3" src={user} alt="" />
                <img className="profile_icons pl-3" src={notification} alt="" />
              </div>
              <div className="pt-2">
                <input
                  value={this.state.search}
                  onChange={this.mainSearchHandler}
                  type="text"
                  placeholder="Search..."
                  className="main_search"
                />
              </div>
            </div>
          </div>
          <div className="row main_wrraper">
            <div className="col-12 order-12 order-lg-0 col-lg-8">
              <table className="table table-bordered">
                <thead>
                  <tr>{workersTitle}</tr>
                </thead>
                <tbody>{workerList}</tbody>
              </table>
            </div>
            <div className="col-12 col-lg-4 settings__wrraper pt-5">
            <label>Name</label>
              <input
                type="text"
                value={this.state.name}
                onChange={this.nameChangeHandler}
                placeholder="name"
                className="w-100 d-block name_change"
              />
              {this.state.name.length <= 0 ?<span className="d-block required">is required</span> : null}
              <label className="mt-4">Surname</label>
              <input
                type="text"
                value={this.state.surname}
                onChange={this.surnameChangeHandler}
                placeholder="surname"
                className="w-100 d-block  name_change"
              />
              {this.state.surname.length <= 0 ? <span className="d-block required mb-5">is required</span> : null}
              <label className="d-block">Age</label>
             
              <form className="d-inline-block mr-4">
                <select
                  className="day_change w-100 pr-3"
                  onChange={this.dayChangeHandler}
                  value={this.state.day}
                >
                  {dayCount}
                </select>
                <label className="d-block">Day</label>
              </form>
              <form className="d-inline-block mr-4">
                <select
                  className="month_change w-75"
                  onChange={this.monthChangeHandler}
                  value={this.state.month}
                >
                  {mounthCount}
                </select>
                <label className="d-block">Month</label>
              </form>
              <form className="d-inline-block ">
                <select
                  className="year_change w-100 pr-3"
                  onChange={this.yearChangeHandler}
                  value={this.state.year}
                >
                  {yearCount}
                </select>
                <label className="d-block">Year</label>
              </form>
              <label className="d-block">Gender</label>
              <form className="d-block">
                <label className="mr-1" htmlFor="Female">Male</label>
                <input
                  type="radio"
                  checked={true}
                  className="gender_change "
                  name="gender"
                  onChange={this.genderChangeHandler}
                  value="male"
                />
                <div>
                <label className="mr-1" htmlFor="Female">Female</label>
                <input
                  type="radio"
                  className="gender_change"
                  name="gender"
                  onChange={this.genderChangeHandler}
                  value="female"
                />
                </div>
              </form>
              <form>
              <select
                onChange={this.positionChangeHandler}
                value={this.state.position}
                className="position_selector"
              >
                <option>Front-end developer</option>
                <option>Full-stack developer</option>
                <option>Back-end developer</option>
                <option>Sales-manager</option>
                <option>QA</option>
                <option>SEO</option>
                <option>Project-manager</option>
                <option>Sales-manager</option>
                <option>Team-lead</option>
              </select>
              </form>
              <label className="d-block">Salary</label>
              <form>
                <input onChange={this.salaryChangeHandler} value={this.state.salary} type="number" placeholder="$" />
                {this.state.salary.length <= 0 ?<span className="d-block required">is required</span>:null}
              </form>
              <button className={this.state.name.length === 0 || this.state.surname.length === 0 || this.state.salary.length === 0 ? 'disabled' : 'add'} disabled={this.state.name.length === 0 || this.state.surname.length === 0 || this.state.salary.length === 0} onClick={this.addWorkerHandler}>Add Employe</button>
            </div>
          </div>
        </Aux>
      );
    }

    if (this.state.loading) {
      tableList = <Spinner />;
    }

    if (this.state.purchaseFail) {
      tableList = (
        <h1 className="text-center">
          There Is Something Wrong With Network Connections... Please Contact
          Your Provider!
        </h1>
      );
    }
    
    return (
      <Aux>
         {tableList}
      </Aux>
    );
  }
}

export default TableList;
