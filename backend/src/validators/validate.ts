import z from "zod"

export class Authvalidators{

  static registerUser = z.object({
    params: z.object({}).strict(),
    body: z.object({
      name: z.string(),  // Ensures name is a non-empty string
      age: z.string().optional(),   // Age can be an optional string
      gender: z.string().optional(), // Gender can be an optional string
      countryCode: z.string().optional(), // Country code can be an optional string
      phoneNumber: z.string().min(10).max(10), // Phone number must be 10 digits
      email: z.string().email(),   // Validates email format
      password: z.string().min(6)  // Password must be at least 6 characters long
    }).strict(),
    query: z.object({}).strict()
  });


  static loginUser=z.object({
    params:z.object({}).strict(),
    body:z.object({
      email:z.string(),
      password:z.string()
    }).strict(),
    query:z.object({}).strict()
  })

  


}