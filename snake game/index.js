//esta primeira informação não estará no artigo, mas serve para atualizar o quadro sempre que a página for carregada.
window.onload = () => {
  //1 - criação do board

  var board = document.getElementById("board");

  var context = board.getContext("2d");

  const fieldQuantity = 20;
  const fieldLength = 20;

  // 2- criação da cobra e da maçã
  setInterval(updFrame, 1000 / 15);

  let [appleX, appleY] = [10, 15];

  let [headX, headY] = [10, 5];
  let snakeBody = 3;
  let snakeTrail = [];

  document.addEventListener("keydown", keyPress);
  const velocity = 1;
  var velX = 0;
  var velY = 0;

  function updFrame() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //MAÇÃ

    context.fillStyle = "red";
    context.fillRect(
      appleX * fieldLength,
      appleY * fieldLength,
      fieldLength,
      fieldLength
    );

    //CRUELA

    // CRUELA INFORMAÇÕES

    headX += velX;
    headY += velY;

    if (headX < 0) {
      headX = fieldQuantity - 1;
    }
    if (headX > fieldQuantity - 1) {
      headX = 0;
    }
    if (headY < 0) {
      headY = fieldQuantity - 1;
    }
    if (headY > fieldQuantity - 1) {
      headY = 0;
    }

    context.fillStyle = "white";

    for (let a = 0; a < snakeTrail.length; a++) {
      //Não gosto de usar o i no loop for
      context.fillRect(
        snakeTrail[a].x * fieldLength,
        snakeTrail[a].y * fieldLength,
        fieldLength - 1,
        fieldLength - 1
      );

      if (headX == snakeTrail[a].x && headY == snakeTrail[a].y) {
        velX = 0;
        velY = 0;
        snakeBody = 3;
      }
    }

    snakeTrail.push({ x: headX, y: headY });

    while (snakeTrail.length > snakeBody) {
      snakeTrail.shift();
    }

    if (headX == appleX && headY == appleY) {
      snakeBody++;

      appleX = Math.floor(Math.random() * fieldQuantity);
      appleY = Math.floor(Math.random() * fieldQuantity);
    }
  }

  function keyPress(event) {
    console.log(event.keyCode);

    switch (event.keyCode) {
      case 37: //Esquerda
        if (velX == 0) {
          velX = -velocity;
          velY = 0;
        }
        break;
      case 38: //Cima
        if (velY == 0) {
          velX = 0;
          velY = -velocity;
        }
        break;
      case 39: //Direita
        if (velX == 0) {
          velX = velocity;
          velY = 0;
        }
        break;
      case 40: //Baixo
        if (velY == 0) {
          velX = 0;
          velY = velocity;
        }
        break;
    }
  }
};
