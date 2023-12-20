var gameMusic = new Audio("music/bgm.mp3");
      var rockSound = new Audio("music/rock.mp3");
      var scissorSound = new Audio("music/scissor.mp3");
      var paperSound = new Audio("music/paper.mp3");
      gameMusic.volume = 0.7;


      var computerScoreDisplay = document
        .getElementById("computerScore")
        .getElementsByTagName("b")[0];
      var userScoreDisplay = document
        .getElementById("userScore")
        .getElementsByTagName("b")[0];

      var computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
      var userScore = parseInt(localStorage.getItem("userScore")) || 0;

      computerScoreDisplay.innerText = computerScore;
      userScoreDisplay.innerText = userScore;

      var isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true";


      


      function toggleSound() {
        var soundButton = document.getElementById("soundButton");

        if (!gameMusic.paused) {
          gameMusic.pause();
          soundButton.innerText = "SOUND: OFF";
          localStorage.setItem("isMusicPlaying", false);
        } else {
          gameMusic.play();
          soundButton.innerText = "SOUND: ON";
          localStorage.setItem("isMusicPlaying", true);
        }
      }

      function playGameMusic() {
        gameMusic.loop = true;
        if (isMusicPlaying) {
          gameMusic.play();
        }
      }

      playGameMusic();

      function chooseOption(userChoice) {
        var computerChoice = Math.floor(Math.random() * 3) + 1;

        var resultMessage = document.getElementById("resultMessage");
        var playAgainBtn = document.getElementById("playAgainBtn");

        if (userChoice === computerChoice) {
          resultMessage.innerText = "TIE UP!";
          document.querySelector(".next-btn").style.display = "none";
          playAgainBtn.innerText = "REPLAY";
        } else if (
          (userChoice === 1 && computerChoice === 2) ||
          (userChoice === 2 && computerChoice === 3) ||
          (userChoice === 3 && computerChoice === 1)
        ) {
          resultMessage.innerText = "YOU WIN AGAINST PC!";
          document.querySelector(".next-btn").style.display = "block";
          playAgainBtn.innerText = "PLAY AGAIN";
          userScore++;

          if (userChoice === 1) {
            rockSound.play();
            userText.innerText = "You Picked Rock";
          } else if (userChoice === 2) {
            scissorSound.play();
            userText.innerText = "You Picked Scissor";
          } else {
            paperSound.play();
            userText.innerText = "You Picked Paper";
          }
        } else {
          resultMessage.innerText = "YOU LOST AGAINST PC!";
          document.querySelector(".next-btn").style.display = "none";
          playAgainBtn.innerText = "PLAY AGAIN";
          computerScore++;
          if (userChoice === 1) {
            rockSound.play();
            userText.innerText = "You Picked Rock";
          } else if (userChoice === 2) {
            scissorSound.play();
            userText.innerText = "You Picked Scissor";
          } else {
            paperSound.play();
            userText.innerText = "You Picked Paper";
          }
        }

        if (computerChoice === 1) {
          rockSound.play();
          pcText.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;PC Picked Rock";
        } else if (computerChoice === 2) {
          scissorSound.play();
          pcText.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;PC Picked Scissor";
        } else {
          paperSound.play();
          pcText.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;PC Picked Paper";
        }
        computerScoreDisplay.innerText = computerScore;
        userScoreDisplay.innerText = userScore;

        localStorage.setItem("computerScore", computerScore.toString());
        localStorage.setItem("userScore", userScore.toString());

        playAgainBtn.style.display = "block";
      }

      function resetGame() {
        var resultMessage = document.getElementById("resultMessage");
        var playAgainBtn = document.getElementById("playAgainBtn");

        resultMessage.innerText = "";
        playAgainBtn.style.display = "none";
      }

      window.onload = function () {
        playGameMusic();
        document.querySelector(".next-btn").style.display = "none";
      };

      window.onbeforeunload = function () {
        localStorage.setItem("isMusicPlaying", !gameMusic.paused);
      };

      function showRules() {
        var rulesPopup = document.getElementById("rulesPopup");
        rulesPopup.style.display = "block";
      }

      function closeRules() {
        var rulesPopup = document.getElementById("rulesPopup");
        rulesPopup.style.display = "none";
      }

      function updateScore(userScore, computerScore) {
        localStorage.setItem("userScore", userScore);
        localStorage.setItem("computerScore", computerScore);
      }