import React, { useState, useEffect, useRef } from "react";
import style from "./HikewiseDept.module.scss";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { GoChevronDown, GoChevronRight } from "react-icons/go";

import Feature1_1 from "assets/images/PAGE2/feature_1_1.png";
import Feature1_2 from "assets/images/PAGE2/feature_1_2.png";
import Feature1_3 from "assets/images/PAGE2/feature_1_3.png";

import Feature2_1 from "assets/images/PAGE2/feature_2_1.png";
import Feature2_2 from "assets/images/PAGE2/feature_2_2.png";
import Feature2_3 from "assets/images/PAGE2/feature_2_3.png";
import Feature2_4 from "assets/images/PAGE2/feature_2_4.png";

import Feature3_1 from "assets/images/PAGE2/feature_3_1.png";
import Feature3_2 from "assets/images/PAGE2/feature_3_2.png";

import Feature4_1 from "assets/images/PAGE2/feature_4_1.png";
import Feature4_2 from "assets/images/PAGE2/feature_4_2.png";

import Feature2_1_1 from "assets/images/PAGE2/feature2_1_1.png";
import Feature2_1_2 from "assets/images/PAGE2/feature2_1_2.png";
import Feature2_1_3 from "assets/images/PAGE2/feature2_1_3.png";
import Feature2_1_4 from "assets/images/PAGE2/feature2_1_4.png";

import Feature2_2_1 from "assets/images/PAGE2/feature2_2_1.png";
import Feature2_2_2 from "assets/images/PAGE2/feature2_2_2.png";
import Feature2_2_3 from "assets/images/PAGE2/feature2_2_3.png";
import Feature2_2_4 from "assets/images/PAGE2/feature2_2_4.png";

import Feature2_3_1 from "assets/images/PAGE2/feature2_3_1.png";
import Feature2_3_2 from "assets/images/PAGE2/feature2_3_2.png";
import Feature2_3_3 from "assets/images/PAGE2/feature2_3_3.png";
import Feature2_3_4 from "assets/images/PAGE2/feature2_3_4.png";

import AssessmentImg from "assets/images/PAGE2/assessment.png";
import ReportImg from "assets/images/PAGE2/report.png";
import CounsellingImg from "assets/images/PAGE2/counselling.png";

import Navbar from "components/navbar/Navbar";
import Footer from "../footer/Footer";

import PreFooterBanner from "components/shared/PreFooterBanner";
import WithPadding from "components/shared/WithPadding";
import InlineLoader from "components/shared/InlineLoader";
import PlanCard from "components/shared/PlanCard";

import { getRequest } from "utils/api";

SwiperCore.use([Pagination, Autoplay]);

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "").split(".")[0].toLowerCase()] = r(item);
  });
  return images;
}

const IMAGES_RISE = importAll(require.context("assets/images/PAGE2/dashboard/rise", true, /\.(png|jpe?g|svg|webp)$/));
const IMAGES_SAIL = importAll(require.context("assets/images/PAGE2/dashboard/sail", true, /\.(png|jpe?g|svg|webp)$/));
const IMAGES_REDESIGN = importAll(
  require.context("assets/images/PAGE2/dashboard/redesign", true, /\.(png|jpe?g|svg|webp)$/)
);

function getHeader(type) {
  switch (type) {
    case "8-9":
      return `Give a head start to your career journey`;
    case "10-12":
      return `Make the right choices for a successful career path`;
    case "collg":
      return `Choose the best next step for a successful career`;

    default:
      return "";
  }
}

function getSubheader(type) {
  switch (type) {
    case "8-9":
      return "Discover how a budding school student can make their perfect stream choice with the help of Hikewise Rise";
    case "10-12":
      return `Discover how a senior school student can choose their perfect career path with the help of Hikewise Sail`;
    case "collg":
      return `Discover how a college student/ graduate can reinvent their career path with the help of Hikewise Redesign`;
    default:
      return "";
  }
}

function getCareerWord(type) {
  switch (type) {
    case "8-9":
      return "stream";

    default:
      return "career";
  }
}

