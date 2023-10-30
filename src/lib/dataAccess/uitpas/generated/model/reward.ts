/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import type { RewardType } from './rewardType';
import type { Period } from './period';
import type { RewardCategoriesItem } from './rewardCategoriesItem';
import type { CardSystem } from './cardSystem';
import type { Organizer } from './organizer';
import type { RewardStatus } from './rewardStatus';
import type { RewardRedeemConstraint } from './rewardRedeemConstraint';

/**
 * Reward model
 */
export interface Reward {
  /** ID of the reward */
  readonly id?: string;
  /** Title of the reward */
  title: string;
  /** Type of the reward */
  type: RewardType;
  /** Promotion description */
  promotionalDescription: string;
  publicationPeriod: Period;
  /** Number of points needed to redeem the reward. Required for reward of type POINTS. */
  points?: number;
  /** List of categories of this reward. Required for reward of type POINTS. */
  categories?: RewardCategoriesItem[];
  /** URL where a user can find more info about this reward. Required for reward of type POINTS. */
  moreInfoURL?: string;
  grantingPeriod?: Period;
  owningCardSystem?: CardSystem;
  /** List of CardSystems whose members can redeem this reward.  */
  applicableCardSystems?: CardSystem[];
  /** If set to true, `applicableCardSystems` will always contain all UiTPAS CardSystems. */
  allCardSystems?: boolean;
  /** List of Organizers where this reward can be redeemed. */
  organizers?: Organizer[];
  /** Status of this reward. */
  readonly status?: RewardStatus;
  /** Maximum (total) available units of this reward. */
  maxAvailableUnits?: number;
  /** Number of rewards already redeemed. */
  readonly unitsTaken?: number;
  /** Practical info for passholders who want to redeem this reward. */
  practicalInfo?: string;
  /** List of URLs to zero or more images of this reward. */
  pictures?: string[];
  redeemPeriod?: Period;
  /** true if this reward is specifically targetted to children. */
  forKids?: boolean;
  /** true if this is a sport reward */
  sport?: boolean;
  /** true if this reward is currently set as 'featured' */
  featured?: boolean;
  /** true if this reward can be redeemed online */
  online?: boolean;
  /** true if this rewards will not be redeemable anymore in the near future */
  readonly lastChance?: boolean;
  /** Defines how many times this reward can be redeemed by the same passholder in a specific period. */
  redeemConstraint?: RewardRedeemConstraint;
}