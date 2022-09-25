import { Button, Alert, Breadcrumb, Card, Row, Form, Col, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const handleButtonClick = (e) =>{
    e.preventDefault();
    console.log("Prevented")
  }
  return (

    <div className="App">
      <Container className='mt-4 mb-5'>
        <Row>
            <Col sm={6}>
              <Card className='mb-5' style={{ color: "blue"}}>
                <Card.Img src="https://picsum.photos/200/300" />
                <Card.Body />
                <Card.Title>
                  Hello Guys
                </Card.Title>
                <Card.Text>
                  THis is card example of Card
                </Card.Text>
                <Button variant="primary">Hey Guys</Button>
              </Card>
              <Breadcrumb>
                <Breadcrumb.Item>Test1</Breadcrumb.Item>
                <Breadcrumb.Item>Test2</Breadcrumb.Item>
                <Breadcrumb.Item active>Test3</Breadcrumb.Item>
              </Breadcrumb>
              <Alert variant='success'>This is Allert</Alert>
              <Button>Test Button</Button>
            </Col>
            <Col>
            <Form>
              <Form.Group controlId='formEmail'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type="email" placeholder="Example@email.com"/>
                <Form.Text className="text-muted" >
                  We'll never share your email adress, trust us
                </Form.Text>
              </Form.Group>
              <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
                <Form.Text className="text-muted" >
                  Save your password secure
                </Form.Text>
              </Form.Group>
              <Button onClick={handleButtonClick} variant="secondary" type="submit">Submit</Button>
            </Form>
            </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
