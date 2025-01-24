import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovOpenness({ score }) {
  const intro = {
    1: "You can develop and maintain certain openness habits that can maximize your potential for creative growth:",
    2: "You can develop and maintain certain openness habits that can maximize your potential for creative growth:",
    3: "Your openness is high.",
  };

  const points = {
    1: [
      `<strong>Expose yourself to other artists’ work:</strong> One of the characteristics of those who score high on
    the openness measure is the involvement in aesthetically triggering experiences and the
    appreciation of artistic events. Going to art galleries and plays or even going for a walk in nature
    may stimulate your perceptions and increase your aesthetic sensitivity.`,
      `<strong>Switch your routine around:</strong> It may be comforting to follow a predictable schedule, commute,
    diet, and after-work routine, but it can limit your sense of receptiveness to new experiences. In
    order to benefit from the creativity that is correlated with this personality trait, you may want to
    incorporate an adventurous spirit in your day-to-day life. Adding variety in daily choices may
    help bring out the openness side of your personality.`,
      `<strong>Engage your intellect and cognitions:</strong> A thirst for knowledge and an interest in new information
    may come more naturally to some than to others. However, a conscious effort to read up on new
    ideas, pay attention to sensory experiences, learn a new language, and pick up new skills can
    stimulate the active process of openness to new experiences.`,
      `<strong>Find a way to change things:</strong> If your current work/activity doesn’t interest you, or if you find
    yourself dreading work, that’s a sign you need to change. Either look at how you can change
    your work or remember why you got started in the first place, and change your feelings
    about your work.`,
    ],
    2: [
      `<strong>Expose yourself to art and nature:</strong> One of the characteristics of those who score high on the
    openness measure is the involvement in aesthetically triggering experiences and the
    appreciation of artistic events. Going to art galleries and plays or even going for a walk in nature
    may stimulate your perceptions and increase your aesthetic sensitivity.`,
      `<strong>Find a way to change things:</strong> If your current work/activity doesn’t interest you, or if you find
    yourself dreading work, that’s a sign you need to change. Either look at how you can change your
    work or remember why you got started in the first place, and change your feelings about your
    work.`,
    ],
    3: [],
  };

  return (
    <div className={style.wrapper}>
      <div className={style.improv}>
        <div className={style.introText}>{intro[score]}</div>
        <ul>
          {points[score].map((point, index) => (
            <li key={index}>{parse(point)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
