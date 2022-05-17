import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Welcome to our Concert Calendar!
            <br />
            <br />
            What this app does!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Helps you find upcoming concerts in your area!
            </li>
            <li className="about-activity">
              <ImPointRight /> Allows you to add concerts to a personal calendar!
            </li>
            <li className="about-activity">
              <ImPointRight /> Share your calendar!
            </li>
          </ul>

          <p className="blue">
            "This is about filler text!"{" "}
          </p>
          <footer className="blockquote-footer">Reuel Mendoza</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
