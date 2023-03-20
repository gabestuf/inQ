import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import { Question } from "../components/QuestionsInterface";

interface Props {}

const SurveyPage: FC<Props> = () => {
  let { id } = useParams();
  const appInfo = useContext(AppContext);
  // This is the thing that would come from the database:
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [questionAnswers, setQuestionAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [surveyData, setSurveyData] = useState<{ id: string; owner: string; title: string; description: string; questions: Question[]; responseList: string[] }>({
    id: "0",
    owner: "default",
    title: "Oops, there was an error",
    description: "default",
    questions: [{ question: "This is so sad.", type: "text", answers: ["default", "nondefault"] }],
    responseList: ["id1", "id2"],
  });

  const [tipsOn, setTipsOn] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/404");
      return;
    }

    getSurvey(id);
  }, []);

  useEffect(() => {
    initQuestionList();
  }, [surveyData]);

  async function getSurvey(id: string) {
    const response = await fetch(appInfo.url + `/survey/getSurvey/${id}`);
    const resJSON = await response.json();

    if (resJSON.status === "SUCCESS") {
      setIsPrivate(resJSON.isPrivate === "true");
      const newData = {
        id: resJSON.id,
        owner: resJSON.owner,
        title: resJSON.title,
        description: resJSON.description,
        questions: JSON.parse(resJSON.questions),
        responseList: JSON.parse(resJSON.responseList),
      };

      setSurveyData(newData);
    }
    if (resJSON.status === "FAILED") {
      //alert(`Error: ${resJSON.message}`);
      navigate("/404");
    }
  }

  function initQuestionList() {
    let ans: { question: string; answer: string }[] = [];
    let tOn = [];
    for (const q of surveyData.questions) {
      ans.push({ question: q.question, answer: "" });
      tOn.push(0);
    }
    setQuestionAnswers(ans);
    setTipsOn(tOn);
  }

  const updateQuestion = (answer: string, index: number) => {
    const newAnswers = [...questionAnswers];
    newAnswers[index].answer = answer;
    setQuestionAnswers([...newAnswers]);
  };

  // There will be a page which gets all questions (with their IDs). The id is stored somewhere and that is how we access the question later
  const handleSubmitQuestion = async () => {
    // make sure all questions are answered
    let changed = false;
    for (let i = 0; i < questionAnswers.length; i++) {
      if (questionAnswers[i].answer.length === 0) {
        tipsOn[i] = 1;
        changed = true;
      } else {
        tipsOn[i] = 0;
      }
    }

    if (changed) {
      console.log(tipsOn);
      setTipsOn([...tipsOn]);
      return;
    }
    let pass: string = "";

    if (isPrivate) {
      const pass2 = prompt("Not so fast! How do I know you can be trusted?");

      if (!pass2) {
        return;
      }
      pass = pass2;
    }

    const response = await fetch(appInfo.url + "/survey/saveResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPrivate: isPrivate,
        questionID: surveyData.id,
        password: pass,
        answers: questionAnswers,
      }),
    });

    const resJSON = await response.json();

    if (resJSON.status === "SUCCESS") {
      alert("Successfully saved response");

      // reset fields
      initQuestionList();
    } else if (resJSON.status === "FAILED") {
      alert(`Failed to save response | ${resJSON.message}`);
    }
  };

  return (
    <Fragment>
      <Grid flexGrow={1} padding="3rem 4rem" container spacing={0} direction="column" alignItems="center" gap="1rem">
        <Typography variant="h4" textAlign={"center"} sx={{ maxWidth: "50rem" }}>
          {surveyData.title}
        </Typography>

        {surveyData.questions.map((q, i) => {
          if (surveyData && surveyData.questions && surveyData.questions.length > 0 && questionAnswers.length === surveyData.questions.length) {
            return <FormComponent tipsOn={tipsOn[i] > 0} key={i} question={q.question} index={i} type={q.type} values={q.answers} answer={questionAnswers[i].answer} updateQuestion={updateQuestion} />;
          }
          return null;
        })}

        <Button
          color="primary"
          variant="outlined"
          size="large"
          onClick={() => {
            handleSubmitQuestion();
          }}
        >
          Submit
        </Button>
      </Grid>
    </Fragment>
  );
};

interface Props2 {
  type: string;
  values: string[];
  answer: string;
  index: number;
  question: string;
  updateQuestion: (answer: string, index: number) => void;
  tipsOn: boolean;
}

const FormComponent: FC<Props2> = ({ question, type, values, answer, updateQuestion, index, tipsOn }) => {
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

export default SurveyPage;
