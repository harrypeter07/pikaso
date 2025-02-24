import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongoose';
import User from '@/lib/database/models/user.model';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
    if (!passwordMatch) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    // Authentication successful (usually generate a JWT here)
    return new NextResponse(JSON.stringify({ message: 'Login successful' }), { status: 200 }); // Or redirect
  } catch (error) {
    console.error('Error signing in user:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to sign in' }), { status: 500 });
  }
}

