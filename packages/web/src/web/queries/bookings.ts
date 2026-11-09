import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useBookingRequest() {
  return useMutation(orpc.bookings.create.mutationOptions());
}