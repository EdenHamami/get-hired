import React from 'react';
import Button from './Button';
import InputField from './InputField';
import SelectionTab from './SelectionTab';
import Navbar from './Navbar';
import CustomButton from './CustomButton';

const MyComponent = () => {
  return (
    <div>
      <Button>Click Me!</Button>
      <InputField placeholder="Enter your name" />
      <SelectionTab options={['Option 1', 'Option 2', 'Option 3']} />
      <CustomButton label="Button 1" />
      <CustomButton label="Button 2" />
      <CustomButton label="Button 3" />
    </div>
  );
};

export default MyComponent;