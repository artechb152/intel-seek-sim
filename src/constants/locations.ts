/**
 * Location filter options
 */
export const locationOptions = [
  { label: 'הכל', value: '' },
  { label: 'צפון', value: 'צפון' },
  { label: 'מרכז', value: 'מרכז' },
  { label: 'דרום', value: 'דרום' },
] as const;

/**
 * Region to cities mapping
 */
export const regionCities: Record<string, string[]> = {
  'צפון': ['צפת', 'חיפה', 'נהריה', 'טבריה'],
  'מרכז': ['תל אביב', 'ירושלים', 'רמת גן', 'לוד', 'בני ברק', 'ראשון לציון', 'בת ים', 'נתניה'],
  'דרום': ['אשדוד', 'באר שבע', 'אשקלון', 'עין בוקק', 'ערד', 'מצפה רמון', 'אילת'],
};

/**
 * Keyword suggestions for filter
 */
export const keywordSuggestions = ['כומתה', 'וסט', 'מדים'] as const;

/**
 * Date range constraints for the simulation
 */
export const dateRange = {
  min: '2023-04-01',
  max: '2023-10-01',
} as const;
