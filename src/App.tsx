import SurveyPage from "./pages/SurveyPage";
import { AppContext } from "./AppContext.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Grid from "@mui/material/Grid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import HomePage from "./pages/HomePage";

function App() {
  const prod = true;
  const url = prod ? "https://gabestuf.com/inq" : "http://localhost:3000/inq";
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ url: url }}>
          <Grid
            container
            spacing={0}
            sx={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Header />
            <Routes>
              <Route path="/createsurvey" element={<CreateSurveyPage />} />
              <Route path="/survey" element={<Navigate replace to="/createsurvey" />} />
              <Route path="/survey/:id" element={<SurveyPage />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate replace to="/404" />} />
              <Route index element={<HomePage />} />
            </Routes>
            <Footer />
          </Grid>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
