import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisEnthu({ score }) {
  const points = {
    1: [
      `You may be very hesitant to take initiative in reaching out to others because of your reserved
    nature .Some may perceive you as cold, distant, unapproachable.`,
      `You tend to feel overwhelmed by, and therefore actively avoid, large crowds and social
    gatherings`,
      `You are not very prone to energetic, high spirits such as happiness, enthusiasm, optimism,
    and joy.`,
      `You are less likely to naturally experience enthusiasm, energy and optimism, joy
    spontaneously.`,
    ],
    2: [
      `You are usually affectionate and friendly. You generally get around with people but
    sometimes, it may be difficult at times to form close attachments to others.`,
      `Generally, you enjoy the company of others. But at times your need for privacy and
    self-reflection matters more for you.`,
      `You tend to remain cheerful and optimistic and are able to laugh easily most of the time.`,
    ],
    3: [
      `You are the sort of person who genuinely likes to get around with people and openly
      demonstrate positive feelings toward others. You make friends quickly and it is easy for you
      to form close, intimate relationships.`,
      `You find the company of others pleasantly stimulating and rewarding. You enjoy the
      excitement of crowds. You love bright lights and hustle and bustle.`,
      `You are likely to enjoy being the center of attention being a sensation seeking`,
      `You typically experience a range of positive feelings, including happiness, enthusiasm,
      optimism, and joy.`,
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
