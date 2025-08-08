import React, { useState } from 'react';
import SignupStep1 from '../components/SignupStep1';
import SignupStep2 from '../components/SignupStep2';

const Signup = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="signup-page">
      {step === 1 && <SignupStep1 setStep={setStep} />}
      {step === 2 && <SignupStep2 setStep={setStep} />}
    </div>
  );
};

export default Signup;
