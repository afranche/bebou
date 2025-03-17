import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import React from "react";

import { useTimerConfigStore } from "@/hooks/timer";

const OptionsDialog: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    period,
    setPeriod,
    isGlobalTimerEnabled,
    toggleGlobalTimer,
    globalTimerTarget,
    setGlobalTimerTarget,
    isBackgroundNoiseEnabled,
    toggleBackgroundNoise,
    selectBackgroundNoise,
  } = useTimerConfigStore();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Options</DialogTitle>
          <DialogDescription>
            <ul className="flex flex-col gap-5 mt-6">
              <li className="flex">
                <Slider
                  id="slider"
                  className="w-32"
                  value={[period]}
                  onValueChange={(value) => setPeriod(value[0])}
                  min={3}
                  max={6}
                  step={1}
                />
                <div className="grid gap-1.5 leading-none text-right grow">
                  <label
                    htmlFor="slider"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Respiration
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {period} secondes
                  </p>
                </div>
              </li>
              <li className="flex">
                <Checkbox
                  id="timer"
                  checked={isGlobalTimerEnabled}
                  onCheckedChange={() => {
                    toggleGlobalTimer();
                  }}
                />
                <div className="grid gap-1.5 leading-none text-right grow">
                  <label
                    htmlFor="timer"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Timer
                  </label>
                </div>
              </li>
              {isGlobalTimerEnabled ? (
                <li className="flex">
                  <Slider
                    id="timer-slider"
                    className="w-32"
                    defaultValue={[5]}
                    min={1}
                    max={6}
                    step={1}
                  />
                  <div className="grid gap-1.5 leading-none text-right grow">
                    <label
                      htmlFor="timer-slider"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Arrêter après
                    </label>
                    <p className="text-xs text-muted-foreground">6 minutes</p>
                  </div>
                </li>
              ) : (
                <></>
              )}
              <li className="flex">
                <Checkbox
                  id="audio"
                  checked={isBackgroundNoiseEnabled}
                  onCheckedChange={() => {
                    toggleBackgroundNoise();
                  }}
                />
                <div className="grid gap-1.5 leading-none text-right grow">
                  <label
                    htmlFor="audio"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Fond sonore (WIP)
                  </label>
                </div>
              </li>
              {isBackgroundNoiseEnabled ? (
                <li className="grid grid-cols-3 gap-2">
                  <Button
                    className="text-purple-950 bg-purple-50 border border-purple-950"
                    size="lg"
                  >
                    Blanc
                  </Button>
                  <Button className="text-purple-950 bg-pink-400" size="lg">
                    Rose
                  </Button>
                  <Button className="text-purple-50 bg-yellow-950" size="lg">
                    Brun
                  </Button>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OptionsDialog;
