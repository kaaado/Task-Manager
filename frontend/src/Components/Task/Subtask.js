import { FaTrash, FaCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md"
import { Button, Row, Col,Card } from 'react-bootstrap';
import UpgradeModal from "../Modal/UpgradeModal";
import { useState } from 'react';

const Subtask = ({ subtask}) => {
const [showUpgrade, setShowUpgrade] = useState(false);

  const handleClose = () => setShowUpgrade(false);
  const statusColor = {
    todo: "#c0c0c0",
    inprogress: "#007bff",
    complete: "#28c76f"
  };

  return (
  <>
  <UpgradeModal showUpgrade={showUpgrade} handleClose={handleClose} />
    <Card className="mb-2 py-2 px-3 border-0 rounded-3" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
      <Row className="align-items-center">
        <Col xs={1}>
          <FaCircle size="0.8em" color={statusColor[subtask.status]} />
        </Col>
        <Col>
          <div className="fw-bold">{subtask.title}</div>
          <small className="text-muted small">{subtask.description}</small>
        </Col>
        <Col xs={3} className="text-end">
          <Button variant="link" size="md" onClick={() => setShowUpgrade(true)}>
            <MdModeEdit />
          </Button>
          <Button variant="link" size="md" onClick={() => setShowUpgrade(true)}>
            <FaTrash className="text-danger" />
          </Button>
        </Col>
      </Row>
    </Card>
    </>
  );
};

export default Subtask;
