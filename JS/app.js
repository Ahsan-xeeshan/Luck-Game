//IIFE (Imediately Invoked Function Expression)
(() => {
  //Selection
  const formElm = document.querySelector("form");
  const inputElm = document.querySelector("#luck-input");
  const winScoreElm = document.querySelector(".lucky-number span");
  const guessNumElm = document.querySelector(".guess-result");
  const p1BtnElm = document.querySelector(".p1Btn");
  const p2BtnElm = document.querySelector(".p2Btn");
  const p1ScoreElm = document.querySelector(".p1");
  const p2ScoreElm = document.querySelector(".p2");
  const resetBtnElm = document.querySelector("#resetBtn");
  const winPlayerElm = document.querySelector(".winner");

  //Data
  let p1Score;
  let p2Score;
  let p1Turn;
  let p2Turn;
  let winScore;
  let gameIsOver;
  let guessNumber;

  function setInitialValue() {
    p1Score = 0;
    p2Score = 0;
    p1Turn = true;
    p2Turn = false;
    gameIsOver = false;
    winScore = 10;
  }

  function validateInput(inputVal) {
    let isInValid = false;

    //validation check
    //NaN !== NaN results true if value in not real number
    if (!inputVal || inputVal !== inputVal) {
      alert("Please fill the input or provide value.");
      isInValid = true;
    }
    return isInValid;
  }

  function resetInput() {
    //reset input
    inputElm.value = "";
  }

  function guessNum() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function setInitialDOM() {
    winScoreElm.textContent = winScore;
    p1ScoreElm.textContent = p1Score;
    p2ScoreElm.textContent = p2Score;
    winPlayerElm.textContent = "";
    p1BtnElm.removeAttribute("disabled");
    p2BtnElm.setAttribute("disabled", "disabled");
    guessNumElm.textContent = "";
    p1BtnElm.classList.add("active");
    resetInput();
  }

  function setDisablePlayerBtnOnWin() {
    p1BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.setAttribute("disabled", "disabled");
  }
  //handling Submit Part

  formElm.addEventListener("submit", (evt) => {
    //prevent browser reload
    evt.preventDefault();
    //getting the input values
    const inputVal = Number(inputElm.value);

    const isInValid = validateInput(inputVal);
    if (isInValid) {
      console.log("Some Problem");
      return;
    }
    resetInput();
    setInitialValue();

    //setting data on memory
    winScore = inputVal;
    winScoreElm.textContent = inputVal;
    console.log(inputVal);
  });

  //Handling player click
  p1BtnElm.addEventListener("click", (evt) => {
    if (p1Turn) {
      //Memory Update
      guessNumber = guessNum();
      p1Score += guessNumber;
      guessNumElm.textContent = guessNum();
      //DOM update
      p1ScoreElm.textContent = p1Score;
    }

    //setting p1 turn false
    p1Turn = false;
    p1BtnElm.setAttribute("disabled", "disabled");
    p1BtnElm.classList.remove("active");
    p2Turn = true;
    p2BtnElm.removeAttribute("disabled");
    p2BtnElm.classList.add("active");

    //checking winner state
    if (p1Score >= winScore) {
      gameIsOver = true;
      setDisablePlayerBtnOnWin();
      winPlayerElm.textContent = "Player 1 is the winner!!!";
      p1BtnElm.classList.remove("active");
      p2BtnElm.classList.remove("active");
    }
  });

  p2BtnElm.addEventListener("click", (evt) => {
    if (p2Turn) {
      //Memory Update
      guessNumber = guessNum();
      p2Score += guessNumber;
      guessNumElm.textContent = guessNum();
      //DOM update
      p2ScoreElm.textContent = p2Score;
    }
    //setting p2 turn false
    p2Turn = false;
    p2BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.classList.remove("active");
    p1Turn = true;
    p1BtnElm.removeAttribute("disabled");
    p1BtnElm.classList.add("active");

    if (p2Score >= winScore) {
      gameIsOver = true;
      setDisablePlayerBtnOnWin();
      winPlayerElm.textContent = "Player 2 is the winner!!!";
      p1BtnElm.classList.remove("active");
      p2BtnElm.classList.remove("active");
    }
  });

  inputElm.addEventListener("change", () => {
    const value = Number.parseInt(inputElm.value);
    if (!Number.isNaN(value)) {
      winScore = value;
      winScoreElm.textContent = winScore;
    }
  });

  resetBtnElm.addEventListener("click", () => {
    setInitialValue();
    setInitialDOM();
  });

  setInitialValue();
  setInitialDOM();
})();