function getColumns(type) {
  switch (type) {
    case "collg":
      return [
        {
          title: "CAREER PLANNING",
          boxes: [
            "I am finding it difficult to adjust with my current career field, should I consider a career switch?",
            "How do I make the perfect higher education choice that can boost my career?",
            `I think I have made the wrong choice with my course. What to do now?`,
            `I am concerned about my career growth. What can I do?`,
            `What skills should I acquire to get my dream job?`,
          ],
        },
        {
          title: "ACADEMIC SUCCESS",
          boxes: [
            "How do I perform better in competitive exams where aptitudes are tested?",
            `I think I am lacking some specific skills needed to perform well in my job. What can I do?`,
            `I am not satisfied with the way I am writing my exams. What should I do about this?`,
            `I am not able to perform well even after studying hard in college. How to tackle this?`,
          ],
        },
        {
          title: "PERSONAL DEVELOPMENT",
          boxes: [
            `I have stress issues. How to solve this?`,
            `I am involved in a lot of activities outside work/academics. How to manage my time perfectly?`,
            `I find it difficult to mingle with people and work in teams. How to improve my people skills?`,
            `I am never able to properly follow a schedule. How can I bring more order into my life?`,
          ],
        },
      ];
    case "8-9":
      return [
        {
          title: "CAREER PLANNING",
          boxes: [
            "Which stream should I choose after 10th?",
            "Should I change my board of education in 11th?",
            "I am interested in a particular career. Is it suitable for me?",
            "How can I explore more about different career fields?",
            "What are the skills required for the future and what can I do now to start building them?",
          ],
        },
        {
          title: "ACADEMIC SUCCESS",
          boxes: [
            "I am not able to score well in my exams. What should I do?",
            "I am finding it difficult to learn specific subjects. How can I overcome this?",
            "I don’t see the point in learning some subjects. Why should I learn it?",
            "I am not able to perform well even after studying hard. How to tackle this?",
          ],
        },
        {
          title: "PERSONAL DEVELOPMENT",
          boxes: [
            "I have stress issues. How to solve this?",
            "I am involved in a lot of extra-curricular activities. How to manage my time perfectly?",
            "I find it difficult to mingle with people and work in teams. How to improve my people skills?",
            "I am never able to properly follow a schedule. How can I bring more order into my life?",
          ],
        },
      ];
    case "10-12":
      return [
        {
          title: "CAREER PLANNING",
          boxes: [
            "Which career fields would be the best for me?",
            "How should I choose my college and course after 12th?",
            `I am interested in a particular career. Is it suitable for me?`,
            `What strategies should I take to prepare for my college admission?`,
            `What are the skills for the future and how do I acquire them?`,
          ],
        },
        {
          title: "ACADEMIC SUCCESS",
          boxes: [
            `I am not able to score well in my exams. What should I do?`,
            `I am finding it difficult to learn specific subjects. How can I overcome this?`,
            `I am having trouble in preparing well for my entrance exams. What can I do?`,
            `I am not able to perform well even after studying hard. How to tackle this?`,
          ],
        },
        {
          title: "PERSONAL DEVELOPMENT",
          boxes: [
            `I have stress issues. How to solve this?`,
            `I am involved in a lot of extra-curricular activities. How to manage my time perfectly?`,
            `I find it difficult to mingle with people and work in teams. How to improve my people skills?`,
            `I am never able to properly follow a schedule. How can I bring more order into my life?`,
          ],
        },
      ];

    default:
      return [];
  }
}

