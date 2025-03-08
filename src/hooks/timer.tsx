import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface TimerState {
  isRunning: boolean;
  timer: number;
  countdown: number;
  phase: number;
  start: () => void;
  stop: () => void;
  tick: () => void;
  lap: (newTimer: number) => void;
}

export const useTimerStore = create<TimerState>()(
  devtools(
    persist(
      (set) => ({
        isRunning: false,
        timer: 0,
        countdown: 0,
        phase: -1,

        start: () => set(() => ({ isRunning: true })),

        stop: () =>
          set(() => ({ isRunning: false, phase: -1, timer: 0, countdown: 0 })),

        tick: () => set((state) => ({ countdown: state.countdown - 1 })),

        lap: (newTimer) =>
          set((state) => ({
            phase: state.phase + 1,
            timer: newTimer,
            countdown: newTimer,
          })),
      }),
      {
        name: "timer-storage",
      }
    )
  )
);
