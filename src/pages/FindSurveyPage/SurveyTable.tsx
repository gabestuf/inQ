import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyInfo } from "./FilterInterfaces";

interface SurveyTableProps {
  surveyList: SurveyInfo[];
  filters: {
    page: number;
    titleFilter: string;
    ownerFilter: string;
  };
  PAGESIZE: number;
}

const FindSurveyTable: FC<SurveyTableProps> = ({ surveyList, filters, PAGESIZE }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ display: "flex", justifyContent: "center" }}>
      <Table sx={{ minWidth: 650, maxWidth: "1000px" }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#eee" }}>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Private</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {surveyList.slice(filters.page * PAGESIZE, filters.page * PAGESIZE + PAGESIZE).map((survey, i) => (
            <TableRow
              key={i}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                ":hover": {
                  cursor: "pointer",
                  backgroundColor: "rgba(0,0,0,.1)",
                },
              }}
              onClick={() => {
                console.log(survey._id);
                navigate(`/survey/${survey._id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {survey.title}
              </TableCell>
              <TableCell align="left" sx={{ overflow: "hidden" }}>
                {survey.description}
              </TableCell>
              <TableCell align="right">{survey.owner}</TableCell>
              <TableCell align="right">{survey.isPrivate ? "true" : "false"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FindSurveyTable;
