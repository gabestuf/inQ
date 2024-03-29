import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";

interface Question {
  question: string;
  type: string;
  answers: string[];
}
interface Props {
  addQuestion: (q: Question) => void;
  setIsAddingQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddQuestionForm: FC<Props> = ({ addQuestion, setIsAddingQuestion }) => {
  const [addQuestionFormAnswers, setAddQuestionFormAnswers] = useState<Question>({
    question: "",
    type: "text",
    answers: [],
  });

  const [addOptionText, setAddOptionText] = useState<string>("");

  function addOption(value: string) {
    if (!value) return;
    setAddQuestionFormAnswers({
      ...addQuestionFormAnswers,
      answers: [...addQuestionFormAnswers.answers, value],
    });

    //reset option text
    setAddOptionText("");
  }

  const handleAddQuestionSubmit = () => {
    // check if question title is blank
    if (addQuestionFormAnswers.question === "") {
      alert("Please make sure your question has a name");
      return;
    }

    // check if at least one value if requires values
    if (addQuestionFormAnswers.type !== "text" && addQuestionFormAnswers.type !== "longtext") {
      if (!(addQuestionFormAnswers.answers.length > 0)) {
        alert("This question type requires at least one option");
        return;
      }
    }
    addQuestion(addQuestionFormAnswers);
    setIsAddingQuestion(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Divider />
      <Typography variant="h4" textAlign={"center"} sx={{ maxWidth: "50rem" }}>
        Add a question
      </Typography>

      <TextField
        sx={{ maxWidth: "20rem" }}
        required
        type="text"
        size="small"
        id="filled-basic"
        label="Question"
        variant="filled"
        value={addQuestionFormAnswers.question}
        onChange={(e) => {
          setAddQuestionFormAnswers({
            ...addQuestionFormAnswers,
            question: e.target.value,
          });
        }}
      />

      <FormControl fullWidth sx={{ maxWidth: "10rem" }}>
        <InputLabel id="demo-simple-select-label" required>
          Input Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={addQuestionFormAnswers.type}
          label="Input Type"
          onChange={(e) =>
            setAddQuestionFormAnswers({
              ...addQuestionFormAnswers,
              type: e.target.value,
            })
          }
        >
          <MenuItem value={"radio"}>Radio</MenuItem>
          <MenuItem value={"text"}>Text</MenuItem>
          <MenuItem value={"longtext"}>LargeText</MenuItem>
          <MenuItem value={"select"}>Select</MenuItem>
        </Select>
      </FormControl>

      {addQuestionFormAnswers.type.includes("text") ? null : (
        <Fragment>
          <Typography variant="h5">
            Options <Typography sx={{ fontStyle: "italic" }}>(Need at least one)</Typography>
          </Typography>
          <List sx={{ maxWidth: "20rem", borderLeft: "solid thin black" }}>
            {addQuestionFormAnswers.answers.map((q: string, i: number) => (
              <ListItemButton
                key={i}
                sx={{
                  transition: "all 200ms",
                  margin: "none",
                  borderRadius: ".2rem",
                  ":hover": {
                    bgcolor: "error.light",
                  },
                }}
                onClick={() =>
                  setAddQuestionFormAnswers({
                    ...addQuestionFormAnswers,
                    answers: [...addQuestionFormAnswers.answers.filter((e: string) => e !== q)],
                  })
                }
              >
                <ListItem disablePadding>
                  <ListItemText key={i} primary={`${i + 1}. ${q}`} />
                </ListItem>
              </ListItemButton>
            ))}
          </List>

          <TextField
            sx={{ maxWidth: "20rem" }}
            id="standard-basic"
            variant="standard"
            label="Add Option"
            value={addOptionText}
            onChange={(e) => setAddOptionText(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button variant="outlined" size="large" onClick={() => addOption(addOptionText)}>
                  Add
                </Button>
              ),
            }}
          />
        </Fragment>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "20rem",
        }}
      >
        <Button sx={{ maxWidth: "5rem" }} variant="outlined" size="large" onClick={() => handleAddQuestionSubmit()}>
          Finish
        </Button>
        <Button
          sx={{ maxWidth: "5rem" }}
          color="error"
          variant="outlined"
          size="large"
          onClick={() => {
            setIsAddingQuestion(false);
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddQuestionForm;