function getFeaturesContent(type) {
  switch (type) {
    case "collg":
      return [
        {
          header: "Get a deep understanding of yourself",
          desc: `Hikewise helps you explore your unique set of potentials and talents so that you can start taking your life forward in a direction that offers you a sense of fulfilment. You also get a complete understanding of what you really are and what you really want for yourself.`,
          feats: [
            {
              title: "Aptitudes",
              text: "You get to know where you stand in terms of various aptitudes or the competency you possess to perform specific tasks.",
              img: Feature1_1,
            },
            {
              title: "Personality",
              text: "You get an in-depth understanding of your personality in terms of various well defined attributes.",
              img: Feature1_2,
            },
            {
              title: "Interests",
              text: "You get a quantitative picture of where your interests actually lie.",
              img: Feature1_3,
            },
            {
              title: "Work Value preference",
              text: "You get to identify the kind and nature of the work environment that you would prefer.",
              img: Feature2_1_1,
            },
            {
              title: "Emotional Quotient",
              text: `You get a clear measure of your emotional skills.`,
              img: Feature3_1,
            },
          ],
        },
        {
          header: "Plan your next career move",
          desc: `The Hikewise mechanism provides clear solutions to all your career related confusions after your psychometric traits, socio-economic background, past academic performance and talents in specific fields.`,
          feats: [
            {
              title: "Find your best fit careers",
              text: `You get to understand which career fields would be the best 
fit for you and receive guidance from our experts to make 
the right choice.`,
              img: Feature2_1,
            },
            {
              title: "Take the right next step",
              text: "You get assistance on how to boost your career and also on possible career switches and higher eduction.",
              img: Feature2_2,
            },
            {
              title: "Ease your path through tailor made resources",
              text: `You are given a clear direction on how to effectively use the 
resources available offline and online to get to your best
 fit careers much more easily.`,
              img: Feature2_3,
            },
            {
              title: "Skill building to take your career to the next level",
              text: "You are given a proper understanding of the skills that the future job market would demand and how you can acquire those",
              img: Feature2_4,
            },
          ],
        },
        {
          header: "Develop your aptitudes",
          desc: "Hikewise’s outcome oriented continuous mentoring process helps you to bridge your skill gap and allows you to perform to your fullest potential.",
          feats: [
            {
              title: "Aptitude development strategies",
              text: "You get actionable techniques on how to improve your aptitudes and this helps you a long way since most of the Indian competitive exams test your aptitudes along with subject knowledge.",
              img: Feature3_1,
            },
            {
              title: "Areas to focus",
              text: `You get to understand the areas you have to start focusing on 
                    in your academics and work inorder to enhance your career.`,
              img: Feature3_2,
            },
          ],
        },
        {
          header: "Gain clarity on your personal development",
          desc: `The Hikewise mechanism gives you a thorough 
                  understanding of how you are as a person, both 
                  in the individual space and in a social setting. 
                  It also gives you practical solutions and continuous 
                  support to identify areas of improvement and 
                  bring about change wherever required.`,
          feats: [
            {
              title: "Personality improvement plans",
              text: "You are given simple and effective plans that help you to become a more all rounded and enhanced individual.",
              img: Feature4_1,
            },
            {
              title: "Activities to focus",
              text: "You are provided with activities that you can take up in order to bring the required improvements in your personality.",
              img: Feature4_2,
            },
          ],
        },
      ];

    case "8-9":
      return [
        {
          header: "Get a deep understanding of yourself",
          desc: `Hikewise helps you explore your unique set of potentials and talents so that you can start taking your life forward in a direction that offers you a sense of fulfilment. You also get a complete understanding of what you really are and what you really want for yourself.`,
          feats: [
            {
              title: "Aptitudes",
              text: "You get to know where you stand in terms of various aptitudes or the competency you possess to perform specific tasks.",
              img: Feature1_1,
            },
            {
              title: "Personality",
              text: "You get an in-depth understanding of your personality in terms of various well defined attributes.",
              img: Feature1_2,
            },
            {
              title: "Interests",
              text: "You get a quantitative picture of where your interests actually lie.",
              img: Feature1_3,
            },
          ],
        },
        {
          header: "Plan ahead for your career",
          desc: "The Hikewise mechanism provides clear solutions to all your career related confusions after analysing your psychometric traits, socio-economic background, past academic performance, talents in specific fields and your parent’s perspective and expectations about you.",
          feats: [
            {
              title: "Best fit stream choices for you",
              text: "You get to understand which stream would be your perfect choice after class 10th and you take away a detailed picture on how to pursue your future journey.",
              img: Feature2_1,
            },
            {
              title: "Resources to explore careers in best fit streams",
              text: "You are given a clear direction on how to effectively use the resources available offline and online to get a deeper sense of what different careers are.",
              img: Feature2_2,
            },
            {
              title: "Subject areas to focus",
              text: "You get insights on what specific topics and subjects you should put some extra focus in your academics so that the path to your most fit careers would become much easier.",
              img: Feature2_3,
            },
            {
              title: "Explore future skills",
              text: "You are given a proper understanding of the skills that would be required in the future and how you can take some simple steps to start building them right now.",
              img: Feature2_4,
            },
          ],
        },
        {
          header: "Solve your academic issues",
          desc: "Hikewise’s outcome oriented continuous mentoring process helps you to tackle the difficulties you face in your academics and allows you to perform to your fullest potential.",
          feats: [
            {
              title: "Aptitude development strategies",
              text: "You get actionable techniques on how to improve your aptitudes and this helps you a long way since most of the Indian competitive exams test your aptitudes along with subject knowledge.",
              img: Feature3_1,
            },
            {
              title: "Love to learn",
              text: "You get to understand the importance and relevance of what you are learning currently and how it will be useful in the future. You are also given tips, tricks, and methods to make your learning experience much more enjoyable.",
              img: Feature3_2,
            },
          ],
        },
        {
          header: "Gain clarity on your personal development",
          desc: `The Hikewise mechanism gives you a thorough understanding of how you are as a person, both in the individual space and in a social setting. It also gives you practical solutions and continuous support to identify areas of improvement and bring about change wherever required.`,
          feats: [
            {
              title: "Personality improvement plans",
              text: "You are given simple and effective plans that help you to become a more all rounded and enhanced individual.",
              img: Feature4_1,
            },
            {
              title: "Extra-academic activities to focus",
              text: "You are provided with activities that you can take up in order to bring the required improvements in your personality.",
              img: Feature4_2,
            },
          ],
        },
      ];

    case "10-12":
      return [
        {
          header: "Get a deep understanding of yourself",
          desc: `Hikewise helps you explore your unique 
                set of potentials and talents so that you 
                can start taking your life forward in a direction 
                that offers you a sense of fulfilment. 
                You also get a complete understanding 
                of what you really are and what you 
                really want for yourself.`,
          feats: [
            {
              title: "Aptitudes",
              text: "You get to know where you stand in terms of various aptitudes or the competency you possess to perform specific tasks.",
              img: Feature1_1,
            },
            {
              title: "Personality",
              text: "You get an in-depth understanding of your personality in terms of various well defined attributes.",
              img: Feature1_2,
            },
            {
              title: "Interests",
              text: "You get a quantitative picture of where your interests actually lie.",
              img: Feature1_3,
            },
            {
              title: "Work Value preference",
              text: "You get to identify the kind and nature of the work environment that you would prefer.",
              img: Feature2_1_1,
            },
          ],
        },
        {
          header: `Build your career plan`,
          desc: `The Hikewise mechanism provides clear solutions
to all your career related confusions after analysing
your psychometric traits, socio-economic 
background, past academic performance, talents 
in specific fields and your parent’s perspective 
and expectations about you.`,
          feats: [
            {
              title: "Best fit career choices for you",
              text: `You get to understand which career fields would be the best 
fit for you and how to build for yourself a fruitful career in 
these fields.`,
              img: Feature2_1,
            },
            {
              title: "Choose the right course and college",
              text: `You are given thorough guidance on how to take the perfect first 
step in your career journey by choosing the right course and 
college.`,
              img: Feature2_2,
            },
            {
              title: "Ease your path through tailor made resources",
              text: `You are given a clear direction on how to effectively use the 
resources available offline and online to get to your best
 fit careers much more easily.`,
              img: Feature2_3,
            },
            {
              title: "Skill building to take your career to the next level",
              text: "You are given a proper understanding of the skills that the future job market would demand and how you can acquire those skills",
              img: Feature2_4,
            },
          ],
        },
        {
          header: "Solve your academic issues",
          desc: "Hikewise’s outcome oriented continuous mentoring process helps you to bridge your skill gap and allows you to perform to your fullest potential.",
          feats: [
            {
              title: "Aptitude development strategies",
              text: "You get actionable techniques on how to improve your aptitudes and this helps you a long way since most of the Indian competitive exams test your aptitudes along with subject knowledge.",
              img: Feature3_1,
            },
            {
              title: "Love to learn",
              text: `You get to understand the importance and relevance of what you 
are learning currently and how it will be useful in the future. 
You are also given tips, tricks, and methods to make your 
learning experience much more enjoyable.`,
              img: Feature3_2,
            },
          ],
        },
        {
          header: "Gain clarity on your personal development",
          desc: `The Hikewise mechanism gives you a thorough 
understanding of how you are as a person, both 
in the individual space and in a social setting. 
It also gives you practical solutions and continuous 
support to identify areas of improvement and 
bring about change wherever required.`,
          feats: [
            {
              title: "Personality improvement plans",
              text: "You are given simple and effective plans that help you to become a more all rounded and enhanced individual.",
              img: Feature4_1,
            },
            {
              title: "Extra-academic activities to focus",
              text: `You are provided with activities that you can take up in order 
to bring the required improvements in your personality.`,
              img: Feature4_2,
            },
          ],
        },
      ];

    default:
      return [];
  }
}

