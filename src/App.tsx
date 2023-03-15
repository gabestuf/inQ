import { useState } from "react";
import SurveyPage from "./pages/SurveyPage";
import { AppContext } from "./AppContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Grid from "@mui/material/Grid";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const local = "http://localhost:3000";
  const prod = "https://gabestuf.com";
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ url: local }}>
          <Grid container spacing={0} sx={{ minHeight: "100vh", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
            <Header />
            <Routes>
              <Route index element={<SurveyPage />} />
              <Route path="/survey/:id" element={<SurveyPage />} />
              <Route path="/404" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Grid>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
