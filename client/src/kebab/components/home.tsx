import { gql,  useMutation } from '@apollo/client';

import React, {useState} from 'react';
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Modal, ModalBody, Row } from 'reactstrap';
import styles from '../../styles/styles';
import RenderNavbar from './navbar';
interface LoggedIn{
  loggedIn: boolean;
  modal: boolean;
}
interface loggedIndata{
  username: string;
  password: string;
}

const Home = () => {



  const [isLoggedIn, SetIsLoggedIn] = useState<LoggedIn>({
    loggedIn: false,
    modal: true
  })
  const [loggIndata, setLoggIndata] = useState<loggedIndata>({
    username: "",
    password: "",
  })
  const LOG_USER_IN = gql`
  mutation Login($username: String!, $pass: String!){
    login(username: $username, pass: $pass){
      msg
    }
  }
  
  `
  const [ mutateFunc, {error, data},] = useMutation(LOG_USER_IN)
  const send = async(event: any) => {
  event.preventDefault()
   mutateFunc({
    variables:{username: loggIndata.username, pass: loggIndata.password}
  })




{error !== undefined ? console.log(error) : console.error("NE RADI DETE MU JEBEM")}
console.log(JSON.stringify(data))

  }
  
  while(!isLoggedIn.loggedIn){
   const handleC = (event: any) => {
     setLoggIndata((prevstate: any) => {
       return{
         ...prevstate,
         [event.target.name]: event.target.value

       }
     })

   }

  return(
    <div style={styles.MainStyle} >
      <RenderNavbar></RenderNavbar>
      
      <Modal isOpen={isLoggedIn.modal} centered={true}>
        <ModalBody style={styles.Input}>
      
          <h4 style={styles.text}>Log in to your account</h4>
           <br></br>
          <Form>
            {JSON.stringify(data) === "{\"login\":{\"msg\":\"Correct information provided\",\"__typename\":\"LoginResponse\"}}" ? SetIsLoggedIn({loggedIn: true, modal: false}) : ""}
          {
                JSON.stringify(data) === "{\"login\":{\"msg\":\"Invalid username or password\",\"__typename\":\"LoginResponse\"}}" ?
                <Container>
              
                <Row>
               
                <Col style={styles.text}><h5>Username</h5></Col>
                <Col>
                <FormGroup>
                <Input placeholder="Your Username" name="username" value={loggIndata?.username} onChange={handleC} invalid></Input>
                <FormFeedback>invalid username or password</FormFeedback>
                </FormGroup>
                </Col>
              
                
               
               
                </Row>
               <br></br>
               <Row>
               
                <Col style={styles.text}><h5>Password</h5></Col>
                <Col>
                <FormGroup>
                <Input placeholder="Your password" type="password" name="password" value={loggIndata?.password} onChange={handleC} invalid></Input>
                <FormFeedback>invalid username or password</FormFeedback>
                </FormGroup>
                </Col>
              
             
               
  
                </Row>
                <br></br>
                <Row><Button color="info" block outline onClick={send}> Log in</Button></Row>
              </Container>
              :  <Container>
              
              <Row>
             
              <Col style={styles.text}><h5>Username</h5></Col>
              <Col>
              <FormGroup>
              <Input placeholder="Your Username" name="username" value={loggIndata?.username} onChange={handleC}></Input>
              </FormGroup>
              </Col>
            
              
             

              </Row>
             <br></br>
             <Row>
             
              <Col style={styles.text}><h5>Password</h5></Col>
              <Col>
              <FormGroup>
              <Input placeholder="Your password" type="password" name="password" value={loggIndata?.password} onChange={handleC}></Input>
              </FormGroup>
              </Col>
            
          
             

              </Row>
              <br></br>
              <Row><Button color="info" block outline onClick={send}> Log in</Button></Row>
            </Container>}
           
          </Form>
        </ModalBody>
      </Modal>
   
    </div>

  )
  }
  return(
    <div style={styles.MainStyle}>
      <RenderNavbar></RenderNavbar>
     
    </div>
  )
}
export default Home;