import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisStressTol({ score }) {
  const points = {
    1: [
      `You may often feel an apprehension about the future. You are likely to be afraid of specific
    situations or be just generally fearful. You may feel tense, jittery, and nervous.`,
      `You may have very depressive feelings such as feelings of guilt, sadness, hopelessness, and
    loneliness. You may be easily discouraged and often dejected.`,
      `You are very likely to be concerned about rejection and ridicule that cause you to feel shy and
    uncomfortable around others. You may feel easily embarrassed.`,
      `You may experience panic, confusion, and helplessness when under pressure or stress. You
    might find it extremely difficult to cope with stress, becoming dependent, hopeless, or
    panicked when facing emergency situations.`,
    ],
    2: [
      `You are usually calm and relaxed. But occasionally you feel apprehensive .You may be afraid
    of specific situations.`,
      `You tend to be free from depressive feelings. At times, you may experience emotions such as
    feelings of guilt, sadness, hopelessness, and loneliness.`,
      `Generally, you do not feel nervous in social situations. Occasionally your concern about
    rejection and ridicule cause you to feel shy and uncomfortable around others.`,
      `You perceive yourselves as capable of handling yourselves in difficult situations. But you
    might feel unable to cope with stress, becoming dependent, hopeless, or panicked when
    facing emergency situations.`,
    ],
    3: [
      `You are generally calm, relaxed and fearless. You do not dwell on things that might go
      wrong.`,
      `You tend to be free from depressive feelings such as feelings of guilt, sadness, hopelessness,
      and loneliness.`,
      `You do not suffer from the mistaken impression that everyone is watching and judging you
      and do not feel nervous in social situations.`,
      `You tend to remain poised, confident, and clear-headed when stressed. You perceive
      yourselves as capable of handling yourselves when faced by adversities.`,
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
