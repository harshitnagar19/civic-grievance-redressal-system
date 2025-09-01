import React from "react";
import SignUpForm from "./signUpForm";

const SignUpWrapper = () => {
  return (
    <div>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <SignUpForm />
      </div>
    </div>
    </div>
  );
};

export default SignUpWrapper;