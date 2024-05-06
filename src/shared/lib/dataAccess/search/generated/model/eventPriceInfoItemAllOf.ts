/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Search API
 * With UiTdatabank's Search API you can search events, places and organizers.
 * OpenAPI spec version: 3.0
 */
import type { EventPriceInfoItemAllOfCategory } from './eventPriceInfoItemAllOfCategory';
import type { CommonName } from './commonName';
import type { EventPriceInfoItemAllOfPriceCurrency } from './eventPriceInfoItemAllOfPriceCurrency';

export type EventPriceInfoItemAllOf = {
  /** Indicates whether this is the base price or a custom tariff.
`base` for the base price, and `tariff` for custom/extra tariffs.  Tariffs with category `uitpas` are automatically added by UiTdatabank and read-only. They will be updated whenever other tariffs change. */
  category: EventPriceInfoItemAllOfCategory;
  /** Name of a tariff inside priceInfo. Required if category is set to `tariff`. For the `base` category UiTdatabank will set a default. Requires at least one value, for the language specified in the `mainLanguage` property. Names must be unique (per language) when using multiple tarrifs. */
  name?: CommonName;
  /** The price of a ticket in this category. */
  price: number;
  /** The currency of the price. Currently only `EUR` is supported. */
  priceCurrency?: EventPriceInfoItemAllOfPriceCurrency;
};