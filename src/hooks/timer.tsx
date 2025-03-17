import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface TimerConfigState {
  period: number;
  isUsingShorterPeriods: boolean;
  globalTimerTarget: number;
  isGlobalTimerEnabled: boolean;
  isBackgroundNoiseEnabled: boolean;
  noise: "white" | "pink" | "brown";
  setPeriod: (newPeriod: number) => void;
  setGlobalTimerTarget: (newPeriod: number) => void;
  toggleShorterPeriods: () => void;
  toggleGlobalTimer: () => void;
  toggleBackgroundNoise: () => void;
  selectBackgroundNoise: (newNoise: "white" | "pink" | "brown") => void;
}

interface TimerState {
  isRunning: boolean;
  timer: number;
  globalTimer: number;
  countdown: number;
  phase: number;
  start: () => void;
  stop: () => void;
  tick: () => void;
  lap: (newTimer: number) => void;
}

// TODO: Turn into a slice to integrate into the timer store
export const useTimerConfigStore = create<TimerConfigState>()(
  devtools(
    persist(
      (set) => ({
        period: 5,
        isUsingShorterPeriods: true,
        globalTimerTarget: 5,
        isGlobalTimerEnabled: true,
        isBackgroundNoiseEnabled: false,
        noise: "white",

        setPeriod: (newPeriod: number) =>
          set(() => ({
            period: newPeriod,
          })),

        setGlobalTimerTarget: (newGlobalTimerTarget: number) =>
          set(() => ({
            globalTimerTarget: newGlobalTimerTarget,
          })),

        toggleShorterPeriods: () =>
          set((state) => ({
            isUsingShorterPeriods: !state.isUsingShorterPeriods,
          })),

        toggleGlobalTimer: () =>
          set((state) => ({
            isGlobalTimerEnabled: !state.isGlobalTimerEnabled,
          })),

        toggleBackgroundNoise: () =>
          set((state) => ({
            isBackgroundNoiseEnabled: !state.isBackgroundNoiseEnabled,
          })),

        selectBackgroundNoise: (newNoise) =>
          set(() => {
            if (newNoise in ["white", "pink", "brown"])
              return { noise: newNoise };
            return {};
          }),
      }),
      {
        name: "timer-config-storage",
      },
    ),
  ),
);

export const useTimerStore = create<TimerState>()(
  devtools(
    persist(
      (set) => ({
        isRunning: false,
        timer: 0,
        globalTimer: 0,
        countdown: 0,
        phase: -1,

        start: () => set(() => ({ isRunning: true })),

        stop: () =>
          set(() => ({
            isRunning: false,
            phase: -1,
            timer: 0,
            globalTimer: 0,
            countdown: 0,
          })),

        tick: () =>
          set((state) => ({
            countdown: state.countdown - 1,
            globalTimer: state.globalTimer + 1,
          })),

        lap: (newTimer) =>
          set((state) => ({
            phase: state.phase + 1,
            timer: newTimer,
            countdown: newTimer,
          })),
      }),
      {
        name: "timer-storage",
      },
    ),
  ),
);
