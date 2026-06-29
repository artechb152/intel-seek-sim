export const missions = [
  'מבנה הבסיס',
  'רמת הכוננות',
  'כמות החיילים',
  'התנהלות השמירות',
  'נוכחות בכירים בבסיס',
] as const;

export type Mission = (typeof missions)[number];

/** Bucket used when a post is saved without a mission selected. */
export const GENERAL_MISSION = 'כללי' as const;

/** A saved post is tagged either with a mission or the general bucket. */
export type SaveBucket = Mission | typeof GENERAL_MISSION;
