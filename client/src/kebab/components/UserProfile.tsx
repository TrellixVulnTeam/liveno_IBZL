
import { gql, useMutation } from '@apollo/client';
import React, {useState} from 'react';
import {useParams } from 'react-router-dom';
import { ModalBody, Form, Container, Row, Col, FormGroup, Input, FormFeedback, Card,  Button, Modal } from 'reactstrap';
import {UseCustomMutation } from '../../custom-hooks/useCustomMutation';
import styles from '../../styles/styles';
import "../../css/styles.css"

import "../../css/userprofile.css" 
/* 
Loginam usera,
proverim da li je username isti kao username usera koji je ovaj user pokusao da dobije
ako jeste: dobije mogucnost svim opcijama
ako ne: dobije previve

*/

import RenderNavbar from './navbar';
import { setTimeout,} from 'timers';


interface UserIsAccOwnerProps{
  
  ReqPfp: string 
  // ReqAge: string
  ReqDescription: string
  //  ReqIsMod : boolean
  //username trenutnog korisnika
  CUser: string
   ReqClive: string
   ReqNumOfLikes: number 
   ReqFullName: string
   ReqUsername: string
   ReqPassword: string
  //  ReqEmail: string
}
interface likeprops{
  isliked: boolean
  numoflikes: number
}
const UserIsAccOwner: React.FC<UserIsAccOwnerProps>  = ({ ReqPassword, ReqPfp, ReqFullName, ReqUsername, ReqDescription, ReqNumOfLikes, ReqClive, CUser}) => {
  // setModalOpen((prevstate: any) => {})
  const CHANGE_BIO_MUTATION = gql`
    mutation update($username: String!, $newbio: String!){
      update(username: $username, newbio: $newbio){
        issucess
      }
    }
    
    `
  const [myFunc] = useMutation(CHANGE_BIO_MUTATION)
const [numoflikes, like] =  useState<likeprops>({
  isliked: false,
  numoflikes: ReqNumOfLikes
}) 
const CHANGE_PASS_MUTATION = gql`
mutation updatepassword($username: String!, $newpassword: String!, $currpass: String!){
  updatepassword(username: $username, newpassword: $newpassword, currpass: $currpass){
    error
  }
}
`
const [changepassword, {data, error, loading}] = useMutation(CHANGE_PASS_MUTATION)
// const [passwordState, setPassState] = useState<Boolean>(false)
const ChangePasswordClick = async() => {
   await changepassword({variables: {username: ReqUsername, newpassword: newuserdata.password, currpass: newuserdata.currpass}})
  
    console.log(loading);
    
    //     if(data?.userpassword?.error !== undefined) {
    //   console.log(data?.updatepassword?.error);
     
    //   if(data?.updatepassword?.error === "Wrong password") {
    //   setModalOpen((prevstate: any)=>{
    //     return{
    //       ...prevstate, 
    //       passwordmodal: true}}
    //   )
    //   }
    //   else{
    //     setModalOpen((prevstate: any) => { return{
    //       ...prevstate,
    //       passwordmodal: false
    //     }})
    //   }
    // }


    if(newuserdata.currpass === ReqPassword){
      setModalOpen((prevstate: any) => { return{
              ...prevstate,
              passwordmodal: false
            }})
      
            console.log(ReqPassword)
          
    }
    else{
      setModalOpen((prevstate: any) => { return{
        ...prevstate,
        passwordmodal: true
      }})
    }
      
    
      // console.log(data.updatepassword.error);
    
   
  setnewuserdata((prevstate: any) => {
    return{
      ...prevstate,
      password: "",
      currpass: ""
    }
  })
 

}


const Changebioclick = (event: any) => {
  event.preventDefault();
  
    myFunc({variables:{username: ReqUsername, newbio: newuserdata.bio}})
  
  setModalOpen((prevstate: any)=>{
    return{
      ...prevstate,
      biomodal: false,
    }
  })
  
  }
  const CHANGE_FULLNAME_MUTATION = gql`
  mutation cfulln($username: String! , $newfullname: String!){
   updatefullname(newfullname: $newfullname, username: $username){
     issucess
   }
  }
  `
 const [changefullname] = useMutation(CHANGE_FULLNAME_MUTATION)
 const ChangeFullnameClick = (event: any) => {
 
 event.preventDefault()
 
 setModalOpen((prevstate: any) =>{return{
   ...prevstate,
   fullname: false
 }})

 setTimeout(() => {
   changefullname({variables:{username: ReqUsername, newfullname: newuserdata.fullname}})
 }, 5)


 }
const handlelike = () => {
  if (numoflikes.isliked === false) {
      like({
        numoflikes: numoflikes.numoflikes + 1,
        isliked: true
      })             
    } else {

      like({
        numoflikes: numoflikes.numoflikes - 1,
        isliked: false
      })
     
    }
 
  }
interface newuserdatai{
username: string;
fullname: string;
bio: string;
password: string;
pfp: string;
currpass: string;
}
const [modalshow ,setmodalshow] = useState<boolean>(false)
const [newuserdata, setnewuserdata] = useState<newuserdatai>({
  username: "", fullname: "", bio: "", password: "", pfp: "", currpass: ""
})
interface modals{
  usernamemodal: boolean
  passwordmodal: boolean
  fullname: boolean
  biomodal: boolean
  pfpmodal: boolean
}
const [changedatamodals , setModalOpen] = useState<modals>()
const handlec = (event : any) => {
setnewuserdata((prevstate: any) => {
  return{
  ...prevstate,
  [event.target.name]: event.target.value
}})
}
const CHANGE_PFP_MUTATION = gql`
mutation pfpmutation($username: String!, $pfp: String!){
updatepfp(username: $username, newpfp: $pfp){
  issucess
}
}
`
const [pfpFn] = useMutation(CHANGE_PFP_MUTATION)

const changePfpClick = (event: any) => {
event.preventDefault()

setTimeout(() => {
  pfpFn({variables:{username: ReqUsername, pfp: newuserdata.pfp}})
}, 5)

setModalOpen((prevstate: any) => {
  return{
    ...prevstate,
    pfpmodal: false
  }
})
}  
return(
 

    <Card style={styles.Item}>
   
     <Row>
     <Col><img className="rimg" src={ReqPfp} width="100" 
      
     //https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg
     ></img></Col>
     <Col>
     <br></br>
     <h3 style={styles.text}>{ReqFullName}</h3>
     <h5 style={styles.text}>@{ReqUsername}</h5>
     </Col>  
    </Row>
    
    <Row><Col>
    <br></br>
    <h5 style={styles.text}>{ReqDescription}</h5></Col></Row>
    <br></br>
    <Button outline onClick={() => {
      setmodalshow(true)
     
      }} color="secondary" >Edit profile</Button>{' '}
    <Modal isOpen={modalshow} centered={true}>
      <ModalBody style={styles.Input} >
        <Row> <Button  outline onClick={() => {
          setModalOpen((prevstate: any) =>{
            return{
              ...prevstate,
              biomodal: true
            }
          })
        }} block>Change your bio</Button></Row>
       <br></br>
       <Row><Button  outline onClick={() => {setModalOpen((prevstate: any) => {
         return{
         ...prevstate, 
         pfpmodal: true
         }})}}>Change your pfp</Button></Row>
         <Modal isOpen={changedatamodals?.pfpmodal}>
           <ModalBody style={styles.Input}>
             <h3 style={styles.text}>Change your pfp</h3>
             <Input style={styles.Input} name="pfp" value={newuserdata.pfp} onChange={handlec} placeholder="Paste the link of image!"></Input>
             <br></br>
             <Button outline onClick={changePfpClick}>Save</Button>
           </ModalBody>
         </Modal>
           <br></br>
           <Row><Button outline onClick={() => {
             setModalOpen((prevstate: any) => {
               return{
                 ...prevstate,
                 fullname: true
               }
             })
           }}>Change your full name</Button></Row>
           <Modal isOpen={changedatamodals?.fullname}>
             <ModalBody style={styles.Input}>
              <h3 style={styles.text}>Change your full name</h3>
   
              <Input type="text" style={styles.Input} name="fullname" value={newuserdata.fullname} onChange={handlec}></Input>
              <br></br>
              <Button outline onClick={ChangeFullnameClick}>Save</Button>
             </ModalBody>
           </Modal>
       <br></br>
       <Row><Button outline onClick={() => {setModalOpen((prevstate: any) => { return {
          ...prevstate,
          passwordmodal: true,
       }})}}>Change password</Button></Row>
       <Modal isOpen={changedatamodals?.passwordmodal}>
     {console.log(JSON.stringify(error))}
         {data === undefined || data.updatepassword.error === null ?   <ModalBody style={styles.Input}>
          {newuserdata.password.length > 8  ? <div> <h3 style={styles.text}>Change password</h3>
          <br/> 
          
          <div> <Input type="password" value={newuserdata.password} name="password"placeholder="Create your password" onChange={handlec}></Input>
          {/* <FormFeedback>Password must be at least 8 characters long and cannot include spaces.</FormFeedback> */}
          </div>
         
          <br></br>
          <Input type="password" value={newuserdata.currpass} name="currpass" placeholder="Enter your current password" onChange={handlec}></Input>
          <br></br>
          <Button outline onClick={ChangePasswordClick}>Save</Button> </div> : 
          
          //ako ne je dombro
          
          <div> <h3 style={styles.text}>Change password</h3>
          <br/> 
          
          <div> <Input type="password" value={newuserdata.password} name="password"placeholder="Create your password" invalid onChange={handlec}></Input>
          <FormFeedback>Password must be at least 8 characters long</FormFeedback>
          </div>
         
          <br></br>
          <Input type="password" value={newuserdata.currpass} name="currpass" placeholder="Enter your current password" onChange={handlec}></Input>
          <br></br>
          <Button outline disabled>Save</Button> </div>}
         
         </ModalBody> :   <ModalBody style={styles.Input}>
         
          {newuserdata.password.length > 8 ? <div>
            <h3 style={styles.text}>Change password</h3>
            <Input type="password" value={newuserdata.password} placeholder="Create your new password, it should be something secure" name="password" invalid onChange={handlec}></Input>
          <br></br>
          <Input type="password" value={newuserdata.currpass} placeholder="Enter your current password" name="currpass"invalid onChange={handlec}></Input>
          <FormFeedback>Wrong password</FormFeedback>
          <br></br>
          {/* {console.log(data.updatepassword.error)}
          {console.log(JSON.stringify(data))} */}
          <Button outline onClick={ChangePasswordClick}>Save</Button>
          </div>: 
          //ako ne je dombro
          <div>
            <h3 style={styles.text}>Change password</h3>
            <div>
            <Input type="password" value={newuserdata.password} 
            placeholder="Enter your current password" name="password" invalid onChange={handlec}></Input>
             <FormFeedback>Password must be at least 8 characters long</FormFeedback>
             </div>
          <br></br>
          <Input type="password" value={newuserdata.currpass} placeholder="Enter your current password" name="currpass"invalid onChange={handlec}></Input>
          <FormFeedback>Wrong password</FormFeedback>
          <br></br>
          {/* {console.log(data.updatepassword.error)}
          {console.log(JSON.stringify(data))} */}
          <Button outline disabled>Save</Button>
            </div>} 
         
              
         </ModalBody>}
       
       </Modal>
       <br></br>
           <Row>  <Button outline onClick={() =>{
         setmodalshow(false)
       }} block>Exit</Button></Row>
     
      </ModalBody>
      <Modal isOpen={changedatamodals?.biomodal}>
        <ModalBody style={styles.Input}>
          {newuserdata.bio.length < 50 ?  <div>
            <h3 style={styles.text}>Change your bio</h3><Input type="text" placeholder="Enter your new bio , be creative!" style={styles.Input}  name="bio" value={newuserdata.bio} onChange={handlec}></Input>
          <br></br>
          <Button outline onClick={Changebioclick}>Save</Button></div> : <div>
          <h3 style={styles.text}>Change your bio</h3>
          <Input type="text" placeholder="Enter your new bio , be creative!" style={styles.Input}  name="bio" value={newuserdata.bio} onChange={handlec} invalid></Input>
          <FormFeedback>Bio can't be longer than 50 characters</FormFeedback>
          <br></br>
          <Button outline onClick={Changebioclick} disabled>Save</Button>
            </div>}
         
         
        </ModalBody>
      </Modal>
    </Modal>
    </Card>

  
)
}

