import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, Modal, Button, Spinner, Badge } from "react-bootstrap";
import Axios from "../../../Api/axios";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import Icons
import "./CalendarView.css"; 

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date()); // Track Current Month

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await Axios.get("/tasks");
        const formattedTasks = response.data.map((task) => ({
          ...task,
          start: new Date(task.start_date),
          end: new Date(task.due_date),
        }));
        setTasks(formattedTasks);
        setError(null);
      } catch (error) {
        setError("Failed to load tasks. Please try again later.");
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedTask(event);
    setShowModal(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "danger";
      case "high":
        return "warning";
      case "medium":
        return "primary";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad";
    if (event.priority === "urgent") backgroundColor = "#ff0000";
    else if (event.priority === "high") backgroundColor = "#ffa500";
    else if (event.priority === "medium") backgroundColor = "#007bff";
    else if (event.priority === "low") backgroundColor = "#28c76f";

    if (event.status === "Completed") {
      backgroundColor = "#6c757d";
    }

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "4px",
        border: "none",
        fontSize: "0.8rem",
        padding: "2px 5px",
        opacity: event.status === "Completed" ? 0.7 : 1,
        cursor: "pointer",
      },
    };
  };

  const customToolbar = ({ label, onNavigate }) => (
    <div className="calendar-toolbar d-flex justify-content-between align-items-center mb-3">
      <Button variant="light" onClick={() => onNavigate("PREV")}>
        <FaChevronLeft />
      </Button>
      <h5 className="mb-0">{label}</h5>
      <Button variant="light" onClick={() => onNavigate("NEXT")}>
        <FaChevronRight />
      </Button>
    </div>
  );

  return (
    <Card className="rounded-5 border-white p-3 shadow-sm">
      {isLoading && <Spinner animation="border" size="sm" className="mb-3" />}
      {error && <div className="alert alert-danger">{error}</div>}

      {!isLoading && !error && (
        <div className="calendar-container rounded-4">
          <Calendar
            localizer={localizer}
            events={tasks}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            date={currentDate} 
            onNavigate={(date) => setCurrentDate(date)} 
            components={{ toolbar: customToolbar }} 
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
            style={{ height: "60vh", minHeight: "400px" }}
            popup
            tooltipAccessor={({ title }) => (title.length > 15 ? title.slice(0, 15) + "..." : title)}
          />
        </div>
      )}

      <TaskModal
        show={showModal}
        onHide={() => setShowModal(false)}
        task={selectedTask}
        getPriorityColor={getPriorityColor}
      />
    </Card>
  );
};

const TaskModal = ({ show, onHide, task, getPriorityColor }) => (
  <Modal show={show} onHide={onHide} centered aria-labelledby="task-modal-title">
    <Modal.Header closeButton className="border-bottom-0">
      <Modal.Title id="task-modal-title" className="h5">
        {task?.title.length > 20 ? task.title.slice(0, 20) + "..." : task?.title}
        {task?.status === "Completed" && (
          <Badge pill bg="success" className="ms-2">
            Completed
          </Badge>
        )}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="mb-3">
        <strong>Priority:</strong>{" "}
        <Badge pill bg={getPriorityColor(task?.priority)}>
          {task?.priority}
        </Badge>
      </div>
      <div className="row">
        <div className="col-6">
          <strong>Start Date:</strong>
          <div className="text-muted">
            {moment(task?.start).format("MMM Do, YYYY h:mm A")}
          </div>
        </div>
        <div className="col-6">
          <strong>Due Date:</strong>
          <div className="text-muted">
            {moment(task?.end).format("MMM Do, YYYY h:mm A")}
          </div>
        </div>
      </div>
      {task?.description && (
        <div className="mt-3">
          <strong>Description:</strong>
          <p className="text-muted">{task.description}</p>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer className="border-top-0">
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

TaskModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  task: PropTypes.object,
  getPriorityColor: PropTypes.func.isRequired,
};

export default CalendarView;
