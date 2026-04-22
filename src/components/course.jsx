import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {

  const defaultCourses = [
    {
      _id: "101",
      title: "React for Beginners",
      instructor: "John Doe",
      description: "Learn the basics of React including components, props, hooks and state management.",
      category: "Frontend",
      duration: "4 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "102",
      title: "Advanced Node.js",
      instructor: "Jane Smith",
      description: "Master backend development using Node.js, Express, and APIs.",
      category: "Backend",
      duration: "6 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "103",
      title: "JavaScript Essentials",
      instructor: "Alice Johnson",
      description: "Understand core JavaScript concepts and modern ES6 features.",
      category: "Programming",
      duration: "3 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "104",
      title: "Fullstack Web Development",
      instructor: "Bob Williams",
      description: "Learn MERN stack and build complete web applications.",
      category: "Fullstack",
      duration: "8 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "105",
      title: "Python for Beginners",
      instructor: "Sarah Lee",
      description: "Start Python programming with hands-on projects.",
      category: "Programming",
      duration: "5 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "106",
      title: "Data Structures",
      instructor: "David Kumar",
      description: "Learn arrays, linked lists, stacks, queues and algorithms.",
      category: "Computer Science",
      duration: "6 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "107",
      title: "Machine Learning Basics",
      instructor: "Anita Sharma",
      description: "Introduction to ML concepts and simple models.",
      category: "AI",
      duration: "7 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "108",
      title: "UI/UX Design",
      instructor: "Rohit Verma",
      description: "Learn design principles, wireframes, and user experience.",
      category: "Design",
      duration: "4 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "109",
      title: "Database Management",
      instructor: "Priya Singh",
      description: "Understand SQL, MySQL, and database design.",
      category: "Database",
      duration: "5 Weeks",
      image: "https://via.placeholder.com/300x150",
    },
    {
      _id: "110",
      title: "Cyber Security Basics",
      instructor: "Arjun Patel",
      description: "Learn security fundamentals and ethical hacking basics.",
      category: "Security",
      duration: "6 Weeks",
      image: "https://via.placeholder.com/300x150",
    }
  ];

  const [courses, setCourses] = useState(defaultCourses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
       
        setCourses(Array.isArray(res.data) ? res.data : defaultCourses);
      } catch (err) {
        // setError("Failed to load courses. Showing default data.");
        setCourses(defaultCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "20px", background: "#f4f6f8" }}>
      <h2 style={{ textAlign: "center" }}>📚 Top Courses</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {courses.slice(0, 10).map((course) => (
          <div
            key={course._id}
            style={{
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={course.image}
              alt={course.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px 0" }}>{course.title}</h3>

              <p style={{ margin: "5px 0", color: "#555" }}>
                👨‍🏫 <strong>Instructor:</strong> {course.instructor}
              </p>

              <p style={{ margin: "5px 0", color: "#555" }}>
                📂 <strong>Category:</strong> {course.category}
              </p>

              <p style={{ margin: "5px 0", color: "#555" }}>
                ⏳ <strong>Duration:</strong> {course.duration}
              </p>

              <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;