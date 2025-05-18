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
    answer: 'Motivar is a platform designed to help you stay focused, motivated, and organized on your goals.',
  },
  {
    question: 'How can I use Motivar?',
    answer: 'You can create goals, track progress, receive motivational tips, and more.',
  },
  {
    question: 'How secure is my data?',
    answer: 'Your data is encrypted and securely stored, ensuring full privacy.',
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
