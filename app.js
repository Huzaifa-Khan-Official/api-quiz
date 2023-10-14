let contentDiv = document.querySelector(".content");
let confirmationDiv = document.querySelector(".confirmationDiv");
let questionsArray; // Declare a variable to store the fetched data
let questionElement = document.querySelector("#question"); // get the element to show question
let nextBtn = document.getElementById("nextBtn"); // get the nextBtn


let questionDiv = document.querySelector(".question") // get the question div
let optionsDiv = document.querySelector(".optionsDiv") // get the parent of all options
let opt1 = document.getElementById("opt1");  // get option 1 label
let opt2 = document.getElementById("opt2"); // get option 2 label
let opt3 = document.getElementById("opt3"); // get option 3 label
let opt4 = document.getElementById("opt4"); // get option 4 label
let radio0 = document.querySelector(".radio0"); // get radio of option 1
let radio1 = document.querySelector(".radio1"); // get radio of option 2
let radio2 = document.querySelector(".radio2"); // get radio of option 3
let radio3 = document.querySelector(".radio3"); // get radio of option 4
let optDiv0 = document.querySelector(".optDiv0"); // get div of option 1
let optDiv1 = document.querySelector(".optDiv1"); // get div of option 2
let optDiv2 = document.querySelector(".optDiv2"); // get div of option 3
let optDiv3 = document.querySelector(".optDiv3"); // get div of option 4
let timerDiv = document.querySelector(".timerDiv"); // get timer div
timerDiv.style.display = "none"
let marks = 0;
let percentage = 0;

let timer = document.getElementById("timer");
let interval;

let questionsLength = "";

fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json())
    .then(data => {
        questionsArray = data.results;

        myFunction(questionsArray);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });


function myFunction(data) {
    let questionIndex = 0;
    let currentQuestion = data[questionIndex].question // current question

    questionsLength = data.length

    function startTimer() {
        var min = questionsLength - 1;
        var sec = 59;

        timer.innerHTML = "";
        interval = setInterval(() => {
            timer.innerHTML = `${min} : ${sec}`;
            sec--;
            if (sec < 0) {
                min--;
                sec = 59;
                if (min < 0) {
                    sec = 59;
                    showResult()
                }
            }
        }, 1000);
    }


    nextBtn.addEventListener("click", () => {
        timerDiv.style.display = "block";
        confirmationDiv.style.display = "none";


        startTimer();

        optionsDiv.style.display = "block";
        questionDiv.style.display = "block";
        nextBtn.innerText = "Next"



        var checkbox = document.querySelectorAll('.form-check-input');
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                let selectedValue = checkbox[i].value;
                let selectedOption = data[questionIndex - 1].incorrect_answers[selectedValue];
                let correctedAnswer = data[questionIndex - 1].correct_answer;
                checkAnswer(selectedOption, correctedAnswer);
            }
            checkbox[i].checked = false;
        }


        if (questionIndex == data.length - 1) {
            nextBtn.innerText = "Submit";
        }

        if (questionIndex >= data.length) {
            showResult();
        } else {
            optDiv0.style.border = "none"
            optDiv1.style.border = "none"
            optDiv2.style.border = "none"
            optDiv3.style.border = "none"
            optDiv2.style.display = "block";
            optDiv3.style.display = "block";

            currentQuestion = data[questionIndex].question
            let optionsArr = data[questionIndex].incorrect_answers
            let correctAns = data[questionIndex].correct_answer
            optionsArr.push(correctAns)
            optionsArr.sort(() => Math.random() - 0.5)


            nextBtn.disabled = true;

            opt1.innerHTML = `${optionsArr[0]}`
            opt2.innerHTML = `${optionsArr[1]}`

            if (optionsArr[2] === undefined) {
                optDiv2.style.display = "none";
            } else {
                opt3.innerHTML = `${optionsArr[2]}`
            }

            if (optionsArr[3] === undefined) {
                optDiv3.style.display = "none";
            } else {
                opt4.innerHTML = `${optionsArr[3]}`
            }

            questionElement.innerHTML = `Q ${questionIndex + 1}) ${currentQuestion}`;
            questionIndex++
        }

    })
}

function clicked() {
    nextBtn.disabled = false;
};

function clickedDiv(divNo) {
    if (divNo == 0) {
        radio0.checked = true;
        optDiv0.style.border = "2px solid black";
        optDiv1.style.border = "none";
        optDiv2.style.border = "none";
        optDiv3.style.border = "none";
    } else if (divNo == 1) {
        radio1.checked = true;
        optDiv1.style.border = "2px solid black";
        optDiv0.style.border = "none";
        optDiv2.style.border = "none";
        optDiv3.style.border = "none";
    } else if (divNo == 2) {
        radio2.checked = true;
        optDiv2.style.border = "2px solid black";
        optDiv0.style.border = "none";
        optDiv1.style.border = "none";
        optDiv3.style.border = "none";
    } else if (divNo == 3) {
        radio3.checked = true;
        optDiv3.style.border = "2px solid black";
        optDiv0.style.border = "none";
        optDiv1.style.border = "none";
        optDiv2.style.border = "none";
    }

    nextBtn.disabled = false;
}


function checkAnswer(slectedOption, correctAnswer) {
    if (slectedOption == correctAnswer) {
        marks++
        percentage = Math.ceil((marks / questionsLength) * 100);
    }
}


function showResult() {
    clearInterval(interval);
    timer.innerHTML = "";
    contentDiv.innerHTML = "";
    var resultDiv = document.querySelector(".resultDiv");
    resultDiv.style.display = "flex";
    document.querySelector("#totalQues").innerHTML = questionsLength;
    document.querySelector("#correctAns").innerHTML = marks;

    if (percentage >= 70) {
        resultDiv.style.color = "green"
        document.querySelector("#feedback").innerHTML = `Congratulations, `;
        document.querySelector("#feedback2").innerHTML = "you passed";
        document.querySelector("#percen").innerHTML = `${percentage}%`;
    } else {
        resultDiv.style.color = "red";
        document.querySelector("#feedback").innerHTML = `Sorry, `;
        document.querySelector("#feedback2").innerHTML = "you failed";
        document.querySelector("#percen").innerHTML = `${percentage}%`;
    }
};