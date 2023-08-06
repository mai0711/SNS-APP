import React from 'react'
import Card from 'react-bootstrap/Card';

function Article() {
  return (
    <>
    <Card>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFOCVBOCU5OCVFNCVCQSU4QnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" alt= "" />
        <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
        </Card.Text>
        </Card.Body>
    </Card>
    </>
  )
}

export default Article