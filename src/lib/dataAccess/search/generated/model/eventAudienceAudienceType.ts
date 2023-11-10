/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */

/**
 * Indicates whether the event or place is accessible to `everyone`, `members` only, or `education` only.
 */
export type EventAudienceAudienceType = typeof EventAudienceAudienceType[keyof typeof EventAudienceAudienceType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EventAudienceAudienceType = {
  everyone: 'everyone',
  members: 'members',
  education: 'education',
} as const;
