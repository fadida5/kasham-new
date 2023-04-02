const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const kshirotSchema = new mongoose.Schema({
	// _id: { type: ObjectId },
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
});

const kshirot = mongoose.model("Kshirot", kshirotSchema);

module.exports = kshirot;
