import { Modal, Button, Form, Spinner } from "react-bootstrap";


const UpgradeModal = ({ showUpgrade, handleClose }) =>


 (
  <Modal show={showUpgrade} onHide={handleClose} backdrop="static" centered>
    <Modal.Header closeButton>
      <Modal.Title>Upgrade to Pro</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="text-muted">Unlock premium features by upgrading your plan.</p>
      <Form onSubmit={(e)=>{e.preventDefault();
alert('Congrat! Payement success')}}>
        <Form.Group className="mb-3">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="number"
            minLength="16"
            maxLength="16"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            required
          />
         
        </Form.Group>

        <div className="d-flex gap-2">
          <Form.Group className="mb-3 w-50">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="text"
              name="expiry"
             placeholder="MM/YY"
              required
            />
          
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="number"
              min={3}
              name="cvv"
              placeholder="123"
              required
            />
            
          </Form.Group>
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" >
             Pay Now
          </Button>
        </Modal.Footer>
      </Form>
    </Modal.Body>
  </Modal>
);

export default UpgradeModal;
