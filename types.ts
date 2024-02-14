import { z } from "zod";

// transform timestamp strings (e.g. "1648488801821") into numbers, and leave timestamp numbers as is
export const timestampSchema = z.union([
  z
    .string()
    .regex(/^\d+$/)
    .transform((value) => parseInt(value)),
  z.number().int().positive(),
]);

export const timeEntrySchema = z.object({
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
  applicationName: z.string().optional(),
  startTime: z.number().optional(),
});

export const productivityDataSchema = z.object({
  authSub: z.string(),
  startTime: timestampSchema,
  endTime: timestampSchema,
  name: z.string(),
  timeEntries: z.array(timeEntrySchema),
});

export type ProductivityData = z.infer<typeof productivityDataSchema>;

export const applicationNameSchema = z
  .string()
  // .regex(/^(?!\s)[\w\s-]*$/, {
  //   message:
  //     "This input field does not allow special characters or leading/trailing whitespace",
  // })
  .nonempty({ message: "Application name can't be empty" })
  .max(64, { message: "Application can't be longer than 64 characters" });

export const habitSchema = z
  .object({
    _id: z.number(),
    name: z
      .string()
      .regex(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, {
        message:
          "This input field does not allow special characters or leading/trailing whitespace",
      })
      .nonempty({ message: "Habit name can't be empty" })
      .max(20, { message: "Habit name can't be longer than 20 characters" }),
    applications: z.array(applicationNameSchema),
  })
  .strict();

export type Habit = z.infer<typeof habitSchema>;

export const notificationsSchema = z.object({
  type: z.string(),
  message: z.string(),
  timestamp: timestampSchema,
});

export const competitionsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  startTime: timestampSchema,
  endTime: timestampSchema,
  isActive: z.boolean(),
  users: z.array(z.string()),
  scores: z.array(z.number()),
});

// TODO: add back the commented fields once they are added to the database (and uncomment lines in server.ts as well)
export const userSchema = z
  .object({
    authSub: z.string(),
    bio: z.string(),
    createdAt: z.string(),
    customerId: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    habit: z.any(),
    // habits: z.array(habitSchema),
    image: z.string().url(),
    isdeactive: z.number(),
    lastName: z.string(),
    notification_count: z.any(),
    productivity: z.any(),
    settings: z.any(),
    subscriptionId: z.number(),
    updatedAt: z.string(),
    username: z.string(),
    habits: z.any(),
    timezone: z.any(),
    competecount: z.any(),
    // friends: z.array(z.string()),
    // recentData: z.array(productivityDataSchema),
    // notifications: z.array(notificationsSchema),
    // competitions: z.array(competitionsSchema),
    // timestamp: timestampSchema,
    _id: z.number(),
  })
  .strict();

export type User = z.infer<typeof userSchema>;

export type Notification = z.infer<typeof notificationsSchema>;

// TODO: add back the uncommented fields once they are added to the database (and uncomment lines in server.ts as well)
export const competitionSchema = z.object({
  user1: z.string(),
  user2: z.string(),
  user1Score: z.number().int().positive(),
  user2Score: z.number().int().positive(),
  dateStarted: z.string().refine(isISO, { message: "Not a valid ISO date " }),
  dateEnded: z.string().refine(isISO, { message: "Not a valid ISO date " }),
});

export function isISO(str: string) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d.toISOString() === str;
}

export type Competition = z.infer<typeof competitionSchema>;
