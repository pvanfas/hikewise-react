import React from "react";
import style from "./QuesAns.module.scss";

import parse from "html-react-parser";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { useEngine } from "./engine/EngineProvider";
import WvpContainer from "./wvp/WvpContainer";
import InlineLoader from "components/shared/InlineLoader";

// import LikeImg from "assets/images/assessment/like.png";
// import DislikeImg from "assets/images/assessment/dislike.png";
// import UnsureImg from "assets/images/assessment/not_sure.png";
// import { Meh, ThumbsDown, ThumbsUp } from "react-feather";

const themePurple = "#9456c8";

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

const Label = ({ label, type, ques }) => {
  if (type === "IMAGE") return <img src={label} alt="" />;
  else return label;
};

export default function QuesAns() {
  const { state, handleSelectOption } = useEngine();
  const { testData } = state;

  const { currIndices, contents } = testData;
  let currQues = contents[currIndices[0]].content[currIndices[1]].question;

  function getStyles(theme) {
    let styleOptions = {
      container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      radioBox: {
        color: "black",
        marginBottom: "10px",
        minWidth: "250px",
        marginRight: "20px",
        width: "100%",
        maxWidth: "550px",

        "&:hover": {
          backgroundColor: "#b48ed4",
          color: "white",
          borderRadius: "20px",
        },

        [theme.breakpoints.down("600")]: { marginRight: 0 },
      },

      label: {
        fontSize: "16px",
        "&.Mui-disabled": {
          color: "#DCDCDC",
        },
        display: "flex !important",
        alignItems: "center !important",
        overflowWrap: "break-word",
        wordWrap: "break-word",

        padding: "5px 10px",
      },
    };

    return styleOptions;
  }

  const useStyles = makeStyles((theme) => getStyles(theme));
  const classes = useStyles();

  if (state.settings.selectedLanguage === "EN") currQues = currQues.english;

  return (
    <div className={style.wrapper}>
      {state.screenState.isLoading && <InlineLoader />}

      {!!currQues &&
        // currQues.question &&
        state.screenState.tabs[state.screenState.activeTabIndex].key !== "wvp" &&
        !state.screenState.isLoading && (
          <>
            <div className={style.question}>{parse(currQues.question)}</div>

            <div className={style.answer}>
              <RadioGroup
                aria-label="answer"
                name="answer"
                value={currQues.answer ? currQues.answer : ""}
                classes={{ root: classes.container }}
              >
                {Object.entries(currQues.choices).map(
                  (keys, index) =>
                    keys[1] && (
                      <FormControlLabel
                        key={index}
                        classes={{
                          root: classes.radioBox,
                          label: classes.label,
                        }}
                        control={<CustomRadio onClick={handleSelectOption} />}
                        value={keys[0]}
                        label={<Label type={currQues.ans_type} label={keys[1]} ques={currQues} />}
                      />
                    )
                )}
              </RadioGroup>
            </div>
          </>
        )}

      {currQues && state.screenState.tabs[state.screenState.activeTabIndex].key === "wvp" && <WvpContainer />}
    </div>
  );
}
