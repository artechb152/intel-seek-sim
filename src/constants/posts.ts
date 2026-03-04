import type { Post, Platform } from '@/types';
import { getAvatarImage } from './images';

import post01 from '../assets/Test/post01.png';
import post02 from '../assets/Test/post02.png';
import post03 from '../assets/Test/post03.png';
import post04 from '../assets/Test/post04.png';
import post05 from '../assets/Test/post05.png';
import post06 from '../assets/Test/post06.png';
import post07 from '../assets/Test/post07.png';
import post08 from '../assets/Test/post08.png';
import post09 from '../assets/Test/post09.png';
import post10 from '../assets/Test/post10.png';
import post11 from '../assets/Test/post11.png';
import post12 from '../assets/Test/post12.png';
import post13 from '../assets/Test/post13.png';
import post14 from '../assets/Test/post14.png';
import post15 from '../assets/Test/post15.png';
import post16 from '../assets/Test/post16.png';
import post17 from '../assets/Test/post17.png';
import post18 from '../assets/Test/post18.png';
import post19 from '../assets/Test/post19.png';
import post20 from '../assets/Test/post20.png';
import post21 from '../assets/Test/post21.png';
import post22 from '../assets/Test/post22.png';
import post23 from '../assets/Test/post23.png';
import post24 from '../assets/Test/post24.png';
import post25 from '../assets/Test/post25.png';
import post26 from '../assets/Test/post26.png';
import post27 from '../assets/Test/post27.png';
import post28 from '../assets/Test/post28.png';
import post29 from '../assets/Test/post29.png';
import post30 from '../assets/Test/post30.png';
import post31 from '../assets/Test/post31.png';
import post32 from '../assets/Test/post32.png';
import post33 from '../assets/Test/post33.png';
import post34 from '../assets/Test/post34.png';
import post35 from '../assets/Test/post35.png';
import post36 from '../assets/Test/post36.png';
import post37 from '../assets/Test/post37.png';
import post38 from '../assets/Test/post38.png';
import post39 from '../assets/Test/post39.png';
import post40 from '../assets/Test/post40.png';
import post41 from '../assets/Test/post41.png';
import post42 from '../assets/Test/post42.png';
import post43 from '../assets/Test/post43.png';
import post44 from '../assets/Test/post44.png';
import post45 from '../assets/Test/post45.png';
import post46 from '../assets/Test/post46.png';
import post47 from '../assets/Test/post47.png';
import post48 from '../assets/Test/post48.png';
import post49 from '../assets/Test/post49.png';
import post50 from '../assets/Test/post50.png';
import post51 from '../assets/Test/post51.png';
import post52 from '../assets/Test/post52.png';
import post53 from '../assets/Test/post53.png';
import post54 from '../assets/Test/post54.png';
import post55 from '../assets/Test/post55.png';
import post56 from '../assets/Test/post56.png';
import post57 from '../assets/Test/post57.png';
import post58 from '../assets/Test/post58.png';
import post59 from '../assets/Test/post59.png';
import post60 from '../assets/Test/post60.png';
import post61 from '../assets/Test/post61.png';
import post62 from '../assets/Test/post62.png';
import post63 from '../assets/Test/post63.png';
import post64 from '../assets/Test/post64.png';
import post65 from '../assets/Test/post65.png';
import post66 from '../assets/Test/post66.png';
import post67 from '../assets/Test/post67.png';
import post68 from '../assets/Test/post68.png';
import post69 from '../assets/Test/post69.png';
import post70 from '../assets/Test/post70.png';
import post71 from '../assets/Test/post71.png';

import postA72 from '../assets/Test/postA72.png';
import postA73 from '../assets/Test/postA73.png';
import postA74 from '../assets/Test/postA74.png';
import postA75 from '../assets/Test/postA75.png';
import postA76 from '../assets/Test/postA76.png';
import postA77 from '../assets/Test/postA77.png';
import postA78 from '../assets/Test/postA78.png';

import postB79 from '../assets/Test/postB79.png';
import postB80 from '../assets/Test/postB80.png';
import postB81 from '../assets/Test/postB81.png';
import postB82 from '../assets/Test/postB82.png';
import postB83 from '../assets/Test/postB83.png';
import postB84 from '../assets/Test/postB84.png';
import postB85 from '../assets/Test/postB85.png';
import postB86 from '../assets/Test/postB86.png';
import postB87 from '../assets/Test/postB87.png';
import postB88 from '../assets/Test/postB88.png';
import postB89 from '../assets/Test/postB89.png';
import postB90 from '../assets/Test/postB90.png';
import postB91 from '../assets/Test/postB91.png';
import postB92 from '../assets/Test/postB92.png';
import postB93 from '../assets/Test/postB93.png';
import postB94 from '../assets/Test/postB94.png';
import postB95 from '../assets/Test/postB95.png';

