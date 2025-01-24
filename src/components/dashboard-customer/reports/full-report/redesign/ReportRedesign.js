import React from "react";
import style from "../common/Report.module.scss";

import clsx from "clsx";
import moment from "moment";

import Page from "../common/Page";
import Box from "../common/Box";
import Graph from "../common/Graph";

import InDepthPage from "./InDepthRedesign";
import CareerRedesign from "./CareerRedesign";

import { _Colors } from "../common/helper";

/* ------------------------------------------------------------------------------------ */

import IntroNumApti from "../indepth-analysis/aptitude/numerical-aptitude/Intro";
import ImprovNumApti from "../indepth-analysis/aptitude/numerical-aptitude/Improv";
import AnalysisNumApti from "../indepth-analysis/aptitude/numerical-aptitude/Analysis";

import IntroVerbalApti from "../indepth-analysis/aptitude/verbal-aptitude/Intro";
import ImprovVerbalApti from "../indepth-analysis/aptitude/verbal-aptitude/Improv";
import AnalysisVerbalApti from "../indepth-analysis/aptitude/verbal-aptitude/Analysis";

import IntroMechReason from "../indepth-analysis/aptitude/mechanical-reasoning/Intro";
import ImprovMechReason from "../indepth-analysis/aptitude/mechanical-reasoning/Improv";
import AnalysisMechReason from "../indepth-analysis/aptitude/mechanical-reasoning/Analysis";

import IntroAbsReason from "../indepth-analysis/aptitude/abstract-reasoning/Intro";
import ImprovAbsReason from "../indepth-analysis/aptitude/abstract-reasoning/Improv";
import AnalysisAbsReason from "../indepth-analysis/aptitude/abstract-reasoning/Analysis";

import IntroSpaApti from "../indepth-analysis/aptitude/spatial-aptitude/Intro";
import ImprovSpaApti from "../indepth-analysis/aptitude/spatial-aptitude/Improv";
import AnalysisSpaApti from "../indepth-analysis/aptitude/spatial-aptitude/Analysis";

import IntroPerApti from "../indepth-analysis/aptitude/perceptual-aptitude/Intro";
import ImprovPerApti from "../indepth-analysis/aptitude/perceptual-aptitude/Improv";
import AnalysisPerApti from "../indepth-analysis/aptitude/perceptual-aptitude/Analysis";

/* ----------------------------------------------------------------------------------------- */

import IntroSelfControl from "../indepth-analysis/personality/self-control/Intro";
import ImprovSelfControl from "../indepth-analysis/personality/self-control/Improv";
import AnalysisSelfControl from "../indepth-analysis/personality/self-control/Analysis";

import IntroStressTol from "../indepth-analysis/personality/stress-tolerance/Intro";
import ImprovStressTol from "../indepth-analysis/personality/stress-tolerance/Improv";
import AnalysisStressTol from "../indepth-analysis/personality/stress-tolerance/Analysis";

import IntroCompassion from "../indepth-analysis/personality/compassion/Intro";
import ImprovCompassion from "../indepth-analysis/personality/compassion/Improv";
import AnalysisCompassion from "../indepth-analysis/personality/compassion/Analysis";

import IntroPoliteness from "../indepth-analysis/personality/politeness/Intro";
import ImprovPoliteness from "../indepth-analysis/personality/politeness/Improv";
import AnalysisPoliteness from "../indepth-analysis/personality/politeness/Analysis";

import IntroIndustriousness from "../indepth-analysis/personality/industriousness/Intro";
import ImprovIndustriousness from "../indepth-analysis/personality/industriousness/Improv";
import AnalysisIndustriousness from "../indepth-analysis/personality/industriousness/Analysis";

import IntroOrderliness from "../indepth-analysis/personality/orderliness/Intro";
import ImprovOrderliness from "../indepth-analysis/personality/orderliness/Improv";
import AnalysisOrderliness from "../indepth-analysis/personality/orderliness/Analysis";

import IntroEnthu from "../indepth-analysis/personality/enthusiasm/Intro";
import ImprovEnthu from "../indepth-analysis/personality/enthusiasm/Improv";
import AnalysisEnthu from "../indepth-analysis/personality/enthusiasm/Analysis";

import IntroAssertiveness from "../indepth-analysis/personality/assertiveness/Intro";
import ImprovAssertiveness from "../indepth-analysis/personality/assertiveness/Improv";
import AnalysisAssertiveness from "../indepth-analysis/personality/assertiveness/Analysis";

