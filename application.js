$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();
});

$(function() {
  var currentScore = 0;
  var highScore = 0;

  $('#high-score-value').append(highScore);

  $('#current-score-value').append(currentScore);

  $('#ref').click(function() {
    console.log("refresh click");
    currentScore = 0;
    $('#current-score-value').html(currentScore);
    $('#ref').animate({
      transform: "rotate(-360deg)"
    }, 500);
  });

  $('#score-button').click(function() {
    console.log(highScore);
    console.log(currentScore);
    currentScore++;

    $('#current-score-value').html(currentScore);
    if (currentScore > highScore) {
      $('#high-score-value').html(currentScore);
      highScore++;
    } else {
      $('#high-score-value').html(highScore);
    }
  });

  $('.overlay').animate({
    width: "200vw",
    height: "200vw"
  }, 500);
});
