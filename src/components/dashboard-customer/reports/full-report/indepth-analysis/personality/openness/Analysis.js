import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisOpenness({ score }) {
  const points = {
    1: [
      `You are likely to be more oriented to facts than fantasy.`,
      `It might be difficult for you to find an interest and sense of beauty in most forms of art.`,
      `It may be difficult for You to identify and express emotions accurately`,
      `You are very likely to prefer routine over variety and ‘change’ is something you might find
      uncomfortable.`,
      `You prefer the security and stability brought by conformity to tradition`,
    ],
    2: [
      `You are usually appreciative of arts and find beauty in nature`,
      `You are likely to welcome unconventional values and respect diverse viewpoints`,
      `You tend to be involved in imagination and fantasy to an extent, but at times, you are more
      prosaic and prefer to keep your mind on the task at hand.`,
      `You may experience deeper and more differentiated emotional states and feel both
      happiness and unhappiness more keenly than others do. Occasionally, you do not believe
      that feeling states are of much importance.`,
      `You prefer novelty and variety to familiarity and routine. Over time, you may engage in a
      series of different hobbies. However, you find ‘change’ difficult at times.`,
      `You tend to accept authority and to honor tradition`,
    ],
    3: [
      `You tend to be highly appreciative of arts and find beauty in nature`,
      `Being psychologically and politically liberal; being anti-tradition and anti-authority.`,
      `You are likely to use fantasy as a way of creating a richer, more interesting world.`,
      `You are likely to have good access and awareness of your own feelings and the feelings of
      others.`,
      `You might have a readiness to challenge authority, conventional wisdom, and traditional values`,
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
