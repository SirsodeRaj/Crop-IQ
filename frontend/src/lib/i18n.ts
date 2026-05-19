import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Language": "Language",
      "New Crop Analysis": "New Crop Analysis",
      "Location": "Location",
      "Choose from Map": "Choose from Map",
      "Custom Location": "Custom Location",
      "Reset to predefined locations": "Reset to predefined locations",
      "Budget": "Budget (₹ INR)",
      "Risk Tolerance": "Risk Tolerance",
      "Low": "Low",
      "Medium": "Medium",
      "High": "High",
      "Analyzing": "Analyzing...",
      "Generate Insights": "Generate Insights",
      "Top Match": "Top Match",
      "Recommendation": "Recommendation",
      "Match": "Match",
      "Climate Match": "Climate Match",
      "Soil Match": "Soil Match",
      "Water Feasibility": "Water Feasibility",
      "Profitability": "Profitability",
      "Trend": "Trend",
      "Logout": "Logout",
      "Settings": "Settings"
    }
  },
  hi: {
    translation: {
      "Dashboard": "डैशबोर्ड",
      "Language": "भाषा",
      "New Crop Analysis": "नया फसल विश्लेषण",
      "Location": "स्थान",
      "Choose from Map": "नक्शे से चुनें",
      "Custom Location": "कस्टम स्थान",
      "Reset to predefined locations": "पूर्व निर्धारित स्थानों पर रीसेट करें",
      "Budget": "बजट (₹ INR)",
      "Risk Tolerance": "जोखिम सहनशीलता",
      "Low": "कम",
      "Medium": "मध्यम",
      "High": "उच्च",
      "Analyzing": "विश्लेषण हो रहा है...",
      "Generate Insights": "अंतर्दृष्टि उत्पन्न करें",
      "Top Match": "शीर्ष मिलान",
      "Recommendation": "सिफारिश",
      "Match": "मिलान",
      "Climate Match": "जलवायु मिलान",
      "Soil Match": "मिट्टी मिलान",
      "Water Feasibility": "जल व्यवहार्यता",
      "Profitability": "लाभप्रदता",
      "Trend": "प्रवृत्ति",
      "Logout": "लॉग आउट",
      "Settings": "सेटिंग्स"
    }
  },
  mr: {
    translation: {
      "Dashboard": "डॅशबोर्ड",
      "Language": "भाषा",
      "New Crop Analysis": "नवीन पीक विश्लेषण",
      "Location": "स्थान",
      "Choose from Map": "नकाशावरून निवडा",
      "Custom Location": "सानुकूल स्थान",
      "Reset to predefined locations": "पूर्वनिर्धारित स्थानांवर रीसेट करा",
      "Budget": "बजेट (₹ INR)",
      "Risk Tolerance": "धोका सहनशीलता",
      "Low": "कमी",
      "Medium": "मध्यम",
      "High": "उच्च",
      "Analyzing": "विश्लेषण करत आहे...",
      "Generate Insights": "अंतर्दृष्टी व्युत्पन्न करा",
      "Top Match": "शीर्ष जुळणी",
      "Recommendation": "शिफारस",
      "Match": "जुळणी",
      "Climate Match": "हवामान जुळणी",
      "Soil Match": "माती जुळणी",
      "Water Feasibility": "पाण्याची व्यवहार्यता",
      "Profitability": "नफा",
      "Trend": "कल",
      "Logout": "बाहेर पडा",
      "Settings": "सेटिंग्ज"
    }
  }
};

const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("app_lang") || "en" : "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
