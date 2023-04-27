import React from 'react';

const SuccessfulRegistrationPage = ({ username }) => {
  return (
    <div>
      <h1>{`${username} has successfully registered!`}</h1>
      <p>Welcome to the site!</p>
    </div>
  );
};

export default SuccessfulRegistrationPage;
