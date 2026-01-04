import { createContext, useContext, useState } from "react";

const Languagecontext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  return (
    <Languagecontext.Provider value={{ lang, setLang }}>
      {children}
    </Languagecontext.Provider>
  );
};

export const useLanguage = () => useContext(Languagecontext);
export default Languagecontext;