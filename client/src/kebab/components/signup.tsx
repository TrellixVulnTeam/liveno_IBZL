import { gql, useMutation } from '@apollo/client';
import React, {useState } from 'react';
import { Redirect } from 'react-router';
import { Button, Card, CardBody, CardTitle, FormFeedback, FormGroup, Input,} from 'reactstrap';
import styles from '../../styles/styles';
import  RenderNavbar from './navbar'



  interface signupdata{
  age: any,
  fullname: string,
  email: string,
  password: string,
  username: string,
  }
 const TQ = gql`
  mutation register($username: String!, $password: String!, $email: String!, $age: String!, $fullname: String!){
     register(username: $username, password: $password, email: $email, age: $age, fullname: $fullname){
         msg
     }
 }
 `
 
 const Signup: React.FC = () => {
     const [InputData, setInputData] = useState<signupdata>({age: "", password: "", email: "", username: "", fullname: "",})
     
     const [mutateFunction, {data, error}] = useMutation(TQ)
   
     const handleC = (event: any) => {
         setInputData((prevstate: any) => {
             return{
                 ...prevstate,
                 [event.target.name] : event.target.value
             }
         })
     }
    
     const send = async(event: any) => {
         event.preventDefault()
         await mutateFunction({
         variables: {username: InputData.username, password: InputData.password, email: InputData.email, fullname: InputData.fullname, age: InputData.age,}
         })
         console.log(JSON.stringify(error, null , 2))
        if(data !== undefined) {
            await console.log(JSON.stringify(data))
        }
       
        
        }
        
    while(JSON.stringify(data) === "{\"register\":{\"msg\":\"username is alerdy taken.\",\"__typename\":\"Response\"}}" || data === undefined) {

    
    return <div style={styles.MainStyle}>
        < RenderNavbar></RenderNavbar>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
         <form style={styles.center}>
             <Card  style={{   width: '30rem', backgroundColor: "#19323C"}}>
                 <CardBody style={{alignItems:"center",}}>
                 <CardTitle style={{textAlign: 'center', color: "#297373"} }><h5>Welcome to liveno</h5></CardTitle>
                 {/* Username */}
                 <h5 style={{textAlign: 'center', color: "#297373"} }>Username</h5> 
                 {InputData.username.length < 5 || InputData.username.includes(" ")  || JSON.stringify(data) === "{\"register\":{\"msg\":\"username is alerdy taken.\",\"__typename\":\"Response\"}}" ? <div> <FormGroup>
                 <Input invalid value={InputData.username} type="text" name="username" placeholder="Create your username" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
                 {InputData.username.length < 5 || InputData.username.includes(" ") ? <FormFeedback style={{textAlign: 'center'}}>username must be at least 5 characters long and must not contains a space</FormFeedback> : ""}
                 
                {JSON.stringify(data) === "{\"register\":{\"msg\":\"username is alerdy taken.\",\"__typename\":\"Response\"}}" ? <FormFeedback style={{textAlign: 'center'}}>username is taken</FormFeedback> : ""}
                 
             </FormGroup> 
             
             </div> : <FormGroup>
                
                 
             <Input valid value={InputData.username} type="text" name="username" placeholder="Create your username" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
             <br></br>
            
             </FormGroup>}

              {/* password  */}


             <h5 style={{textAlign: 'center', color: "#297373"} }>password</h5>
              {InputData.password.length < 8 ? <div> <FormGroup>
                 <Input invalid value={InputData.password} type="password" name="password" placeholder="Create your password" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
                 
                 <FormFeedback style={{textAlign: 'center'}}>password must be at least 8 characters long</FormFeedback>
             </FormGroup> 
            
             </div> : 
             
             
             <FormGroup>
             <Input valid value={InputData.password} type="password" name="password" placeholder="Create your password" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
             <br></br>
                 </FormGroup>}

                      {/* Email */}

                      <h5 style={{textAlign: 'center', color: "#297373"} }>Email</h5>

                      {InputData.email === ""? <div> <FormGroup>
                 <Input invalid value={InputData.email} type="text" name="email" placeholder="Enter your email address" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
                 
                 <FormFeedback style={{textAlign: 'center'}}>Your emial cannot be empty</FormFeedback>
             </FormGroup> 
            
             </div> : 
             
             
             <FormGroup>
            <Input valid value={InputData.email} type="text" name="email" placeholder="Enter your email address" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
             <br></br>
                 </FormGroup> }

                 {/* Real name */}
                <h5 style={{textAlign: 'center', color: "#297373"}}>Full name</h5>
                 {InputData.fullname === "" ? <div> <FormGroup>
                 <Input invalid value={InputData.fullname} type="text" name="fullname" placeholder="Enter your full name" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
                 
                 <FormFeedback style={{textAlign: 'center'}}>Your full name cannot be empty</FormFeedback>
             </FormGroup> 
            
             </div> : 
             
             
             <FormGroup>
            <Input valid value={InputData.fullname} type="text" name="fullname" placeholder="Enter yout full name" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
             <br></br>
                 </FormGroup>}

            {/* Full name */}
            <h5 style={{textAlign: 'center', color: "#297373"}}>Age</h5>
            {InputData.age < 13 ?<div> <FormGroup>
                 <Input invalid value={InputData.age} type="number" name="age" placeholder="Enter your age" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
                 
                 <FormFeedback style={{textAlign: 'center'}}>You need to be at least 13 years old</FormFeedback>
             </FormGroup> 
            
             </div> : 
             
             
             <FormGroup>
            <Input valid value={InputData.age} type="number" name="age" style={{backgroundColor:"#19323C",  color: "white"}}  onChange={handleC}></Input>
             <br></br>
                 </FormGroup> }

                
                   
             </CardBody>
             {InputData.username.length < 5  || InputData.username.includes(" ") || InputData.age < 13 || InputData.email === "" || InputData.fullname === "" || InputData.password.length < 8 ?   <Button color="info" size="lg" block outline disabled>Sign up</Button>: <Button color="info" size="lg" block outline onClick={send}>Sign up</Button>}
             </Card>
         </form>
    </div>
    }
    return(

        <Redirect to="/"></Redirect>
    )
}

export default Signup;