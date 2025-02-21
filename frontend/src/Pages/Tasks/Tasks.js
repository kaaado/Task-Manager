import Axios from "../../Api/axios";
import { USER,LOGOUT } from "../../Api/Api";
import { Container, Navbar, Nav, Row, Col, Card, Button, Form, Modal, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Cookie from 'cookie-universal';
import toast from 'react-hot-toast';
import { SiGoogletasks } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import TaskContainer from './TaskContainer'

function Tasks() {

  
  //const [showPaymentModal, setShowPaymentModal] = useState(false);
   const [showBanner, setShowBanner] =useState(true);
  const [showUpgrade, setShowUpgrade]=useState(false);
  const [user, setUser] = useState("");
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
      toast.error(err);
    }
  }


  return (
    <>
    {/* Payment Banner */}
{showBanner && (
  <div
    className={`bg-warning text-lg-center py-2 text-md-center position-relative banner-transition d-none d-md-block`}
  >
    Get access to premium features by upgrading to the Pro Plan
    <Button
      className="ms-2 py-2 rounded-2 fw-bold"
      size="sm"
      variant="dark"
      onClick={() => setShowUpgrade(true)}
    >
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

      
      {/* Upgrade Modal */}
      <Modal show={showUpgrade} onHide={() => setShowUpgrade(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Upgrade to Pro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Get access to premium features by upgrading to the Pro Plan.</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="Enter your card number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control type="text" placeholder="MM/YY" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="text" placeholder="CVV" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpgrade(false)}>Cancel</Button>
          <Button variant="primary">Pay Now</Button>
        </Modal.Footer>
      </Modal>
      
     {/* Navbar */}
      <Navbar bg="light" variant="light" expand="lg" >
        <Container>
          <Navbar.Brand href="/" className="fw-bold"><SiGoogletasks className="me-2 fs-3 fw-normal text-primary" />Tasko</Navbar.Brand>
 
          
              
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
      <Dropdown.Item onClick={() => setShowUpgrade(true)}>Upgrade to Pro Plan</Dropdown.Item>
      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>

           
        </Container>
      </Navbar>
      
      {/* Main Body */}
      <Container className="mt-4">
        <Row>
          {/* Left Panel */}
          <Col md={8}>
          	<TaskContainer />
          </Col>

          
          {/* Right Panel */}
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <h5>Task Statistics</h5>
                <p>Completed Tasks: 5</p>
                <p>Tasks Due Today: 2</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h5>Calendar</h5>
                {/* Calendar Component */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Tasks;
