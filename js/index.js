const correct_answer = "APPLE";

let attempts = 0; // 줄
let index = 0; // 칸

let timer;

function appStart() {
  // Game over alert
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:42vw; background-color:white; width:200px; height:100px";
    document.body.appendChild(div);
  };

  // 다음 줄로 넘어가는 함수
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  // 백스페이스를 눌렀을 때 함수
  const handleBackSpace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const current_time = new Date();
      const run_time = new Date(current_time - start_time);
      const min = run_time.getMinutes().toString().padStart(2, "0");
      const sec = run_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${min}:${sec}`;
    }

    timer = setInterval(setTime, 1000);
  };

  // 게임 끝나는 함수
  const gameover = () => {
    window.removeEventListener("keybown", handleKeyboard);
    displayGameover();
    clearInterval(timer);
  };

  // 한 줄이 완성되고 Enter 키가 눌려졌을 경우
  const handleEneterKey = () => {
    let correct_num = 0; // 맞은 갯수

    console.log("Enter");

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      ); // block의 정보를 가져온다. - 아예 밖에 빼놓으면 안되나...?

      const letter = block.innerText; // 입력한 문자
      const correct_letter = correct_answer[i]; // 정답

      // 정답확인
      if (letter === correct_letter) {
        correct_num++;
        block.style.background = "#6AAA64";
      } else if (correct_answer.includes(letter))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "White";

      console.log(letter, ",", correct_letter);
    }

    // 모두 정답일 경우, game over
    if (correct_num === 5) gameover();
    else nextLine(); // 다음줄로 넘어가기
  };

  const handleKeyboard = (event) => {
    const key = event.key.toUpperCase(); // 눌려진 키 대문자로 표현
    const keyCode = event.keyCode; // 눌러진 키의 코드를 가져온다.

    // 블럭 정보를 가져온다.
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    // BackSpace키를 눌렸을 경우
    if (event.key === "Backspace") handleBackSpace();
    else if (index === 5) {
      //console.log(event.key); // enter 오류 확인 => Enter
      if (event.key === "Enter") handleEneterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      // 알파벳만 가능하게 keyCoded를 맞춤
      thisBlock.innerText = key;
      index++;
    }
  };

  // timer 함수
  startTimer();

  // 키가 눌러지면 handleKeyboard 함수를 가져온다.
  window.addEventListener("keydown", handleKeyboard);
}

// main
appStart();
