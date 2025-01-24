import React from "react";
import style from "./QuesAns.module.scss";

import HTMLReactParser from "html-react-parser";
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { useEngine } from "./engine/EngineProvider";
import { useUserContext } from "contexts/UserContext";

const themePurple = "#9456c8";

// function importAll(r) {
//   let images = {};
//   r.keys().forEach((item) => {
//     images[item.replace("./", "").split(".")[0]] = r(item);
//   });
//   return images;
// }

// const images = importAll(
//   require.context("components/assessment/demo-assessment/engine/images", true, /\.(png|jpe?g|svg)$/)
// );

const useStyles = makeStyles({
  container: {
    flexDirection: "column",
    maxWidth: "450px",
  },
  radioBox: {
    color: "black",
  },
  label: {
    "&.Mui-disabled": {
      color: "#DCDCDC",
    },
  },
});

const CustomRadio = withStyles({
  root: {
    color: themePurple,

    "&$checked": {
      color: themePurple,
    },
    "&$disabled": {
      color: "#DCDCDC",
    },
  },
  checked: {},
  disabled: {},
})((props) => <Radio {...props} />);

const Label = ({ label, type }) => {
  if (type === "IMAGE") return <img src={label} alt="" />;
  else return label;
};

export default function QuesAns({ className, question, id }) {
  const { handleChangeRadioInput, state } = useEngine();
  const classes = useStyles();

  // const userContext = useUserContext();

  // function getDeptLetterForImg() {
  //   return "R";
  // }

  function getImageForQuestion(question) {
    let quesWithImages = { ...question };
    // const dept = userContext.state.profile.department;

    // if (dept === "RISE") {
    //   let imgName = `D${getDeptLetterForImg()}${id}`;
    //   if (question.type === "IMAGE") {
    //     quesWithImages.title = images[`${imgName}Q`];
    //   }

    //   if (question.ansType === "IMAGE") {
    //     quesWithImages.options = ["A", "B", "C", "D"].map((opt) => images[`${imgName}${opt}`]);
    //   }
    // }

    return quesWithImages;
  }

  const currQues = getImageForQuestion(question);

  return (
    <div className={clsx(style.wrapper, className)}>
      <div className={style.question}>
        {currQues.ins ? <div className={style.ins}>{HTMLReactParser(currQues.ins)}</div> : null}
        {currQues.type === "TEXT" ? HTMLReactParser(currQues.title) : <img src={currQues.title} alt="" />}
      </div>

      <div className={style.answer}>
        <RadioGroup
          aria-label="answer"
          name="answer"
          value={currQues.resp ? currQues.resp : ""}
          onChange={handleChangeRadioInput}
          classes={{ root: classes.container }}
        >
          {currQues.options.map((keys, index) => (
            <FormControlLabel
              key={index}
              classes={{
                root: classes.radioBox,
                label: classes.label,
              }}
              control={<CustomRadio />}
              value={keys}
              label={<Label type={currQues.ansType} label={keys} ques={currQues} />}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
