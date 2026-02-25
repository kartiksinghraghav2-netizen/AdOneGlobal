// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Advanced scroll reveal + staggered delays
const elements = document.querySelectorAll(".reveal");

elements.forEach((el, index) => {
  el.style.setProperty("--delay", `${(index % 4) * 90}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
} else {
  // Fallback for older browsers
  elements.forEach((el) => el.classList.add("show"));
}

// Micro interaction for cards
const interactiveCards = document.querySelectorAll(
  ".hero-card, .service-card, .about-card, .card-soft, .tool-card"
);

interactiveCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--pointer-x", `${x}px`);
    card.style.setProperty("--pointer-y", `${y}px`);
  });
});

const hooks = [
  "Stop posting randomly: use this 3-step reel format to get consistent leads in 14 days.",
  "If your content is getting views but no clients, this one CTA fix can change everything.",
  "Most local brands waste ad budget — here is the targeting framework we use for better ROI.",
  "Your competitors are already using this short-video structure — copy this template today.",
  "Before you boost another post, check these 5 points to avoid burning your budget.",
];

const followups = [
  "Hi {{name}}, just checking in on your marketing goals for this month. We can share a quick 15-min growth plan for your business.",
  "Hey {{name}}, thank you for your interest. Would you like us to send 3 practical ideas to improve your leads this week?",
  "Hi {{name}}, we reviewed your requirement and can help with a step-by-step strategy. Should we schedule a quick call tomorrow?",
  "Hello {{name}}, following up in case you missed my last message. Happy to share a sample content + ads roadmap for your brand.",
];

const hookBtn = document.getElementById("generateHook");
const hookOutput = document.getElementById("hookOutput");
const followupBtn = document.getElementById("generateFollowup");
const followupOutput = document.getElementById("followupOutput");

if (hookBtn && hookOutput) {
  hookBtn.addEventListener("click", () => {
    const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
    hookOutput.textContent = randomHook;
  });
}

if (followupBtn && followupOutput) {
  followupBtn.addEventListener("click", () => {
    const randomFollowup = followups[Math.floor(Math.random() * followups.length)];
    followupOutput.textContent = randomFollowup;
  });
}

// Mini game: Snake
const startSnakeBtn = document.getElementById("startSnake");
const snakeCanvas = document.getElementById("snakeCanvas");
const snakeScoreEl = document.getElementById("snakeScore");
const snakeBestEl = document.getElementById("snakeBest");

if (startSnakeBtn && snakeCanvas && snakeScoreEl && snakeBestEl) {
  const ctx = snakeCanvas.getContext("2d");
  const tile = 20;
  const cols = Math.floor(snakeCanvas.width / tile);
  const rows = Math.floor(snakeCanvas.height / tile);

  let snake = [{ x: 8, y: 5 }];
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let food = { x: 12, y: 6 };
  let score = 0;
  let best = Number(localStorage.getItem("snakeBest") || 0);
  let loop = null;
  let running = false;

  snakeBestEl.textContent = String(best);

  function randomFood() {
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * cols);
      y = Math.floor(Math.random() * rows);
    } while (snake.some((part) => part.x === x && part.y === y));
    food = { x, y };
  }

  function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * tile + 1, y * tile + 1, tile - 2, tile - 2);
  }

  function drawBoard() {
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    drawCell(food.x, food.y, "#f59e0b");
    snake.forEach((part, idx) => drawCell(part.x, part.y, idx === 0 ? "#22c55e" : "#4ade80"));
  }

  function resetGame() {
    snake = [{ x: 8, y: 5 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    snakeScoreEl.textContent = "0";
    randomFood();
    drawBoard();
  }

  function gameOver() {
    running = false;
    clearInterval(loop);
    loop = null;
    startSnakeBtn.disabled = false;
    startSnakeBtn.textContent = "Play again";

    if (score > best) {
      best = score;
      localStorage.setItem("snakeBest", String(best));
      snakeBestEl.textContent = String(best);
    }
  }

  function tick() {
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    const hitWall = head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows;
    const hitSelf = snake.some((part) => part.x === head.x && part.y === head.y);
    if (hitWall || hitSelf) {
      gameOver();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 1;
      snakeScoreEl.textContent = String(score);
      randomFood();
    } else {
      snake.pop();
    }

    drawBoard();
  }

  function startSnake() {
    resetGame();
    running = true;
    startSnakeBtn.disabled = true;
    startSnakeBtn.textContent = "Playing...";
    clearInterval(loop);
    loop = setInterval(tick, 130);
  }

  window.addEventListener("keydown", (event) => {
    const keyMap = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };

    if (!keyMap[event.key]) return;
    event.preventDefault();
    const candidate = keyMap[event.key];

    if (candidate.x === -direction.x && candidate.y === -direction.y) return;
    nextDirection = candidate;
  });

  startSnakeBtn.addEventListener("click", startSnake);
  resetGame();
}
