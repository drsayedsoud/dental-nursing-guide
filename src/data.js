export const topics = [
  {
    id: 1,
    title: "1. مقدمة عن الأسنان",
    subtitle: "Introduction to Teeth",
    content: "الأسنان في بقنا بتتقسم لنوعين: أسنان لبنية (Primary teeth) ودول عددهم 20 وبيبدأوا يطلعوا من سن 6 شهور، وأسنان دائمة (Permanent teeth) ودول 32 سنة. وظيفتهم مش بس المضغ (Mastication)، دول كمان بيساعدوا في الكلام والمظهر الجمالي (Aesthetics).",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    question: {
      text: "عدد الأسنان اللبنية (Primary teeth) في فم الطفل بيكون كام؟",
      options: ["20 سنة", "32 سنة", "24 سنة", "28 سنة"],
      correctAnswer: 0,
      explanation: "الأطفال بيبدأوا يبدلوا الأسنان اللبنية (الـ 20) بالأسنان الدائمة (الـ 32) بالتدريج."
    }
  },
  {
    id: 2,
    title: "2. تسوس الأسنان",
    subtitle: "Dental Caries",
    content: "الـ Dental Caries أو تسوس الأسنان ده أشهر مرض بيصيب الأسنان. بيحصل لما البكتيريا (زي الـ Streptococcus mutans) تتغذى على السكريات (Sugars) وتطلع أحماض (Acids) بتدمر طبقة المينا (Enamel) وبعدين تدخل على العاج (Dentin). الوقاية بتيجي بغسيل الأسنان بمعجون فيه Fluoride وتقليل السكريات عشان نحافظ على الأسنان.",
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fea5ce5146c1?auto=format&fit=crop&q=80&w=800",
    question: {
      text: "البكتيريا الأساسية المسببة لتسوس الأسنان بتفرز إيه عشان تدمر طبقة المينا؟",
      options: ["بروتينات (Proteins)", "أحماض (Acids)", "قلويات (Alkalis)", "فيتامينات (Vitamins)"],
      correctAnswer: 1,
      explanation: "البكتيريا بتحول السكريات لأحماض (Acids) بتذوب الكالسيوم الموجود في المينا وتعمل التسوس."
    }
  },
  {
    id: 3,
    title: "3. التهاب عصب السن",
    subtitle: "Pulpitis",
    content: "لو سيبنا التسوس يكبر، هيوصل لعصب السن (Pulp) ويعمل التهاب. عندنا نوعين: Acute Pulpitis (التهاب حاد) وده بيعمل وجع شديد جداً خصوصاً بالليل ومع المشروبات الساقعة أو السخنة. والـ Chronic Pulpitis (التهاب مزمن) وده وجعه خفيف ومحتمل. العلاج غالباً بيكون حشو عصب (Root Canal Treatment) أو خلع (Extraction).",
    imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800",
    question: {
      text: "وجع الأسنان اللي بيزيد بالليل ومع المشروبات الباردة بيكون غالباً بسبب؟",
      options: ["Dental Erosion (تآكل المينا)", "Gingivitis (التهاب اللثة)", "Chronic Pulpitis (التهاب مزمن)", "Acute Pulpitis (التهاب حاد في العصب)"],
      correctAnswer: 3,
      explanation: "الالتهاب الحاد (Acute Pulpitis) بيتميز بوجع شديد بيزيد بالليل أو مع التغير في درجات الحرارة."
    }
  },
  {
    id: 4,
    title: "4. تآكل الأسنان",
    subtitle: "Tooth Erosion & Abrasion",
    content: "الأسنان ممكن تتآكل لأسباب غير التسوس. مثلاً الـ Abrasion بيحصل لو استخدمنا فرشاة أسنان خشنة أو غسلنا بالعرض بدل من فوق لتحت. والـ Erosion بيحصل بسبب أحماض خارجية (زي كتر شرب المشروبات الغازية) أو ارتجاع حمض المعدة. والـ Attrition بيحصل مع تقدم العمر من احتكاك الأسنان ببعضها.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1664302152984-7e780fa2f4cb?auto=format&fit=crop&q=80&w=800",
    question: {
      text: "استخدام فرشاة أسنان خشنة وبطريقة خاطئة بيؤدي إلى؟",
      options: ["Dental Caries (تسوس)", "Abrasion (تآكل ميكانيكي)", "Erosion (تآكل كيميائي)", "Pulpitis (التهاب العصب)"],
      correctAnswer: 1,
      explanation: "الاحتكاك القوي والمستمر بيعمل Abrasion، لكن الـ Erosion بيكون سببه مواد كيميائية (أحماض)."
    }
  },
  {
    id: 5,
    title: "5. أمراض اللثة",
    subtitle: "Gum Diseases",
    content: "التهاب اللثة (Gingivitis) بيحصل بسبب تراكم الجير والبلاك (Plaque and Calculus). اللثة بتبقى حمرا ومورمة وبتجيب دم (Bleeding) مع غسيل الأسنان. العلاج بيكون بـ Scaling (تنظيف جير) وندي للعيان Mouthwash (مضمضة). في نوع حاد اسمه ANUG بيجي معاه قرح وريحة وحشة جداً، وده بيحتاج Antibiotics زي الـ Metronidazole (Flagyl).",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    question: {
      text: "العيان اللي بيشتكي من نزيف في اللثة (Bleeding gums) وتورم، غالباً بيعاني من إيه؟",
      options: ["Down Syndrome", "Dental Caries (تسوس)", "Gingivitis (التهاب اللثة)", "Dental Abscess (خراج)"],
      correctAnswer: 2,
      explanation: "التهاب اللثة (Gingivitis) من أهم أعراضه النزيف أثناء غسيل الأسنان وتغير لونها للأحمر الداكن."
    }
  },
  {
    id: 6,
    title: "6. خراج الأسنان",
    subtitle: "Dental Abscess",
    content: "لما البكتيريا تعدي العصب وتوصل للعضم تحت الجدر، بتعمل Dento-alveolar Abscess (خراج). العيان بيحس بوجع شديد مع العض، واللثة بتورم، وممكن وشه يورم ويسخن. العلاج إننا ندي Antibiotics ومسكنات، ونفتح الخراج عشان ننضفه (Incision and drainage)، وبعدين نعالج العصب أو نخلع السن.",
    imageUrl: "https://images.unsplash.com/photo-1598256989781-8072049e78ed?auto=format&fit=crop&q=80&w=800",
    question: {
      text: "إيه هو العلاج الأولي لخراج الأسنان المسبب لتورم في الوجه؟",
      options: ["ندي Mouthwash بس", "ندي Antibiotics ونفتح الخراج (Incision and drainage)", "نخلع السن فوراً بدون أدوية", "نحشي السن حشو عادي"],
      correctAnswer: 1,
      explanation: "لازم الأول نسيطر على الالتهاب بالمضادات الحيوية وتفريغ الخراج عشان نمنع انتشار العدوى."
    }
  },
  {
    id: 7,
    title: "7. الاحتياطات مع الأمراض المزمنة",
    subtitle: "Medically Compromised Patients",
    content: "كدكاترة وممرضين لازم نخلي بالنا! مريض الـ Angina (الذبحة) نديله ميعاد الصبح بدري ويكون قصير. مريض الـ Rheumatic Fever (الحمى الروماتيزمية) لازم ياخد Prophylactic Penicillin (بنسلين وقائي) قبل الشغل عشان نحمي قلبه من البكتيريا اللي ممكن تدخل الدم أثناء الخلع.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    question: {
      text: "مريض الحمى الروماتيزمية (Rheumatic Fever) لازم ياخد إيه قبل خلع السن؟",
      options: ["مسكن قوي بس", "مهدئ (Valium)", "فيتامين C", "Prophylactic Antibiotic (مضاد حيوي وقائي)"],
      correctAnswer: 3,
      explanation: "إعطاء مضاد حيوي وقائي بيحمي صمامات القلب من البكتيريا اللي ممكن تنتقل أثناء خلع الأسنان."
    }
  }
];
