import React from 'react';

import Login from './Login';
import NewUser from './NewUser';
import './SignIn.css';

export default function SignUp() {
  return (
    <main>
      <NewUser />
      <Login />
    </main>
  );
}
