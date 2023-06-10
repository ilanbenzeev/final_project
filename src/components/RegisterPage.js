import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [landline, setLandline] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [infected, setInfected] = useState(false);
  const [conditions, setConditions] = useState([]);
  const [otherConditions, setOtherConditions] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const citizen = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      address: address,
      city: city,
      zipCode: zipCode,
      landLine: landline,
      cellularPhone: cellPhone,
      infectedByCovid19: infected,
      diabetes: conditions.includes("diabetes"),
      cardioVascularProblems: conditions.includes("cardio"),
      allergies: conditions.includes("allergies"),
      other: otherConditions,
    };

    try {
      await fetch(`/Citizen/add-citizen`, {
        method: "POST",
        body: JSON.stringify(citizen),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAddedSuccessfully(true);
      setTimeout(() => {
        navigate("/summary");
      }, 4000);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column h-100 justify-content-center align-items-center align-self-center">
            <div className="card">
              <div className="text-center">
                <h1>Registration Page</h1>
              </div>
              <div className="text-center h5 mb-5 mt-2">
                <Link to="/summary">Go to Summary page</Link>
              </div>
              {addedSuccessfully && (
                <h3 className="text-success mb-2">
                  Added successfully, redirecting to summary page
                </h3>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-row justify-content-center d-flex flex-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">
                      First Name:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group ms-3">
                    <label className="form-label" htmlFor="lastName">
                      Last Name:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row justify-content-center d-flex flex-row mt-3">
                  <div className="form-group">
                    <label className="form-label" htmlFor="dob">
                      Date of Birth:
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      id="dob"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group ms-3">
                    <label className="form-label" htmlFor="address">
                      Address:
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="form-row justify-content-center d-flex flex-row mt-3 mb-3">
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">
                      City:
                    </label>
                    <select
                      className="form-control "
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    >
                      <option value="">Select a city</option>
                      <option value="תל אביב">תל אביב</option>
                      <option value="ירושלים">ירושלים</option>
                      <option value="ראשון לציון">ראשון לציון</option>
                      <option value="הרצליה">הרצליה</option>
                      <option value="נצרת">נצרת</option>
                      <option value="אילת">אילת</option>
                      <option value="אשדוד">אשדוד</option>
                      <option value="באר שבע">באר שבע</option>
                      <option value="חיפה">חיפה</option>
                      <option value="דימונה">דימונה</option>
                      <option value="אשקלון">אשקלון</option>
                      <option value="נתניה">נתניה</option>
                      <option value="טבריה">טבריה</option>
                      <option value="נהריה">נהריה</option>
                      <option value="מודיעין">מודיעין</option>
                    </select>
                  </div>
                  <div className="form-group ms-4">
                    <label className="form-label" htmlFor="zipCode">
                      Zip Code (optional):
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="zipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row justify-content-center d-flex flex-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="landline">
                      Landline:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="landline"
                      value={landline}
                      onChange={(e) => setLandline(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group ms-3">
                    <label className="form-label" htmlFor="cellPhone">
                      Cellular Phone:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="cellPhone"
                      value={cellPhone}
                      onChange={(e) => setCellPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row justify-content-center d-flex flex-row mt-2">
                  <div className="form-group">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="infected"
                      checked={infected}
                      onChange={(e) => setInfected(e.target.checked)}
                    />
                    <label className="form-label ms-2" htmlFor="infected">
                      Have you been infected by COVID-19 before?
                    </label>
                  </div>
                </div>
                <div className="form-row justify-content-center d-flex flex-row">
                  <div className="form-group">
                    <label className="form-label h4">
                      Previous conditions:
                    </label>
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="diabetes"
                        checked={conditions.includes("diabetes")}
                        onChange={() => {
                          if (conditions.includes("diabetes")) {
                            setConditions(
                              conditions.filter(
                                (condition) => condition !== "diabetes"
                              )
                            );
                          } else {
                            setConditions([...conditions, "diabetes"]);
                          }
                        }}
                      />
                      <label className="form-label ms-2" htmlFor="diabetes">
                        Diabetes
                      </label>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="cardio"
                        checked={conditions.includes("cardio")}
                        onChange={() => {
                          if (conditions.includes("cardio")) {
                            setConditions(
                              conditions.filter(
                                (condition) => condition !== "cardio"
                              )
                            );
                          } else {
                            setConditions([...conditions, "cardio"]);
                          }
                        }}
                      />
                      <label className="form-label ms-2" htmlFor="cardio">
                        Cardio-Vascular problems
                      </label>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="allergies"
                        checked={conditions.includes("allergies")}
                        onChange={() => {
                          if (conditions.includes("allergies")) {
                            setConditions(
                              conditions.filter(
                                (condition) => condition !== "allergies"
                              )
                            );
                          } else {
                            setConditions([...conditions, "allergies"]);
                          }
                        }}
                      />
                      <label className="form-label ms-2" htmlFor="allergies">
                        Allergies
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-row justify-content-center d-flex flex-row">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="otherConditions"
                    checked={conditions.includes("other")}
                    onChange={() => {
                      if (conditions.includes("other")) {
                        setConditions(
                          conditions.filter(
                            (condition) => condition !== "other"
                          )
                        );
                      } else {
                        setConditions([...conditions, "other"]);
                      }
                    }}
                  />
                  <label className="form-label ms-2" htmlFor="otherConditions">
                    Other:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="otherConditionsText"
                    value={otherConditions}
                    onChange={(e) => setOtherConditions(e.target.value)}
                    disabled={!conditions.includes("other")}
                  />
                </div>
                <div className="form-row d-flex justify-content-center mt-3 mb-2">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
