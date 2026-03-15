import React from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

const AboutUs = () => {
  return (
    <>
      <BaseHeader />
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6">
              <h1 className="fw-bold mb-3">Empowering Learners Everywhere</h1>
              <p className="lead text-muted">
                Our LMS platform is dedicated to providing high-quality
                education through accessible, interactive, and engaging online
                courses.
              </p>
              <p>
                Founded in 2024, we’ve grown from a small startup to a global
                community of instructors and students. Our mission is to bridge
                the gap between talent and opportunity.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1661326248013-3107a4b2bd91?q=80&w=2070&auto=format&fit=crop"
                alt="About Us"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm bg-white h-100">
                <i className="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                <h4>Expert Tutors</h4>
                <p className="text-muted">
                  Learn from industry professionals with years of real-world
                  experience.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm bg-white h-100">
                <i className="fas fa-clock fa-3x text-success mb-3"></i>
                <h4>Lifetime Access</h4>
                <p className="text-muted">
                  Once you buy a course, it’s yours forever. Learn at your own
                  pace.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm bg-white h-100">
                <i className="fas fa-certificate fa-3x text-warning mb-3"></i>
                <h4>Certifications</h4>
                <p className="text-muted">
                  Earn recognized certificates to boost your career and
                  portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BaseFooter />
    </>
  );
};

export default AboutUs;