function getWhyFeaturesContent(type) {
  switch (type) {
    case "8-9":
      return [
        {
          title: "A unique career assessment test",
          img: AssessmentImg,
          feats: [
            {
              title: "State of the art technology",
              text: "An analytics driven tool that employs sophisticated statistical methods and advanced computational techniques like machine learning.",
              img: Feature2_1_1,
            },
            {
              title: "Multiple trait Stream Assessment",
              text: `Measures multiple traits that define an individual and matches 
                   them to their perfect career.`,
              img: Feature2_1_2,
            },
            {
              title: "Intuitive user interface",
              text: `A completely online test which is based on an intuitive 
                   dashboard that ensures a very smooth user experience.`,
              img: Feature2_1_3,
            },
            {
              title: "Available in multiple languages",
              text: `Offered in 13 local Indian languages, so that the test is accessible to everyone irrespective of their language abilities`,
              img: Feature2_1_4,
            },
          ],
        },
        {
          title: "Exhaustive assessment report",
          img: ReportImg,
          feats: [
            {
              title: "Critical analysis of the score in each trait",
              text: `A detailed and clear analysis of what the score in each trait coming under personality and aptitude means.`,
              img: Feature2_2_1,
            },
            {
              title: "Improvement strategies",
              text: `For each psychometric trait where there is a scope of improvement based on the test score, effective and easy to implement improvement strategies are provided.`,
              img: Feature2_2_2,
            },
            {
              title: "Best fit streams based on psychometric profile",
              text: `Based on a person’s psychometric profile, our sophisticated algorithm suggests the two stream choices that are the best fit for them.`,
              img: Feature2_2_3,
            },
            {
              title: "Comprehensive information on career opportunities",
              text: `Comprehensive information about the opportunities with different streams is explained in the report through concise mind maps.`,
              img: Feature2_2_4,
            },
          ],
        },
        {
          title: "Scientifically curated post assessment counselling mechanism",
          img: CounsellingImg,
          feats: [
            {
              title: "Counselling session with dedicated career experts",
              text: `Each student goes through a personalised one on one counselling 
    session over video conferencing with our dedicated career experts.`,
              img: Feature2_3_1,
            },
            {
              title: "Easily accessible to anyone from any part of the country",
              text: `The counselling sessions are designed to work completely 
    online on low bandwidth connections as well making it 
    easily accessible to remote locations of the country.`,
              img: Feature2_3_2,
            },
            {
              title: "Vital importance to parent’s perspective",
              text: `The parents take part in the counselling sessions and their 
    perspective and aspirations for their child are given 
    substantial importance.`,
              img: Feature2_3_3,
            },
            {
              title: "Holistic action plan",
              text: `At the end of the counselling session, each student is given 
    a detailed action plan that covers their career planning, 
    academics, and personal and social development.`,
              img: Feature2_3_4,
            },
          ],
        },
        {
          title: "Continuous mentoring and exhaustive pool of career resources",
          img: ReportImg,
          feats: [
            {
              title: "Continuous mentoring",
              text: `Each student is offered continuous support on implementing 
    their action plans through multiple counselling sessions.`,
              img: Feature2_3_1,
            },
            {
              title: "Chat support for all career related queries",
              text: `Get assistance from our career experts on all career related 
    queries through the Hikewise Chat with Expert system.`,
              img: Feature2_3_2,
            },
            {
              title: "Exhaustive set of resources on the Hikewise website",
              text: `Comprehensive information about any career related topic 
    is provided to everyone through the Hikewise Career 
    Library and the Hikewise blog.`,
              img: Feature2_3_3,
            },
          ],
        },
      ].map((item) => ({
        ...item,
        feats: item.feats.map((feat) => ({
          ...feat,
          tempImage: IMAGES_RISE[feat.title.toLowerCase()],
        })),
      }));

    case "10-12":
      return [
        {
          title: "A unique career assessment test",
          img: AssessmentImg,
          feats: [
            {
              title: "State of the art technology",
              text: "An analytics driven tool that employs sophisticated statistical methods and advanced computational techniques like machine learning.",
              img: Feature2_1_1,
            },
            {
              title: "Multiple trait career assessment",
              text: `Measures multiple traits that define an individual and matches 
                   them to their perfect career.`,
              img: Feature2_1_2,
            },
            {
              title: "Intuitive user interface",
              text: `A completely online test which is based on an intuitive 
                   dashboard that ensures a very smooth user experience.`,
              img: Feature2_1_3,
            },
            {
              title: "Available in multiple languages",
              text: `Offered in 13 local Indian languages, so that the test is accessible to everyone irrespective of their language abilities`,
              img: Feature2_1_4,
            },
          ],
        },
        {
          title: "Exhaustive assessment report",
          img: ReportImg,
          feats: [
            {
              title: "Critical analysis of the score in each trait",
              text: `A detailed and clear analysis of what the score in each trait 
            coming under personality, aptitude and work value 
            preferences means.`,
              img: Feature2_2_1,
            },
            {
              title: "Improvement strategies",
              text: `For each psychometric trait where there is a scope of improvement based on the test score, effective and easy to implement improvement strategies are provided.`,
              img: Feature2_2_2,
            },
            {
              title: "Best fit careers based on psychometric profile",
              text: `Based on a person’s psychometric profile, our sophisticated algorithm suggests the five careers fields that are the best fit for them.`,
              img: Feature2_2_3,
            },
            {
              title: "Comprehensive information on career opportunities",
              text: `Comprehensive information about the opportunities with 
            different careers are explained in the report through 
            concise mind maps.`,
              img: Feature2_2_4,
            },
          ],
        },
        {
          title: "Scientifically curated post assessment counselling mechanism",
          img: CounsellingImg,
          feats: [
            {
              title: "Counselling session with dedicated career experts",
              text: `Each student goes through a personalised one on one counselling 
              session over video conferencing with our dedicated career experts.`,
              img: Feature2_3_1,
            },
            {
              title: "Easily accessible to anyone from any part of the country",
              text: `The counselling sessions are designed to work completely 
              online on low bandwidth connections as well making it 
              easily accessible to remote locations of the country.`,
              img: Feature2_3_2,
            },
            {
              title: "Vital importance to parent’s perspective",
              text: `The parents take part in the counselling sessions and their 
              perspective and aspirations for their child are given 
              substantial importance.`,
              img: Feature2_3_3,
            },
            {
              title: "Holistic action plan",
              text: `At the end of the counselling session, each student is given 
    a detailed action plan that covers their career planning, 
    academics, and personal and social development.`,
              img: Feature2_3_4,
            },
          ],
        },
        {
          title: "Continuous mentoring and exhaustive pool of career resources",
          img: ReportImg,
          feats: [
            {
              title: "Continuous mentoring",
              text: `Each student is offered continuous support on implementing 
    their action plans through multiple counselling sessions.`,
              img: Feature2_3_1,
            },
            {
              title: "Chat support for all career related queries",
              text: `Get assistance from our career experts on all career related 
    queries through the Hikewise Chat with Expert system.`,
              img: Feature2_3_2,
            },
            {
              title: "Exhaustive set of resources on the Hikewise website",
              text: `Comprehensive information about any career related topic 
    is provided to everyone through the Hikewise Career 
    Library and the Hikewise blog.`,
              img: Feature2_3_3,
            },
          ],
        },
      ].map((item) => ({
        ...item,
        feats: item.feats.map((feat) => ({
          ...feat,
          tempImage: IMAGES_SAIL[feat.title.toLowerCase()],
        })),
      }));

    case "collg":
      return [
        {
          title: "A unique career assessment test",
          img: AssessmentImg,
          feats: [
            {
              title: "State of the art technology",
              text: "An analytics driven tool that employs sophisticated statistical methods and advanced computational techniques like machine learning.",
              img: Feature2_1_1,
            },
            {
              title: "Multiple trait career assessment",
              text: `Measures multiple traits that define an individual and matches 
                     them to their perfect career.`,
              img: Feature2_1_2,
            },
            {
              title: "Intuitive user interface",
              text: `A completely online test which is based on an intuitive 
                     dashboard that ensures a very smooth user experience.`,
              img: Feature2_1_3,
            },
            {
              title: "Available in multiple languages",
              text: `Offered in 13 local Indian languages, so that the test is accessible to everyone irrespective of their language abilities`,
              img: Feature2_1_4,
            },
          ],
        },
        {
          title: "Exhaustive assessment report",
          img: ReportImg,
          feats: [
            {
              title: "Critical analysis of the score in each trait",
              text: `A detailed and clear analysis of what the score in each trait coming under personality, aptitude, work value preferences and emotional quotient means.`,
              img: Feature2_2_1,
            },
            {
              title: "Improvement strategies",
              text: `For each psychometric trait where there is a scope of improvement based on the test score, effective and easy to implement improvement strategies are provided.`,
              img: Feature2_2_2,
            },
            {
              title: "Best fit careers based on psychometric profile",
              text: `Based on a person’s psychometric profile, our sophisticated algorithm suggests the five careers fields that are the best fit for them.`,
              img: Feature2_2_3,
            },
            {
              title: "Comprehensive information on career opportunities",
              text: `Comprehensive information about the opportunities with 
              different careers are explained in the report through 
              concise mind maps.`,
              img: Feature2_2_4,
            },
          ],
        },
        {
          title: "Scientifically curated post assessment counselling mechanism",
          img: CounsellingImg,
          feats: [
            {
              title: "Counselling session with dedicated career experts",
              text: `Each student goes through a personalised one on one counselling 
                session over video conferencing with our dedicated career experts.`,
              img: Feature2_3_1,
            },
            {
              title: "Easily accessible to anyone from any part of the country",
              text: `The counselling sessions are designed to work completely 
                online on low bandwidth connections as well making it 
                easily accessible to remote locations of the country.`,
              img: Feature2_3_2,
            },
            {
              title: "Holistic action plan",
              text: `At the end of the counselling session, each student is given 
      a detailed action plan that covers their career planning, 
      academics, and personal and social development.`,
              img: Feature2_3_4,
            },
          ],
        },
        {
          title: "Continuous mentoring and exhaustive pool of career resources",
          img: ReportImg,
          feats: [
            {
              title: "Continuous mentoring",
              text: `Each student is offered continuous support on implementing 
      their action plans through multiple counselling sessions.`,
              img: Feature2_3_1,
            },
            {
              title: "Chat support for all career related queries",
              text: `Get assistance from our career experts on all career related 
      queries through the Hikewise Chat with Expert system.`,
              img: Feature2_3_2,
            },
            {
              title: "Exhaustive set of resources on the Hikewise website",
              text: `Comprehensive information about any career related topic 
      is provided to everyone through the Hikewise Career 
      Library and the Hikewise blog.`,
              img: Feature2_3_3,
            },
          ],
        },
      ].map((item) => ({
        ...item,
        feats: item.feats.map((feat) => ({
          ...feat,
          tempImage: IMAGES_REDESIGN[feat.title.toLowerCase()],
        })),
      }));

    default:
      return [];
  }
}

