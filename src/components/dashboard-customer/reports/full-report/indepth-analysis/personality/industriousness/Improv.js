import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovPoliteness({ score }) {
  const intro = {
    1: "You can improve your Industriousness through the following strategies:",
    2: "You can improve your Industriousness through the following strategies:",
    3: "You are highly industrious",
  };

  const points = {
    1: [
      `<strong>Set yourself goals:</strong> And persevere in achieving them despite the obstacles that you face, you
      may start off with small well defined goals and later extend them to larger ones.`,
      `<strong>Get busy:</strong> Many individuals spend a considerable amount of time sitting around, thinking,
      wondering and worrying. However, if you simply start on and get engaged in some useful
      activity, you will find that there aren’t as many complex problems, as you had expected,
      hindering your progress.`,
      `<strong>Surround yourself with individuals who are engaged in productive activities:</strong>
      People tend to enjoy those activities that feel like group activities, and this will help you
      develop your own industriousness.`,
      `<strong>Find activities that you enjoy, and participate in them:</strong> People enjoy the fruits of their
      labor even more when the activity itself is enjoyable.`,
    ],
    2: [
      `<strong>Surround yourself with industrious people:</strong> In order to develop industrious traits, you
      should begin by surrounding yourself with industrious people. Idle individuals are not only
      depressing to hang around, they can actually be dangerous. People tend to enjoy those
      activities that feel like group activities, and it is for this reason that surrounding yourself with
      industrious individuals can help you develop your own industriousness.`,
      `<strong>See what work needs to be done:</strong> When you take a moment to really look around them
      and see what is there, you can find an unlimited number of things that can and should be
      done for self and for others. Participating in resolving these things can help one to feel
      useful and helpful.`,
      `<strong>Find activities that you enjoy:</strong> Another way to develop industrious traits is for you to find
      activities that you enjoy, and participate in them. Many people enjoy the fruits of their labor
      even more when the activity itself is enjoyable.`,
      `<strong>Surround yourself with individuals who are engaged in productive activities:</strong>
      People tend to enjoy those activities that feel like group activities, and this will help you
      develop your own industriousness.`,
      `<strong>Find activities that you enjoy, and participate in them.</strong> People enjoy the fruits of their
      labor even more when the activity itself is enjoyable.`,
      `<strong>Don’t settle for Mediocrity:</strong> Identify and take up tasks that could better utilize your
      potential improve your strength/ skill sets`,
      `<strong>Look around to see what work needs to be done</strong> for yourself and for others. Participating
      in resolving these things can help one to feel useful and helpful.`,
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
