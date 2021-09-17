import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, NavbarBrand, Container, Tooltip} from 'reactstrap'

const RenderNavbar = () => {
    const [tooltipshow, setShow] = useState<boolean>(false)
    const imgRef = useRef<HTMLImageElement>(null)
   const toggle = () => setShow(!tooltipshow)
    return <Navbar style={{backgroundColor: "#297373"}}fixed="top">
      <Container>
      <NavbarBrand>
        <Link to="/">
        <img
              alt="Logo"
              src="https://i.ibb.co/CQVzBsH/logo-size-invert.jpg"
  
              className="d-inline-block align-top"
              ref={imgRef}

              onMouseOverCapture = {toggle}
            />{' '}  
        
        </Link>
      </NavbarBrand>
      <Tooltip placement="top" isOpen={tooltipshow} target={imgRef} toggle={toggle}>
        You just put mouse on the logo of next big company!
      </Tooltip>
      </Container>
       
    </Navbar>
}

export default RenderNavbar