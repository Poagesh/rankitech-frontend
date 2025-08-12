// src/components/ui/About.jsx
import React from "react";

const About = () => {
    const style = {
        background: "#0080ffff",
        padding: "20px 0",
        marginTop: "20px"
    };

  return (
    <div style={{ background: "#0080ffff", padding: "20px 0", marginTop: "20px" }}>
      <div className="container text-center">
        <h5 style={{ color: "#ffffffff" }}>About Rankitech</h5>
        <p style={{ maxWidth: "600px", margin: "auto", color: "#ffffffff" }}>
          Rankitech is an AI-powered recruitment platform that matches candidates’ resumes 
          with job descriptions, ranks them based on required skills, and streamlines 
          recruiter workflows. Our goal is to make hiring faster, smarter, and more efficient.
        </p>
        <small>© {new Date().getFullYear()} Rankitech. All rights reserved.</small>
      </div>
    </div>
  );
}

export default About;