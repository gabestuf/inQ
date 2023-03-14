import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { FC, useState } from "react";

interface Props {}
const SurveyPage: FC<Props> = () => {
  const question = "Who would win in a fight?";
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [response, setResponse] = useState<string>("other");

  // There will be a page which gets all questions (with their IDs). The id is stored somewhere and that is how we access the question later
  /*
    const handleSubmitQuestion = async (pass: string) => {
        const body = {
            questionID: questionID,
            surveyer: name,
            password: password,
            answers: answers // a list of objects that have questions as keys and answers as values
        }
        const response = await fetch(URL + "/question/saveResponse")
        const resJSON = await response.json()

        if (resJSON.status === "SUCCESS") {
            alert("Successfully saved response")

            // reset fields
            setName("")
            setPassword("")
            setDescription("")
            setGender("")
            setResponse("")
        }
        if (resJSON.status === "FAILED") {

        }
    }

    */

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <h1>inQ</h1>
      <h2>{question}</h2>
      <TextField
        required
        id="filled-basic"
        label="Surveyer Name"
        variant="filled"
        margin="dense"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FormControl
        margin="normal"
        sx={{
          maxWidth: "50%",
        }}
      >
        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <FormControl
        margin="normal"
        sx={{
          maxWidth: "50%",
        }}
      >
        <FormLabel id="demo-controlled-radio-buttons-group">
          How did they respond to the question?
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={response}
          onChange={(e) => {
            setResponse(e.target.value);
          }}
        >
          <FormControlLabel
            value="serious"
            control={<Radio />}
            label="They took a serious, thoughtful response and answered the question"
          />
          <FormControlLabel
            value="dismissed"
            control={<Radio />}
            label="They are not cool and dismissed the question"
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="They did something completely unexpected (spontaneous combustion, projective vomit, etc...)"
          />
        </RadioGroup>
      </FormControl>

      <TextField
        required
        id="filled-basic"
        label="Notes on Unsolicited Participent"
        fullWidth
        variant="filled"
        multiline
        minRows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          maxWidth: "50%",
        }}
      />
      <Button
        variant="outlined"
        onSubmit={() => {
          const pass = prompt("Not so fast! How do I know you can be trusted?");
          handleSubmitQuestion(pass);
        }}
      >
        Submit
      </Button>
    </Grid>
  );
};

export default SurveyPage;
