// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongoose';
import User from '@/lib/database/models/user.model';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, username, password, firstName, lastName } = await req.json(); // Include other fields

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: 'Email already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,  // Store the hashed password
     // photo, // Add photo field
      firstName, // Add firstName
      lastName, // Add lastName
    });

    await newUser.save();

    return new NextResponse(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error signing up user:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to create user' }), { status: 500 });
  }
}
