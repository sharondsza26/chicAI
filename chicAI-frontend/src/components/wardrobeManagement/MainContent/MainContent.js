import './MainContent.css';
import { Container, Stack, Card } from 'react-bootstrap';


function MainContent() {
  return (
    <Container className="wardrobe-management-content" fluid>
    <Stack gap={3} className='wardrobe-management-content-stack'>
      <div className="p-2">Sweaters
      <Card className="wardrobe-management-card" style={{ width: '15rem' }}>
      <Card.Img variant="top" src={require('./img/dummy-sweater.png')} />
      <Card.Body>
        <Card.Text>Red Sweater</Card.Text>
      </Card.Body>
        </Card>
      </div>
      <div className="p-2">Jackets
      <Card className="wardrobe-management-card" style={{ width: '15rem' }}>
      <Card.Img variant="top" src={require('./img/dummy-jacket.png')} />
      <Card.Body>
        <Card.Text>Yellow Jacket</Card.Text>
      </Card.Body>
        </Card>
        </div>
      <div className="p-2">Tshirts
      <Card className="wardrobe-management-card" style={{ width: '15rem' }}>
      <Card.Img variant="top" src={require('./img/dummy-shirt.png')} />
      <Card.Body>
        <Card.Text>Green Shirt</Card.Text>
      </Card.Body>
        </Card>
        </div>
    </Stack>
    </Container>
  );
}

export default MainContent;