import postC96 from '../assets/Test/postC96.png';
import postC97 from '../assets/Test/postC97.png';
import postC98 from '../assets/Test/postC98.png';
import postC99 from '../assets/Test/postC99.png';
import postC100 from '../assets/Test/postC100.png';

export const mockPosts: Post[] = [
  // --- פוסטים 1 עד 10 ---
  { id: '1', user: 'user_1', content: 'אין מנה חמה בשקם', location: 'אשדוד', timestamp: '13:56', date: '14.2.2012', keywords: ['שקם'], isRelevant: true, platform: 'instagram', image: post01, avatar: getAvatarImage('user_1') },
  { id: '2', user: 'user_2', content: 'נסו לשמור על סדר וניקיון', location: 'באר שבע', timestamp: '19:07', date: '23.4.2016', keywords: ['מקלחת'], isRelevant: true, platform: 'x', image: post02, avatar: getAvatarImage('user_2') },
  { id: '3', user: 'user_3', content: 'עד מתי אוג 23', location: 'תל אביב', timestamp: '12:04', date: '25.8.24', keywords: ['קסדה', 'קיטבג'], isRelevant: true, platform: 'facebook', image: post03, avatar: getAvatarImage('user_3') },
  { id: '4', user: 'user_4', content: 'שמישהו ישפצר לי', location: 'ירושלים', timestamp: '13:33', date: '1.5.2022', keywords: ['כומתה', 'גולני', 'קרבי'], isRelevant: true, platform: 'instagram', image: post04, avatar: getAvatarImage('user_4') },
  { id: '5', user: 'user_5', content: 'יוצאת חמשוש בהפתעה', location: 'רמת גן', timestamp: '15:27', date: '21.1.2025', keywords: ['חמשוש', 'מדים'], isRelevant: true, platform: 'instagram', image: post05, avatar: getAvatarImage('user_5') },
  { id: '6', user: 'user_6', content: 'מוכן לעזה', location: 'אשקלון', timestamp: '9:46', date: '18.10.2023', keywords: ['נשק', 'קסדה', 'עזה', 'קרבי'], isRelevant: true, platform: 'facebook', image: post06, avatar: getAvatarImage('user_6') },
  { id: '7', user: 'user_7', content: 'מי שכח?', location: 'צפת', timestamp: '16:22', date: '30.6.2018', keywords: ['כומתה', 'גולני', 'חיל האוויר'], isRelevant: true, platform: 'x', image: post07, avatar: getAvatarImage('user_7') },
  { id: '8', user: 'user_8', content: 'החלק הכבד ביום', location: '', timestamp: '8:19', date: '16.8.2017', keywords: ['נעלי בנות', 'מדים'], isRelevant: true, platform: 'instagram', image: post08, avatar: getAvatarImage('user_8') },
  { id: '9', user: 'user_9', content: 'חצי בית', location: 'אשקלון', timestamp: '15:17', date: '13.3.2022', keywords: ['קיטבג', 'מדים', 'כומתה'], isRelevant: true, platform: 'facebook', image: post09, avatar: getAvatarImage('user_9') },
  { id: '10', user: 'user_10', content: 'נגענו בקירר', location: 'אשדוד', timestamp: '20:44', date: '20.11.2024', keywords: ['חיילות'], isRelevant: true, platform: 'instagram', image: post10, avatar: getAvatarImage('user_10') },

  // --- פוסטים 11 עד 20 ---
  { id: '11', user: 'user_11', content: 'יש קוסקוס בואו לחדא', location: 'באר שבע', timestamp: '17:40', date: '1.2.2021', keywords: ['חדא'], isRelevant: true, platform: 'instagram', image: post11, avatar: getAvatarImage('user_11') },
  { id: '12', user: 'user_12', content: 'ישלי תחושה שזה קשור אליי', location: 'צפת', timestamp: '10:35', date: '3.12.2017', keywords: ['לוז'], isRelevant: true, platform: 'x', image: post12, avatar: getAvatarImage('user_12') },
  { id: '13', user: 'user_13', content: 'אימצנו חתול', location: 'באר שבע', timestamp: '12:51', date: '4.4.2019', keywords: ['רחבה'], isRelevant: true, platform: 'facebook', image: post13, avatar: getAvatarImage('user_13') },
  { id: '14', user: 'user_14', content: 'מחכים לכם', location: 'ירושלים', timestamp: '19:21', date: '17.9.2023', keywords: ['חדן'], isRelevant: true, platform: 'instagram', image: post14, avatar: getAvatarImage('user_14') },
  { id: '15', user: 'user_15', content: 'מרגישים את הבית', location: 'חיפה', timestamp: '14:03', date: '5.1.2026', keywords: ['שאטל'], isRelevant: true, platform: 'x', image: post15, avatar: getAvatarImage('user_15') },
  { id: '16', user: 'user_16', content: 'שוב פעם מנפיצים אותו', location: 'לוד', timestamp: '12:23', date: '11.7.2026', keywords: ['שג', 'כומתה', 'גבעתי'], isRelevant: true, platform: 'facebook', image: post16, avatar: getAvatarImage('user_16') },
  { id: '17', user: 'user_17', content: 'הרלשית הכי משמעותית בצהל', location: 'רמת גן', timestamp: '13:45', date: '29.9.2010', keywords: ['רלשית', 'לוז', 'מחשב'], isRelevant: true, platform: 'instagram', image: post17, avatar: getAvatarImage('user_17') },
  { id: '18', user: 'user_18', content: 'גאים בקטנים שלנו', location: 'באר שבע', timestamp: '8:30', date: '31.7.2018', keywords: ['רחבה', 'מסדר', 'כומתה'], isRelevant: true, platform: 'instagram', image: post18, avatar: getAvatarImage('user_18') },
  { id: '19', user: 'user_19', content: 'המקום האהוב עליי', location: 'תל אביב', timestamp: '15:00', date: '27.5.2024', keywords: ['שקם'], isRelevant: true, platform: 'facebook', image: post19, avatar: getAvatarImage('user_19') },
  { id: '20', user: 'user_20', content: 'שום קורונה לא תעצור מסדר ניקיון', location: 'רמת גן', timestamp: '19:00', date: '2.12.2020', keywords: ['שירותים'], isRelevant: true, platform: 'x', image: post20, avatar: getAvatarImage('user_20') },

  // --- פוסטים 21 עד 30 ---
  { id: '21', user: 'user_21', content: 'ארוחת מלכים', location: 'אשקלון', timestamp: '11:00', date: '19.9.2019', keywords: ['חדא'], isRelevant: true, platform: 'instagram', image: post21, avatar: getAvatarImage('user_21') },
  { id: '22', user: 'user_22', content: 'קורס מט"ל יוצא חמשוש!!', location: 'חיפה', timestamp: '20:50', date: '9.2.2015', keywords: ['צנחנים', 'כומתה'], isRelevant: true, platform: 'facebook', image: post22, avatar: getAvatarImage('user_22') },
  { id: '23', user: 'user_23', content: 'כשהגלים מתחזקים רועי מתגלה', location: 'אשדוד', timestamp: '11:59', date: '29.12.2018', keywords: ['קיטבג', 'מדים'], isRelevant: true, platform: 'x', image: post23, avatar: getAvatarImage('user_23') },
  { id: '24', user: 'user_24', content: 'עד מתי שמירות', location: 'אשקלון', timestamp: '3:10', date: '11.1.2020', keywords: ['מדים', 'שמירות'], isRelevant: true, platform: 'instagram', image: post24, avatar: getAvatarImage('user_24') },
  { id: '25', user: 'user_25', content: 'מתחפשנים בעיר הבהדים', location: 'באר שבע', timestamp: '21:41', date: '19.12.2016', keywords: ['מדים', 'נשק'], isRelevant: true, platform: 'instagram', image: post25, avatar: getAvatarImage('user_25') },
  { id: '26', user: 'user_26', content: 'סוף קורס רואים תסוף', location: 'באר שבע', timestamp: '15:14', date: '31.10.2025', keywords: ['מדים', 'נשק', 'כומתה'], isRelevant: true, platform: 'facebook', image: post26, avatar: getAvatarImage('user_26') },
  { id: '27', user: 'user_27', content: 'גיבוש אחרון עם הצוות!!', location: 'נהריה', timestamp: '14:59', date: '30.6.2020', keywords: [], isRelevant: true, platform: 'x', image: post27, avatar: getAvatarImage('user_27') },
  { id: '28', user: 'user_28', content: 'באלי הביתה', location: 'בני ברק', timestamp: '19:24', date: '1.11.2023', keywords: ['מדים', 'קסדה'], isRelevant: true, platform: 'instagram', image: post28, avatar: getAvatarImage('user_28') },
  { id: '29', user: 'user_29', content: 'גימלים זה החיים', location: 'תל אביב', timestamp: '20:09', date: '18.1.2026', keywords: ['גימלים'], isRelevant: true, platform: 'facebook', image: post29, avatar: getAvatarImage('user_29') },
  { id: '30', user: 'user_30', content: 'יצאנו לרגילה', location: 'רמת גן', timestamp: '12:14', date: '14.5.2024', keywords: ['רגילה'], isRelevant: true, platform: 'instagram', image: post30, avatar: getAvatarImage('user_30') },

  // --- פוסטים 31 עד 40 ---
  { id: '31', user: 'user_31', content: 'חופשה בצפון', location: 'טבריה', timestamp: '10:45', date: '13.5.2024', keywords: ['נשק'], isRelevant: true, platform: 'instagram', image: post31, avatar: getAvatarImage('user_31') },
  { id: '32', user: 'user_32', content: 'עובדות עד מאוחר', location: 'ירושלים', timestamp: '22:30', date: '10.1.2023', keywords: ['מדים', 'וסט'], isRelevant: true, platform: 'x', image: post32, avatar: getAvatarImage('user_32') },
  { id: '33', user: 'user_33', content: 'נראלי הם ישימו לב שצילמתי אותם', location: 'חיפה', timestamp: '16:00', date: '26.2.2017', keywords: ['מדים', 'שקם'], isRelevant: true, platform: 'facebook', image: post33, avatar: getAvatarImage('user_33') },
  { id: '34', user: 'user_34', content: '4 שעות בשאטל', location: 'בני ברק', timestamp: '10:02', date: '6.11.2023', keywords: ['מדים', 'שאטל'], isRelevant: true, platform: 'instagram', image: post34, avatar: getAvatarImage('user_34') },
  { id: '35', user: 'user_35', content: 'שוב יום אכזבה בחדא', location: 'אשדוד', timestamp: '18:32', date: '8.8.2019', keywords: ['מדים', 'חדא'], isRelevant: true, platform: 'instagram', image: post35, avatar: getAvatarImage('user_35') },
  { id: '36', user: 'user_36', content: 'תגידו לה שהיא צריכה להצר', location: 'באר שבע', timestamp: '13:02', date: '31.8.2021', keywords: ['מדים'], isRelevant: true, platform: 'facebook', image: post36, avatar: getAvatarImage('user_36') },
  { id: '37', user: 'user_37', content: 'מישהו לא עשה מסדר במקלחות', location: 'לוד', timestamp: '19:01', date: '22.2.2020', keywords: ['מדים', 'מקלחות'], isRelevant: true, platform: 'x', image: post37, avatar: getAvatarImage('user_37') },
  { id: '38', user: 'user_38', content: 'סבב מילואים רביעי אבל מי סופר', location: 'צפת', timestamp: '14:24', date: '4.12.2023', keywords: ['מדים', 'מילואים'], isRelevant: true, platform: 'instagram', image: post38, avatar: getAvatarImage('user_38') },
  { id: '39', user: 'user_39', content: 'הדוחות האלה יהרגו אותי', location: 'חיפה', timestamp: '18:09', date: '8.1.2021', keywords: ['דו"חהערכתמצב'], isRelevant: true, platform: 'facebook', image: post39, avatar: getAvatarImage('user_39') },
  { id: '40', user: 'user_40', content: 'שחור יותר מהקפה', location: 'באר שבע', timestamp: '9:00', date: '27.9.2025', keywords: ['חדא', 'מדים'], isRelevant: true, platform: 'instagram', image: post40, avatar: getAvatarImage('user_40') },

  // --- פוסטים 41 עד 50 ---
  { id: '41', user: 'user_41', content: 'תל אביב זה את ואני', location: 'תל אביב', timestamp: '15:36', date: '25.7.2019', keywords: ['נשק', 'מדים'], isRelevant: true, platform: 'instagram', image: post41, avatar: getAvatarImage('user_41') },
  { id: '42', user: 'user_42', content: 'הכל עובר וגם זה יעבור', location: 'אשקלון', timestamp: '12:14', date: '30.9.2022', keywords: ['מדים'], isRelevant: true, platform: 'facebook', image: post42, avatar: getAvatarImage('user_42') },
  { id: '43', user: 'user_43', content: 'בן דוד שלי גנב לי את הכומתה', location: 'רמת גן', timestamp: '17:11', date: '29.3.2023', keywords: ['כומתה'], isRelevant: true, platform: 'x', image: post43, avatar: getAvatarImage('user_43') },
  { id: '44', user: 'user_44', content: 'יום גיבוש בים המלח', location: 'עין בוקק', timestamp: '14:19', date: '7.5.2016', keywords: ['מדים'], isRelevant: true, platform: 'instagram', image: post44, avatar: getAvatarImage('user_44') },
  { id: '45', user: 'user_45', content: 'המחלקה הכי טובה בעולם', location: 'ראשון לציון', timestamp: '15:49', date: '19.10.2018', keywords: ['מדים'], isRelevant: true, platform: 'instagram', image: post45, avatar: getAvatarImage('user_45') },
  { id: '46', user: 'user_46', content: 'אחרי הרבה זמן שלא', location: 'בת ים', timestamp: '18:09', date: '23.7.2022', keywords: ['נשק'], isRelevant: true, platform: 'facebook', image: post46, avatar: getAvatarImage('user_46') },
  { id: '47', user: 'user_47', content: 'הנפצות בעמ', location: 'באר שבע', timestamp: '16:54', date: '3.8.2017', keywords: ['מדים', 'שג', 'כומתה', 'גבעתי'], isRelevant: true, platform: 'x', image: post47, avatar: getAvatarImage('user_47') },
  { id: '48', user: 'user_48', content: 'עשיתי את שלי ב-8200', location: 'רמת גן', timestamp: '14:01', date: '3.1.2026', keywords: ['חוגר'], isRelevant: true, platform: 'instagram', image: post48, avatar: getAvatarImage('user_48') },
  { id: '49', user: 'user_49', content: 'סגרנו שבת', location: 'אשקלון', timestamp: '19:42', date: '24.9.2023', keywords: ['מדים', 'חדרמגורים'], isRelevant: true, platform: 'facebook', image: post49, avatar: getAvatarImage('user_49') },
  { id: '50', user: 'user_50', content: 'מחכים כבר חצי שעה', location: 'אשדוד', timestamp: '9:03', date: '30.11.2026', keywords: ['מדים', 'מרפאה', 'חופל'], isRelevant: true, platform: 'instagram', image: post50, avatar: getAvatarImage('user_50') },

  // --- פוסטים 51 עד 60 ---
  { id: '51', user: 'user_51', content: 'ישר על הבוקר', location: 'נתניה', timestamp: '7:20', date: '6.9.2019', keywords: ['מדים', 'מרפאה', 'חופל'], isRelevant: true, platform: 'instagram', image: post51, avatar: getAvatarImage('user_51') },
  { id: '52', user: 'user_52', content: 'שומרים עליכם', location: 'עזה', timestamp: '13:31', date: '24.4.2017', keywords: ['מדים', 'קסדה', 'וסט', 'נשק'], isRelevant: true, platform: 'x', image: post52, avatar: getAvatarImage('user_52') },
  { id: '53', user: 'user_53', content: 'שבוע שמירות', location: 'צפת', timestamp: '16:09', date: '24.4.2025', keywords: ['מדים', 'נשק', 'שמירות'], isRelevant: true, platform: 'facebook', image: post53, avatar: getAvatarImage('user_53') },
  { id: '54', user: 'user_54', content: 'מניו יורק ועד רפיח', location: 'רפיח', timestamp: '12:00', date: '23.6.2024', keywords: ['מדים', 'נשק', 'וסט'], isRelevant: true, platform: 'instagram', image: post54, avatar: getAvatarImage('user_54') },
  { id: '55', user: 'user_55', content: 'לפחות הנוף יפה', location: 'טבריה', timestamp: '11:45', date: '20.9.2023', keywords: ['מדים'], isRelevant: true, platform: 'instagram', image: post55, avatar: getAvatarImage('user_55') },
  { id: '56', user: 'user_56', content: 'שבת רגועה', location: 'נהריה', timestamp: '14:09', date: '2.11.2023', keywords: ['מדים', 'וסט', 'נשק'], isRelevant: true, platform: 'facebook', image: post56, avatar: getAvatarImage('user_56') },
  { id: '57', user: 'user_57', content: 'סוף סוף נגמר', location: 'אשקלון', timestamp: '15:04', date: '15.10.2022', keywords: ['חוגר'], isRelevant: true, platform: 'x', image: post57, avatar: getAvatarImage('user_57') },
  { id: '58', user: 'user_58', content: 'פה מ8:00', location: 'תל אביב', timestamp: '17:34', date: '8.3.2025', keywords: ['מדים', 'עבודותרסר'], isRelevant: true, platform: 'instagram', image: post58, avatar: getAvatarImage('user_58') },
  { id: '59', user: 'user_59', content: 'אני והצעירה', location: 'רמת גן', timestamp: '14:54', date: '28.12.2021', keywords: ['מדים'], isRelevant: true, platform: 'facebook', image: post59, avatar: getAvatarImage('user_59') },
  { id: '60', user: 'user_60', content: 'מגבגבים ונהנים', location: 'רמת גן', timestamp: '16:15', date: '16.1.2021', keywords: ['מדים'], isRelevant: true, platform: 'instagram', image: post60, avatar: getAvatarImage('user_60') },

  // --- פוסטים 61 עד 70 ---
  { id: '61', user: 'user_61', content: 'עוד קצת ומסיימים טירונות', location: 'ערד', timestamp: '16:00', date: '27.2.2017', keywords: ['מדים', 'סיגריה', 'נחל'], isRelevant: true, platform: 'instagram', image: post61, avatar: getAvatarImage('user_61') },
  { id: '62', user: 'user_62', content: 'עוד אימון לאוסף', location: 'באר שבע', timestamp: '11:10', date: '21.1.2017', keywords: ['מדים', 'סיגריה'], isRelevant: true, platform: 'facebook', image: post62, avatar: getAvatarImage('user_62') },
  { id: '63', user: 'user_63', content: 'עד מתי אימון אינטרוואלים?', location: 'ערד', timestamp: '11:10', date: '20.1.2017', keywords: ['מדס'], isRelevant: true, platform: 'x', image: post63, avatar: getAvatarImage('user_63') },
  { id: '64', user: 'user_64', content: 'מחר ולבייתת!', location: 'ערד', timestamp: '13:10', date: '17.1.2017', keywords: ['מדס', 'מאזין'], isRelevant: true, platform: 'instagram', image: post64, avatar: getAvatarImage('user_64') },
  { id: '65', user: 'user_65', content: 'וואלה פינקו הרספים הפעם', location: 'מצפה רמון', timestamp: '13:10', date: '19.5.2017', keywords: ['בריאות', 'שטח'], isRelevant: true, platform: 'instagram', image: post65, avatar: getAvatarImage('user_65') },
  { id: '66', user: 'user_66', content: 'עוד יום עוד מנת קרב לאוסף', location: 'מצפה רמון', timestamp: '9:16', date: '15.3.2017', keywords: ['מנק', 'שטח'], isRelevant: true, platform: 'facebook', image: post66, avatar: getAvatarImage('user_66') },
  { id: '67', user: 'user_67', content: 'שטח שטח שטחחחחחח', location: 'ערד', timestamp: '13:16', date: '15.3.2017', keywords: ['חיר', 'שטח'], isRelevant: true, platform: 'x', image: post67, avatar: getAvatarImage('user_67') },
  { id: '68', user: 'user_68', content: 'עוד קצת ולבית', location: 'באר שבע', timestamp: '11:16', date: '8.1.2017', keywords: ['חיר', 'שטח'], isRelevant: true, platform: 'instagram', image: post68, avatar: getAvatarImage('user_68') },
  { id: '69', user: 'user_69', content: 'שושקה מתגעגעת לאחיין שלה', location: 'תל אביב', timestamp: '9:45', date: '22.1.2017', keywords: ['מתנה לחיים', 'צנחנים'], isRelevant: true, platform: 'facebook', image: post69, avatar: getAvatarImage('user_69') },
  { id: '70', user: 'user_70', content: 'שושקה רעבה', location: 'תל אביב', timestamp: '12:45', date: '22.1.2017', keywords: ['מנה חמה', 'צנחנים'], isRelevant: true, platform: 'instagram', image: post70, avatar: getAvatarImage('user_70') },

  // --- פוסטים 71 עד 80 ---
  { id: '71', user: 'user_71', content: 'מסע תג ליפים שלי', location: 'אילת', timestamp: '12:45', date: '2.3.2017', keywords: ['סוף'], isRelevant: true, platform: 'instagram', image: post71, avatar: getAvatarImage('user_71') },
  { id: '72', user: 'user_72', content: 'עובדים קשה כבר מהבוקר', location: 'ירושלים', timestamp: '12:40', date: '9.3.2025', keywords: ['מילואים', 'אנטנות', 'לווין', '8200'], isRelevant: true, platform: 'x', image: postA72, avatar: getAvatarImage('user_72') },
  { id: '73', user: 'user_73', content: 'איך מטרילים את נתן', location: 'ירושלים', timestamp: '12:40', date: '6.2.2025', keywords: ['לווין', 'אוסצילוסקופ', '8200'], isRelevant: true, platform: 'facebook', image: postA73, avatar: getAvatarImage('user_73') },
  { id: '74', user: 'user_74', content: 'הכאב בעיניים', location: 'ירושלים', timestamp: '13:03', date: '1.4.2025', keywords: ['אנטנטות', 'כבליRF', '8200'], isRelevant: true, platform: 'instagram', image: postA74, avatar: getAvatarImage('user_74') },
  { id: '75', user: 'user_75', content: 'שבת חמישית שלנו ביחד', location: 'תל אביב', timestamp: '16:20', date: '27.3.2025', keywords: ['מבנה הבסיס', 'צלחות לווין', '8200'], isRelevant: true, platform: 'instagram', image: postA75, avatar: getAvatarImage('user_75') },
  { id: '76', user: 'user_76', content: 'עובדים קשה מהלילה', location: 'באר שבע', timestamp: '15:24', date: '27.6.2023', keywords: ['אוסצילוסקופ', 'ירקון', '8200'], isRelevant: true, platform: 'facebook', image: postA76, avatar: getAvatarImage('user_76') },
  { id: '77', user: 'user_77', content: 'בוקר טוב', location: 'באר שבע', timestamp: '7:21', date: '5.4.2024', keywords: ['ירקון', 'אוסצילוסקופ', '8200'], isRelevant: true, platform: 'x', image: postA77, avatar: getAvatarImage('user_77') },
  { id: '78', user: 'user_78', content: 'עייפים מתמיד', location: 'באר שבע', timestamp: '18:23', date: '9.11.2024', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'instagram', image: postA78, avatar: getAvatarImage('user_78') },
  { id: '79', user: 'user_79', content: 'שירה מצאה חתולה', location: 'ירושלים', timestamp: '15:21', date: '1.12.2023', keywords: ['מבנה הבסיס'], isRelevant: true, platform: 'facebook', image: postB79, avatar: getAvatarImage('user_79') },
  { id: '80', user: 'user_80', content: 'מופיע מול 200 איש', location: 'באר שבע', timestamp: '11:20', date: '7.6.2025', keywords: ['ירקון'], isRelevant: true, platform: 'instagram', image: postB80, avatar: getAvatarImage('user_80') },

  // --- פוסטים 81 עד 90 ---
  { id: '81', user: 'user_81', content: 'התחלנו שמירות, בהצלחה למשתתפים', location: 'באר שבע', timestamp: '6:27', date: '23.2.2025', keywords: ['ירקון', 'מבנה הבסיס'], isRelevant: true, platform: 'instagram', image: postB81, avatar: getAvatarImage('user_81') },
  { id: '82', user: 'user_82', content: 'עובדים קשה מהלילה', location: 'באר שבע', timestamp: '5:40', date: '1.5.2024', keywords: ['מבנה הבסיס', 'ירקון'], isRelevant: true, platform: 'facebook', image: postB82, avatar: getAvatarImage('user_82') },
  { id: '83', user: 'user_83', content: 'חיים ורודים בצה"ל', location: 'באר שבע', timestamp: '12:00', date: '9.9.2025', keywords: ['מבנה הבסיס', 'ירקון', '8200', 'חמל'], isRelevant: true, platform: 'x', image: postB83, avatar: getAvatarImage('user_83') },
  { id: '84', user: 'user_84', content: 'עוד יום', location: 'באר שבע', timestamp: '13:00', date: '8.7.2025', keywords: ['מבנה הבסיס', 'ירקון', '8200', 'חמל'], isRelevant: true, platform: 'instagram', image: postB84, avatar: getAvatarImage('user_84') },
  { id: '85', user: 'user_85', content: 'סוף סוף עברנו חדר!', location: 'באר שבע', timestamp: '9:40', date: '29.11.2025', keywords: ['מבנה הבסיס', 'ירקון', '8200', 'חמ"ל'], isRelevant: true, platform: 'instagram', image: postB85, avatar: getAvatarImage('user_85') },
  { id: '86', user: 'user_86', content: 'פחות מרבע הגיעו', location: 'באר שבע', timestamp: '13:00', date: '9.3.2025', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'facebook', image: postB86, avatar: getAvatarImage('user_86') },
  { id: '87', user: 'user_87', content: 'חוזרים מאילת ישר לעבודה', location: 'באר שבע', timestamp: '12:40', date: '6.2.2025', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'x', image: postB87, avatar: getAvatarImage('user_87') },
  { id: '88', user: 'user_88', content: 'בא להחליף את האח מהשמירה', location: 'באר שבע', timestamp: '10:00', date: '31.1.2024', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'instagram', image: postB88, avatar: getAvatarImage('user_88') },
  { id: '89', user: 'user_89', content: 'עוד מעט בבית', location: 'באר שבע', timestamp: '13:29', date: '15.2.2026', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'facebook', image: postB89, avatar: getAvatarImage('user_89') },
  { id: '90', user: 'user_90', content: 'דברים מעניינים בדרך', location: 'באר שבע', timestamp: '15:20', date: '9.10.2022', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'instagram', image: postB90, avatar: getAvatarImage('user_90') },

  // --- פוסטים 91 עד 100 ---
  { id: '91', user: 'user_91', content: 'בכירים בכירים אבל מטונפים', location: 'באר שבע', timestamp: '15:38', date: '29.8.2024', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'instagram', image: postB91, avatar: getAvatarImage('user_91') },
  { id: '92', user: 'user_92', content: 'שבת שלום לכולם', location: 'באר שבע', timestamp: '14:14', date: '1.9.2025', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'x', image: postB92, avatar: getAvatarImage('user_92') },
  { id: '93', user: 'user_93', content: 'שמירות משמעותיות', location: 'באר שבע', timestamp: '14:53', date: '3.8.2025', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'facebook', image: postB93, avatar: getAvatarImage('user_93') },
  { id: '94', user: 'user_94', content: '180 חיילים צעירים', location: 'באר שבע', timestamp: '15:00', date: '23.7.2025', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'instagram', image: postB94, avatar: getAvatarImage('user_94') },
  { id: '95', user: 'user_95', content: 'שיחת בכירים ממוצעת', location: 'באר שבע', timestamp: '16:45', date: '19.1.2026', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'instagram', image: postB95, avatar: getAvatarImage('user_95') },
  { id: '96', user: 'user_96', content: 'מילואים ב-8200 לא שמעתי עדיין', location: 'תל אביב', timestamp: '15:30', date: '6.10.2023', keywords: ['מילואים', '8200'], isRelevant: true, platform: 'facebook', image: postC96, avatar: getAvatarImage('user_96') },
  { id: '97', user: 'user_97', content: 'עד מתי נוב 19', location: 'תל אביב', timestamp: '19:38', date: '4.5.2025', keywords: ['מילואים', '8200'], isRelevant: true, platform: 'x', image: postC97, avatar: getAvatarImage('user_97') },
  { id: '98', user: 'user_98', content: '300 ימים במילואים מחכה לאילת', location: 'באר שבע', timestamp: '12:40', date: '1.5.2024', keywords: ['ירקון', '8200', 'חמל'], isRelevant: true, platform: 'instagram', image: postC98, avatar: getAvatarImage('user_98') },
  { id: '99', user: 'user_99', content: 'בדרך לירקון אחרי 9 שנים', location: 'באר שבע', timestamp: '7:45', date: '3.11.2023', keywords: ['מילואים', 'ירקון', '8200'], isRelevant: true, platform: 'facebook', image: postC99, avatar: getAvatarImage('user_99') },
  { id: '100', user: 'user_100', content: 'איזה כיף שמעלים כוננות אה', location: 'באר שבע', timestamp: '12:00', date: '12.6.2025', keywords: ['ירקון', '8200'], isRelevant: true, platform: 'instagram', image: postC100, avatar: getAvatarImage('user_100') },
];
