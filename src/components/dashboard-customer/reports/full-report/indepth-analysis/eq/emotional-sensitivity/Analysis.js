import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisEmoMaturity({ score }) {
  const points = {
    1: [
      `You don’t have the ability to be aware of the relationship between feelings and actions. You
    are not good at understanding the intensity of emotions better.`,
      `You don’t have the ability to sense how other people feel and also to share and accept
    another person’s feelings. You are non-sensitive to understanding the emotions shared by
    others and in helping them to resolve those emotions. You are not good at listening to others
    without getting carried away by personal emotions.`,
      `You are not good at managing interpersonal relations. You experience considerable stress
    and anxiety, and exhibit lack of trust in others.`,
      `You are not good at communicating emotions. Expressions of negative feelings by you
    communicate a message of pessimism, bitterness, suspicion and inferiority.`,
    ],
    2: [
      `You don’t have much ability to be aware of the relationship between feelings and actions.
    You are not so good at understanding the intensity of emotions better.`,
      `You don’t have much ability to sense how other people feel and also to share and accept
    another person’s feelings. You are not very sensitive to understanding the emotions shared
    by others and in helping them to resolve those emotions. You are not so good at listening to
    others without getting carried away by personal emotions.`,
      `You are not so good at managing interpersonal relations. You experience considerable stress
    and anxiety, and exhibit lack of trust in others.`,
      `You are not so good at communicating emotions. Many times, expressions of negative
    feelings by you communicate a message of pessimism, bitterness, suspicion and inferiority.`,
    ],
    3: [
      `You have a high ability to be aware of the relationship between feelings and actions. You are
    good at understanding the intensity of emotions better.`,
      `You have a high ability to sense how other people feel and also to share and accept another
    person’s feelings. You are highly sensitive to understanding the emotions shared by others
    and in helping them to resolve those emotions. You are very good at listening to others
    without getting carried away by personal emotions.`,
      `You are good at managing interpersonal relations. You have a strong belief in the basic
    elements of trust, confidence and reliance. These are the keys to good interpersonal
    relations.`,
      `You are good at communicating emotions. You are a cheerful person and communicate a
    message of confidence and self‐respect.`,
    ],
    4: [
      `You have a very high ability to be aware of the relationship between feelings and actions.
    You are very good at understanding the intensity of emotions better.`,
      `You have a very high ability to sense how other people feel and also to share and accept
    another person’s feelings. You are highly sensitive to understanding the emotions shared by others and in helping them to resolve those emotions. You are excellent at listening to others
    without getting carried away by personal emotions.`,
      `You are very good at managing interpersonal relations. You have a strong belief in the basic
      elements of trust, confidence and reliance. These are the keys to good interpersonal
      relations`,
      `You have an excellent skill at communicating emotions. You are a cheerful person and
      communicate a message of confidence and self‐respect.`,
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
