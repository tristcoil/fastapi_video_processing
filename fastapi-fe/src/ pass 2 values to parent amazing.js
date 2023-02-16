import React, { useState } from 'react';

const Form = ({ onFormSubmit }) => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(value1, value2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value1} onChange={(e) => setValue1(e.target.value)} />
      <input type="text" value={value2} onChange={(e) => setValue2(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

const Card = ({ value1, value2 }) => (

  <div>
    <h2>Values from Form:</h2>
    <p>Value 1: {value1}</p>
    <p>Value 2: {value2}</p>
  </div>
);


const App = () => {
  const [formValue1, setFormValue1] = useState('');
  const [formValue2, setFormValue2] = useState('');

  const handleFormSubmit = (value1, value2) => {
    setFormValue1(value1);
    setFormValue2(value2);
  };

  return (
    <div>
      <Form onFormSubmit={handleFormSubmit} />
      <Card value1={formValue1} value2={formValue2} />
    </div>
  );
};

export default App;