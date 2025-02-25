// lib/actions/user.actions.ts
"use server";
import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// Define type for CreateUserParams (important!)
interface CreateUserParams {
  email: string;
  username: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  // ... other fields as needed
}

// Define type for UpdateUserParams (important!)
interface UpdateUserParams {
  email?: string;
  username?: string;
  photo?: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
  creditBalance?: number;
  // ... other fields as needed
}

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ (Get user by email - more common than clerkId)
export async function getUserByEmail(email: string) {  // Changed to email
  try {
    await connectToDatabase();

    const user = await User.findOne({ email }); // Find by email

    if (!user) {
      throw new Error("User Not Found");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE (Use email for updating - more common)
export async function updateUser(email: string, user: UpdateUserParams) { // Changed to email
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ email }, user, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("User update failed");
    }

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(email: string) { // Changed to email
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ email }); // Find by email

    if (!userToDelete) {
      throw new Error("User Not Found");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

//use credits

export async function updateCredits(userId: string , creditFee: number){
    try {
        await connectToDatabase();

        const updatedUserCredits = await User.findOneAndUpdate(
            { _id: userId},
            { $inc: { creditBalance: creditFee}},
            { new: true }
        )

        if(!updatedUserCredits) throw new Error("User credits update failed")
            return JSON.parse(JSON.stringify(updatedUserCredits));

    } catch (error) {
        handleError(error);
    }
}