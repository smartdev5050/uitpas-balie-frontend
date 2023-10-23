/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { PlaceTermsItemDomain } from './placeTermsItemDomain';

/**
 * A taxonomy term used to categorize places.

All places require exactly one term of the `eventtype` domain, and can optionally contain other terms.

When reading places, all properties will be available. When creating or updating places only the `id` is required to be included.
 */
export type PlaceTermsItem = {
  /** Unique id of the term. For example `0.14.0.0.0`. */
  id: string;
  /** Human-readable label of the term. Currently only available in Dutch. For example `Concert`. */
  label?: string;
  /** The domain of the term. Can be one of `eventtype` or `facility`. */
  domain?: PlaceTermsItemDomain;
};
