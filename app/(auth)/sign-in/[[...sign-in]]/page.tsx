'use client';
import { useState } from 'react';
import { AuthForm } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignInPage() {
const [formError, setFormError] = useState('');

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Signin successful");
        // Handle success (redirect, set auth token, etc.)
      } else {
        const errorData = await response.json();
        console.error('Signin failed:', errorData);
        setFormError(errorData.message || "Signin failed.");
      }
    } catch (error) {
      console.error('Signin error:', error);
      setFormError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg p-8 w-96 bg-card">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <AuthForm type="sign-in" onSubmit={handleSubmit} />
        <p className='mt-4'>Dont have an account yet</p>
        <Button className="button bg-purple-gradient  ml-48">
                            <Link href="/sign-up">Sign-Up</Link>
                        </Button>
        {formError && <p className="text-red-500">{formError}</p>}
      </div>
    </div>
  );
}