import IntroIntellect from "../indepth-analysis/personality/intellect/Intro";
import ImprovIntellect from "../indepth-analysis/personality/intellect/Improv";
import AnalysisIntellect from "../indepth-analysis/personality/intellect/Analysis";

import IntroOpenness from "../indepth-analysis/personality/openness/Intro";
import ImprovOpenness from "../indepth-analysis/personality/openness/Improv";
import AnalysisOpenness from "../indepth-analysis/personality/openness/Analysis";

/* ----------------------------------------------------------------------------------------- */

import IntroAchievement from "../indepth-analysis/wvp/achievement/Intro";
import ImprovAchievement from "../indepth-analysis/wvp/achievement/Improv";

import IntroIndep from "../indepth-analysis/wvp/independence/Intro";
import ImprovIndep from "../indepth-analysis/wvp/independence/Improv";

import IntroRecog from "../indepth-analysis/wvp/recognition/Intro";
import ImprovRecog from "../indepth-analysis/wvp/recognition/Improv";

import IntroRelation from "../indepth-analysis/wvp/relationship/Intro";
import ImprovRelation from "../indepth-analysis/wvp/relationship/Improv";

import IntroSupport from "../indepth-analysis/wvp/support/Intro";
import ImprovSupport from "../indepth-analysis/wvp/support/Improv";

import IntroWorkCond from "../indepth-analysis/wvp/working-conditions/Intro";
import ImprovWorkCond from "../indepth-analysis/wvp/working-conditions/Improv";

/* ------------------------------------------------------------------------------------------ */

import IntroEmoComp from "../indepth-analysis/eq/emotional-competency/Intro";
import ImprovEmoComp from "../indepth-analysis/eq/emotional-competency/Improv";
import AnalysisEmoComp from "../indepth-analysis/eq/emotional-competency/Analysis";

import IntroEmoMaturity from "../indepth-analysis/eq/emotional-maturity/Intro";
import ImprovEmoMaturity from "../indepth-analysis/eq/emotional-maturity/Improv";
import AnalysisEmoMaturity from "../indepth-analysis/eq/emotional-maturity/Analysis";

import IntroEmoSensi from "../indepth-analysis/eq/emotional-sensitivity/Intro";
import ImprovEmoSensi from "../indepth-analysis/eq/emotional-sensitivity/Improv";
import AnalysisEmoSensi from "../indepth-analysis/eq/emotional-sensitivity/Analysis";

const baseImage =
  "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/images/report/redesign";

/* ----------------------------------------------------------------------------------------- */

