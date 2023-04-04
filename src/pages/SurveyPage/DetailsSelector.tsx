import { Button, ButtonGroup, Divider } from "@mui/material";
import { FC, useState } from "react";

interface Props {}

export const DetailsSelector: FC<Props> = () => {
  const [isSurveySelected, setIsSurveySelected] = useState<boolean>(true);

  return (
    <ButtonGroup size="small" aria-label="small button group" sx={{ margin: "1rem" }}>
      <Button variant={!isSurveySelected ? "contained" : "outlined"} onClick={() => setIsSurveySelected(!isSurveySelected)}>
        {isSurveySelected ? "Data" : "Survey"}
      </Button>
    </ButtonGroup>
  );
};
