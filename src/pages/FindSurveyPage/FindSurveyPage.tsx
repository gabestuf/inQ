import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import URL from "../../URLS";
const PAGESIZE = 3;
import FindSurveyTable from "./SurveyTable";
import FindSurveyFilter from "./SurveyFilter";

import { SurveyInfo, FilterInfo } from "./FilterInterfaces";

interface Props {}

const FindSurveyPage: FC<Props> = () => {
  const [filters, setFilters] = useState<FilterInfo>({
    hidePrivate: false,
    page: 0,
    titleFilter: "",
    ownerFilter: "",
  });
  const [surveyList, setSurveyList] = useState<SurveyInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initially retrieve surveys
  useEffect(() => {
    getSurveys();
  }, []);

  useEffect(() => {
    getSurveys();
    setFilters({
      ...filters,
      page: 0,
    });
  }, [filters.titleFilter, filters.ownerFilter, filters.hidePrivate]);

  const getSurveys = async () => {
    setIsLoading(true);
    const response = await fetch(URL + "/survey/getAllSurveyInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: filters.page,
        titleFilter: filters.titleFilter,
        ownerFilter: filters.ownerFilter,
        hidePrivate: filters.hidePrivate,
      }),
    });

    const resJSON = await response.json();

    console.log(resJSON);

    if (resJSON.status === "SUCCESS") {
      setSurveyList(resJSON.body);
    }
    if (resJSON.status === "FAILED") {
      const str = `We're sorry, there has been an error retrieving survey data | ${resJSON.message}`;
      alert(str);
    }
    setIsLoading(false);
  };

  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      page: page,
    });
  };

  const clearFilters = () => {
    setFilters({
      ...filters,
      ownerFilter: "",
      titleFilter: "",
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ flex: 1, gap: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FindSurveyFilter clearFilters={clearFilters} filters={filters} setFilters={setFilters} getSurveys={getSurveys} />
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  if (surveyList.length === 0 && !isLoading) {
    return (
      <Box sx={{ flex: 1, gap: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FindSurveyFilter clearFilters={clearFilters} filters={filters} setFilters={setFilters} getSurveys={getSurveys} />
        <Typography variant="h5">No surveys found. Try a different query</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, gap: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <FindSurveyFilter clearFilters={clearFilters} filters={filters} setFilters={setFilters} getSurveys={getSurveys} />
      <FindSurveyTable PAGESIZE={PAGESIZE} surveyList={surveyList} filters={filters} />
      <Stack spacing={2}>
        <Pagination count={Math.ceil(surveyList.length / PAGESIZE)} page={filters.page + 1} onChange={(e, pageNum) => handlePageChange(pageNum - 1)} shape="rounded" />
      </Stack>
    </Box>
  );
};

export default FindSurveyPage;
