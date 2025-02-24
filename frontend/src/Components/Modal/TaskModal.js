import { useState,useEffect } from 'react';
import { Modal, Form, FloatingLabel, Button,Spinner } from 'react-bootstrap';
import Axios from "../../Api/axios";
import toast from 'react-hot-toast';

const TaskModal = ({ show, onHide, user_id, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    user_id: user_id || '',
    title: '',
    description: '',
    tags: '',
    type: 'task',
    status: 'todo',
    start_date: '',
    due_date: '',
    priority: 'normal'
  });
  const [isLoading ,setIsLoading]=useState(false)
  
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      user_id: user_id || ''
    }));
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {

      await Axios.post('/task/add', formData);
      toast.success('Task created successfully!');
      onTaskCreated(); 
      setFormData({
    user_id: user_id || '',
    title: '',
    description: '',
    tags: '',
    type: 'task',
    status: 'todo',
    start_date: '',
    due_date: '',
    priority: 'normal'
  })
    } catch (err) {
    setIsLoading(false)
      toast.error('Failed to create task');
    }
    finally  {
     setIsLoading(false)
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <FloatingLabel controlId="title" label="Title" className="mb-3">
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="description" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ height: '100px' }}
required
            />
          </FloatingLabel>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <FloatingLabel controlId="tags" label="Tag ">
                <Form.Control
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </div>

            <div className="col-md-6">
              <FloatingLabel controlId="type" label="Type">
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}

                >
                  {['task', 'milestone', 'form_response', 'bug', 'project'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <FloatingLabel controlId="status" label="Status">
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {['todo', 'inprogress', 'complete'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </div>

            <div className="col-md-4">
              <FloatingLabel controlId="priority" label="Priority">
                <Form.Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  {['urgent', 'high', 'normal', 'low'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>Due Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="due_date"
                value={formData.due_date}
                min={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">{isLoading ? <Spinner animation="border" size="sm" /> : "Create Task"} </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskModal;
