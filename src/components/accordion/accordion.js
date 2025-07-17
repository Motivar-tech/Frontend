import React, { useState } from 'react';
import {
  FAQContainer,
  AccordionItem,
  QuestionRow,
  QuestionText,
  PlusIcon,
  Answer,
} from './accordion.styles';

const faqData = [
  {
    question: 'What is Motivar?',
    answer: "Motivar provides learner-support services for online learning. We help users find, start, and complete online courses they need to upskill. It also facilitates a sponsorship system where individuals or groups can fund a learner's educational journey.",
  },
  {
    question: 'How does Motivar help me find courses?',
    answer: 'Motivar offers a course discovery feature where you can search for courses by skills, interests, or keywords. You can also apply filters for "Level," "Status," "Platform," and "Tags/Keywords" to narrow down your search. Additionally, Motivar can provide personalized course recommendations based on a psychometric test.',
  },
  {
    question: 'Can I request help to fund a course?',
    answer: 'Yes, Motivar allows learners to request financial help for courses.',
  },
  {
    question: 'What information is required when requesting help for a course?',
    answer: (
      <span>
        When requesting help, you'll need to provide:
        <ul style={{ marginTop: 8, marginBottom: 0 }}>
          <li>Course Title</li>
          <li>Platform (e.g., Coursera, Simplilearn)</li>
          <li>Link to Course</li>
          <li>Price of the Course (indicate currency)</li>
          <li>Duration of the Course (in Months)</li>
          <li>Platform Login Details (Email and Password)</li>
          <li>Reason for needing the course (maximum 50 words)</li>
          <li>Link to any of your Social Media (optional)</li>
          <li>Option to make the request private or public</li>
        </ul>
      </span>
    ),
  },
  {
    question: 'How do I become a sponsor on Motivar?',
    answer: 'You simply sign-up as a sponsor, and you can view learners\' sponsorship requests. The platform allows you to "Sponsor randomly" or "Sponsor a group." You can see details about the learner and the course they are requesting to fund before deciding to sponsor.',
  },
  {
    question: 'What information can I see about a learner when considering sponsorship?',
    answer: "When viewing a learner's request, you can see their name, links to their profile (if applicable), the course they want to take (including platform, duration, and price), and their reason for needing the course.",
  },
  {
    question: 'How do I track my sponsored requests or enrolled courses?',
    answer: 'Your dashboard provides an overview of your activities. As a learner, you can see "Pending Requests," "Paid Requests," and "Enrolled Courses." As a sponsor, you can view and manage your sponsored requests.',
  },
  {
    question: 'What kind of courses are available on Motivar?',
    answer: 'Motivar aggregates a variety of courses from different platforms. Whatever the course, wherever it’s hosted, we will help you make the most of it.',
  },
  {
    question: "What if I don't know which course to take?",
    answer: 'Motivar offers a psychometric test to help you discover personalized course recommendations that match your unique abilities, learning style, and goals.',
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQContainer>
      {faqData.map((item, index) => (
        <AccordionItem key={index} onClick={() => toggleIndex(index)}>
          <QuestionRow>
            <QuestionText>{item.question}</QuestionText>
            <PlusIcon isOpen={openIndex === index}>+</PlusIcon>
          </QuestionRow>
          {openIndex === index && <Answer>{item.answer}</Answer>}
        </AccordionItem>
      ))}
    </FAQContainer>
  );
};

export default Accordion;
