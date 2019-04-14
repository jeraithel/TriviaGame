
var questions = ["What color is a panda?", "How many fish are in the sea?", "How many TAs does it take to screw in a lightbulb?"]

// correct answer is always at index = 0
var answers = [
    ["black&white", "green", "yellow", "depends"],
    ["6 billion", "6", "6 million", "mmmm...sushi"],
    ["1 but only if it is Sean", "0 - the robot does it", "All of Them because it's a group project"]
]

// create array of just correct answers
var correctAnswers = [];
for (let i=0; i < answers.length; i++) {
    correctAnswers.push(answers[i][0]);
}

console.log(correctAnswers);

// console.log(answers[0]);

// variables to hold Set Intervals 
var timer = 10;
var timerId;
var showQuestion;
var showWin;
var showLoss;

// Setup counters
var counter = -1;
var correctAnswer = 0;
var incorrectAnswer = 0;

function startTimer() {

    // TODO: Use showQuestion to hold the setInterval to run nextQuestion.
    // showQuestion = setInterval(nextQuestion, 3000);
    timerId = setInterval(count, 1000);
    console.log(timerId);
    console.log("Start" + timer);
}

function nextQuestion() {
    //  TODO: Increment the count by 1.
    counter++;
  
    // TODO: Show the question
    $("#question").text(questions[counter]);
  
    shuffle(answers[counter]);    
    answers[counter].forEach(element => {
        console.log(element);
        var answerOption = $("<button>");
        answerOption.attr("data-name", element);
        answerOption.addClass("answer-button");
        answerOption.text(element);
        console.log(answerOption);
        $("#question").append("<br>");
        $("#question").append(answerOption);
    });

    $(".answer-button").on("click", function() {
        
        console.log($(this).attr("data-name"));
        console.log(correctAnswers[counter]);
        if($(this).attr("data-name") === correctAnswers[counter]) {
            correctAnswer++;
            $("#question").text("Correct!  Get ready for the next question!")
            $("#wins").text("Wins: " + correctAnswer);
            gameOverTest();
        }
        else {
            incorrectAnswer++;
            $("#question").text("Incorrect!  Get ready for the next question!")
            $("#losses").text("Losses: " + incorrectAnswer);
            gameOverTest();
        }
        
    });
}

function gameOverTest () {
    if (counter >= questions.length-1) {
        $("#question").text("Game Over!");
        clearInterval(timerId);
        $("#timer").text("---");
    } 
    else {
    waitPeriod();
        }
}

function waitPeriod () {
    clearInterval(timerId);
    timer = 10;
    $("#timer").text("--------");
    setTimeout(nextQuestion, 5000);
    setTimeout(startTimer, 5000);
}

function count() {
    timer--;
    $("#timer").text(timer);
    // console.log("count" + timer);
    if (timer <= 0) {
        console.log("COUNTER: " + counter);
        incorrectAnswer++;
        $("#question").text("Time's Up!  Get ready for the next question!")
        $("#losses").text("Losses: " + incorrectAnswer);
        gameOverTest();
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}


startTimer();
nextQuestion();