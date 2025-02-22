import Axios from "../../Api/axios";
import { USER, LOGOUT, STAT, TASKS } from "../../Api/Api";
import { Container, Navbar, Nav, Row, Col, Card, Button, Modal, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Cookie from 'cookie-universal';
import toast from 'react-hot-toast';
import { SiGoogletasks } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import TaskContainer from './TaskContainer';
import UpgradeModal from "../../Components/Modal/UpgradeModal";
import CalendarView from './Calendar/CalendarView';
import TaskStatistics from "./TaskStatistics"; 

function Tasks() {
  const [showBanner, setShowBanner] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [user, setUser] = useState("");
  
  const handleShow = () => setShowUpgrade(true);
  const handleClose = () => setShowUpgrade(false);
  const cookie = Cookie();

  const fetchUser = async () => {
    try {
      const response = await Axios.get(`/${USER}`);
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };  

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleLogout() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove('task');
      toast.success("Logout Successfully");
      window.location.pathname = '/login';
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  }

  return (
    <>
      {/* Payment Banner */}
      {showBanner && (
        <div className="bg-warning text-lg-center py-2 text-md-center position-relative banner-transition d-none d-md-block">
          Get access to premium features by upgrading to the Pro Plan
          <Button className="ms-2 py-2 rounded-2 fw-bold" size="sm" variant="dark" onClick={handleShow}>
            Upgrade to Pro Plan
          </Button>
          <Button
            className="position-absolute top-50 end-0 translate-middle-y me-3 p-0"
            variant="link"
            style={{ background: "transparent", border: "none", color: "black" }}
            onClick={() => setShowBanner(false)}
          >
            <IoCloseSharp size={18} />
          </Button>
        </div>
      )}

      <UpgradeModal showUpgrade={showUpgrade} handleClose={handleClose} />

      {/* Navbar */}
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="fw-bold">
            <SiGoogletasks className="textme-2 fs-3 fw-normal text-primary" /> Tasko
          </Navbar.Brand>

          {/* User Info & Dropdown */}
          <div className="d-flex align-items-center">
            <div className="text-lg-start me-2 d-none d-md-block">
              <strong className="fs-6 text-primary">{user.name || "User"}</strong>
              <br />
              <small className="text-secondary text-md-truncate" style={{ fontSize: '13px', maxWidth: '160px', display: 'block' }}>
                {user.email || "Email"}
              </small>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle variant="light">
                <FaUser className="rounded-circle" size={24} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow}>Upgrade to Pro Plan</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Main Body */}
      <Container className="mt-4">
        <Row>
          {/* Right Panel */}
          <Col lg={4} md={12} className="order-lg-2 order-md-1">
            <TaskStatistics />
            <CalendarView />
          </Col>

          {/* Left Panel */}
          <Col lg={8} md={12} className="order-lg-1 order-md-2">
            <TaskContainer user_id={user.id} showUpgrade={handleShow} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Tasks;
