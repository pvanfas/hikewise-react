import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisEmoMaturity({ score }) {
  const points = {
    1: [
      `You are not good at recognizing different feelings emanating from within and giving a name
    to them. You don’t know your own emotional strengths and weaknesses. You are not
    effective in handling interpersonal relationships.`,
      `You are not good at recognizing the value of the contribution of others. You don’t try to
    appreciate others’ points of view.`,
      `You don’t know how and when to take the lead and when to follow, when to be aggressive
    and when to be passive. Also you don’t realize that there is a time to confront, withdraw,
    speak and remain silent. You don’t have the ability to control powerful negative tendencies
    such as jealousy, manipulation and the feeling of self‐grandeur.`,
    ],
    2: [
      `You are not so good at recognizing different feelings emanating from within and giving a
    name to them. Many times you really don’t know your own emotional strengths and
    weaknesses. You are not very effective in handling interpersonal relationships.`,
      `You are not so good at recognizing the value of the contribution of others. Generally, you
    don’t try to appreciate others point of views.`,
      `Many times, you don’t really know how and when to take the lead and when to follow, when
    to be aggressive and when to be passive. Also you don’t realize that there is a time toconfront, withdraw, speak and remain silent. You have very little ability to control powerful
    negative tendencies such as jealousy, manipulation and the feeling of self‐grandeur.`,
    ],
    3: [
      `You are very good at recognizing different feelings emanating from within and giving a name
    to them. You know your own emotional strengths and weaknesses. For instance, your inner
    self consistently responds to the outer world. You are very effective in handling interpersonal
    relationships.`,
      `You are very good at recognizing the value of the contribution of others. You always try to
    appreciate others point of views.`,
      `You very well know how and when to take the lead and when to follow, when to be
    aggressive and when to be passive. Also you know that there is a time to confront,
    withdraw, speak and remain silent. You have a high ability to control powerful negative
    tendencies such as jealousy, manipulation and the feeling of self‐grandeur.`,
    ],
    4: [
      `You are excellent at recognizing different feelings emanating from within and giving a name
      to them. You know your own emotional strengths and weaknesses very well. For instance,
      your inner self consistently responds to the outer world. You are very much effective in
      handling interpersonal relationships.`,
      `You are very good at recognizing the value of the contribution of others. You always try to
      appreciate others point of views.`,
      `You very well know how and when to take the lead and when to follow, when to be
      aggressive and when to be passive. Also you know that there is a time to confront,
      withdraw, speak and remain silent. You have a high ability to control powerful negative
      tendencies such as jealousy, manipulation and the feeling of self‐grandeur.`,
    ],
  };

  return (
    <div className={style.wrapper}>
      <div className={style.analysis}>
        <ul>
          {points[score].map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
