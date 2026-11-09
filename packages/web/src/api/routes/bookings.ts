import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { eq } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import { appointmentRequests } from "../database/schema";

const inputSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(25).regex(/^\+?[\d\s()-]+$/, "Enter a valid phone number"),
  service: z.enum(["Hair & styling", "Nails & pedicure", "Lashes & beauty", "Massage & relaxation", "Bridal / group enquiry", "Help me choose"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.enum(["Morning", "Afternoon", "Evening", "Flexible"]),
  notes: z.string().trim().max(500),
  consent: z.literal(true),
  website: z.string().max(0),
});
const requests = new Map<string, { count: number; start: number }>();

export const bookings = {
  create: base.input(inputSchema).handler(async ({ input, context }) => {
    const now = new Date();
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Freetown", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
    const chosen = new Date(input.date + "T12:00:00Z");
    if (Number.isNaN(chosen.getTime()) || chosen.toISOString().slice(0,10) !== input.date || input.date < today || chosen.getTime() > now.getTime() + 180 * 86400000) {
      throw new ORPCError("BAD_REQUEST", { message: "Choose a valid date within the next six months." });
    }
    const key = context.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const bucket = requests.get(key);
    if (bucket && now.getTime() - bucket.start < 60000 && bucket.count >= 5) throw new ORPCError("TOO_MANY_REQUESTS", { message: "Please wait a minute before submitting again." });
    if (!bucket || now.getTime() - bucket.start >= 60000) requests.set(key, { count: 1, start: now.getTime() });
    else bucket.count++;
    if (requests.size > 10000) for (const [k,v] of requests) if (now.getTime()-v.start > 60000) requests.delete(k);
    const existing = await db.select({ id: appointmentRequests.id }).from(appointmentRequests).where(eq(appointmentRequests.id, input.id));
    if (!existing.length) {
      const { consent: _consent, website: _website, ...data } = input;
      await db.insert(appointmentRequests).values(data).onConflictDoNothing();
    }
    return { reference: input.id.slice(0,8).toUpperCase(), status: "pending" as const };
  }),
};