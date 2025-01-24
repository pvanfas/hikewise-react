import React, { useState } from "react";
import style from "./Faq.module.scss";

import WithPadding from "components/shared/WithPadding";
import Button from "components/shared/Button";
import { ChevronDown, ChevronRight } from "react-feather";
import clsx from "clsx";

const _ArrayFaq = [
  {
    question: "What is career counselling?",
    answer:
      "Career counselling is a systematic process through which trained professionals use their expertise to guide and facilitate important career-related decisions in the lives of individuals. ",
  },
  {
    question: "Why is career guidance and career counselling important?",
    answer:
      "Career plays a major role in an individual’s life. It decides where an individual will be and what he/she will be doing in the future. As we spend a part of their life at work. Career counselling helps individuals to identify the right career track and tune their skills to meet the expectations.",
  },
  {
    question: "How can career guidance and career counselling at the right time help me?",
    answer:
      "Individuals spend major part of their life at work. So, it’s necessary to choose the right career. Career guidance and career counselling helps an individual to identify the right career and mold themselves to meet the career requirements. Thus, career guidance and career counselling at the right time is important.",
  },
  {
    question: "What is the importance of scientific career tests in career counselling?",
    answer:
      "Career can affect the quality of life an individual enjoys. Thus, identifying the right career at an early age is very important. Scientific career tests takes into account various social and psychological parameters to direct an individual to make the right career choice. It’s proven to be more efficient and also eliminate the chance for human error.",
  },
  {
    question: "How can I choose the perfect career after 12th?",
    answer:
      "Career is an important part of an individual's life. It’s very important to identify the right career at an early stage of life. When you choose a career path after 12th, you should make sure it matches your interests and capabilities. Thus, understanding yourself becomes important. It is always advocated to take the help of a career counselor while making a career decision. Here at Hikewise, our professionally trained career experts can help you make that decision.",
  },
  {
    question: "What stream should I choose after 10th?",
    answer:
      "This depends on who you are, your personal skills and your interests. This choice can affect what you will be doing in the future. So, understand the pros and cons of each stream and make a sensible decision. If you’re still having doubts, you can contact our career experts at Hikewise for guidance.",
  },
  {
    question: "I am a working professional. Is it too late for me to make a career switch/change?",
    answer:
      "Better late than never. If you think you need a career change, it’s never too late to make a switch. Sticking to a career that doesn’t fit you, won’t do anyone any good. At hikewise, we’ve designed a career guidance and a career counselling program name Hikewise redesign specially for people who are looking for a career switch. You can check out our website for more information.",
  },
  {
    question: "I am a high school (class 8/9/10) student. Should I start planning my career now itself?",
    answer:
      "Career plays an important role in an individual's life. It’s always better to plan ahead. At high school, you’re about to make a major decision regarding your career. You’ll have to choose the stream of study you should go for after 10th. This decision will have a major impact on the rest of your career. Thus, it’s better to start planning when you’re in high school itself. If you think you need professional help, you can contact Hikewise career team for career guidance.",
  },
  {
    question: "I am having doubts about my career path. How can I make the perfect career change now?",
    answer:
      "You’re not the only one. Most people faces this situation at different points of time in their career. As career plays a major role in an individual's life, it’s always better to go ahead and clear this as soon as possible. But you need to deal with this systematically. First, you need to understand your interests, aptitudes, and personality. Then, compare it with the prospects of your current career and identify if you need a career switch. If you’re still having doubts, we would suggest you to log in to our website and take professional help from our career experts.",
  },
  {
    question: "How do I know whether I need a career change/switch?",
    answer:
      "Are you happy with your career? Do the prospects of your current career match your personal goals? You need to answer these two questions first to understand if you need a career switch. If the answer is no, you probably need a career switch. As career change needs to be systematic, it’s always better to take professional help while making this decision. At Hikewise, we’ve a team of trained professionals who can help you.",
  },
  {
    question: "Do you provide career counseling online?",
    answer:
      "Yes, we do. We truly understand that we need to cross geographical boundaries to reach everyone who needs our help. So, Hikewise has customized its methodology to meet the requirements of online platforms.",
  },
  {
    question: "What is Hikewise’s career test?",
    answer:
      "Hikewise believes in making the career guidance and career counselling process more scientific. So, our programs are designed to be a perfect blend of scientific tests and personal counseling. Hikewise career test is a psychometric test that assesses an individual using psychological, behavioral, social and personal parameters. Hikewise uses a career test as a tool to have a better understanding of an individual's aptitude, cognitive skills, and personality and thereby help him/her in making informed decisions.",
  },
  {
    question: "How effective is Hikewise’s mechanism in providing the right career guidance?",
    answer:
      "At Hikewise, we understand that career plays an important role in our life. It decides where our life takes us. Our programs are designed to be a perfect blend of scientific tests and personal counseling. We help individuals to get a deeper understanding of themselves in terms of their interests, aptitudes, personalities, identify their best-fit career fields, clear all their career-related doubts and prepares a detailed career plan after expert analysis using scientific tools. Our holistic guidance approach combines artificial intelligence and efficient career counseling to lead you on the right track.",
  },
  {
    question: "Tell me about the Career Experts who will guide me through my career choice?",
    answer:
      "Your career choice will be in the safe hands of some of the top career coaches in India. Our team of career counsellors and experts consists of specialists from premier institutions such as IITs, central universities and foriegn universities and include India’ s leading psychologists, with 15 + years of experience in the field.",
  },
  {
    question: "Will I receive any support from your end after my sessions are over?",
    answer:
      "Yes, surely. We believe in end-to-end career support and will be in constant touch with you for any type of help you may need after your sessions are over. You will get online and chat support from our career experts for all your career-related queries.",
  },
  {
    question: "When is the right time to start counselling/guidance?",
    answer:
      "The time is always right to take a scientific approach for your career, and the earlier, the better. The career/stream choice assessment and counselling is applicable to students from 8th class onwards. Getting early exposure gives you enough time to explore your interests and abilities, thus enabling a more accurate career decision.",
  },
  {
    question: "There are many online career counselling websites available. Why should I choose Hikewise?",
    answer:
      "Hikewise’s career assessment platform has been developed by some of the top psychometricians, researchers and industry experts in the world. Our framework and career assessment are not based on any global tools but have been developed from the ground up, specifically keeping in mind the Indian context. It is validated and the most accurate assessment, with research data collected from over 10,000 students from all across India. It uses state of the art technologies like Artificial Intelligence, Machine Learning, Statistical Methods like Item response theory, Analytical Hierarchy Process. Click here to see Hikewise's research process.",
  },
];

