import React from "react";
import style from "../common/Report.module.scss";

import clsx from "clsx";
import moment from "moment";

import Page from "../common/Page";
import Box from "../common/Box";
import Graph from "../common/Graph";

import InDepthAnalysis from "./InDepthSail";
import CareerSail from "./CareerSail";

import { _Colors } from "../common/helper";

const baseImage =
  "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/images/report/sail";

export default function ReportSail({ report }) {
  const data = report;

  const characterData = data.character_data;
  const graphData = report.graph_data;

  const bestFitImage =
    "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/images/report/rise/post-cc.svg";

  return (
    <div className={style.wrapper}>
      <Page className={clsx(style.page1, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/01.svg`} alt="" />
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
        <div className={style.text}>
          This section of the report will present a summary of your psychometric
          profile by highlighting your dominant interest areas, personality
          aspects, aptitudes, work value preferences and emotional quotient.
        </div>
        <div className={clsx(style.boxes, style.halfWidth)}>
          <Box
            data={report.dominant_interest.slice(0, 3)}
            title="Your Dominant Interests"
            options={{ background: _Colors.career, size: "half" }}
          />
          <Box
            data={report.dominant_personality.slice(0, 3)}
            title="Your Dominant Personality"
            options={{ background: _Colors.personality, size: "half" }}
          />
        </div>
        <div className={clsx(style.boxes, style.halfWidth)}>
          <Box
            data={report.dominant_aptitude.slice(0, 3)}
            title="Your Dominant Aptitude"
            options={{ background: _Colors.aptitude, size: "half" }}
          />

          <Box
            data={report.dominant_wvp.slice(0, 3)}
            title="Your Dominant WVP"
            options={{ background: _Colors.wvp, size: "half" }}
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
        <InDepthAnalysis
          title="Aptitude"
          category="Numerical Aptitude"
          color={_Colors.aptitude}
          score={characterData.aptitude.numerical_aptitude}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Aptitude"
          category="Verbal Aptitude"
          color={_Colors.aptitude}
          score={characterData.aptitude.verbal_aptitude}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Aptitude"
          category="Mechanical Reasoning"
          color={_Colors.aptitude}
          score={characterData.aptitude.mechanical_reasoning}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Aptitude"
          category="Abstract Reasoning"
          color={_Colors.aptitude}
          score={characterData.aptitude.abstract_reasoning}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Aptitude"
          category="Spatial Aptitude"
          color={_Colors.aptitude}
          score={characterData.aptitude.spatial_aptitude}
          icons={data["dominant_aptitude"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
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
        <InDepthAnalysis
          title="Personality"
          category="Self control"
          color={_Colors.personality}
          score={characterData.personality.self_control}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Stress tolerance"
          color={_Colors.personality}
          score={characterData.personality.stress_tolerance}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Compassion"
          color={_Colors.personality}
          score={characterData.personality.compassion}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Politeness"
          color={_Colors.personality}
          score={characterData.personality.politeness}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Industriousness"
          color={_Colors.personality}
          score={characterData.personality.industriousness}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Orderliness"
          color={_Colors.personality}
          score={characterData.personality.orderliness}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Enthusiasm"
          color={_Colors.personality}
          score={characterData.personality.enthusiasm}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Assertiveness"
          color={_Colors.personality}
          score={characterData.personality.assertiveness}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Intellect"
          color={_Colors.personality}
          score={characterData.personality.intellect}
          icons={data["dominant_personality"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="Personality"
          category="Openness"
          color={_Colors.personality}
          score={characterData.personality.openness}
          icons={data["dominant_personality"]}
        />
      </Page>

      {/* WVP SECTION -----------  */}

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/28.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page7, style.details)}>
        <div className={style.title}>Your Dominant WVP</div>
        <div className={style.boxContainer}>
          <Box
            data={report.dominant_wvp.slice(0, 3)}
            options={{ background: _Colors.wvp, size: "medium" }}
          />
        </div>
        <div className={style.graphContainer}>
          <Graph
            data={{
              labels: graphData.wvp_labels,
              values: graphData.wvp_final_list,
            }}
            color={_Colors.wvp}
            height={600}
          />
        </div>
      </Page>

      <Page>
        <InDepthAnalysis
          title="WVP"
          category="Achievement"
          color={_Colors.wvp}
          score={characterData.wvp.achievement}
          icons={data["dominant_wvp"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="WVP"
          category="Independence"
          color={_Colors.wvp}
          score={characterData.wvp.independence}
          icons={data["dominant_wvp"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="WVP"
          category="Recognition"
          color={_Colors.wvp}
          score={characterData.wvp.recognition}
          icons={data["dominant_wvp"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="WVP"
          category="Relationships"
          color={_Colors.wvp}
          score={characterData.wvp.relationships}
          icons={data["dominant_wvp"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="WVP"
          category="Support"
          color={_Colors.wvp}
          score={characterData.wvp.support}
          icons={data["dominant_wvp"]}
        />
      </Page>

      <Page>
        <InDepthAnalysis
          title="WVP"
          category="Working conditions"
          color={_Colors.wvp}
          score={characterData.wvp.working_conditions}
          icons={data["dominant_wvp"]}
        />
      </Page>

      {/* --------------------------------------------------------- */}

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/36.svg`} alt="" />
      </Page>

      {report.dominant_careers.slice(0, 5).map((career) => (
        <Page>
          <CareerSail data={career[3]} name={career[0]} img={career[1]} />
        </Page>
      ))}

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={bestFitImage} alt="" />
        <div className={clsx(style.absoluteContent, style.bestFitCareers)}>
          <div className={style.title}>Your Next 5 Best-Fit Careers</div>
          <div className={style.careers}>
            {data.dominant_careers.slice(5, 10).map((career) => (
              <article className={style.career}>
                <img src={career[1]} alt={career[0]} />
                <div>{career[0]}</div>
              </article>
            ))}
          </div>
        </div>
      </Page>

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/43.svg`} alt="" />
      </Page>

      <Page className={clsx(style.page2, style.staticImg)}>
        <img className={style.fullSize} src={`${baseImage}/final.svg`} alt="" />
      </Page>
    </div>
  );
}
