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
  const QuestionList = [
    { question: "Surveyer Name", type: "text", values: [""] },
    { question: "Gender", type: "radio", values: ["Female", "Male"] },
    {
      question: "How did they response to the question?",
      type: "radio",
      values: [
        "They took a serious, thoughtful response and answered the question",
        "They are not cool and dismissed the question",
        "They did something completely unexpected (spontaneous combustion, projective vomit, etc...)",
      ],
    },
    {
      question: "Notes on Unsolicted Participant",
      type: "longtext",
      values: [""],
    },
  ];

  function initQuestionList() {
    let ans: { question: string; answer: string }[] = [];
    for (const question of QuestionList) {
      ans.push({ question: question.question, answer: "" });
    }
    return ans;
  }

  const question = "Who would win in a fight?";
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >(initQuestionList());

  const updateQuestion = (answer: string, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = answer;
    setAnswers([...newAnswers]);
  };

  // There will be a page which gets all questions (with their IDs). The id is stored somewhere and that is how we access the question later
  const handleSubmitQuestion = async (pass: string) => {
    console.log(answers);
    /*
       
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
    */
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: "100vh" }}
      gap="1rem"
    >
      <h1>inQ</h1>
      <h2>{question}</h2>

      {QuestionList.map((q, i) => (
        <FormComponent
          key={i}
          question={q.question}
          index={i}
          type={q.type}
          values={q.values}
          answer={answers[i].answer}
          updateQuestion={updateQuestion}
        />
      ))}

      <Button
        variant="outlined"
        onClick={() => {
          // let pass = prompt("Not so fast! How do I know you can be trusted?");
          let pass = "hi";
          if (pass !== null) {
            handleSubmitQuestion(pass);
          }
        }}
      >
        Submit
      </Button>
    </Grid>
  );
};

interface Props2 {
  type: string;
  values: string[];
  answer: string;
  index: number;
  question: string;
  updateQuestion: (answer: string, index: number) => void;
}

const FormComponent: FC<Props2> = ({
  question,
  type,
  values,
  answer,
  updateQuestion,
  index,
}) => {
  switch (type) {
    case "text":
      return (
        <TextField
          required
          id="filled-basic"
          label={question}
          variant="filled"
          value={answer}
          onChange={(e) => updateQuestion(e.target.value, index)}
        />
      );

    case "radio":
      return (
        <FormControl
          sx={{
            maxWidth: "50%",
          }}
        >
          <FormLabel id="demo-controlled-radio-buttons-group">
            {question}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={answer}
            onChange={(e) => {
              updateQuestion(e.target.value, index);
            }}
          >
            {values.map((value, i) => (
              <FormControlLabel
                key={i}
                value={value}
                control={<Radio />}
                label={value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    case "longtext":
      return (
        <TextField
          required
          id="filled-basic"
          label={question}
          fullWidth
          variant="filled"
          multiline
          minRows={3}
          value={answer}
          onChange={(e) => updateQuestion(e.target.value, index)}
          sx={{
            maxWidth: "50%",
          }}
        />
      );
    default:
      return <h2>This question could not render {index}</h2>;
  }
};

export default SurveyPage;
