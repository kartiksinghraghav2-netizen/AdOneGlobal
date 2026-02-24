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
