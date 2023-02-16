import React, { useState } from 'react';

const Form = ({ onFormSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

const Card = ({ value }) => (
  <div>
    <h2>Value from Form:</h2>
    <p>{value}</p>
  </div>
);

const App = () => {
  const [formValue, setFormValue] = useState('');

  const handleFormSubmit = (value) => {
    setFormValue(value);
  };

  return (
    <div>
      <Form onFormSubmit={handleFormSubmit} />
      <Card value={formValue} />
    </div>
  );
};

export default App;