const FAQ_LEN = 6;

export default function Faq() {
  const [faqs, setFaqs] = useState(_ArrayFaq.map((item) => ({ ...item, isOpen: false })));
  const [indices, setIndices] = useState([0, FAQ_LEN]);

  function toggleFaqList() {
    if (indices[1] === FAQ_LEN) setIndices([0, _ArrayFaq.length]);
    else setIndices([0, FAQ_LEN]);
  }

  function handleClickFaq(index) {
    let toUpdate = [...faqs];
    toUpdate[index].isOpen = !toUpdate[index].isOpen;
    setFaqs(toUpdate);
  }

  return (
    <WithPadding className={style.wrapper}>
      <div className={style.title}>
        FREQUENTLY ASKED QUESTIONS <span>(FAQ's)</span>
      </div>

      <div className={style.faqs}>
        {faqs.slice(indices[0], indices[1]).map((faq, index) => (
          <div className={clsx(style.faq, faq.isOpen && style.open)}>
            <div onClick={handleClickFaq.bind(this, index)} key={faq.question}>
              {faq.question}

              <span>{faq.isOpen ? <ChevronRight /> : <ChevronDown />}</span>
            </div>
            <div>{faq.answer}</div>
          </div>
        ))}
      </div>

      <div className={style.btnContainer}>
        <Button onClick={toggleFaqList} options={{ width: "120px", height: "35px" }}>
          {indices[1] === _ArrayFaq.length ? "View Less" : "View More"}
        </Button>
      </div>
    </WithPadding>
  );
}
