const EducationLevels = [
    {"EducationLevel" :"আপনার সন্তান কোন মাধ্যমমে তা নির্ধারণ করুন"},
    {"EducationLevel": "প্রাথমিক শিক্ষা"},
    {"EducationLevel": "জুনিয়র সেকেন্ডারি স্কুল"},
    {"EducationLevel": "সেকেন্ডারি স্কুল"},
    {"EducationLevel": "উচ্চমাধ্যমিক স্কুল"}
];

const PrimaryEducation = [
    { "class": "ক্লাস" },
    { "class": "ক্লাস ওয়ান" },
    { "class": "ক্লাস টু" },
    { "class": "ক্লাস থ্রি" },
    { "class": "ক্লাস ফোর" },
    { "class": "ক্লাস ফাইভ" }
];

const JuniorSecondarySchool = [
    { "class": "ক্লাস" },
    { "class": "ক্লাস ছয়" },
    { "class": "ক্লাস সাত" },
    { "class": "ক্লাস আট" }
];

const SecondarySchool = [
    { "class": "ক্লাস" },
    { "class": "ক্লাস নাইন" },
    { "class": "ক্লাস টেন" }
];

const HigherSecondarySchool = [
    { "class": "ক্লাস" },
    { "class": "ক্লাস ইলেভেন" },
    { "class": "ক্লাস টুয়েলভ" }
];

const EducationGroup = [
    { "class": "গ্রুপ" },
    { "class": "বিজ্ঞান" },
    { "class": "বাণিজ্য" },
    { "class": "মানবিক" }
];

const AcceptedEducationClass = [
    { "class": "আপনার যোগ্যতা নির্ধারণ করুন" },
    { "class": "ক্লাস ইলেভেন" },
    { "class": "ক্লাস টুয়েলভ" },
    { "class": "ইঞ্জিনিয়ারিং ডিপ্লোমা" },
    { "class": "ব্যাচেলর" },
    { "class": "স্নাতক (প্রকৌশল ও প্রযুক্তি)" },
    { "class": "মাস্টার্স" },
    { "class": "দর্শনের মাস্টার" },
    { "class": "ডক্টরেট" },
];

const EducationSubject= [
    'General Math', 'ICT', 'English', 'Accounting', 'Computer Science', 'Finance', 'General Science', 'Bangla',  'Religion/ Islamiat', 'Social Science', 'Biology', 'Chemistry', 'Higher Math', 'Sociology','Spoken English','Economics','Statistics','Multiple subjects','Art', 'History', 'Islamic Studies', 'Phsychology', 'Sociology',' Civics', 'Law','Physics','Eassy Writing','English Literature', 
] 

const TeacherCarentStatus = [
    {"CarentStatus":"আপনি এখন কি করেন "},
    {"CarentStatus":"ছাত্র"},
    {"CarentStatus":"শিক্ষক"},
    {"CarentStatus":"চাকরি"},
    {"CarentStatus":"ব্যবসা"},

]

const ReadingDays = [
    {"ReadingDay":"আপনি সপ্তায় কয় দিন পড়াবেন"},
    {"ReadingDay":"১"},
    {"ReadingDay":"২"},
    {"ReadingDay":"৩"},
    {"ReadingDay":"৪"},
    {"ReadingDay":"৫"},
    {"ReadingDay":"৬"},
    {"ReadingDay":"৭"},
]

const EducationMeduam =[
    'Bangla Medium','English Medium','English Version','Extra Curricular Activities'
]

const TeacherPreferredStudentClass = [
    'Standard I',  'Standard II',  'Standard III',  'Standard IV',  'Standard IX',  'Standard V',  'Standard VI', 'Class I' , 'Class II'  ,'Class III',  'Class IV', 'Class IX',  'Class V',  'Class VI'

]

module.exports = {
    EducationLevels,
    PrimaryEducation,
    JuniorSecondarySchool,
    SecondarySchool,
    HigherSecondarySchool,
    EducationGroup,
    AcceptedEducationClass,
    EducationSubject,
    TeacherCarentStatus,
    ReadingDays,
    EducationMeduam,
    TeacherPreferredStudentClass
};
