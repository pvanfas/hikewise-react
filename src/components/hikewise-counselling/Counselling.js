import React from "react";
import style from "./Counselling.module.scss";

import clsx from "clsx";
import Navbar from "components/navbar/Navbar";

import BannerGraphic from "assets/images/PAGE4/banner_graphic.svg";
import BannerTopGraphic from "assets/images/PAGE4/banner_top.svg";

import HowInfographic from "assets/images/PAGE4/how_infographic.png";
import HowInfographic2 from "assets/images/PAGE4/how_infographic_2.png";
import HowInfographic3 from "assets/images/PAGE4/how_infographic_3.png";
import HowInfographic4 from "assets/images/PAGE4/how_infographic_4.png";

import ContentGraphic1 from "assets/images/PAGE4/content_graphic_1.png";
import ContentGraphic2 from "assets/images/PAGE4/content_graphic_2.png";
import ContentGraphic3 from "assets/images/PAGE4/content_graphic_3.png";

import WhoBannerRightGraphic from "assets/images/PAGE4/who_banner_right.svg";
import PreFooterBanner from "components/shared/PreFooterBanner";
import Footer from "components/footer/Footer";

import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Pagination, Autoplay]);

export default function Page4() {
  return (
    <>
      <Navbar background="white" />
      <div id="Page4Wrapper" className={style.wrapper}>
        <div className={clsx(style.hero, style.hPadding)}>
          <div className={clsx(style.banner)}>
            <Swiper
              pagination={{ clickable: true }}
              navigation={false}
              slidesPerView={1}
              spaceBetween={50}
              className={style.swiperContainer}
              allowTouchMove={true}
              speed={1000}
            >
              {[
                "The success of counseling is to be assessed by what an individual is able to accomplish in the real outside world and not with what happens inside the counselling session",
                "Career counselling is meant to make more enriched careers and personal lives, not for just a single career decision",
              ].map((item) => (
                <SwiperSlide className={style.slide} key={item}>
                  <div className={clsx(style.graphic, style.top)}>
                    <img src={BannerTopGraphic} alt="" />
                  </div>
                  <div className={clsx(style.graphic, style.right)}>
                    <img src={BannerGraphic} alt="" />
                  </div>

                  <div className={style.text}>{item}</div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* <div className={style.footer}>
              <span></span>
              <span></span>
            </div> */}
          </div>

          <div className={style.contentText}>
            <p>
              The Hikewise mechanism hasn’t been designed to definitively impose a single career decision on a person by
              algorithmically matching their personal characteristics with occupational demands. Rather it is a more
              result oriented continuous mentoring process that stimulates and encourages the person to take on an
              exploratory learning curve that makes them future ready and enables them to generate benefits even from
              unplanned future events. This is made possible by a combination of the highly advanced assessment and an
              equally structured and scientifically curated post assessment counselling mechanism that effectively
              blends the potentials of technology and the power of human intelligence.
            </p>
          </div>
        </div>

        <div className={clsx(style.howSection, style.hPadding)}>
          <div className={style.sectionHeader}>
            HOW WAS IT <span>DEVELOPED</span>
          </div>

          <div className={style.infographic}>
            <img src={HowInfographic} alt="" />
          </div>

          <div className={style.contentText}>
            <p>
              Formulating a holistic career development system that can cater to the career/employment needs of a
              country which still has its career development practices at an infancy stage was never to be seen as a
              simple task. What we wanted to create was a system that could offer high quality guidance and counselling
              services which meets the needs of the population across the nation. We also wanted the system to be able
              to improve the cognitive, emotional and physical skills of its participants and empower them with a
              capability to remain alert and fully capitalize on the opportunities that they find.
            </p>

            <p>
              What lended a little extra complexity to our pursuit was the fact that the problem we had to solve was a
              mix of multiple subjects like Psychology, Pedagogy, Sociology and Philosophy. In order to build a robust
              research procedure that could produce useful outcomes, we had to devise a perfect combination of the
              existing methodologies and mechanisms that are employed for studies conducted in these subjects.
            </p>
            <p>
              The first step in the long but rewarding process was giving a clear definition to the research problem
              that we were trying to tackle. What followed was an exhaustive literature review where we analysed various
              career development theories starting from Parson’s trait-factor propositions to the latest theories that
              prevail in the today’s world of cognitive computing systems. The exploration also extended to various
              counselling theories like the person-centered approach, CBT based career counselling, and to new and
              emerging techniques like the solution focused approach and motivational interviewing.
            </p>
          </div>

          <div className={clsx(style.infographic, style.graphic2)}>
            <img src={HowInfographic2} alt="" />
          </div>

          <div className={style.contentText}>
            <p>
              Given the purpose and theoretical background of the study, we adopted an interpretive research design. The
              epistemological framework used was that of constructionism which challenges the quantitative scientific
              assumption that “reality can be reduced to its component parts” and argues that social phenomena needs to
              be understood from a context specific perspective.
            </p>

            <p>
              Constructionism is important in this study because there needs to be an understanding of how career
              counsellors can develop a proper sense of the strategies and techniques that they are supposed to use in
              practice. And appreciating the importance on emphasizing the meanings that career counsellors attach to
              the world around them and how it shapes their outlook, symbolic interactionism was chosen as the
              theoretical perspective for the study.
            </p>

            <p>
              The next step in the process was finalising a primary vehicle for gathering data. After giving due
              consideration to the theoretical foundations of career counselling studies which have emerged from
              theories embedded in logical positivism and social constructivism, a multi-site case study approach was
              found to be the appropriate methodology for collecting data.
            </p>
            <p>
              A multi-site case study was chosen because it allows a number of cases to be studied jointly in order to
              investigate phenomena. The more cases that are included in the study, then greater the variation across
              the cases and the more compelling the interpretation becomes. Therefore, multicases enhance the external
              validity or generalisability of the research. Moreover this approach is more representative of the
              postmodern approach in career research where the local narrative or story told by the research participant
              is also afforded importance rather than just taking quantitative inputs from them.
            </p>
          </div>

          <div className={style.contentWithImg}>
            <div className={style.contentText}>
              <p>
                The first step in the data analysis process for our research was carrying out multiple surveys,
                interviews, and focus group discussions among the research participants which included career
                counsellors, industry experts, academicians, students, parents, and teachers. General themes began to
                emerge from the research during the data display and reflection exercise that followed.
              </p>
              <p>
                The real analysis started when we utilised open coding techniques to generate specific themes and
                categories from the research data. It helped us to develop the meanings and allowed us to take insights
                from the data that had already been collected from the research participants. In order to increase the
                validation of the findings, a careful approach of comparative data analysis was adopted throughout the
                study. In this approach, the concepts derived from the data are closely examined for similarities and
                differences at all times across all sites.
              </p>
              <p>
                After that, data reduction techniques were used to refine and organise the data so that well defined
                conclusions could be drawn from it and then verified. By this stage, a clear story had started to emerge
                from the information relayed by the research participants. But, with an aim of enhancing the integrity
                of the research, they were consulted again at this stage before drawing any final conclusions from the
                data.
              </p>
              <p>
                Finally, after the long research process where data analysis occurred simultaneously and iteratively
                with data collection, data interpretation and report writing, a dissertation was drawn together which
                was shown to closely reflect the views, perceptions, beliefs and feelings of the research participants.
              </p>
            </div>

            <div className={clsx(style.infographic, style.graphic3)}>
              <img src={HowInfographic3} alt="" />
            </div>
          </div>

          <div className={clsx(style.contentWithImg, style.alt)}>
            <div className={style.contentText}>
              <p>
                The factors influencing career development and planning in the Indian context can be broadly divided
                into three categories, the intrapersonal, sociological and environmental-societal factors. Combining our
                research findings and inputs taken from a team of experts in this domain, we created the highly
                structured and scientifically curated Hikewise post-assessment counselling mechanism which effectively
                takes into account all these factors.
              </p>
              <p>
                It is a one of its kind yet effortless process that involves the test taker, their parents and
                meticulously trained Hikewise career development executives. Focusing on the essential areas that
                determine the holistic development of an individual, the mechanism successfully provides effective and
                easy to implement solutions that works at a personalised level for each individual.
              </p>

              <p>
                The mechanism has been tried and tested to be able to adeptly combine the deep psychometric insights
                that the career assessment test provides with other relevant and equally important factors outside the
                scope of such an assessment. And this is exactly what sets Hikewise a cut above the rest of its
                competitors and makes it India’s most comprehensive career development mechanism.
              </p>
            </div>

            <div className={clsx(style.infographic, style.graphic3)}>
              <img src={HowInfographic4} alt="" />
            </div>
          </div>
        </div>

        <div className={clsx(style.columnContents, style.hPadding)}>
          <div className={style.row}>
            <div className={style.image}>
              <img src={ContentGraphic1} alt="" />
            </div>
            <div className={style.content}>
              <div className={style.sectionHeader}>
                HOW IT <span>WORKS</span>
              </div>

              <div className={style.title}>Finding out psychometric traits through career assessment test</div>

              <div className={style.contentText}>
                <p>
                  Psychometric traits form a very important part of the intrapersonal factors that influence the career
                  development process of an individual. And most of these traits can be evaluated using objective,
                  standardised assessments.
                </p>
                <p>
                  Our highly scientific testing mechanism that has been specifically developed for the Indian context,
                  is used to extract a complete picture of the psychometric makeup of an individual by assessing
                  multiple traits like aptitudes, personality, interests, work value preferences, and emotional
                  intelligence.
                </p>
                <p>
                  The test results which include a detailed critical analysis and improvement strategies wherever
                  required, is presented through the easy to understand yet comprehensive Hikewise report.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={clsx(style.columnContents, style.alt, style.hPadding)}>
          <div className={clsx(style.row, style["row2"])}>
            <div className={style.content}>
              <div className={style.title}>
                Gathering, Processing and Analysing information about other important factors
              </div>

              <div className={style.contentText}>
                <p>
                  In addition to the psychometric traits, there are other very important factors that need to be
                  considered in the career development and planning process of an individual in the Indian context.
                  These include both intrapersonal (past academic performance, talents in specific fields, health
                  issues, age, beliefs etc.) and societal/environmental factors (peer and family influences,
                  socioeconomic background, school/college environment, association with community groups etc.).
                </p>

                <p>
                  Our mechanism gathers the information related to these factors from the test taker and their parents
                  through a very simple process that works completely on the personalised Hikewise dashboard. The data
                  collected is then processed using an algorithm that takes full advantage of the potentials of
                  technology to display it in a manner that is ready for data interpretation and analysis. This lucid
                  and concise display of a very wide range of information facilitates our trained career experts in
                  making quick decisions.
                </p>
              </div>
            </div>

            <div className={style.image}>
              <img src={ContentGraphic2} alt="" />
            </div>
          </div>
        </div>

        <div className={clsx(style.columnContents, style.hPadding)}>
          <div className={style.row}>
            <div className={style.image}>
              <img src={ContentGraphic3} alt="" />
            </div>
            <div className={style.content}>
              <div className={style.title}>
                Creating a pragmatic action plan after well-structured face to face sessions
              </div>

              <div className={style.contentText}>
                <p>
                  During the face to face counselling sessions, our trained career experts verify the accuracy and
                  coherence of the information that has already been collected and analysed. Throughout the well
                  structured interactions that occur during the sessions, they also try to grasp any further information
                  that would be relevant. Then they go on to create a personalised and easy to implement action plan for
                  the individual which holistically covers multiple areas like academic success, career planning, and
                  personal development.
                </p>
                <p>
                  The team of experts who handle these sessions are ever-observant and continuously updated on the
                  changing future landscape of the world of careers. This helps them to maintain a clear understanding
                  of important factors like the dynamic employment market and how it is going to be affected by upcoming
                  government policies or global phenomena like the globalisation.
                </p>
                <p>
                  Combining this human intelligence and expertise with the objective and subjective data that is
                  collected from the individual and their environment, is what gives our mechanism its comprehensiveness
                  and makes it completely reflective of the long research process upon which it has been built upon.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={clsx(style.whoSection, style.hPadding)}>
          <div className={style.sectionHeader}>
            WHO EXECUTES <span>IT?</span>
          </div>

          <div className={clsx(style.banner, style.nonSlider)}>
            <div className={style.text}>
              Who is a career guidance practitioner? Are they just a database from where we get superficial career
              information like the list of careers that are in “scope” today or the application deadlines for admission
              into a specific institution? Or are they those prolific orators who are capable of captivating an audience
              with a dose of motivation and rhetoric? Or has the time come for us to challenge these obsolete and
              heedless notions?
            </div>

            <div className={clsx(style.graphic, style.top)}>
              <img src={BannerTopGraphic} alt="" />
            </div>
            <div className={clsx(style.graphic, style.right)}>
              <img src={WhoBannerRightGraphic} alt="" />
            </div>
          </div>

          <div className={style.contentText}>
            <p>
              In a process like career guidance, no matter how robust and technologically advanced system we build,
              effective outcomes can only be achieved if there are competent and well trained individuals to handle and
              execute such a mechanism. But unfortunately, our country does paint a very dismal picture in this regard.
              It is in need of at least half a million more well trained career counsellors to meet its exponentially
              growing demand.To make things worse, the country doesn’t have proper learning pathways that help career
              guidance practitioners to progress from a non-expert to expert status, neither does it have a competence
              framework that provides guidelines to evaluate their ‘expertise’. Very often, career guidance is handled
              by people with qualifications in so called ‘related fields’ while they clearly lack the competencies
              required for a very complex process like career guidance.Given the situation, it was quite apparent to us
              that finding able human resource for executing the Hikewise mechanism would not be very easy. Our answer
              to this dilemma and on a bigger realm to the country's imminent need for a pathbreaking intervention is
              the Hikewise Career Development Executive Training Program. Created and delivered by eminent educators,
              industry experts, psychologists and master trainers, the Hikewise CDE Program is the perfect stepping
              stone to build a career in the domain of career counselling.The participants for the Hikewise CDE program
              is selected through a rigorous multi step process where their potential and passion for the field are
              assessed. The initial phase of the training program runs for a duration of two-three months on both online
              and offline channels. It focuses on serving an appropriate combination of subjects like psychology,
              pedagogy, sociology and labour market studies while striking a proper balance between knowledge and theory
              on the one hand and practical skills and competencies on the other.On the completion of the initial
              training program, the CDEs enter the continuous learning environment which we see as a core pillar of our
              firm’s culture. The multiple learning exercises that happen on a weekly and monthly basis throughout the
              year enhances their skills, abilities and perceptions enabling them to become the “expert” who gives you
              the perfect guidance through the Hikewise post-assessment counselling mechanism.
            </p>
          </div>
        </div>

        <PreFooterBanner />
        <Footer />
      </div>
    </>
  );
}
