import { Fragment } from "react";
import RegisterPage from "./components/RegisterPage";
import SummaryPage from "./components/SummaryPage";
import { Route, Routes } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route exact path="/" element={<RegisterPage />} />
        <Route exact path="/summary" element={<SummaryPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
