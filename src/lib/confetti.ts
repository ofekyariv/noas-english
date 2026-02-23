"use client";

import confetti from "canvas-confetti";

export function fireSmallConfetti() {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff922b"],
  });
}

export function fireBigConfetti() {
  // Center burst
  confetti({
    particleCount: 150,
    spread: 160,
    origin: { y: 0.5 },
    colors: ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff922b", "#cc5de8"],
  });

  // Left and right bursts after a small delay
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 80,
      angle: 60,
      origin: { x: 0.1, y: 0.5 },
      colors: ["#ff6b6b", "#ffd93d", "#6bcb77"],
    });
    confetti({
      particleCount: 80,
      spread: 80,
      angle: 120,
      origin: { x: 0.9, y: 0.5 },
      colors: ["#4d96ff", "#ff922b", "#cc5de8"],
    });
  }, 300);

  // Final shower
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 200,
      startVelocity: 20,
      origin: { y: 0.2 },
    });
  }, 600);
}
