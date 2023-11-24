import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color : ${(props) => props.theme.bgColor};

`;

const H1 = styled.h1`
  color : ${(props) => props.theme.textColor};
`;

interface DummyProps {
  text : string
  active? : boolean
} 

function Dummy({text, active = true} : DummyProps)  {
  return <h1> {text} </h1>
}

function App() {
  return (
    <Container>
      <H1> Protected </H1>
      <Dummy text="hello"></Dummy>
    </Container>
  )
}

export default App;