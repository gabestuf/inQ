import SurveyPage from "./pages/SurveyPage/SurveyPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Grid from "@mui/material/Grid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import HomePage from "./pages/HomePage";
import FindSurveyPage from "./pages/FindSurveyPage/FindSurveyPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
            <Route path="/findsurvey" element={<FindSurveyPage />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
            <Route index element={<HomePage />} />
          </Routes>
          <Footer />
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default App;
