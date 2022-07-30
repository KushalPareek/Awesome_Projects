const oXHR = new XMLHttpRequest();

const question = document.querySelector(".question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const submit = document.querySelector("#submit");
const showScore = document.querySelector("#showScore");

const answers = document.querySelectorAll(".answer");

let questionCount = 0;
let score = 0;

function reportStatus() {
  if (oXHR.readyState == 4 && this.status == 200) {
    getQuestion = JSON.parse(this.responseText);

    //getting data when ever page get loaded
    const loadQuestion = () => {
      const questionList = getQuestion[questionCount];
      question.innerHTML = questionList.question;

      option1.innerHTML = questionList.a;
      option2.innerHTML = questionList.b;
      option3.innerHTML = questionList.c;
      option4.innerHTML = questionList.d;
    };

    loadQuestion();

    //=====================================================================================
    //                             Checking answers
    // ===================================================================================
    const getCheckAnswer = () => {
      let answer;
      answers.forEach((currAnsElem) => {
        if (currAnsElem.checked) {
          answer = currAnsElem.id;
        }
      });
      return answer;
    };

    const disSelectAll = () => {
      answers.forEach((currAnsElem) => (currAnsElem.checked = false));
    };

    submit.addEventListener("click", () => {
      const checkAnswer = getCheckAnswer();
      // console.log(checkAnswer);

      if (checkAnswer === getQuestion[questionCount].ans) {
        score++;
      }

      //updating questions when user submit
      questionCount++;
      disSelectAll();
      if (questionCount < getQuestion.length) {
        loadQuestion();
      } else {
        showScore.innerHTML = `
              <h3>Your scored: ${score}/${getQuestion.length} ✌</h3>
              <button class = "btn" onclick ="location.reload()">REST AGAIN</button>
          `;
        showScore.classList.remove("scoreArea");
        submit.style.display = "none";
      }
    });
  }
}

//initialize request
oXHR.onreadystatechange = reportStatus;
oXHR.open("GET", "quizcpp.json", true);
oXHR.send();