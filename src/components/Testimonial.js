import React, { useState } from 'react';
import Test from '../assets/images/test.png';
import '../assets/css/Testimonial.css';

const testimonials = [
  {
    name: 'Yemi',
    age: 19,
    image: Test,
    quote: "Choosing a course to learn was almost overwhelming, so many options to choose from. Motivar helped make the process seamless. I totally love the course i am currently taking"
  },
  {
    name: 'Ada',
    age: 22,
    image: Test,
    quote: "I found the perfect course for my career switch. The recommendations were spot on and the process was easy."
  },
  {
    name: 'Sam',
    age: 25,
    image: Test,
    quote: "Motivar made it easy to connect with sponsors and get the help I needed to pay for my course."
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const { name, age, image, quote } = testimonials[currentIndex];

  return (
    <div className="testimonial-container">
      {/* Left Arrow */}
      <button className="arrow-btn left-arrow" onClick={goToPrevious}>
        &lt;
      </button>

      {/* Main Testimonial Card */}
      <div className="testimonial-card">
        <div className="testimonial-author-info">
          <img src={image} alt={name} className="testimonial-image" />
          <p className="testimonial-author">{name}, {age}</p>
        </div>
        <p className="testimonial-quote">"{quote}"</p>
      </div>

      {/* Right Arrow */}
      <button className="arrow-btn right-arrow" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default TestimonialCarousel;