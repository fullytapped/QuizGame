const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, countdownTime

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
    startTimer()
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the best card in Magic the Gathering?',
    answers: [
      { text: 'Black lotus', correct: true },
      { text: 'The credit card', correct: false }
    ]
  },
  {
    question: 'Who is the best Magic player?(A matter of opinion, really)',
    answers: [
      { text: 'Michael James Spencer, first of his name', correct: true },
      { text: 'Some rando', correct: true },
      { text: 'James Franco', correct: true },
      { text: 'Pikachu', correct: true }
    ]
  },
  {
    question: 'Do you like this quiz so far?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is the best color combo?',
    answers: [
      { text: 'Blue, black, and green', correct: false },
      { text: 'White and black', correct: true }
    ]
  }
]
function startTimer(){
    var currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 1);
        countdownTime = new Date(currentDate).getTime();
        var x =setInterval(function(){
            var now = new Date().getTime();
        
            // Find the distance between now and the count down date
            var distance = countdownTime - now;
              
            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            console.log(minutes + ' ' + seconds);
              
            // Output the result in an element with id="demo"
            document.getElementById("timer").innerHTML =  minutes + "m " + seconds + "s ";
              
            // If the count down is over, write some text 
            if (distance < 0) {
              clearInterval(x);
              resetState();
              startButton.innerText = 'Restart'
              startButton.classList.remove('hide')
              document.getElementById("timer").innerHTML = "EXPIRED";
              alert('You lose')
            }
          }
var highScoresList = document.querySelector('#highScoresList')
var highScores = JSON.parse(localStorage.getItem('highScores')) || []
//makes highscore into a list with name and highscore 
highScoresList.innerHTML = 
highScores.map(score =>{
    return `<li class="high-score">${score.name} - ${score.score}<li>`
}).join('')
    }
      

      