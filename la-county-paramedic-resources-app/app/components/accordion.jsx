"use client";

import React, { useState, useEffect } from "react";

const Accordion = () => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // Fetch the JSON from the public directory
    fetch("/objectives.json")
      .then((response) => response.json())
      .then((data) => setQuestionsAndAnswers(data))
      .catch((error) => console.error("Failed to load objectives.json", error));
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="">
      {questionsAndAnswers.map((item, index) => (
        <div className="" key={index}>
          <button
            onClick={() => toggleIndex(index)}
            style={{ width: "100%", textAlign: "left" }}
          >
            {item.question}
          </button>
          {activeIndex === index && <p>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
