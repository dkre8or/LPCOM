/**
 * Approved Visual Assets Registry — The Launchpad Community
 *
 * IMPORTANT: No stock photography or generated replacement photos are used.
 * Once approved photography is supplied, assign each image path (e.g. '/assets/hero.jpg')
 * and descriptive alt text here; each section renders its approved photograph automatically
 * with proper aspect ratios and measured scrims.
 */

export interface MediaAsset {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface LaunchpadMediaRegistry {
  hero: MediaAsset | null;
  aboutPrimary: MediaAsset | null;
  aboutSecondary: MediaAsset | null;
  accountabilityPodcast: MediaAsset | null;
  launchpadSummit: MediaAsset | null;
  lagosMeetup: MediaAsset | null;
}

export const LAUNCHPAD_MEDIA: LaunchpadMediaRegistry = {
  hero: null,
  aboutPrimary: null,
  aboutSecondary: null,
  accountabilityPodcast: null,
  launchpadSummit: null,
  lagosMeetup: null,
};
