import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisPoliteness({ score }) {
  const points = {
    1: [
      `You tend to project yourself as superior to others and may be seen as disagreeably arrogant
    by other people. You may not a believer in words of courtesy`,
      `You may not be a believer in words of courtesy or expressions of gratitude, to get things
    done your way. You don’t mind pressuring others.`,
      `You believe that a certain amount of deception in social relationships is necessary.`,
    ],
    2: [
      `You tend to inhibit aggression to give way to others, to forgive and forget. But sometimes,
    you are aggressive, preferring to compete rather than to cooperate, and have no reluctance
    to express dominant behavior when it’s necessary.`,
      `You are usually humble and gracious. However occasionally you tend to show superiority
    and may be considered conceited or arrogant by others.`,
      `You are generally frank, sincere, and trusting .But sometimes you view tactics like flattery,
    cunningness, or deception as necessary social skills and may regard more straightforward
    people as naive.`,
    ],
    3: [
      `You dislike confrontations. You are perfectly willing to compromise or to deny your own
    needs in order to get along with others.`,
      `You do not like to claim that you are better than other people, though you are not necessarily
    lacking in self-confidence or self-esteem.`,
      `You see no need for pretense or manipulation when dealing with others and are therefore
    candid, frank, and sincere.`,
      `You dislike confrontations. You are perfectly willing to compromise or to deny your own
    needs in order to get along with others.`,
      `You do not like to claim that you are better than other people, though you are not necessarily
    lacking in self-confidence or self-esteem.`,
      `You see no need for pretense or manipulation when dealing with others and are therefore
    candid, frank, and sincere in your interactions`,
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