export const DisplayUser = () => {

  const GET_USER = gql`
    mutation GetUser($username: String!) {
      getUser(username: $username) {
        pfp
        username
        password
        age
        CurrentLive
        ismod
        description
        fullname
        numoflikes
      }
    }
  `;
  const { username }: { username: any } = useParams(); 
  const MyData: any =  UseCustomMutation(username, GET_USER)
  interface LoggedIn{
    loggedIn: boolean;
    modal: boolean;
  }
  interface loggedIndata{
    username: string;
    password: string;
  }
  
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
    const [ mutateFunc, {data},] = useMutation(LOG_USER_IN)
    const send = async(event: any) => {
    event.preventDefault()
     mutateFunc({
      variables:{username: loggIndata.username, pass: loggIndata.password}
    })
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
   
    //kraj login
   
   
  
  try{

     
      const MyReqUsername: string = MyData.getUser.username
      const ReqPfp: string = MyData.getUser.pfp
      // const ReqAge: number = MyData.getUser.age
      const ReqDescription: string = MyData.getUser.description
      // const ReqIsMod: boolean =  MyData.getUser.ismod
      const ReqClive: string = "a"
      const ReqNumOfLikes: number = MyData.getUser.numoflikes
      const ReqFullName: string = MyData.getUser.fullname
      // const ReqEmail: string = MyData.getUser.email
      const ReqPassword: string = MyData.getUser.password
     const CurrentUsername = loggIndata.username
 
  
  return(
    
  <div style={styles.MainStyle}>
   <RenderNavbar></RenderNavbar>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
   {/* {SetReqInfo({    
    ReqUsername: MyReqUsername,
    ReqPfp: ReqPfp,
    ReqAge: ReqAge,
    ReqDescription: ReqDescription,
    ReqIsMod: ReqIsMod,
    ReqClive:  ReqClive,
    ReqNumOfLikes: ReqNumOfLikes,
    ReqFullName:  ReqFullName,
     ReqEmail:  ReqEmail,})} */}
   {/* {JSON.stringify(MyData, null, 2) === "{\"getUser\":{\"pfp\":null,\"username\":null,\"password\":null,\"age\":null,\"CurrentLive\":null,\"ismod\":null,\"description\":null,\"fullname\":null,\"numoflikes\":null,\"__typename\":\"GetUserResponse\"}}" ? "invalid user" : JSON.stringify(MyData) } */}
 
  
   <br></br>
         <br></br>
         <br></br>
         <br></br>
   <div style={styles.center}>{loggIndata.username === MyReqUsername.substring(1, MyReqUsername.length -1) ? <UserIsAccOwner ReqPassword={ReqPassword.substring(1, ReqPassword.length -1)}ReqPfp={ReqPfp.substring(1, ReqPfp.length -1)} ReqFullName={ReqFullName.substring(1, ReqFullName.length -1)} ReqUsername={MyReqUsername.substring(1 , MyReqUsername.length -1)} ReqDescription={ReqDescription.substring(1, ReqDescription.length -1)} ReqNumOfLikes={ReqNumOfLikes} ReqClive={ReqClive} CUser={CurrentUsername.substring(1, CurrentUsername.length - 1)}></UserIsAccOwner> : "nesi"}</div>
  
  
  <br></br>
  
  </div>

  )
  }
  catch (err) {
    return(
      <div style={styles.MainStyle}>
        <RenderNavbar></RenderNavbar>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>

         <div style={styles.center}>
           {/* <img src="https://www.pinclipart.com/picdir/big/329-3298001_png-file-sad-smiley-icon-png-clipart.png" height="200">
        
           </img> */}
         
        <>
        <h3 style={styles.danger}>ERROR: 404 user not found</h3>
        </>

           
        </div>
        </div>
      
    )
  }

}

