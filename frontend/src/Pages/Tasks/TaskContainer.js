import { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { format } from 'date-fns';
import Axios from "../../Api/axios";
import { TASKS, TASK } from "../../Api/Api";
import toast from 'react-hot-toast';
import Task from '../../Components/Task/Task';
import TaskModal from '../../Components/Modal/TaskModal';

const TaskContainer = ({ user_id }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(`/${TASKS}`);
      setTasks(response.data.sort((a, b) => 
        priorityOrder[a.priority] - priorityOrder[b.priority]
      ));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleTaskCreated = () => {
    fetchTasks();
    handleClose(); 
  };

  async function handleDelete(id) {
    try {
      await Axios.delete(`${TASK}/${id}`);
      setTasks(prev => prev.filter(item => item.id !== id));
      toast.success("Task Deleted Successfully");
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <Card className="rounded-5 py-4   border-white h-100 w-100" style={{ backgroundColor: "#f6f5fa", height: 'calc(100vh - 100px)' }}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center fw-bold mb-4 px-3">  
          <div className="flex-grow-1">  
            <h2 className="mb-1 fw-bold">Task List</h2>  
            <h6 className="text-primary fw-bold">{format(new Date(), 'MMMM do, yyyy')}</h6>  
          </div>  
          <Button variant="primary" onClick={handleShow} className="p-2 rounded">  
            <FaPlus />  
          </Button>  
        </div>

        {/* Task Modal */}
        <TaskModal
          show={showModal}
          onHide={handleClose}
          user_id={user_id}
          onTaskCreated={handleTaskCreated}
        />

        {/* Task List */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {loading ? (  
            <p className="text-center text-muted">
              <Spinner className="me-2" variant="info" animation="border" size="sm" /> 
              Loading...
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-muted">No Tasks Yet</p>
          ) : (
            tasks.map(task => (
              <Task key={task.id} task={task} onDelete={handleDelete} />
            ))
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskContainer;
