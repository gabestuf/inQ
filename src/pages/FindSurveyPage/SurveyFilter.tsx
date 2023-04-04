import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Switch, TextField } from "@mui/material";
import { FC, useState } from "react";
import { FilterInfo } from "./FilterInterfaces";

interface SurveyFilterProps {
  setFilters: React.Dispatch<React.SetStateAction<FilterInfo>>;
  clearFilters: () => void;
  filters: FilterInfo;
  getSurveys: () => Promise<void>;
}
const FindSurveyFilter: FC<SurveyFilterProps> = ({ filters, clearFilters, setFilters, getSurveys }) => {
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [ownerFilter, setOwnerFilter] = useState<string>("");

  const onSubmitFilterForm = () => {
    if (!titleFilter && !ownerFilter) return;

    setFilters({
      ...filters,
      titleFilter: titleFilter,
      ownerFilter: ownerFilter,
    });
    getSurveys();
  };

  const handleClearFilters = () => {
    setTitleFilter("");
    setOwnerFilter("");
  };

  const handleResetFilters = () => {
    clearFilters();
    setTitleFilter("");
    setOwnerFilter("");
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap="1rem">
      <FormControlLabel control={<Switch checked={filters.hidePrivate} onChange={() => setFilters({ ...filters, hidePrivate: !filters.hidePrivate })} name="jason" />} label="hide private surveys" />
      <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
        <FormControl size="small" sx={{ maxWidth: "40rem", minWidth: "10rem" }}>
          <FormLabel id="demo-simple-select-label"> filter title </FormLabel>
          <TextField value={titleFilter} size="small" onChange={(e) => setTitleFilter(e.target.value)} />
        </FormControl>
        <FormControl size="small" sx={{ maxWidth: "40rem", minWidth: "10rem" }}>
          <FormLabel id="demo-simple-select-label"> filter owner </FormLabel>
          <TextField value={ownerFilter} size="small" onChange={(e) => setOwnerFilter(e.target.value)} />
        </FormControl>
      </Box>

      <Grid display="flex" justifyContent="center" alignItems="flex-end" gap="1rem">
        <Button
          sx={{ maxHeight: "2.5rem" }}
          color="success"
          variant="outlined"
          size="small"
          onClick={() => {
            onSubmitFilterForm();
          }}
        >
          Filter
        </Button>
        <Button
          sx={{ maxHeight: "2.5rem" }}
          variant="outlined"
          size="small"
          onClick={() => {
            handleClearFilters();
          }}
        >
          Clear
        </Button>
        <Button
          sx={{ maxHeight: "2.5rem" }}
          color="warning"
          variant="outlined"
          size="small"
          onClick={() => {
            handleResetFilters();
          }}
        >
          Reset
        </Button>
      </Grid>
    </Box>
  );
};

export default FindSurveyFilter;
