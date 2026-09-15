export type TestVersion = "2008" | "2025";

export { officialCivicsCards as studyCards } from "./official-civics-data";
export type { OfficialCivicsCard as StudyCard } from "./official-civics-data";

export const officialLists: Record<TestVersion, string> = {
  "2008": "https://www.uscis.gov/sites/default/files/document/questions-and-answers/OoC_100_Questions_2008_Civics_Test_V1.pdf",
  "2025": "https://www.uscis.gov/sites/default/files/document/questions-and-answers/2025-Civics-Test-128-Questions-and-Answers.pdf",
};

export const studyResources = [
  { id:"haces", kind:"class", name:"HACES citizenship classes", area:"Waukegan", phone:"847-244-0300", url:"https://haces.org/education/", en:"Weekly citizenship classes in English and Spanish. Call for enrollment and current schedule.", es:"Clases semanales de ciudadanía en inglés y español. Llame para consultar inscripción y horarios.", ru:"Еженедельные занятия по гражданству на английском и испанском. Позвоните, чтобы узнать расписание." },
  { id:"clc", kind:"class", name:"College of Lake County adult education", area:"Vernon Hills · Waukegan · Grayslake", phone:"847-543-2485", url:"https://www.clcillinois.edu/programs-and-classes/adult-education-and-esl", en:"Citizenship and English classes. Ask about placement, eligibility and location.", es:"Clases de ciudadanía e inglés. Pregunte por evaluación, requisitos y ubicación.", ru:"Занятия по гражданству и английскому. Уточните условия, тестирование и место занятий." },
  { id:"uscis-2025", kind:"official", name:"USCIS 2025 civics question list", area:"Online", phone:"800-375-5283", url:officialLists["2025"], en:"Complete official 128-question list for the 2025 test.", es:"Lista oficial completa de 128 preguntas para el examen de 2025.", ru:"Полный официальный список из 128 вопросов для теста 2025 года." },
  { id:"uscis-2008", kind:"official", name:"USCIS 2008 civics question list", area:"Online", phone:"800-375-5283", url:officialLists["2008"], en:"Complete official 100-question list for the 2008 test.", es:"Lista oficial completa de 100 preguntas para el examen de 2008.", ru:"Полный официальный список из 100 вопросов для теста 2008 года." },
  { id:"uscis-languages", kind:"official", name:"USCIS multilingual citizenship materials", area:"Online", phone:"800-375-5283", url:"https://www.uscis.gov/citizenship/find-study-materials-and-resources/citizenship-multilingual-resources", en:"Find USCIS study publications in other languages. Check the test version on each item.", es:"Busque publicaciones de USCIS en otros idiomas. Compruebe la versión del examen en cada recurso.", ru:"Найдите материалы USCIS на других языках. Проверяйте версию теста для каждого материала." },
  { id:"uscis-updates", kind:"official", name:"USCIS civics test updates", area:"Online", phone:"800-375-5283", url:"https://www.uscis.gov/citizenship/testupdates", en:"Check answers that can change after elections or appointments.", es:"Compruebe las respuestas que pueden cambiar después de elecciones o nombramientos.", ru:"Проверяйте ответы, которые могут измениться после выборов или назначений." },
] as const;
