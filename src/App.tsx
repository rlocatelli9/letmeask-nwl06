import React from 'react';

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <>
      <h1>Hello World</h1>
      <p>{new Date().toDateString()}</p>
    </>
  )
}

export default App;
