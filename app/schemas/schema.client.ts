import { z } from "zod";

export const venueNameSchema = z.string().min(2, { message: "Name field must contain at least 2 characters" });
