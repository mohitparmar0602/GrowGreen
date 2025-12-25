import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('English');

    const translations = {
        English: {
            home: "Home",
            marketplace: "Marketplace",
            login: "Login",
            register: "Register",
            searchPlaceholder: "Search seeds, fertilizers...",
            heroTitle: "Cultivating Success",
            heroSubtitle: "A unified e-commerce platform dedicated to agricultural inputs.",
            startShopping: "Start Shopping",
            joinPlatform: "Join Platform",
            challengesTitle: "The Challenges Facing Modern Farmers",
            solutionTitle: "Bridging the Gap",
            workflowTitle: "Seamless Workflow",
            featuresTitle: "Empowering the Grower",
            weatherTitle: "Weather Alerts",
            connectSuppliers: "Connect with trusted suppliers for premium seeds, fertilizers, and farming equipment.",
            limitedAccess: "Limited Access",
            priceDisparity: "Price Disparity",
            qualityUncertainty: "Quality Uncertainty",
            lackTransparency: "Lack of Transparency"
        },
        Hindi: {
            home: "होम",
            marketplace: "बाज़ार",
            login: "लॉग इन",
            register: "रजिस्टर",
            searchPlaceholder: "बीज, खाद खोजें...",
            heroTitle: "सफलता की खेती",
            heroSubtitle: "कृषि आदानों के लिए एक एकीकृत ई-कॉमर्स मंच।",
            startShopping: "खरीदारी शुरू करें",
            joinPlatform: "मंच से जुड़ें",
            challengesTitle: "आधुनिक किसानों की चुनौतियाँ",
            solutionTitle: "दूरी कम करना",
            workflowTitle: "सहज कार्यप्रवाह",
            featuresTitle: "किसान को सशक्त बनाना",
            weatherTitle: "मौसम अलर्ट",
            connectSuppliers: "प्रीमियम बीज और उर्वरकों के लिए भरोसेमंद आपूर्तिकर्ताओं से जुड़ें।",
            limitedAccess: "सीमित पहुँच",
            priceDisparity: "मूल्य असमानता",
            qualityUncertainty: "गुणवत्ता की अनिश्चितता",
            lackTransparency: "पारदर्शिता की कमी"
        },
        Punjabi: {
            home: "ਘਰ",
            marketplace: "ਬਾਜ਼ਾਰ",
            login: "ਲੌਗ ਇਨ",
            register: "ਰਜਿਸਟਰ",
            searchPlaceholder: "ਬੀਜ, ਖਾਦ ਖੋਜੋ...",
            heroTitle: "ਸਫਲਤਾ ਦੀ ਖੇਤੀ",
            heroSubtitle: "ਖੇਤੀਬਾੜੀ ਇਨਪੁਟਸ ਲਈ ਇੱਕ ਏਕੀਕ੍ਰਿਤ ਈ-ਕਾਮਰਸ ਪਲੇਟਫਾਰਮ।",
            startShopping: "ਖਰੀਦਦਾਰੀ ਸ਼ੁਰੂ ਕਰੋ",
            joinPlatform: "ਪਲੇਟਫਾਰਮ ਨਾਲ ਜੁੜੋ",
            challengesTitle: "ਆਧੁਨਿਕ ਕਿਸਾਨਾਂ ਦੀਆਂ ਚੁਣੌਤੀਆਂ",
            solutionTitle: "ਪਾੜਾ ਦੂਰ ਕਰਨਾ",
            workflowTitle: "ਨਿਰਵਿਘਨ ਕੰਮਕਾਜ",
            featuresTitle: "ਕਿਸਾਨ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ",
            weatherTitle: "ਮੌਸਮ ਅਲਰਟ",
            connectSuppliers: "ਵਧੀਆ ਬੀਜਾਂ ਅਤੇ ਖਾਦਾਂ ਲਈ ਭਰੋਸੇਯੋਗ ਸਪਲਾਇਰਾਂ ਨਾਲ ਜੁੜੋ।",
            limitedAccess: "ਸੀਮਤ ਪਹੁੰਚ",
            priceDisparity: "ਕੀਮਤ ਅੰਤਰ",
            qualityUncertainty: "ਗੁਣਵੱਤਾ ਦੀ ਅਨਿਸ਼ਚਿਤਤਾ",
            lackTransparency: "ਪਾਰਦਰਸ਼ਤਾ ਦੀ ਘਾਟ"
        }
    };

    const t = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, languages: Object.keys(translations) }}>
            {children}
        </LanguageContext.Provider>
    );
};
