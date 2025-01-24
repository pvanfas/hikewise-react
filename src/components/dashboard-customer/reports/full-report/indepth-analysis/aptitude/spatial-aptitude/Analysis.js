import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisSpatApti({ score }) {
  const points = {
    1: [
      `You might not do well in work where it is important to understand three-dimensional
       relationships between objects.`,
      `You may find it difficult to visualize a three dimensional object from a pattern or to visualize an
       object if rotated in space.`,
      `Your ability to manipulate shapes and relate three-dimensional objects to their pictures may not
       be good.`,
    ],
    2: [
      `You have an average level of ability to visualize a three dimensional object from a pattern and
      also to visualize an object if rotated in space.`,
      `You would do fairly well in work where it is important to understand three-dimensional
      relationships between objects.`,
      `To an extent you will be able to manipulate shapes in two dimensions and visualize
      three-dimensional objects presented as two-dimensional pictures.`,
    ],
    3: [
      `You would excel in work where it is required to manipulate shapes in two dimensions or to
      visualize three-dimensional objects presented as two-dimensional pictures.`,
      `You have a high ability to accurately visualize a three dimensional object from a pattern or
      blueprint and also to visualize an object if rotated in space.`,
      `You would do very well in work where it is important to understand three-dimensional
      relationships between objects.`,
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
