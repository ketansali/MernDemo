import React, { Children } from 'react'
import {Modal,Button} from 'react-bootstrap'
const Model = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' onClick={props.onSubmit}>{props.btntitle}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Model