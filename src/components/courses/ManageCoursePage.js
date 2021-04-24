import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from 'prop-types'
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData"

function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, ...props }) {

  const [ course, setCource ] = useState({...course});
  const [ errors, setErrors ] = useState({})

  useEffect(()=> {
     if(courses.length === 0) {
       loadCourses().catch(error => {
         alert("Loading courses failed" + error);
       })
     }
     if(authors.length === 0) {
       loadAuthors().catch(error => {
         alert("Loading authors failed" + error);
       })
     }
  }, []  );

  function handleChange(event) {
    const { name, value } = event.target;
    setCource(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId"? parseInt(value, 10): value
    }))
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course);
  }

  return (
    <>
      <CourseForm
        authors={authors}
        errors={errors}
        course={course}
        onChange={handleChange}
        onSave={handleSave}
      />
    </>
  )
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
}

const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps)
export default  connectStateAndProps(ManageCoursePage);
