import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { FC } from "react";

interface Props2 {
  type: string;
  values: string[];
  answer: string;
  index: number;
  question: string;
  updateQuestion: (answer: string, index: number) => void;
  tipsOn: boolean;
}

const SurveyForm: FC<Props2> = ({ question, type, values, answer, updateQuestion, index, tipsOn }) => {
  switch (type) {
    case "text":
      return <TextField error={answer === "" && tipsOn} helperText={answer === "" ? "fill out all fields" : ""} sx={{ maxWidth: "40rem" }} required size="small" id="filled-basic" label={question} variant="filled" value={answer} onChange={(e) => updateQuestion(e.target.value, index)} />;

    case "radio":
      return (
        <FormControl required sx={{ maxWidth: "40rem" }} error={answer === "" && tipsOn}>
          <FormLabel id="demo-controlled-radio-buttons-group">{question}</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={answer}
            onChange={(e) => {
              updateQuestion(e.target.value, index);
            }}
          >
            {values.map((value, i) => (
              <FormControlLabel key={i} value={value} control={<Radio />} label={value} />
            ))}
          </RadioGroup>
        </FormControl>
      );
    case "longtext":
      return (
        <TextField required error={answer === "" && tipsOn} helperText={answer === "" ? "fill out all fields" : ""} id="filled-basic" label={question} fullWidth sx={{ maxWidth: "50rem" }} variant="filled" multiline minRows={3} value={answer} onChange={(e) => updateQuestion(e.target.value, index)} />
      );
    case "select":
      return (
        <FormControl required sx={{ maxWidth: "40rem", minWidth: "12rem" }} error={answer === "" && tipsOn}>
          <FormLabel id="demo-simple-select-label">{question}</FormLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={answer}
            label={question}
            onChange={(e) => {
              updateQuestion(e.target.value, index);
            }}
          >
            {values.map((value, i) => (
              <MenuItem key={i} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    default:
      return (
        <h2>
          This question could not render: {index}. {question}
        </h2>
      );
  }
};

export default SurveyForm;
