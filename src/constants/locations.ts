/**
 * Location filter options
 */
export const locationOptions = [
  { label: "הכל", value: "" },
  { label: "צפון", value: "צפת" },
  { label: "מרכז", value: "תל אביב" },
  { label: "דרום", value: "באר שבע" },
] as const;

/**
 * Keyword suggestions for filter
 */
export const keywordSuggestions = [
  "כומתה אדומה",
  "יחידה 669",
  "דרגת סרן",
] as const;

/**
 * All available locations in posts
 */
export const allLocations = [
  "תל אביב",
  "חיפה",
  "ירושלים",
  "באר שבע",
  "אילת",
  "נתניה",
  "רמת גן",
  "צפת",
  "אשדוד",
  "פתח תקווה",
  "ראשון לציון",
  "חולון",
  "הרצליה",
  "כפר סבא",
  "רעננה",
  "מודיעין",
] as const;

/**
 * Date range constraints for the simulation
 */
export const dateRange = {
  min: "2023-04-01",
  max: "2023-10-01",
} as const;
