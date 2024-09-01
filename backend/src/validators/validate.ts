import z from "zod"

export class Authvalidators{

  static registerUser = z.object({
    params: z.object({}).strict(),
    body: z.object({
<<<<<<< HEAD
      username: z.string(),// Country code can be an optional string
      role: z.string().min(10).max(10), // Phone number must be 10 digits
=======
      username: z.string(), // Phone number must be 10 digits
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
      email: z.string().email(),   // Validates email format
      password: z.string().min(6)  // Password must be at least 6 characters long
    }).strict(),
    query: z.object({}).strict()
  });


  static loginUser=z.object({
    params:z.object({}).strict(),
    body:z.object({
      email:z.string(),
      password:z.string(),
      role:z.string()
    }).strict(),
    query:z.object({}).strict()
  })

  


}