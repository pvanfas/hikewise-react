import React from "react";
import style from "../common/Report.module.scss";

import clsx from "clsx";
import moment from "moment";

import Page from "../common/Page";
import Box from "../common/Box";
import Graph from "../common/Graph";

import InDepthRise from "./InDepthRise";
import CareerRise from "./CareerRise";

import { _Colors } from "../common/helper";
const baseImage =
  "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/images/report/rise";

export default function ReportRise({ report }) {
  const data = report;

  const characterData = data.character_data;
  const graphData = report.graph_data;

  return (
    <div className={style.wrapper}>
      <Page className={clsx(style.page1, style.staticImg)}>
        <img
          className={style.fullSize}
          style={{ width: "100%", height: "100%" }}
          src={`${baseImage}/01.svg`}
          alt=""
        />
        <div className={style.nameContainer}>
          <div className={style.text}>Report prepared for</div>
          <div className={style.boldText}>{report.fullname}</div>
          <div className={style.text}>Report Language: English</div>
          <div className={style.text}>
            {moment(new Date(report.date_of_generation)).format("MMMM D, YYYY")}
          </div>
        </div>
      </Page>

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/02.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page3, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/03.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page4, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/04.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page5, style.profileSummary)}>
        <div className={style.title}>Profile Summary</div>
        <div className={style.thinText}>
          This section of the report will present a summary of your psychometric
          profile by highlighting your dominant interest areas, personality
          aspects, aptitudes, work value preferences and emotional quotient.
        </div>
        <div className={clsx(style.boxes, style.halfWidth)}>
          <Box
            data={report.dominant_interest.slice(0, 3)}
            title="Your Dominant Interests"
            icons={data["dominant_interest"]}
            options={{ background: _Colors.career, size: "half" }}
          />
          <Box
            data={report.dominant_personality.slice(0, 3)}
            title="Your Dominant Personality"
            icons={data["dominant_personality"]}
            options={{ background: _Colors.personality, size: "half" }}
          />
        </div>
        <div className={clsx(style.boxes, style.halfWidth)}>
          <Box
            data={report.dominant_aptitude.slice(0, 3)}
            title="Your Dominant Aptitude"
            icons={data["dominant_aptitude"]}
            options={{ background: _Colors.aptitude, size: "half" }}
          />
        </div>
      </Page>

      <Page className={clsx(style.page6, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/06.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page7, style.details)}>
        <div className={style.title}>Your Dominant Interests</div>
        <div className={style.boxContainer}>
          <Box
            icons={data["dominant_interest"]}
            data={report.dominant_interest.slice(0, 3)}
            options={{ background: _Colors.career, size: "medium" }}
          />
        </div>
        <div className={style.graphContainer}>
          <Graph
            data={{
              labels: graphData.interest_labels,
              values: graphData.interest_final_list,
            }}
            color={_Colors.career}
            height={600}
          />
        </div>
      </Page>

      {/* Aptitude Section -------------------------------------  */}

      <Page className={clsx(style.page9, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/08.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page7, style.details)}>
        <div className={style.title}>Your Dominant Aptitude</div>
        <div className={style.boxContainer}>
          <Box
            data={report.dominant_aptitude.slice(0, 3)}
            options={{ background: _Colors.aptitude, size: "medium" }}
          />
        </div>
        <div className={style.graphContainer}>
          <Graph
            data={{
              labels: graphData.aptitude_labels,
              values: graphData.aptitude_final_list,
            }}
            color={_Colors.aptitude}
            height={600}
          />
        </div>
      </Page>

      <Page>
        <InDepthRise
          title="Aptitude"
          category="Numerical Aptitude"
          color={_Colors.aptitude}
          score={characterData.aptitude.numerical_aptitude}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Aptitude"
          category="Verbal Aptitude"
          color={_Colors.aptitude}
          score={characterData.aptitude.verbal_aptitude}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Aptitude"
          category="Mechanical Reasoning"
          color={_Colors.aptitude}
          score={characterData.aptitude.mechanical_reasoning}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Aptitude"
          category="Abstract Reasoning"
          color={_Colors.aptitude}
          score={characterData.aptitude.abstract_reasoning}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Aptitude"
          category="Spatial Aptitude"
          color={_Colors.aptitude}
          score={characterData.aptitude.spatial_aptitude}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Aptitude"
          category="Perceptual Aptitude"
          color={_Colors.aptitude}
          score={characterData.aptitude.spatial_aptitude}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      {/* Personality Section -------------------------------------  */}

      <Page className={clsx(style.page9, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/16.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page7, style.details)}>
        <div className={style.title}>Your Dominant Personality Areas</div>
        <div className={style.boxContainer}>
          <Box
            icons={data["dominant_personality"]}
            data={report.dominant_personality.slice(0, 3)}
            options={{ background: _Colors.personality, size: "medium" }}
          />
        </div>
        <div className={style.graphContainer}>
          <Graph
            data={{
              labels: graphData.personality_labels,
              values: graphData.personality_final_list,
            }}
            color={_Colors.personality}
            height={600}
          />
        </div>
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Self control"
          color={_Colors.personality}
          score={characterData.personality.self_control}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Stress tolerance"
          color={_Colors.personality}
          score={characterData.personality.stress_tolerance}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Compassion"
          color={_Colors.personality}
          score={characterData.personality.compassion}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Politeness"
          color={_Colors.personality}
          score={characterData.personality.politeness}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Industriousness"
          color={_Colors.personality}
          score={characterData.personality.industriousness}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Orderliness"
          color={_Colors.personality}
          score={characterData.personality.orderliness}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Enthusiasm"
          color={_Colors.personality}
          score={characterData.personality.enthusiasm}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Assertiveness"
          color={_Colors.personality}
          score={characterData.personality.assertiveness}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Intellect"
          color={_Colors.personality}
          score={characterData.personality.intellect}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthRise
          title="Personality"
          category="Openness"
          color={_Colors.personality}
          score={characterData.personality.openness}
          icons={data["dominant_personality"]}
        />
      </Page>

      {/* --------------------------------------------------------- */}

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/28.svg`} alt="" />
      </Page>

      {[...report.dominant_careers].splice(0, 2).map((career) => (
        <>
          <Page>
            <CareerRise data={career} mindmaps={report.mindmaps} />
          </Page>
          <Page className={clsx(style.page2, style.staticImg)}>
            <img
              style={{ width: "95%" }}
              src={report.mindmaps[career[0]]}
              alt=""
            />
          </Page>
        </>
      ))}

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/34.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/final.svg`} alt="" />
      </Page>
    </div>
  );
}
