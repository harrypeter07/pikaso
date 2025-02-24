// app/(auth)/sign-up/[[...sign-up]]/page.tsx
'use client';
import { useState } from 'react';
import { AuthForm } from "@/components/ui/form";

export default function SignUpPage() {
  const [formError, setFormError] = useState('');

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(values),
      });
      console.log("hello ")

      if (response.ok) {
        console.log("Signup successful");
        // Handle success (redirect, show message, etc.)
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        setFormError(errorData.message || "Signup failed.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setFormError("An unexpected error occurred.");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg p-8 w-96 bg-card"> {/* Added background */}
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <AuthForm type="sign-up" onSubmit={handleSubmit} /> {/* Correct usage */}
        {formError && <p className="text-red-500">{formError}</p>}
      </div>
    </div>
  );
}
