const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const kshirotSchema = new mongoose.Schema({
	// _id: { type: ObjectId },
	grade: { type: Number, required: true },
	// פרטי מפקד
	commandername: { type: String }, //שם מפקד
	timeinrole: { type: String }, // זמן בתפקיד
	// פרטי ממלא
	unit: { type: String }, // יחידה
	name: { type: String }, // שם
	phone: { type: String }, // מספר פלאםון
	//בעלי תפקיד
	experts: { type: Number },
	expertsmax: { type: Number },
	officers: { type: Number }, // בעלי מקצוע
	officersmax: { type: Number },
	officersActivemax: { type: Number },
	professionalSadir: { type: Number },
	professionalKeva: { type: Number },
	professionalReserved: { type: Number },
	professionals: { type: Number },
	kzinim: { type: Number }, //  קצינים
	kzinimmax: { type: Number },
	kzinimActivemax: { type: Number },

	//אמצעי אחזקה
	teken: { type: Number }, //תקן מול מצבה
	tekenmax: { type: Number },
	toolsbox: { type: Number }, // ארגז כלים
	toolsboxmax: { type: Number },
	lift: { type: String },
	match: { type: String }, // התאמת כע לסוג הצלם
	// חלפים
	load: { type: String }, // יכולת העמסה
	stash: { type: String }, // הילום מלאי
	hatak: { type: Number }, // חטכ
	hatakmax: { type: Number }, // חטכ
	bakash: { type: Number }, // בקש
	bakashmax: { type: Number },
	bakashniod: { type: String },
	lastrefreshdate: { type: String }, // תאריך רענון אחרון
	matchmahin: { type: String }, // התאמת חלפים לצלם רישום מכין
	matchswap: { type: String }, // התאמת ערכות חלפים לצלמ
	catalogs: { type: String }, // קטלוגים
	// אמצעי ניוד
	maflag: { type: Number },
	maflagMax: { type: Number },
	carhatap: { type: Number }, // נגמש חטפ
	carhatapmax: { type: Number },
	carpiter: { type: Number }, // נגמש פיטר
	carpitermax: { type: Number },
	classhatak: { type: Number },
	classhatakMax: { type: Number },
	classBakash_Namer: { type: Number },
	classBakash_NamerMax: { type: Number },
	katkal: { type: Number },
	katkalMax: { type: Number },
	classHathatHeavy: { type: Number },
	classHathatHeavyMax: { type: Number },
	classHathatlight: { type: Number },
	classHathatlightMax: { type: Number },
	rioarrow: { type: Number }, // ריאו חץ/עגור2{type:Number}
	rioarrowmax: { type: Number },
	classNahot: { type: Number },
	classNahotMax: { type: Number },
	personalprotection: { type: String }, // מיגון אישי
	// שבצק
	shiboz: { type: Number }, //התאמץ שיבוץ לקרבי
	shibozmax: { type: Number },
	drivers: { type: Number }, // נהגים לכל פלטפורמת ניוד
	driversmax: { type: Number },
	//פקודות מבצע
	pkodotopara: { type: String }, // פקודות אופרטיביות
	superiorApp_pkp: { type: String },
	mefakedAPP_pkp: { type: String },
	pkodotoAndExtra: { type: String }, // נספחי אחזקה לפקודות אופרטיביות
	superiorApp_pkpAE: { type: String },
	mefakedAPP_pkpAE: { type: String },
	pkodotoComp: { type: String }, //  פקלי אחזקה משילימים
	superiorApp_pkpCp: { type: String },
	mefakedAPP_pkpCp: { type: String },

	//פקלים
	// tiom: {type:String}, // תיאום רמה ממונה
	// commanderconf: {type:String}, // אישור מפקד
	// pkodotmashlimot: {type:String}, // פקודות משלימות
	//מערכות שוב ממוחשבות
	tkinot: { type: Number }, // מצאי עמדות שוב תקינות
	tkinotmax: { type: Number },
	tikim: { type: String }, // הזנת תיק נתוני יחידות פקודות ומפות במשואה
	roleholders: { type: Number }, // בעלי תפקידים מוכשרים
	roleholdersmax: { type: Number },
	//דיווח ושליטה
	boxcontent: { type: String }, // תכולת ארגז עפ טנה 1
	//אימונים והכשרות
	trainingamount: { type: String }, // אימון פלגת טנא- כמות
	trainingquality: { type: String }, // אימון פלגת טנא- איכות
	trainSycle: { type: String },
	// תרגילים
	battaliondrillamount: { type: String }, // תרגיל גדוד כמות
	battaliondrillquality: { type: String }, // תרגיל גדוד איכות
	// הכשרות
	kors: { type: Number }, // כמות מחטפים שעברו קורס מחטפים
	korsmax: { type: Number },
	nokavim: { type: Number }, // מועכבי שלב יחידה
	nokavimmax: { type: Number },
	tester: { type: Number }, // תעודות בוחן
	testermax: { type: Number },
	amountmhalaf: { type: Number }, // גמות מוסמכי מחלף
	amountmhalafmax: { type: Number },
	amounthanafa: { type: Number }, // כמות מוסמכי הנפה
	amounthanafamax: { type: Number },
	details: { type: Object },
	// רוח יחידה
	mentality: { type: String }, // חוסן מנטלאי
	// tene
	sumClass: { type: Number },
	sumClassKashir: { type: Number },
	sumClassNotKashir: { type: Number },
	specialkey: { type: Object },
	specialkeytwo: { type: Object },
	IsRelevant: { type: Object }, //רלוונטי?

	//  כללי
	TRdetails: { type: String }, //פרטים כללים
	TRgoals: { type: String }, // מטרות אימון
	TRtraining: { type: Object }, //פרטי הסגל המתאמן

	// מדדי סף לאימון
	TRmaflag: { type: String }, // התייצבות מפלג קטא
	TRkata: { type: String }, // התייצבות קטא
	TRkitathalafim: { type: String }, // התייצבות  מפקד כיתת חלפים
	TRkitatnaot: { type: String }, // התייצבות מפקד כיתת נאות
	TRkitacala: { type: String }, // התייצבות  מפקד כיתה קלה
	//יציאת כלי טנ"א לתרגיל
	TRa: { type: String }, // 19 א
	TRb: { type: String }, // 19 ב
	TRd: { type: String }, //19 ד

	//ביצוע נוהק סדור הכולל
	TRnispach: { type: String }, // כיתבת נספח טנ"א
	TRnohak: { type: String }, // הכנת תלקון נוהק
	TRnihok: { type: String }, // הכנת תלקון ניהוק
	TRazarim: { type: String }, // הכנת עזרים
	//נוהק עג משואה
	TRpkodotmasoa: { type: String }, //הזנת פקודות טנ"א במשואה
	TRsadak: { type: String }, // הזנת סדכ כלים וכשירות

	// ביצוע תדריך לקרב
	TRtadrich: { type: String }, // ביצוע תדריך מפלג
	//נוהל קרב
	//ביצוע הערכת מצב
	TRpkodotahzaka: { type: String }, // קבלת פקודות טנ"א
	TRbkiot: { type: Number }, // רמת בקיאות בגזרת הליחמה
	TRbkiotsadac: { type: Number }, // רמת בקיאות בסדכ

	// תהליך ביצוע נוהל קרב
	TRramatnispach: { type: Number }, //רמת כתיבת נספח טנ"א
	TRtiom: { type: String }, // תיאום תוכנית הטנ"א
	TRazarimquality: { type: Number }, //איכות הכנת עזרים
	TRaishor: { type: String }, // אישור תוכניות
	//תכנון מענה אחזקתי
	TRzlm: { type: Number }, // רמת השליטה בנתוני צלם
	TRshika: { type: Number }, // ביצוע חישובי שחיקה
	TRbkiotmikom: { type: Number }, // הבקיאות במיקום כוחות שכנים
	TRbkiotbgdod: { type: Number }, // הבקיאות ביעולות מערך הטנ"א בגדוד
	//ציד בנוהק
	TRshimosbashob: { type: String }, //שימוש במעקכת השוב
	TRbkiotbashob: { type: Number }, // רמת בקיאות ושליטה במערכת שוב
	//ניהול קרב
	// מענה אחזקתי לרציפות הלחימה
	TRramatshlita: { type: Number }, // רמת השליטה בכוחות קטנים
	TRrazifot: { type: Number }, // רציפות במענה אחזקתי
	TRramattiom: { type: Number }, // שליטה ותיאום בכוחות אגם והאזחקה

	//בניית תמצ וביצוע הערכת מצב מתמשכת
	TRshlitabmazav: { type: Number }, // שליטה בתמונת מצב
	TRmidathatama: { type: Number }, // מידת התאמת מאמץ הטנ"א לתמונת מצב
	TRnihol: { type: Number }, // ניהול עזרים
	TRmidatkabala: { type: Number }, // מידת קבלה ומסירה של דוחות עיתיים
	TRhafakat: { type: Number }, // הפקת משמעויות מהערכת מצב מתמשכת
	// יחסי גומלין
	TRehot: { type: Number }, // איכות יחסי הגומלין בתוך מערכי הטנ"א
	TRehotplogot: { type: Number }, // איכות יחסי הגומלין עם הפלוגות
	TRehotmfkada: { type: Number }, // איכות יחסי הגומלין עם מפקדת הגדוד
	// ציד בניהוק
	TRshimosbashob2: { type: String }, // שימוש במערכת השוב
	TRbkiotbashob2: { type: Number }, // שימוש במערכת השוב במכלול
	//סיכום
	// למידה והפקת לקחים
	TRlamida: { type: Number }, // רמת בניית עקומת למידה
	TRsicombainaim: { type: Number }, // ביצוע סיכומי ביניים
	TRrama: { type: Number }, // מבחני רמה למפקדים
	TRsicomimon: { type: String }, // סיכום האימון בסיום האימון
	TRimonhiloz: { type: Number }, // אימון משטח חילוץ
	// לקחים עפ מרכבי בניין הכוח
	TRlkhaimtene: { type: String }, // לקחים טנה
	TRlkhaimamlah: { type: String }, // לקחים לאמצעי אמלח
	TRlkhaimadam: { type: String }, // לקחים לכוח אדם
	TRlkhaimlimon: { type: String }, // לקחים לאימונים והכשרות
	TRlkhaimlirgon: { type: String }, // לקחים לארגון ותקינה
	// נקודות לשיפור שימור
	TRshipor: { type: String }, // הקודות לשיפור
	TRshimor: { type: String }, // הקודות לשימור
	// סיכום
	TRsicomhonach: { type: String }, // סיכום חונך הטנ"א
	TRsicomhmitaman: { type: String }, // סיכום המתאמן
	TRnamehonach: { type: String }, // שם החונך
	TRtafkidhonach: { type: String }, // תפקיד החונך
	TRmasherhonach: { type: String }, // מאשר החונך
	gdod: { type: String }, // מזהה גדוד
});

const kshirot = mongoose.model("Kshirot", kshirotSchema);

module.exports = kshirot;
