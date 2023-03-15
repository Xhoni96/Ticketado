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

export const selectedVenueAtom = atom<Venue | null | undefined>(null);

export const selectedEventAtom = atom<Event | undefined>(undefined);

export const vmtWidgetAtom = atom<VmtWidget | undefined>(undefined);

type VmtWidget = {
  apiUrl: string;
  frontPoint: string;
  localization: string;
  eventId: string;
  memberId: string;
  mode: string;
  venueId?: string;
  token: string;
  appViewOnly?: boolean;
};
