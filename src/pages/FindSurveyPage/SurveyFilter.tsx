import { Box, Button, FormControl, FormControlLabel, FormLabel, Switch, TextField } from "@mui/material";
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
    <Box display="flex" gap="1rem" sx={{ margin: "1rem 0rem" }}>
      <FormControlLabel control={<Switch checked={filters.hidePrivate} onChange={() => setFilters({ ...filters, hidePrivate: !filters.hidePrivate })} name="jason" />} label="hide private surveys" />
      <FormControl sx={{ maxWidth: "40rem", minWidth: "12rem" }}>
        <FormLabel id="demo-simple-select-label"> filter title </FormLabel>
        <TextField value={titleFilter} size="small" onChange={(e) => setTitleFilter(e.target.value)} />
      </FormControl>
      <FormControl sx={{ maxWidth: "40rem", minWidth: "12rem" }}>
        <FormLabel id="demo-simple-select-label"> filter owner </FormLabel>
        <TextField value={ownerFilter} size="small" onChange={(e) => setOwnerFilter(e.target.value)} />
      </FormControl>

      <Box display="flex" alignItems="end" gap="1rem">
        <Button
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
          variant="outlined"
          size="small"
          onClick={() => {
            handleClearFilters();
          }}
        >
          Clear
        </Button>
        <Button
          color="warning"
          variant="outlined"
          size="small"
          onClick={() => {
            handleResetFilters();
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default FindSurveyFilter;
