import { FaPlus } from "react-icons/fa6";
import { Card,Button } from 'react-bootstrap';

export default function TaskContainer(){
// Function to format the date 
const getFormattedDate = () => {
  const date = new Date(); 
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  
  const day = date.getDate();
  const suffix = (day % 10 === 1 && day !== 11) ? "st" :
                 (day % 10 === 2 && day !== 12) ? "nd" :
                 (day % 10 === 3 && day !== 13) ? "rd" : "th";

  return formattedDate.replace(/\d+/, `${day}${suffix}`);
};

const FullDate = getFormattedDate();

return(
	<Card className="rounded-5 p-4 border-white" style={{ backgroundColor: "#f6f5fa" }}>
    <Card.Body>
      {/* Flex container for Title + Date + Button */}
      <div className="d-flex align-items-center fw-bold">
        <div className="flex-grow-1">
          <h2 className="mb-1 fw-bold">Task List</h2>
          <h6 className="text-primary fw-bold">{FullDate}</h6>
        </div>
        <Button variant="primary" className="p-2 mx-auto">
          <FaPlus />
        </Button>
      </div>
      {/* Task Component */}
      
    </Card.Body>
  </Card>
)
}
