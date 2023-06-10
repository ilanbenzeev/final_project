import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SummaryPage = () => {
  const [tableValues, setTableValues] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [cityOption, setCityOption] = useState("");
  const [fromDateOption, setFromDateOption] = useState("");
  const [toDateOption, setToDateOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetch("/Citizen", {
          method: "GET",
        });
        const citizens = await fetchedData.json();
        setTableValues(citizens);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchBy === "") {
      try {
        const fetchedData = await fetch("/Citizen", {
          method: "GET",
        });
        const citizens = await fetchedData.json();
        setTableValues(citizens);
      } catch (err) {
        console.log(err);
        throw err;
      }
      return;
    } else if (
      searchBy === "By date" &&
      (fromDateOption === "" || toDateOption === "")
    )
      return;
    else if (searchBy === "By city" && cityOption === "") return;

    console.log(searchBy);
    console.log(fromDateOption, "        ", toDateOption);

    if (searchBy === "By date") {
      try {
        const fetchedData = await fetch(
          `/Citizen/get-citizens-by-dates?fromDate=${fromDateOption}&toDate=${toDateOption}`
        );
        const citizensByDate = await fetchedData.json();
        setTableValues(citizensByDate);
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else if (searchBy === "By city") {
      try {
        const fetchedData = await fetch(
          `/Citizen/get-citizens-by-city?city=${cityOption}`
        );
        const citizensByCity = await fetchedData.json();
        setTableValues(citizensByCity);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  const setSearch = async (option) => {
    try {
      const fetchedData = await fetch("/Citizen", {
        method: "GET",
      });
      const citizens = await fetchedData.json();
      setTableValues(citizens);
    } catch (err) {
      console.log(err);
      throw err;
    }
    setSearchBy(option);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column h-100 justify-content-center align-items-center align-self-center">
            <div className="text-center">
              <h1>Summary Page</h1>
            </div>
            <div className="text-center h5 mb-2 mt-2">
              <Link to="/">Go to Registration page</Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <label className="form-label me-2" htmlFor="search">
                  Search by:
                </label>
                <select
                  className="form-select"
                  id="search"
                  value={searchBy}
                  onChange={(e) => setSearch(e.target.value)}
                >
                  <option value="">Choose search option</option>
                  <option value="By date">By date</option>
                  <option value="By city">By city</option>
                </select>
              </div>
              {searchBy === "By date" && (
                <div className="mt-3">
                  <label className="form-label me-2" htmlFor="date1">
                    From date:
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    id="date1"
                    value={fromDateOption}
                    onChange={(e) => setFromDateOption(e.target.value)}
                  />
                  <label className="form-label me-2 mt-2" htmlFor="date2">
                    To date:
                  </label>
                  <input
                    value={toDateOption}
                    className="form-control"
                    type="date"
                    id="date2"
                    onChange={(e) => setToDateOption(e.target.value)}
                  />
                </div>
              )}
              {searchBy === "By city" && (
                <div className="mt-3">
                  <label className="form-label me-2" htmlFor="cityOption">
                    Enter city:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="cityOption"
                    value={cityOption}
                    onChange={(e) => setCityOption(e.target.value)}
                  />
                </div>
              )}
              <button className="btn btn-primary btn-md form-control mt-3">
                Submit
              </button>
            </form>
            <table className="table table-bordered mt-4">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Date of birth</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Zip Code</th>
                  <th scope="col">Land line</th>
                  <th scope="col">Cellular phone</th>
                  <th scope="col">Infected by Covid-19 before</th>
                  <th scope="col">Diabetes</th>
                  <th scope="col">Cardio vascular problems</th>
                  <th scope="col">allergies</th>
                  <th scope="col">Other</th>
                </tr>
              </thead>
              <tbody>
                {tableValues.length &&
                  tableValues.map((tableRow, index) => {
                    const date = new Date(tableRow.dateOfBirth);
                    const formattedDate = date.toLocaleDateString();
                    return (
                      <tr>
                        <td className="font-weight-bold">{index + 1}</td>
                        <td key={"firstName" + index}>{tableRow.firstName}</td>
                        <td key={"lastName" + index}>{tableRow.lastName}</td>
                        <td key={"dateOfBirth" + index}>{formattedDate}</td>
                        <td key={"address" + index}>{tableRow.address}</td>
                        <td key={"city" + index}>{tableRow.city}</td>
                        <td key={"zipCode" + index}>{tableRow.zipCode}</td>
                        <td key={"landLine" + index}>{tableRow.landLine}</td>
                        <td key={"cellularPhone" + index}>
                          {tableRow.cellularPhone}
                        </td>
                        <td key={"infectedByCovid19" + index}>
                          {tableRow.infectedByCovid19 ? "Yes" : "No"}
                        </td>
                        <td key={"diabetes" + index}>
                          {tableRow.diabetes ? "Yes" : "No"}
                        </td>
                        <td key={"cardioVascularProblems" + index}>
                          {tableRow.cardioVascularProblems ? "Yes" : "No"}
                        </td>
                        <td key={"allergies" + index}>
                          {tableRow.allergies ? "Yes" : "No"}
                        </td>
                        <td key={"other" + index}>
                          {tableRow.other ? tableRow.other : "No"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
