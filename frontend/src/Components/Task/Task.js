upimport { FaTrash, FaPlus, FaTag, FaCircle, FaChevronDown } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { Card, Button, Row, Col, Badge, Stack } from 'react-bootstrap';
import { format, parseISO, isPast } from 'date-fns';
import Subtask from './Subtask';
import UpgradeModal from "../Modal/UpgradeModal";
import { useState } from 'react';

const Task = ({ task, onDelete }) => {

  const [showUpgrade, setShowUpgrade] = useState(false);

  
  const handleClose = () => setShowUpgrade(false);

  const priorityColors = {
    urgent: "#ff0000",
    high: "#ffa500",
    normal: "#007bff",
    low: "#28c76f"
  };

  const statusColor = {
    todo: "#c0c0c0",
    inprogress: "#007bff",
    complete: "#28c76f"
  };
  
  const getRandomColor = () => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#FFEEAD", "#D4A5A5", "#96CEB4", 
      "#FFCC5C", "#88D8B0", "#F7CAC9", "#92A8D1", "#955251"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const formatDate = (dateString) => format(parseISO(dateString), 'MMM dd, yyyy, hh:mm a');

  const [isOpen, setIsOpen] = useState(false);

  return ( 
    <>
      <UpgradeModal showUpgrade={showUpgrade} handleClose={handleClose} />
      <Card className="mb-3 border-0 rounded-5 p-1" style={{ backgroundColor: priorityColors[task.priority] + '15' }}>
        <Card.Body>
          <Row className={`${isOpen ? 'align-items-start' : 'align-items-center' } ms-1`}>
            <Col xs={1} lg={2} md={1} sm={1}>
              <FaCircle size="1.3em" color={statusColor[task.status]} className="mb-2" />
            </Col>

            <Col lg={8} md={9} sm={9} xs={9}>
              <details open={isOpen} onToggle={(e) => setIsOpen(e.target.open)} style={{ width: '100%' }}>
                <summary style={{ cursor: 'pointer', listStyle: 'none' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="fw-bold mb-1">{task.title}</h5>
                      <p className="text-muted small mb-2">{isOpen ? task.description : task.description.slice(0, 80)+'...'}</p>
                    </div>
                    <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </summary>

                <div className="mt-3">
                  <Stack direction="horizontal" gap={2} className="mb-2 d-flex flex-wrap">
                    <Badge bg="light" style={{ color: getRandomColor() }}>
                      <FaTag size={12} className="me-1" />
                      {task.tags}
                    </Badge>
                    <Badge bg="light" text="dark" style={{ textTransform: 'capitalize' }}>
                      Type : {task.type}
                    </Badge>
                    <Badge bg="light" style={{ textTransform: 'capitalize', color: priorityColors[task.priority] }}>
                      {task.priority}
                    </Badge>
                  </Stack>

                  <div className="d-lg-flex gap-5 small">
                    <div>
                      <span className="text-muted">Start: </span>
                      {formatDate(task.start_date)}
                    </div>
                    <div className={isPast(parseISO(task.due_date)) ? 'text-danger' : ''}>
                      <span className="text-muted">Due: </span>
                      {formatDate(task.due_date)}
                    </div>
                  </div>

                  {task.subtasks?.length > 0 ? (
                    <div className="mt-3">
                      <h6 className="small fw-bold">Subtasks:</h6>
                      {task.subtasks.map(subtask => (
                        <Subtask key={subtask.id} subtask={subtask} />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3">
                      <h6 className="small fw-bold">Subtasks:</h6> 
                      <p className="text-center text-muted">No Subtasks yet</p> 
                    </div>
                  )}
                </div>
              </details>
            </Col>

            <Col xs={1} lg={2} md={2} sm={1} className="d-flex flex-sm-row text-end">
              <Stack gap={1}>
                <Button variant="link" size="md" onClick={() => setShowUpgrade(true)}>
                  <MdModeEdit />
                </Button>
                <Button variant="link" size="md" onClick={() => onDelete(task.id)}>
                  <FaTrash className="text-danger" />
                </Button>
                <Button variant="link" size="md" onClick={() => setShowUpgrade(true)}>
                  <FaPlus />
                </Button>
              </Stack>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Task;
