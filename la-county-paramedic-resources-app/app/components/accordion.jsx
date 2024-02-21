"use client";

import React, { useState, useEffect } from "react";

const Accordion = () => {
  const [policies, setPolicies] = useState([]);
  const [openIndices, setOpenIndices] = useState([]);
  const [isStudyMode, setIsStudyMode] = useState(false);

  useEffect(() => {
    fetch("/objectives.json")
      .then((response) => response.json())
      .then((data) => setPolicies(data.policies))
      .catch((error) => console.error("Failed to load objectives.json", error));
  }, []);

  const toggleIndex = (policyIndex, questionIndex) => {
    if (!isStudyMode) {
      const currentIndexKey = `${policyIndex}-${questionIndex}`;
      const currentIndexPosition = openIndices.indexOf(currentIndexKey);
      const newOpenIndices = [...openIndices];

      if (currentIndexPosition > -1) {
        newOpenIndices.splice(currentIndexPosition, 1);
      } else {
        newOpenIndices.push(currentIndexKey);
      }

      setOpenIndices(newOpenIndices);
    }
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={isStudyMode}
            onChange={() => setIsStudyMode(!isStudyMode)}
            style={{ display: "none" }}
          />
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "20px",
              backgroundColor: isStudyMode ? "#4CAF50" : "#ccc",
              color: "white",
              textAlign: "center",
              width: "120px",
            }}
          >
            {isStudyMode ? "Study Mode" : "Test Mode"}
          </div>
        </label>
      </div>
      {policies.map((policy, policyIndex) => (
        <div key={policyIndex}>
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>
            <a
              href={policy.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              {policy.policy}
            </a>
          </h2>
          {policy.questions.map((item, questionIndex) => (
            <div
              key={`${policyIndex}-${questionIndex}`}
              style={{ marginBottom: "10px" }}
            >
              <button
                onClick={() => toggleIndex(policyIndex, questionIndex)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.question}
              </button>
              {(isStudyMode ||
                openIndices.includes(`${policyIndex}-${questionIndex}`)) && (
                <p
                  style={{
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    marginTop: "5px",
                    padding: "10px",
                    backgroundColor: "#f9f9f9",
                    borderLeft: "3px solid #007BFF",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
