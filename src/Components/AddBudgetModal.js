import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"

import { useBudgets } from "../contexts/BudgetContext"

export default function AddBudgetModal({ show, handleClose }) {
  //Two useRef hooks are used to create references for the input elements (nameRef for the budget name input and maxRef 
  // for the maximum spending input).
  //  These refs are used to access the current value of the input fields.
  const nameRef = useRef()
  const maxRef = useRef() 
 
  const { addBudget } = useBudgets()
  function handleSubmit(e) {
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          {/* Two Form.Group components are used to group form elements together.
           Each group contains a Form.Label and a Form.Control component.
           The Form.Control elements are associated with the nameRef and maxRef refs, respectively. */}
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

// Overall, this component represents a modal for adding a new budget.
//  It captures input values for the budget name and maximum spending,
//   submits them via a form, and then closes the modal.