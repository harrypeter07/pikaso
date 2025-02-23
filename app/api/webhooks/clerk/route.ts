// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { clerkClient } from "@clerk/nextjs/server"
// import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions"

// export async function POST(req: Request) {
//   // Get the SIGNING_SECRET (renamed from WEBHOOK_SECRET)
//   const SIGNING_SECRET = process.env.SIGNING_SECRET
//   if (!SIGNING_SECRET) {
//     throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET)

//   // Get headers
//   const headerPayload =await headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error: Missing Svix headers', {
//       status: 400,
//     })
//   }

//   // Get body
//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   let evt: WebhookEvent

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Error: Could not verify webhook:', err)
//     return new Response('Error: Verification error', {
//       status: 400,
//     })
//   }

//   // Get the event type and data
//   const { id } = evt.data
//   const eventType = evt.type

//   // Handle user creation
//   if (eventType === "user.created") {
//     try {
//       const { id, email_addresses, image_url, first_name, last_name, username } = evt.data

//       const user = {
//         clerkId: id,
//         email: email_addresses[0].email_address,
//         username: username!,
//         firstName: first_name || "",
//         lastName: last_name || "",
//         photo: image_url,
//       }

//       const newUser = await createUser(user)

//       if (newUser) {
//         const client = await clerkClient()
//         await client.users.updateUserMetadata(id, {
//           publicMetadata: {
//             userId: newUser._id,
//           },
//         })
//       }

//       return new Response('User created successfully', { status: 200 })
//     } catch (error) {
//       console.error('Error creating user:', error)
//       return new Response('Error creating user', { status: 500 })
//     }
//   }

//   // Handle user updates
//   if (eventType === "user.updated") {
//     try {
//       const { id, image_url, first_name, last_name, username } = evt.data

//       const user = {
//         firstName: first_name || "",
//         lastName: last_name || "",
//         username: username!,
//         photo: image_url,
//       }

//       await updateUser(id, user)
//       return new Response('User updated successfully', { status: 200 })
//     } catch (error) {
//       console.error('Error updating user:', error)
//       return new Response('Error updating user', { status: 500 })
//     }
//   }

//   // Handle user deletion
//   if (eventType === "user.deleted") {
//     try {
//       const { id } = evt.data
//       await deleteUser(id!)
//       return new Response('User deleted successfully', { status: 200 })
//     } catch (error) {
//       console.error('Error deleting user:', error)
//       return new Response('Error deleting user', { status: 500 })
//     }
//   }

//   // Log unhandled event types
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//   console.log('Webhook payload:', body)
  
//   return new Response('Webhook received', { status: 200 })
// }

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  if(eventType === 'user.created'){
    alert("hello")
  }
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)


  return new Response('Webhook received', { status: 200 })
}