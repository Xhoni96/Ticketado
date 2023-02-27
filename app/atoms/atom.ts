import type { SerializeFrom } from "@remix-run/server-runtime";
import type { Event, Venue } from "../types";
import { atom } from "jotai";

export const baseAtom = atom(false);

export const addEventAtom = atom(false);

export const promoteEventAtom = atom(false);

export const attendeesAtom = atom(false);

export const ticketSalesAtom = atom(false);
export const ticketTypeAtom = atom(false);

export const deleteEventAtom = atom(false);

export const editVenueAtom = atom(false);

export const selectedVenueAtom = atom<Venue | null>(null);

export const selectedEventAtom = atom<null | SerializeFrom<Event>>(null);
