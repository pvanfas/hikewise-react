import { useUserContext } from "contexts/UserContext";
import { multiGetRequest, postRequest } from "utils/api";

function getQueryForAptiQues(subcat) {
  let wordSplit = subcat.split(" ");
  let wordSplitCaps = wordSplit.map((word) => word.toUpperCase());
  return wordSplitCaps.join("_");
}

export default function useQuesAns() {
  const UserContext = useUserContext();

  function getSectionQuestions(section) {
    return new Promise((resolve, reject) => {
      let url1 = `/assessment/questions/${section}/?lang=${UserContext.state.profile.pref_language}`;
      let url2 = `/assessment/questions/${section}/?lang=${"EN"}`;

      multiGetRequest([url1, url2], { removeTrailingSlash: true })
        .then((resp) => {
          const respPrefLang = resp[0].data;
          const respEng = resp[1].data;

          let questions = [];
          for (let i = 0; i < resp[0].data.length; i++) {
            const quesPrefLang = respPrefLang[i];
            const quesEng = respEng[i];
            questions.push({ ...quesPrefLang, section: section.toLowerCase(), english: { ...quesEng } });
          }

          resolve(questions);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function getAptiQuestions(subcat) {
    return new Promise((resolve, reject) => {
      let url = `/assessment/questions`;

      let url1 = `${url}/aptitude/?subcategory=${getQueryForAptiQues(subcat)}&lang=${
        UserContext.state.profile.pref_language
      }`;

      let url2 = `${url}/aptitude/?subcategory=${getQueryForAptiQues(subcat)}&lang=EN`;

      multiGetRequest([url1, url2], { removeTrailingSlash: true }).then((resp) => {
        const respPrefLang = resp[0].data;
        const respEng = resp[1].data;

        let questions = [];
        for (let i = 0; i < resp[0].data.length; i++) {
          const quesPrefLang = respPrefLang[i];
          const quesEng = respEng[i];
          questions.push({ ...quesPrefLang, section: "aptitude", english: { ...quesEng } });
        }

        resolve(questions);
      });
    });
  }

  function getMissedQuestions() {
    return new Promise((resolve, reject) => {
      let url2 = `/assessment/questions/missed/?lang=EN`;
      let url1 = `/assessment/questions/missed/?lang=${UserContext.state.profile.pref_language}`;

      multiGetRequest([url1, url2], { removeTrailingSlash: true })
        .then((resp) => {
          const respPrefLang = resp[0].data;
          const respEng = resp[1].data;

          for (const key in respPrefLang) {
            const engArrQues = respEng[key];
            for (let i = 0; i < respPrefLang[key].length; i++) {
              respPrefLang[key][i].english = engArrQues[i];
            }
          }

          resolve({ data: respPrefLang });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function uploadAnswer({ question, answer }, callback) {
    const postData = {
      question: question.id,
      option: answer,
    };
    return postRequest(`/assessment/accept/${question.section.toLowerCase()}`, postData)
      .then((resp) => {
        if (callback) callback();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function uploadWvpAnswer(answers) {
    return new Promise((resolve, reject) => {
      postRequest(`/assessment/accept/wvp/multiple`, answers)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        })
        .finally(() => {});
    });
  }

  return {
    getSectionQuestions,
    getAptiQuestions,
    uploadAnswer,
    uploadWvpAnswer,
    getMissedQuestions,
  };
}