export default function ReportRedesign({ report }) {
  const data = report;
  const graphData = data.graph_data;

  const bestFitImage =
    "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/images/report/rise/post-cc.svg";

  return (
    data && (
      <div className={style.wrapper}>
        <Page className={clsx(style.page1, style.staticImg)}>
          <img className={style.fullSize} src={`${baseImage}/01.svg`} alt="" />
          <div className={style.nameContainer}>
            <div className={style.text}>Report prepared for</div>
            <div className={style.boldText}>{report.fullname}</div>
            <div className={style.text}>Report Language: English</div>
            <div className={style.text}>
              {moment(new Date(report.date_of_generation)).format(
                "MMMM D, YYYY"
              )}
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
            This section of the report will present a summary of your
            psychometric profile by highlighting your dominant interest areas,
            personality aspects, aptitudes, work value preferences and emotional
            quotient.
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
          <div className={clsx(style.boxes, style.fullWidth)}>
            <Box
              data={report.dominant_eq.slice(0, 1)}
              title="Your Dominant Emotional Quotient"
              options={{ background: _Colors.eq, size: "full" }}
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

        {/* -------------------APTITUDE ----------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------------------------------ */}

        <Page className={clsx(style.page9, style.staticImg)}>
          <img className={style.fullSize} src={`${baseImage}/08.svg`} alt="" />
        </Page>

        <Page className={clsx(style.page9, style.details)}>
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
              height={300}
            />
          </div>
        </Page>

        <Page>
          <InDepthPage
            title="Aptitude"
            category="Numerical Aptitude"
            color={_Colors.aptitude}
            score={data.character_data.aptitude.numerical_aptitude}
            icons={data["dominant_aptitude"]}
            IntroComponent={() => <IntroNumApti />}
            AnalysisComponent={() => (
              <AnalysisNumApti
                score={data.character_data.aptitude.numerical_aptitude}
              />
            )}
            ImprovComponent={() => (
              <ImprovNumApti
                score={data.character_data.aptitude.numerical_aptitude}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Aptitude"
            category="Verbal Aptitude"
            color={_Colors.aptitude}
            score={data.character_data.aptitude.verbal_aptitude}
            icons={data["dominant_aptitude"]}
            IntroComponent={() => <IntroVerbalApti />}
            AnalysisComponent={() => (
              <AnalysisVerbalApti
                score={data.character_data.aptitude.verbal_aptitude}
              />
            )}
            ImprovComponent={() => (
              <ImprovVerbalApti
                score={data.character_data.aptitude.verbal_aptitude}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Aptitude"
            category="Mechanical Reasoning"
            color={_Colors.aptitude}
            score={data.character_data.aptitude.mechanical_reasoning}
            icons={data["dominant_aptitude"]}
            IntroComponent={() => <IntroMechReason />}
            AnalysisComponent={() => (
              <AnalysisMechReason
                score={data.character_data.aptitude.mechanical_reasoning}
              />
            )}
            ImprovComponent={() => (
              <ImprovMechReason
                score={data.character_data.aptitude.mechanical_reasoning}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Aptitude"
            category="Abstract Reasoning"
            color={_Colors.aptitude}
            score={data.character_data.aptitude.abstract_reasoning}
            icons={data["dominant_aptitude"]}
            IntroComponent={() => <IntroAbsReason />}
            AnalysisComponent={() => (
              <AnalysisAbsReason
                score={data.character_data.aptitude.abstract_reasoning}
              />
            )}
            ImprovComponent={() => (
              <ImprovAbsReason
                score={data.character_data.aptitude.abstract_reasoning}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Aptitude"
            category="Spatial Aptitude"
            color={_Colors.aptitude}
            score={data.character_data.aptitude.spatial_aptitude}
            icons={data["dominant_aptitude"]}
            IntroComponent={() => <IntroSpaApti />}
            AnalysisComponent={() => (
              <AnalysisSpaApti
                score={data.character_data.aptitude.spatial_aptitude}
              />
            )}
            ImprovComponent={() => (
              <ImprovSpaApti
                score={data.character_data.aptitude.spatial_aptitude}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Aptitude"
            category="Perceptual Aptitude"
            color={_Colors.aptitude}
            score={data.character_data.aptitude.perceptual_aptitude}
            icons={data["dominant_aptitude"]}
            IntroComponent={() => <IntroPerApti />}
            AnalysisComponent={() => (
              <AnalysisPerApti
                score={data.character_data.aptitude.perceptual_aptitude}
              />
            )}
            ImprovComponent={() => (
              <ImprovPerApti
                score={data.character_data.aptitude.perceptual_aptitude}
              />
            )}
          />
        </Page>

        {/* -------------------PERSONALITY ----------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------------------------------ */}

        <Page className={clsx(style.page9, style.staticImg)}>
          <img className={style.fullSize} src={`${baseImage}/16.svg`} alt="" />
        </Page>

        <Page className={clsx(style.page9, style.details)}>
          <div className={style.title}>Your Dominant Personality</div>
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
            />
          </div>
        </Page>

        <Page>
          <InDepthPage
            title="Personality"
            category="Self control"
            color={_Colors.personality}
            score={data.character_data.personality.self_control}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroSelfControl />}
            AnalysisComponent={() => (
              <AnalysisSelfControl
                score={data.character_data.personality.self_control}
              />
            )}
            ImprovComponent={() => (
              <ImprovSelfControl
                score={data.character_data.personality.self_control}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Personality"
            category="Stress tolerance"
            color={_Colors.personality}
            score={data.character_data.personality.stress_tolerance}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroStressTol />}
            AnalysisComponent={() => (
              <AnalysisStressTol
                score={data.character_data.personality.stress_tolerance}
              />
            )}
            ImprovComponent={() => (
              <ImprovStressTol
                score={data.character_data.personality.stress_tolerance}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Personality"
            category="Compassion"
            color={_Colors.personality}
            score={data.character_data.personality.compassion}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroCompassion />}
            AnalysisComponent={() => (
              <AnalysisCompassion
                score={data.character_data.personality.compassion}
              />
            )}
            ImprovComponent={() => (
              <ImprovCompassion
                score={data.character_data.personality.compassion}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Personality"
            category="Politeness"
            color={_Colors.personality}
            score={data.character_data.personality.politeness}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroPoliteness />}
            AnalysisComponent={() => (
              <AnalysisPoliteness
                score={data.character_data.personality.politeness}
              />
            )}
            ImprovComponent={() => (
              <ImprovPoliteness
                score={data.character_data.personality.politeness}
              />
            )}
          />
        </Page>

        {data.character_data.personality.industriousness && (
          <Page>
            <InDepthPage
              title="Personality"
              category="Industriousness"
              color={_Colors.personality}
              score={data.character_data.personality.industriousness}
              icons={data["dominant_personality"]}
              IntroComponent={() => <IntroIndustriousness />}
              AnalysisComponent={() => (
                <AnalysisIndustriousness
                  score={data.character_data.personality.industriousness}
                />
              )}
              ImprovComponent={() => (
                <ImprovIndustriousness
                  score={data.character_data.personality.industriousness}
                />
              )}
            />
          </Page>
        )}

        <Page>
          <InDepthPage
            title="Personality"
            category="Orderliness"
            color={_Colors.personality}
            score={data.character_data.personality.orderliness}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroOrderliness />}
            AnalysisComponent={() => (
              <AnalysisOrderliness
                score={data.character_data.personality.orderliness}
              />
            )}
            ImprovComponent={() => (
              <ImprovOrderliness
                score={data.character_data.personality.orderliness}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Personality"
            category="Enthusiasm"
            color={_Colors.personality}
            score={data.character_data.personality.enthusiasm}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroEnthu />}
            AnalysisComponent={() => (
              <AnalysisEnthu
                score={data.character_data.personality.enthusiasm}
              />
            )}
            ImprovComponent={() => (
              <ImprovEnthu score={data.character_data.personality.enthusiasm} />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Personality"
            category="Assertiveness"
            color={_Colors.personality}
            score={data.character_data.personality.assertiveness}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroAssertiveness />}
            AnalysisComponent={() => (
              <AnalysisAssertiveness
                score={data.character_data.personality.assertiveness}
              />
            )}
            ImprovComponent={() => (
              <ImprovAssertiveness
                score={data.character_data.personality.assertiveness}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Personality"
            category="Intellect"
            color={_Colors.personality}
            score={data.character_data.personality.intellect}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroIntellect />}
            AnalysisComponent={() => (
              <AnalysisIntellect
                score={data.character_data.personality.intellect}
              />
            )}
            ImprovComponent={() => (
              <ImprovIntellect
                score={data.character_data.personality.intellect}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="Personality"
            category="Openness"
            color={_Colors.personality}
            score={data.character_data.personality.openness}
            icons={data["dominant_personality"]}
            IntroComponent={() => <IntroOpenness />}
            AnalysisComponent={() => (
              <AnalysisOpenness
                score={data.character_data.personality.openness}
              />
            )}
            ImprovComponent={() => (
              <ImprovOpenness
                score={data.character_data.personality.openness}
              />
            )}
          />
        </Page>

        {/* -------------------WVP ----------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------------------------------ */}

        <Page className={clsx(style.page9, style.staticImg)}>
          <img className={style.fullSize} src={`${baseImage}/28.svg`} alt="" />
        </Page>

        <Page className={clsx(style.page9, style.details)}>
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
            />
          </div>
        </Page>

        <Page>
          <InDepthPage
            title="WVP Areas"
            category="Achievement"
            color={_Colors.wvp}
            score={data.character_data.wvp.achievement}
            icons={data["dominant_wvp"]}
            IntroComponent={() => <IntroAchievement />}
            ImprovComponent={() => (
              <ImprovAchievement score={data.character_data.wvp.achievement} />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="WVP Areas"
            category="Independence"
            color={_Colors.wvp}
            score={data.character_data.wvp.independence}
            icons={data["dominant_wvp"]}
            IntroComponent={() => <IntroIndep />}
            ImprovComponent={() => (
              <ImprovIndep score={data.character_data.wvp.independence} />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="WVP Areas"
            category="Recognition"
            color={_Colors.wvp}
            score={data.character_data.wvp.recognition}
            icons={data["dominant_wvp"]}
            IntroComponent={() => <IntroRecog />}
            ImprovComponent={() => (
              <ImprovRecog score={data.character_data.wvp.recognition} />
            )}
          />
        </Page>

        {data.character_data.wvp.relationships && (
          <Page>
            <InDepthPage
              title="WVP Areas"
              category="Relationships"
              color={_Colors.wvp}
              score={data.character_data.wvp.relationships}
              icons={data["dominant_wvp"]}
              IntroComponent={() => <IntroRelation />}
              ImprovComponent={() => (
                <ImprovRelation score={data.character_data.wvp.relationships} />
              )}
            />
          </Page>
        )}

        <Page>
          <InDepthPage
            title="WVP Areas"
            category="Support"
            color={_Colors.wvp}
            score={data.character_data.wvp.support}
            icons={data["dominant_wvp"]}
            IntroComponent={() => <IntroSupport />}
            ImprovComponent={() => (
              <ImprovSupport score={data.character_data.wvp.support} />
            )}
          />
        </Page>

        {data.character_data.wvp.working_conditions && (
          <Page>
            <InDepthPage
              title="WVP Areas"
              category="Working conditions"
              color={_Colors.wvp}
              score={data.character_data.wvp.working_conditions}
              icons={data["dominant_wvp"]}
              IntroComponent={() => <IntroWorkCond />}
              ImprovComponent={() => (
                <ImprovWorkCond
                  score={data.character_data.wvp.working_conditions}
                />
              )}
            />
          </Page>
        )}

        {/* -------------------EQ ----------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------------------------------------ */}

        <Page className={clsx(style.page2, style.staticImg)}>
          <img className={style.fullSize} src={`${baseImage}/36.svg`} alt="" />
        </Page>

        <Page className={clsx(style.page9, style.details)}>
          <div className={style.title}>Your Dominant EQ Aspect</div>
          <div className={style.boxContainer}>
            <Box
              data={report.dominant_eq.slice(0, 1)}
              options={{ background: _Colors.eq, size: "medium" }}
            />
          </div>
          <div className={style.graphContainer}>
            <Graph
              data={{
                labels: graphData.eq_labels,
                values: graphData.eq_final_list,
              }}
              color={_Colors.eq}
              height={300}
            />
          </div>
        </Page>

        <Page>
          <InDepthPage
            title="EQ"
            category="Emotional competency"
            color={_Colors.eq}
            score={data.character_data.eq.emotional_competency}
            icons={data["dominant_eq"]}
            IntroComponent={() => <IntroEmoComp />}
            AnalysisComponent={() => (
              <AnalysisEmoComp
                score={data.character_data.eq.emotional_competency}
              />
            )}
            ImprovComponent={() => (
              <ImprovEmoComp
                score={data.character_data.eq.emotional_competency}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="EQ"
            category="Emotional maturity"
            color={_Colors.eq}
            score={data.character_data.eq.emotional_maturity}
            icons={data["dominant_eq"]}
            IntroComponent={() => <IntroEmoMaturity />}
            AnalysisComponent={() => (
              <AnalysisEmoMaturity
                score={data.character_data.eq.emotional_maturity}
              />
            )}
            ImprovComponent={() => (
              <ImprovEmoMaturity
                score={data.character_data.eq.emotional_maturity}
              />
            )}
          />
        </Page>

        <Page>
          <InDepthPage
            title="EQ"
            category="Emotional sensitivity"
            color={_Colors.eq}
            score={data.character_data.eq.emotional_sensitivity}
            icons={data["dominant_eq"]}
            IntroComponent={() => <IntroEmoSensi />}
            AnalysisComponent={() => (
              <AnalysisEmoSensi
                score={data.character_data.eq.emotional_sensitivity}
              />
            )}
            ImprovComponent={() => (
              <ImprovEmoSensi
                score={data.character_data.eq.emotional_sensitivity}
              />
            )}
          />
        </Page>

        <Page className={clsx(style.page2, style.staticImg)}>
          <img className={style.fullSize} src={`${baseImage}/41.svg`} alt="" />
        </Page>

        {report.dominant_careers.slice(0, 5).map((career) => (
          <Page>
            <CareerRedesign data={career[3]} name={career[0]} img={career[1]} />
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
          <img className={style.fullSize} src={`${baseImage}/48.svg`} alt="" />
        </Page>

        <Page className={clsx(style.page2, style.staticImg)}>
          <img
            className={style.fullSize}
            src={`${baseImage}/final.svg`}
            alt=""
          />
        </Page>
      </div>
    )
  );
}