function getDept(type) {
  switch (type) {
    case "8-9":
      return "RISE";
    case "10-12":
      return "SAIL";
    case "collg":
      return "REDESIGN";
    default:
      return "";
  }
}

export default function Page2({ type }) {
  const columns = getColumns(type);
  const FEATURES = getFeaturesContent(type);

  const tempImageRef1 = useRef();
  const tempImageRef2 = useRef();
  const tempImageRef3 = useRef();
  const tempImageRef4 = useRef();

  const tempImageRefs = [tempImageRef1, tempImageRef2, tempImageRef3, tempImageRef4];

  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [plans, setPlans] = useState([]);

  function getPaymentPlans() {
    setIsLoading(true);

    getRequest(`/payment/plans?dept=${getDept(type)}&is_booster=false`, {
      noAuth: true,
      removeTrailingSlash: true,
    })
      .then((resp) => {
        setPlans(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPaymentPlans();
  }, [type]);

  function handleClickDownloadSampleReport() {
    switch (type) {
      case "8-9":
        return window.open("https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/sample_report/rise.pdf");
      case "10-12":
        return window.open("https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/sample_report/sail.pdf");
      case "collg":
        return window.open("https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/sample_report/redesign.pdf");

      default:
        return;
    }
  }

  function handleMobileView() {
    setIsMobileView(window.innerWidth < 750);
  }

  function handleClickTab(index) {
    if (index === activeTabIndex) return setActiveTabIndex(null);
    return setActiveTabIndex(index);
  }

  function handleClickContinue() {
    window.location.href = "/dashboard/candidate/plans";
  }

  const [activeFeatIndex, setActiveEatIndex] = useState([0, 0, 0, 0]);

  function handleClickFeat(featureIndex, featIndex) {
    const toUpdate = [...activeFeatIndex];
    toUpdate[featureIndex] = featIndex;
    setActiveEatIndex(toUpdate);

    tempImageRefs[featureIndex].current.classList.add(style["imageAppearAnim"]);
    window.setTimeout(() => {
      tempImageRefs[featureIndex].current.classList.remove(style["imageAppearAnim"]);
    }, 800);
  }

  function handleClickContinueDashboard() {
    if ("authToken" in localStorage) {
      window.location.href = "/auth/register";
    } else window.location.href = "/dashboard/candidate/plans";
  }

  useEffect(() => {
    handleMobileView();
    window.addEventListener("resize", handleMobileView);
    return () => window.removeEventListener("resize", handleMobileView);
  });

  useEffect(() => {
    setIsLoading(true);
    setActiveTabIndex(null);
    window.setTimeout(() => {
      setIsLoading(false);
    }, [200]);
  }, [type]);

  const WHY_FEATS_CONTENT = getWhyFeaturesContent(type);

  return (
    <>
      <Navbar background={"white"} />
      <div className={style.wrapper}>
        {isLoading ? (
          <div className={style.loaderWrapper}>
            <InlineLoader size={50} />
          </div>
        ) : (
          <>
            <div className={clsx(style.hPadding, style.header)}>
              <h3>{getHeader(type)}</h3>
              <p className={style.introText}>{getSubheader(type)}</p>
            </div>

            <div className={style.columns}>
              {columns.map((item, index) => (
                <div className={style.column}>
                  <div
                    onClick={handleClickTab.bind(this, index)}
                    className={clsx(style.titleBox, index === activeTabIndex && style.active)}
                  >
                    {item.title}
                    <span>
                      {<>{index === activeTabIndex ? <GoChevronRight size={25} /> : <GoChevronDown size={25} />}</>}
                    </span>
                  </div>
                  {activeTabIndex === index && (
                    <div className={style.dots}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}

                  {activeTabIndex === index && (
                    <div className={style.boxes}>
                      {item.boxes.map((box, index) => (
                        <>
                          <div className={style.box}>{box}</div>
                          {index < item.boxes.length - 1 && (
                            <div className={style.dots}>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={clsx(style.hPadding, style.features)}>
              {FEATURES.map((item, index) => (
                <div className={clsx(style.feature, index % 2 && style.alt, style.hPadding)}>
                  <div className={style.desc}>
                    <div className={style.title}>{item.header}</div>
                    <div className={style.descText}>{item.desc}</div>
                    <button onClick={handleClickContinueDashboard}>Get Started</button>
                  </div>

                  <div className={style.featureCards}>
                    {item.feats.map((feat, index) => (
                      <div className={style.featureCard}>
                        <div className={style.image}>
                          <img src={feat.img} alt="" />
                        </div>
                        <div className={style.right}>
                          <div className={style.title}>{feat.title}</div>
                          <div className={style.feat}>{feat.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={clsx(style.whySection, style.hPadding)}>
              <h4>
                WHY <span>HIKEWISE</span> WORKS
              </h4>
              <h2>Comprehensive and robust, yet simple to use</h2>
              <p>
                The Hikewise mechanism developed specifically for the career development of individuals in the Indian
                context is replete with features that makes it stand out
              </p>
            </div>

            <div className={clsx(style.features2)}>
              {WHY_FEATS_CONTENT.map((item, index) => (
                <div className={clsx(style.feature, index % 2 && style.alt, style.hPadding)}>
                  <div className={style.content}>
                    <h3>{item.title}</h3>
                    {item.title.toLowerCase() === "exhaustive assessment report" && (
                      <div
                        onClick={handleClickDownloadSampleReport}
                        style={{
                          marginTop: "-3em",
                          marginBottom: "4em",
                          color: "#9456c8",
                          cursor: "pointer",
                          textAlign: "center",
                        }}
                      >
                        View Sample Report
                      </div>
                    )}

                    <div className={style.featureCards}>
                      {item.feats.map((feat, featIndex) => (
                        <div
                          onClick={handleClickFeat.bind(this, index, featIndex)}
                          className={clsx(
                            style.featureCard,
                            activeFeatIndex[index] === featIndex && !isMobileView && style.active
                          )}
                        >
                          <div className={style.image}>
                            <img src={feat.img} alt="" />
                          </div>
                          <div className={style.right}>
                            <div className={style.title}>{feat.title}</div>
                            <div className={style.feat}>{feat.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={style.templateImage}>
                    <img
                      ref={tempImageRefs[index]}
                      src={WHY_FEATS_CONTENT[index].feats[activeFeatIndex[index]].tempImage}
                      alt=""
                    />
                  </div>
                  <Swiper
                    className={style.tempImageCarousel}
                    pagination={{ clickable: true }}
                    navigation={false}
                    slidesPerView={"auto"}
                    spaceBetween={30}
                    allowTouchMove={true}
                    speed={1000}
                  >
                    {item.feats.map((feat) => (
                      <SwiperSlide className={style.slide} key={feat.title}>
                        <img src={feat.tempImage} alt="info" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ))}
            </div>

            <WithPadding className={style.plans}>
              <header>
                <p> Let's help you discover your perfect {getCareerWord(type)}</p>
                <div>Choose a program that's right for you</div>
              </header>

              <div className={style.cards}>
                {plans.map((plan) => (
                  <PlanCard
                    className={clsx(style.card, plan.isActive ? style.active : style.inActive)}
                    plan={plan}
                    handleClickContinue={handleClickContinue}
                  />
                ))}
              </div>
            </WithPadding>

            <PreFooterBanner />

            <Footer />
          </>
        )}
      </div>
    </>
  );
}
