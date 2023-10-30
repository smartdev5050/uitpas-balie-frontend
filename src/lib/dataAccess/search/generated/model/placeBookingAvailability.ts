/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { PlaceBookingAvailabilityType } from './placeBookingAvailabilityType';

/**
 * Indicates whether the place still has tickets or reservations available. Currently only contains a `type` which can only be `Available` for places (as opposed to events that can also have `Unavailable` when sold out), as a place can never be completely sold out forever. Can later be expanded with more detailed info.
 */
export interface PlaceBookingAvailability {
  /** One of two possible types.

- `Available`:Tickets or reservations available
- `Unavailable`: No more tickets or reservations available. */
  type: PlaceBookingAvailabilityType;
}