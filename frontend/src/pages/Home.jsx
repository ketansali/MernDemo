
import { Container, Card} from "react-bootstrap";
import {Link,Outlet} from 'react-router-dom'


const Home = () => {
  
  return (
    <div className="d-flex">
    <Card style={{ width: '18rem' ,marginTop:"4%", marginLeft:"2%" }} className="">
      <Card.Body className="">
        <Card.Title className="text-center justify-content-center">MENU</Card.Title>
        <Link className='nav-link btnn m-2 btn btn-primary bg-light ' to={'/home/employee'}>Employee</Link>
        <Link className='nav-link btnn m-2 btn btn-primary bg-light' to={'/home/technology'}>Technology</Link>
      </Card.Body>
    </Card>
    <Container>
      <Outlet/>
    </Container>
    </div>
  );
};

export default Home;
