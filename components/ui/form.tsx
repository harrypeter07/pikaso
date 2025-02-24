// components/ui/form.tsx (No shadcn/ui)
import { useState } from 'react';
interface AuthFormProps {
    type: "sign-in" | "sign-up";
    onSubmit: (data: any) => void;
  }
  export const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => { // Use React.FC
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit function passed from the parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "sign-up" && (
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
            required // Add required attribute for form validation
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        {type === "sign-in" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};
