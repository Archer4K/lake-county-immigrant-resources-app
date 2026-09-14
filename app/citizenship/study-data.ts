export type TestVersion = "2008" | "2025";
export type StudyCard = { question: string; answer: string; es: string; ru: string };

// Short practice prompts adapted from the linked USCIS question-and-answer lists.
// Avoid current-officeholder questions, whose answers change after elections.
export const studyCards: Record<TestVersion, StudyCard[]> = {
  "2008": [
    { question:"What is the highest law of the United States?", answer:"The Constitution.", es:"¿Cuál es la ley suprema de Estados Unidos?", ru:"Какой закон является высшим в США?" },
    { question:"What does the Constitution do?", answer:"It sets up the government. (It also defines the government and protects basic rights.)", es:"¿Qué hace la Constitución?", ru:"Что делает Конституция?" },
    { question:"What are the first three words of the Constitution?", answer:"We the People.", es:"¿Cuáles son las primeras tres palabras de la Constitución?", ru:"Какие первые три слова Конституции?" },
    { question:"What is an amendment?", answer:"A change or addition to the Constitution.", es:"¿Qué es una enmienda?", ru:"Что такое поправка?" },
    { question:"What is the name for the first ten amendments?", answer:"The Bill of Rights.", es:"¿Cómo se llaman las primeras diez enmiendas?", ru:"Как называются первые десять поправок?" },
    { question:"Name one freedom in the First Amendment.", answer:"Speech. (Other accepted examples include religion, assembly, press, or petitioning the government.)", es:"Nombre una libertad de la Primera Enmienda.", ru:"Назовите одну свободу из Первой поправки." },
    { question:"How many amendments does the Constitution have?", answer:"Twenty-seven (27).", es:"¿Cuántas enmiendas tiene la Constitución?", ru:"Сколько поправок в Конституции?" },
  ],
  "2025": [
    { question:"Name the three branches of the U.S. government.", answer:"Legislative, executive, and judicial.", es:"Nombre las tres ramas del gobierno de EE. UU.", ru:"Назовите три ветви власти США." },
    { question:"Which branch does the President lead?", answer:"The executive branch.", es:"¿Qué rama dirige el presidente?", ru:"Какую ветвь власти возглавляет президент?" },
    { question:"What part of the federal government writes laws?", answer:"Congress. (The legislature or legislative branch is also accepted.)", es:"¿Qué parte del gobierno federal redacta las leyes?", ru:"Какая часть федерального правительства пишет законы?" },
    { question:"What are the two parts of Congress?", answer:"The Senate and the House of Representatives.", es:"¿Cuáles son las dos partes del Congreso?", ru:"Из каких двух частей состоит Конгресс?" },
    { question:"Name one power of Congress.", answer:"Writing laws. (Other accepted examples include declaring war or making the federal budget.)", es:"Nombre una facultad del Congreso.", ru:"Назовите одно полномочие Конгресса." },
    { question:"How many U.S. senators are there?", answer:"One hundred (100).", es:"¿Cuántos senadores hay en EE. UU.?", ru:"Сколько сенаторов США?" },
    { question:"How long is a U.S. senator's term?", answer:"Six (6) years.", es:"¿Cuánto dura el mandato de un senador?", ru:"Сколько длится срок полномочий сенатора?" },
  ],
};

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
