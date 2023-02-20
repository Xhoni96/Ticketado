import type { SerializeFrom } from "@remix-run/server-runtime";
import type { Event } from "../types";
import { atom } from "jotai";

export const baseAtom = atom(false);

export const addEventAtom = atom(false);

export const promoteEventAtom = atom(false);

export const attendeesAtom = atom(false);

export const ticketSalesAtom = atom(false);
export const ticketTypeAtom = atom(false);

export const deleteEventAtom = atom(false);

export const selectedEventAtom = atom<null | SerializeFrom<Event>>(null);
