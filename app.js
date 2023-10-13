fetch("https://opentdb.com/api.php?amount=10")
    .then(response => response.json())
    .then(data => {
        var index = 0;
        var question = document.querySelector("#question");
        var nextBtn = document.getElementById("nextBtn");


        var questions = data.results
        let nextQuestion = () => {
            if (index >= questions.length) {
                console.log("khatam");
            } else {
                
                let answers = currentQuestionArray.incorrect_answers;
                let correctAnwer = currentQuestionArray.correct_answer
                var currentQuestionArray = questions[index];
                var currentQuestion = currentQuestionArray.question
                question.innerHTML = `Q ${index + 1}: ${currentQuestion}`
                index++
            }
        }

        nextQuestion()

    });