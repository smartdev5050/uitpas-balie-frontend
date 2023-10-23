/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { CommonDescriptionLocalized } from './commonDescriptionLocalized';

/**
 * A human-readable, internationalized description of the [place](./models/place.json).

Requires at least one value, for the language specified in the [mainLanguage](./models/place-mainLanguage.json) property.
 */
export interface PlaceDescription {
  /** A human-readable description in the `nl` (Dutch) language. */
  nl?: CommonDescriptionLocalized;
  /** A human-readable description in the `fr` (French) language. */
  fr?: CommonDescriptionLocalized;
  /** A human-readable description in the `de` (German) language. */
  de?: CommonDescriptionLocalized;
  /** A human-readable description in the `en` (English) language. */
  en?: CommonDescriptionLocalized;
}
