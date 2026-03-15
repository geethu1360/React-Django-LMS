import React, { useState } from "react";

import BaseHeader from "../partials/BaseHeader";

import BaseFooter from "../partials/BaseFooter";

// Try this path - it accounts for src/views/base/ to src/utils/

import apiInstance from "../../utils/axios";

import Swal from "sweetalert2";

const ContactUs = () => {
  const [contact, setContact] = useState({
    full_name: "",

    email: "",

    subject: "",

    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setContact({
      ...contact,

      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Verify your backend URL matches this!

      await apiInstance.post(`contact-us/`, contact);

      Swal.fire({
        icon: "success",

        title: "Message Sent!",

        text: "We will get back to you soon.",
      });

      setContact({ full_name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission Error:", error);

      Swal.fire({
        icon: "error",

        title: "Error",

        text: "Failed to send message.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BaseHeader />

      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 shadow p-5 bg-white rounded">
            <div className="row">
              <div className="col-md-6">
                <h2 className="fw-bold text-primary">Contact Us</h2>

                <p className="text-muted">
                  Have a question? We'd love to hear from you.
                </p>

                <hr />

                <div className="mt-4">
                  <h5>Email Support</h5>

                  <p>support@apponix.com</p>

                  <h5>Office Address</h5>

                  <p>123 Learning Lane, Tech Park, Suite 400</p>
                </div>
              </div>

              <div className="col-md-6">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      value={contact.full_name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={contact.email || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Subject</label>

                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={contact.subject || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>

                    <textarea
                      className="form-control"
                      rows="4"
                      name="message"
                      value={contact.message || ""}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
};

export default ContactUs;
