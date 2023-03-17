import {
  Button,
  Grid,
  List,
  TextField,
  Typography,
  ListItemButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import AddQuestionForm from "../components/AddQuestionForm";

interface Props {}
interface Question {
  question: string;
  type: string;
  answers: string[];
}
const CreateSurveyPage: FC<Props> = () => {
  const [createSurveyAnswers, setCreateSurveyAnswers] = useState<{
    creatorName: string;
    creatorPassword: string;
    title: string;
    description: string;
    questions: Question[];
  }>({
    creatorName: "",
    creatorPassword: "",
    title: "",
    description: "",
    questions: [],
  });

  const addQuestion = (q: Question) => {
    setCreateSurveyAnswers({
      ...createSurveyAnswers,
      questions: [...createSurveyAnswers.questions, q],
    });
  };

  const removeQuestion = (i: number) => {
    setCreateSurveyAnswers({
      ...createSurveyAnswers,
      questions: [
        ...createSurveyAnswers.questions.filter(
          (question) => question !== createSurveyAnswers.questions[i]
        ),
      ],
    });
  };

  return (
    <Fragment>
      <Grid
        flexGrow={1}
        padding="3rem 4rem"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        gap="1.5rem"
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ maxWidth: "50rem" }}
        >
          Look at that, a survey for creating surveys.
        </Typography>
        <TextField
          sx={{ maxWidth: "40rem" }}
          required
          size="small"
          id="filled-basic"
          label="Creator Name"
          variant="filled"
          value={createSurveyAnswers.creatorName}
          onChange={(e) => {
            setCreateSurveyAnswers({
              ...createSurveyAnswers,
              creatorName: e.target.value,
            });
          }}
        />
        <TextField
          sx={{ maxWidth: "40rem" }}
          required
          type="password"
          size="small"
          id="filled-basic"
          label="Survey Password"
          variant="filled"
          value={createSurveyAnswers.creatorPassword}
          onChange={(e) => {
            setCreateSurveyAnswers({
              ...createSurveyAnswers,
              creatorPassword: e.target.value,
            });
          }}
        />
        <TextField
          sx={{ maxWidth: "40rem" }}
          required
          type="text"
          size="small"
          id="filled-basic"
          label="Survey Title"
          variant="filled"
          value={createSurveyAnswers.title}
          onChange={(e) => {
            setCreateSurveyAnswers({
              ...createSurveyAnswers,
              title: e.target.value,
            });
          }}
        />

        <TextField
          id="filled-basic"
          label="description"
          fullWidth
          sx={{ maxWidth: "30rem" }}
          variant="filled"
          multiline
          minRows={3}
          value={createSurveyAnswers.description}
          onChange={(e) =>
            setCreateSurveyAnswers({
              ...createSurveyAnswers,
              description: e.target.value,
            })
          }
        />

        <List sx={{ maxWidth: "20rem", borderLeft: "solid thin black" }}>
          {createSurveyAnswers.questions.map((q, i) => (
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
              onClick={() => removeQuestion(i)}
            >
              <ListItem disablePadding>
                <ListItemText key={i} primary={`${i + 1}. ${q.question}`} />
              </ListItem>
            </ListItemButton>
          ))}
        </List>

        <AddQuestionForm addQuestion={addQuestion} />

        <Button
          color="success"
          variant="outlined"
          size="large"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          Create Survey
        </Button>
      </Grid>
    </Fragment>
  );
};

export default CreateSurveyPage;
