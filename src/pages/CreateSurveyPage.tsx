import { Button, Grid, List, TextField, Typography, ListItemButton, ListItem, ListItemText, Switch, FormGroup, FormControlLabel, Divider, Box } from "@mui/material";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import AddQuestionForm from "../components/AddQuestionForm";
import { Question } from "../components/QuestionsInterface";

interface Props {}

const CreateSurveyPage: FC<Props> = () => {
  const appInfo = useContext(AppContext);
  const navigate = useNavigate();

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

  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(true);

  // Set password to nothing is not private
  useEffect(() => {
    if (!isPrivate) {
      createSurveyAnswers.creatorPassword = "";
    }
  }, [isPrivate]);

  const addQuestion = (q: Question) => {
    // check if question with same name exists
    for (const ques of createSurveyAnswers.questions) {
      if (q.question === ques.question) {
        alert("Question with same name already exists! Pls rename your question");
        return;
      }
    }

    setCreateSurveyAnswers({
      ...createSurveyAnswers,
      questions: [...createSurveyAnswers.questions, q],
    });
  };

  const removeQuestion = (i: number) => {
    setCreateSurveyAnswers({
      ...createSurveyAnswers,
      questions: [...createSurveyAnswers.questions.filter((question) => question !== createSurveyAnswers.questions[i])],
    });
  };

  const handleCreateSurvey = async () => {
    console.log(createSurveyAnswers);
    if (!isPrivate) {
      createSurveyAnswers.creatorPassword = "";
    }
    const response = await fetch(appInfo.url + "/survey/createSurvey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creator: createSurveyAnswers.creatorName,
        password: createSurveyAnswers.creatorPassword,
        title: createSurveyAnswers.title,
        description: createSurveyAnswers.description,
        questions: createSurveyAnswers.questions,
        isPrivate: isPrivate,
      }),
    });
    const resJSON = await response.json();

    if (resJSON.status === "SUCCESS") {
      navigate(`/survey/${resJSON.data.id}`);
    }
    if (resJSON.status === "FAILED") {
      alert(resJSON.message);
    }
  };

  return (
    <Fragment>
      <Grid flexGrow={1} padding="3rem 4rem" container spacing={0} direction="column" alignItems="center" gap="1.5rem">
        <Typography variant="h4" textAlign={"center"} sx={{ maxWidth: "50rem" }}>
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
        <FormGroup>
          <FormControlLabel control={<Switch value={isPrivate} defaultChecked={true} onChange={(e) => setIsPrivate(e.target.value === "false")} />} label="Private" />
        </FormGroup>
        {isPrivate && (
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
        )}

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

        <Divider />
        <Box>
          <Typography variant="h5">Question List:</Typography>
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
        </Box>

        {isAddingQuestion ? (
          <AddQuestionForm addQuestion={addQuestion} setIsAddingQuestion={setIsAddingQuestion} />
        ) : (
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => {
              setIsAddingQuestion(true);
            }}
          >
            Add Question
          </Button>
        )}

        {createSurveyAnswers.questions.length > 0 ? (
          <Button
            color="success"
            variant="outlined"
            size="large"
            onClick={() => {
              handleCreateSurvey();
            }}
          >
            Create Survey
          </Button>
        ) : (
          <>
            <Button
              color="success"
              disabled
              variant="outlined"
              size="large"
              onClick={() => {
                handleCreateSurvey();
              }}
            >
              Create Survey
            </Button>
            <Typography variant="caption">pls add at least one question</Typography>
            <Typography variant="caption">* required field</Typography>
          </>
        )}
      </Grid>
    </Fragment>
  );
};

export default CreateSurveyPage;
