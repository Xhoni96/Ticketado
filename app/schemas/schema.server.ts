import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const venueSchema = z
  .object({
    // id: z.string(),
    name: z
      .string({ invalid_type_error: "Name must be a string", required_error: "Name is required" })
      .min(2, { message: "Name field must contain at least 2 characters" }),
    city: z.nullable(z.string({ invalid_type_error: "City must be a string" })),
    country: z.nullable(z.string({ invalid_type_error: "Country must be a string" })),
    // createdAt: z.string({ invalid_type_error: "CreatedAt must be a string " }),
    number: z.nullable(z.string({ invalid_type_error: "Number must be a string" })),
    region: z.nullable(z.string({ invalid_type_error: "Region must be a string" })),
    street: z.nullable(z.string({ invalid_type_error: "Street must be a string" })),
    zip: z.nullable(z.string({ invalid_type_error: "Zip must be a string" })),

    //   address: z.nullable(z.string({ invalid_type_error: "address must be a string" }))
  })
  .partial()
  .required({
    name: true,
    // id: true,
  });

export const createEventSchema = z
  .object({
    // id: z.string(),
    name: z
      .string({ invalid_type_error: "Name must be a string", required_error: "Name is required" })
      .min(4, { message: "Name field must contain at least 4 characters" }),
    startDate: z
      .string({
        required_error: "Start Time is required",
      })
      .min(1, { message: "Start Time is required" }),
    description: z.string(/* { invalid_type_error: "Description must be a string" } */),
    endDate: z.string(),
    // onSale: (z.boolean(),
    // thumbnail: (z.string(),
    draft: z.boolean(),
    // published: z.boolean(),
    // registration: z.boolean(),
    // inventory: z.number(),
    venue: z.nullable(venueSchema),
  })
  .partial()
  .required({ name: true, startDate: true, venue: true });

// export type Venue = z.infer<typeof venueSchema> & { id: string };

export const BestAvailableSchema = z.object({
  quantity: z.string().min(1, { message: "Please provide a quantity" }),
  id: z.string().startsWith("vendor", { message: "Please select a Ticket Type" }),
});
