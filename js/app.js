(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const questions = [ {
        question: "What language works in the browser?",
        answers: [ "Java", "C", "Python", "JavaScript" ],
        correct: 4
    }, {
        question: "What does CSS mean?",
        answers: [ "Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats" ],
        correct: 2
    }, {
        question: "What does HTML mean?",
        answers: [ "Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis" ],
        correct: 1
    }, {
        question: "What year was JavaScript created?",
        answers: [ "1996", "1995", "1994", "all answers are wrong" ],
        correct: 2
    } ];
    const headerContainer = document.querySelector("#header");
    const listContainer = document.querySelector("#list");
    const submitBtn = document.querySelector("#submit");
    let score = 0;
    let questionIndex = 0;
    clearPage();
    showQuestion();
    submitBtn.onclick = checkAnswer;
    function clearPage() {
        headerContainer.innerHTML = "";
        listContainer.innerHTML = "";
    }
    function showQuestion() {
        const question = questions[questionIndex]["question"];
        const answers = questions[questionIndex]["answers"];
        const titleTemplate = `<h2 class="quiz__main-title">%title%</h2>`;
        const title = titleTemplate.replace("%title%", question);
        headerContainer.innerHTML = title;
        let answerNumber = 1;
        for (const answer of answers) {
            const questionTemplate = `\n      <li>\n         <label>\n            <input type="radio" class="quiz__answer" name="answer" value="%number%"/>\n               <span>%answer%</span>\n         </label>\n      </li>`;
            const answerHTML = questionTemplate.replace("%answer%", answer).replace("%number%", answerNumber);
            listContainer.innerHTML += answerHTML;
            answerNumber++;
        }
    }
    function checkAnswer() {
        const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
        if (!checkedRadio) {
            submitBtn.blur();
            return;
        }
        const userAnswer = parseInt(checkedRadio.value);
        if (userAnswer === questions[questionIndex]["correct"]) score++;
        console.log("score = ", score);
        if (questionIndex !== questions.length - 1) {
            console.log("Это не последний вопрос");
            questionIndex++;
            clearPage();
            showQuestion();
            return;
        } else {
            console.log("Это последний вопрос");
            clearPage();
            showResults();
        }
    }
    function showResults() {
        const resultsTemplate = `\n         <h2 class="quiz__title">%title%</h2>\n         <h3 class="quiz__summary">%message%</h3>\n         <p class="quiz__result">%result%</p>\n   `;
        let titleResult, messageResult;
        if (score === questions.length) {
            titleResult = "Congratulations! 🎉";
            messageResult = "You answered all the questions!  😎👍";
        } else if (score / questions.length * 100 >= 50) {
            titleResult = "Not a bad result! 😉";
            messageResult = "You gave more than half of the correct answers! 👍";
        } else {
            titleResult = "While you have less than half of the correct answers! 🙄";
            messageResult = "Gotta try! 🧐";
        }
        const result = `${score} from ${questions.length}`;
        const finalMessage = resultsTemplate.replace("%title%", titleResult).replace("%message%", messageResult).replace("%result%", result);
        headerContainer.innerHTML = finalMessage;
        submitBtn.blur();
        submitBtn.innerText = "Start again";
        submitBtn.onclick = function() {
            history.go();
        };
    }
    window["FLS"] = true;
    isWebp();
})();