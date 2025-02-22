import { useEffect, useState } from "react";
import Axios from "../../Api/axios";
import { TASKS } from "../../Api/Api";
import { Card, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animated Circular Progress Component
const AnimatedCircularProgress = ({ value, color, trailColor, size }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          textSize: "18px",
          pathColor: color,
          textColor: color,
          trailColor: trailColor,
          strokeWidth: size > 100 ? 12 : 6,
          transition: "stroke-dashoffset 1.5s ease-in-out",
        })}
      />
    </div>
  );
};

function TaskStatistics() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    completed_percentage: 0,
    inprogress_tasks: 0,
    inprogress_percentage: 0,
    todo_tasks: 0,
    todo_percentage: 0,
  });

  useEffect(() => {
    // Fetch tasks from the API
    Axios.get(`/${TASKS}`)
      .then((response) => {
        setTasks(response.data);
        calculateStatistics(response.data); 
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Function to calculate statistics
  const calculateStatistics = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "complete").length;
    const inProgressTasks = tasks.filter((task) => task.status === "inprogress").length;
    const todoTasks = tasks.filter((task) => task.status === "todo").length;

    const completedPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const inProgressPercentage = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
    const todoPercentage = totalTasks > 0 ? Math.round((todoTasks / totalTasks) * 100) : 0;

    
    setStats({
      total_tasks: totalTasks,
      completed_tasks: completedTasks,
      completed_percentage: completedPercentage,
      inprogress_tasks: inProgressTasks,
      inprogress_percentage: inProgressPercentage,
      todo_tasks: todoTasks,
      todo_percentage: todoPercentage,
    });
  };

  return (
    <Card className="mb-3 rounded-5 px-2 border-white">
      <Card.Body>
        <h5 className="text-center mb-3">Task Statistics</h5>
        <Row className="text-start">
          {/* Completed Tasks */}
          <Col xs={4}>
            <AnimatedCircularProgress
              value={stats.completed_percentage}
              color="#28a745"
              trailColor="#d4edda"
              size={80}
            />
            <p className="mt-2">Completed</p>
          </Col>

          {/* In Progress Tasks */}
          <Col xs={4}>
            <AnimatedCircularProgress
              value={stats.inprogress_percentage}
              color="#ffc107"
              trailColor="#fff3cd"
              size={80}
            />
            <p className="mt-2">In Progress</p>
          </Col>

          {/* To-Do Tasks */}
          <Col xs={4}>
            <AnimatedCircularProgress
              value={stats.todo_percentage}
              color="#dc3545"
              trailColor="#f8d7da"
              size={80}
            />
            <p className="mt-2">To-Do</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TaskStatistics;
