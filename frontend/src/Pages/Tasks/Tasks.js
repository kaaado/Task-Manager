import Axios from "../../Api/axios";
import { USER,LOGOUT } from "../../Api/Api";
import { Container, Navbar, Nav, Row, Col, Card, Button, Form, Modal, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Cookie from 'cookie-universal';
import toast from 'react-hot-toast';

function Tasks() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
const cookie = Cookie();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await Axios.get(`/${USER}`);
      setUser({ name: response.data.name, email: response.data.email });
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

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


  const handleSearch = async (e) => {
    e.preventDefault();
    const query = document.getElementById("searchInput").value;
    try {
      const response = await Axios.get(`/task/search/${query}`);
      console.log("Search Results:", response.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <>
      {/* Payment Banner */}
      <div className="bg-warning text-center py-2">
        <Button variant="dark" size="sm" onClick={() => setShowUpgrade(true)}>
          Upgrade to Pro Plan
        </Button>
      </div>
      
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
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <Form.Control
              id="searchInput"
              type="search"
              placeholder="Search tasks..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>
          
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              👤
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.ItemText>{user.name}</Dropdown.ItemText>
              <Dropdown.ItemText>{user.email}</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      
      {/* Main Body */}
      <Container className="mt-4">
        <Row>
          {/* Left Panel */}
          <Col md={8}>
            <Card>
              <Card.Body>
                <h5>Task List</h5>
                <Button variant="primary" className="mb-3">Add Task</Button>
                {/* TaskContainer Component  */}
              </Card.Body>
            </Card>
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
