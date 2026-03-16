import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios";
import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import apiInstance from "../../utils/axios";

function CourseDetail() {
  const [course, setCourse] = useState(null); // Changed to null for better checking
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartBtn, setAddToCartBtn] = useState("Add To Cart");
  const [, setCartCount] = useContext(CartContext);

  const param = useParams();

  const country = GetCurrentAddress().country;
  const userId = UserData()?.user_id || 0;

  const fetchCourse = async () => {
    try {
      const res = await useAxios.get(`course/course-detail/${param.slug}/`);
      setCourse(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching course:", error);
      setIsLoading(false);

      Toast().fire({
        title: "Course not found or Server Error",
        icon: "error",
      });
    }
  };
 
  useEffect(() => {
    fetchCourse();
  }, [param.slug]); // Added param.slug to dependency array

  const addToCart = async (courseId, userId, price, country, cartId) => {
    setAddToCartBtn("Adding To Cart");
    const formdata = new FormData();

    formdata.append("course_id", courseId);
    formdata.append("user_id", userId);
    formdata.append("price", price);
    formdata.append("country_name", country);
    formdata.append("cart_id", cartId);

    try {
      await useAxios.post(`course/cart/`, formdata).then((res) => {
        console.log(res.data);
        setAddToCartBtn("Added To Cart");
        Toast().fire({
          title: "Added To Cart",
          icon: "success",
        });

        // Set cart count after adding to cart
        apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
          setCartCount(res.data?.length);
        });
      });
    } catch (error) {
      console.log(error);
      setAddToCartBtn("Add To Cart");
    }
  };

  return (
    <>
      <BaseHeader />

      <>
        {isLoading === true ? (
          <div className="container text-center py-5 mt-5">
            <p className="lead">
              Loading Course Details{" "}
              <i className="fas fa-spinner fa-spin ms-2"></i>
            </p>
          </div>
        ) : !course ? (
          <div className="container text-center py-5 mt-5">
            <h2>Course Not Found</h2>
            <p>
              Please check if the course exists or return to the{" "}
              <Link to="/">homepage</Link>.
            </p>
          </div>
        ) : (
          <>
            <section className="bg-light py-0 py-sm-5">
              <div className="container">
                <div className="row py-5">
                  <div className="col-lg-8">
                    {/* Badge */}
                    <h6 className="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">
                      {course?.category?.title || "General"}
                    </h6>
                    {/* Title */}
                    <h1 className="mb-3">{course?.title}</h1>
                    <p
                      className="mb-3"
                      dangerouslySetInnerHTML={{
                        __html: `${course?.description?.slice(0, 200) || ""}...`,
                      }}
                    ></p>
                    {/* Content */}
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                        <i className="fas fa-star text-warning me-2" />
                        {course?.average_rating || 0}/5
                      </li>
                      <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                        <i className="fas fa-user-graduate text-orange me-2" />
                        {course?.students?.length || 0} Enrolled
                      </li>
                      <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                        <i className="fas fa-signal text-success me-2" />
                        {course?.level || "All Levels"}
                      </li>
                      <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                        <i className="bi bi-patch-exclamation-fill text-danger me-2" />
                        {course?.date
                          ? moment(course.date).format("DD MMM, YYYY")
                          : "Recently Updated"}
                      </li>
                      <li className="list-inline-item h6 mb-0">
                        <i className="fas fa-globe text-info me-2" />
                        {course?.language || "English"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className="pb-0 py-lg-5">
              <div className="container">
                <div className="row">
                  {/* Main content START */}
                  <div className="col-lg-8">
                    <div className="card shadow rounded-2 p-0">
                      {/* Tabs START */}
                      <div className="card-header border-bottom px-4 py-3">
                        <ul
                          className="nav nav-pills nav-tabs-line py-0"
                          id="course-pills-tab"
                          role="tablist"
                        >
                          <li
                            className="nav-item me-2 me-sm-4"
                            role="presentation"
                          >
                            <button
                              className="nav-link mb-2 mb-md-0 active"
                              id="course-pills-tab-1"
                              data-bs-toggle="pill"
                              data-bs-target="#course-pills-1"
                              type="button"
                              role="tab"
                              aria-controls="course-pills-1"
                              aria-selected="true"
                            >
                              Overview
                            </button>
                          </li>
                          <li
                            className="nav-item me-2 me-sm-4"
                            role="presentation"
                          >
                            <button
                              className="nav-link mb-2 mb-md-0"
                              id="course-pills-tab-2"
                              data-bs-toggle="pill"
                              data-bs-target="#course-pills-2"
                              type="button"
                              role="tab"
                              aria-controls="course-pills-2"
                              aria-selected="false"
                            >
                              Curriculum
                            </button>
                          </li>
                          <li
                            className="nav-item me-2 me-sm-4"
                            role="presentation"
                          >
                            <button
                              className="nav-link mb-2 mb-md-0"
                              id="course-pills-tab-3"
                              data-bs-toggle="pill"
                              data-bs-target="#course-pills-3"
                              type="button"
                              role="tab"
                              aria-controls="course-pills-3"
                              aria-selected="false"
                            >
                              Instructor
                            </button>
                          </li>
                          <li
                            className="nav-item me-2 me-sm-4"
                            role="presentation"
                          >
                            <button
                              className="nav-link mb-2 mb-md-0"
                              id="course-pills-tab-4"
                              data-bs-toggle="pill"
                              data-bs-target="#course-pills-4"
                              type="button"
                              role="tab"
                              aria-controls="course-pills-4"
                              aria-selected="false"
                            >
                              Reviews
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* Tabs END */}
                      {/* Tab contents START */}
                      <div className="card-body p-4">
                        <div
                          className="tab-content pt-2"
                          id="course-pills-tabContent"
                        >
                          {/* Content START */}
                          <div
                            className="tab-pane fade show active"
                            id="course-pills-1"
                            role="tabpanel"
                            aria-labelledby="course-pills-tab-1"
                          >
                            <h5 className="mb-3">Course Description</h5>
                            <p
                              className="mb-3"
                              dangerouslySetInnerHTML={{
                                __html: `${course?.description || "No description provided."}`,
                              }}
                            ></p>
                          </div>
                          {/* Content END */}

                          {/* Content START */}
                          <div
                            className="tab-pane fade"
                            id="course-pills-2"
                            role="tabpanel"
                            aria-labelledby="course-pills-tab-2"
                          >
                            {/* Course accordion START */}
                            <div
                              className="accordion accordion-icon accordion-bg-light"
                              id="accordionExample2"
                            >
                              {course?.curriculum?.length > 0 ? (
                                course?.curriculum?.map((c, index) => (
                                  <div
                                    className="accordion-item mb-3"
                                    key={index}
                                  >
                                    <h6
                                      className="accordion-header font-base"
                                      id={`heading-${c.variant_id}`}
                                    >
                                      <button
                                        className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${c.variant_id}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse-${c.variant_id}`}
                                      >
                                        {c.title}
                                      </button>
                                    </h6>
                                    <div
                                      id={`collapse-${c.variant_id}`}
                                      className="accordion-collapse collapse"
                                      aria-labelledby={`heading-${c.variant_id}`}
                                      data-bs-parent="#accordionExample2"
                                    >
                                      <div className="accordion-body mt-3">
                                        {c.variant_items?.map((l, lIndex) => (
                                          <div key={lIndex}>
                                            <div className="d-flex justify-content-between align-items-center">
                                              <div className="position-relative d-flex align-items-center">
                                                <a
                                                  href="#"
                                                  className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"
                                                >
                                                  {l.preview === true ? (
                                                    <i className="fas fa-play me-0" />
                                                  ) : (
                                                    <i className="fas fa-lock me-0" />
                                                  )}
                                                </a>
                                                <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
                                                  {l.title}
                                                </span>
                                              </div>
                                              <p className="mb-0">
                                                {c.content_duration}
                                              </p>
                                            </div>
                                            <hr />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>No curriculum available yet.</p>
                              )}
                            </div>
                            {/* Course accordion END */}
                          </div>
                          {/* Content END */}

                          {/* Content START */}
                          <div
                            className="tab-pane fade"
                            id="course-pills-3"
                            role="tabpanel"
                            aria-labelledby="course-pills-tab-3"
                          >
                            {/* Card START */}
                            <div className="card mb-0 mb-md-4">
                              <div className="row g-0 align-items-center">
                                <div className="col-md-5">
                                  {/* Image */}
                                  <img
                                    src={
                                      course?.teacher?.image ||
                                      "https://ui-avatars.com/api/?name=Teacher"
                                    }
                                    className="img-fluid rounded-3"
                                    alt="instructor-image"
                                  />
                                </div>
                                <div className="col-md-7">
                                  {/* Card body */}
                                  <div className="card-body">
                                    {/* Title */}
                                    <h3 className="card-title mb-0">
                                      {course?.teacher?.full_name ||
                                        "Instructor Name"}
                                    </h3>
                                    <p className="mb-2">
                                      {course?.teacher?.bio || ""}
                                    </p>
                                    {/* Social button */}
                                    <ul className="list-inline mb-3">
                                      <li className="list-inline-item me-3">
                                        <a
                                          href={course?.teacher?.twitter || "#"}
                                          className="fs-5 text-twitter"
                                        >
                                          <i className="fab fa-twitter-square" />
                                        </a>
                                      </li>
                                      <li className="list-inline-item me-3">
                                        <a
                                          href={
                                            course?.teacher?.facebook || "#"
                                          }
                                          className="fs-5 text-facebook"
                                        >
                                          <i className="fab fa-facebook-square" />
                                        </a>
                                      </li>
                                      <li className="list-inline-item me-3">
                                        <a
                                          href={
                                            course?.teacher?.linkedin || "#"
                                          }
                                          className="fs-5 text-linkedin"
                                        >
                                          <i className="fab fa-linkedin" />
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Card END */}
                            {/* Instructor info */}
                            <h5 className="mb-3">About Instructor</h5>
                            <p className="mb-3">
                              {course?.teacher?.about || "No details provided."}
                            </p>
                          </div>

                          {/* Content START */}
                          <div
                            className="tab-pane fade"
                            id="course-pills-4"
                            role="tabpanel"
                            aria-labelledby="course-pills-tab-4"
                          >
                            <div className="row mb-1">
                              <h5 className="mb-4">Our Student Reviews</h5>
                            </div>

                            <div className="row">
                              {course?.reviews?.length > 0 ? (
                                course?.reviews?.map((r, index) => (
                                  <div key={index}>
                                    <div className="d-md-flex my-4">
                                      <div className="avatar avatar-xl me-4 flex-shrink-0"></div>
                                      <div>
                                        <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                                          <h5 className="me-3 mb-0">
                                            {r?.profile?.full_name ||
                                              "Anonymous"}
                                          </h5>
                                          ({r?.rating}/5)
                                        </div>
                                        <p className="small mb-2">Recently</p>
                                        <p className="mb-2">
                                          {r?.review || "No review text."}
                                        </p>
                                      </div>
                                    </div>
                                    <hr />
                                  </div>
                                ))
                              ) : (
                                <p>No reviews yet. Be the first to review!</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Main content END */}

                  {/* Right sidebar START */}
                  <div className="col-lg-4 pt-5 pt-lg-0">
                    <div className="row mb-5 mb-lg-0">
                      <div className="col-md-6 col-lg-12">
                        {/* Video START */}
                        <div className="card shadow p-2 mb-4 z-index-9">
                          <div className="overflow-hidden rounded-3">
                            <img
                              src={
                                course?.image ||
                                "https://via.placeholder.com/600x400"
                              }
                              className="card-img"
                              alt="course image"
                            />
                            {course?.file && (
                              <div>
                                <div
                                  className="m-auto rounded-2 mt-2 d-flex justify-content-center align-items-center"
                                  style={{ backgroundColor: "#ededed" }}
                                >
                                  <a
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    href="#"
                                    className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
                                  >
                                    <i className="fas fa-play" />
                                  </a>
                                  <span
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    className="fw-bold ms-2"
                                    style={{ cursor: "pointer" }}
                                  >
                                    Course Introduction Video
                                  </span>
                                  <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex={-1}
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h1
                                            className="modal-title fs-5"
                                            id="exampleModalLabel"
                                          >
                                            Introduction Video
                                          </h1>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          />
                                        </div>
                                        <div className="modal-body">
                                          <video
                                            src={course?.file}
                                            className="w-100 rounded-3"
                                            controls
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Card body */}
                          <div className="card-body px-3">
                            {/* Info */}
                            <div className="d-flex justify-content-between align-items-center">
                              {/* Price */}
                              <div>
                                <div className="d-flex align-items-center">
                                  <h3 className="fw-bold mb-0 me-2">
                                    ${course?.price || "0.00"}
                                  </h3>
                                </div>
                              </div>
                              {/* Share button */}
                              <div className="dropdown">
                                <a
                                  href="#"
                                  className="btn btn-sm btn-light rounded small"
                                  role="button"
                                  id="dropdownShare"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-fw fa-share-alt" />
                                </a>
                                <ul
                                  className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded"
                                  aria-labelledby="dropdownShare"
                                >
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="fas fa-copy me-2" />
                                      Copy link
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* Buttons */}
                            <div className="mt-3 d-sm-flex justify-content-sm-between ">
                              {addToCartBtn === "Add To Cart" && (
                                <button
                                  type="button"
                                  className="btn btn-primary mb-0 w-100 me-2 mt-3"
                                  onClick={() =>
                                    addToCart(
                                      course?.id,
                                      userId,
                                      course?.price,
                                      country,
                                      CartId(),
                                    )
                                  }
                                >
                                  <i className="fas fa-shopping-cart"></i> Add
                                  To Cart
                                </button>
                              )}

                              {addToCartBtn === "Added To Cart" && (
                                <button
                                  type="button"
                                  className="btn btn-success mb-0 w-100 me-2 mt-3"
                                >
                                  <i className="fas fa-check-circle"></i> Added
                                  To Cart
                                </button>
                              )}

                              {addToCartBtn === "Adding To Cart" && (
                                <button
                                  type="button"
                                  className="btn btn-primary mb-0 w-100 me-2 mt-3 disabled"
                                >
                                  <i className="fas fa-spinner fa-spin"></i>{" "}
                                  Adding To Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Video END */}

                        {/* Course info START */}
                        <div className="card card-body shadow p-4 mb-4">
                          <h4 className="mb-3">This course includes</h4>
                          <ul className="list-group list-group-borderless">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-book-open text-primary me-2" />{" "}
                                Lectures
                              </span>
                              <span>{course?.curriculum?.length || 0}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-signal text-primary me-2" />{" "}
                                Skills
                              </span>
                              <span>{course?.level || "Beginner"}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="h6 fw-light mb-0">
                                <i className="fas fa-fw fa-globe text-primary me-2" />{" "}
                                Language
                              </span>
                              <span>{course?.language || "English"}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </>

      <BaseFooter />
    </>
  );
}

export default CourseDetail;
