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
import { Slider } from "./components/ui/slider";

import "./App.css";

import { useTimerStore } from "./hooks/timer";
import BreathingGuideController from "./components/BreathingGuideController";

import { Play, Bolt } from "lucide-react";

function App() {
  const { phase, isRunning, start, stop } = useTimerStore();

  const toggle = () => (isRunning ? stop() : start());

  return (
    <>
      <div className="absolute top-10 md:top-20 left-0 right-0 z-10 self-center p-8">
        {isRunning ? (
          <div className="flex flex-col text-6xl items-center">
            <strong>
              {phase % 4 == 1 ? "Inspirez" : phase % 4 == 3 ? "Expirez" : "..."}
            </strong>
            <Button
              onClick={toggle}
              className="mt-10"
              size="lg"
              variant="outline"
            >
              Arrêter
            </Button>
          </div>
        ) : (
          <div>
            <h1 className="text-8xl md:text-9xl">Bébou</h1>
            <div className="text-2xl md:text-3xl mt-4 tracking-tight">
              Bébou est un outil pour caler ta respiration et t'aider à te
              calmer dans un moment stressant.
            </div>
            <div className="mt-10 flex gap-2 justify-center">
              <Button onClick={toggle} size="lg">
                <Play />
                <span>Démarrer</span>
              </Button>
              <Dialog>
                <DialogTrigger disabled>
                  <Button size="lg" variant="secondary" disabled>
                    <Bolt />
                    <span>Options (WIP)</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Options</DialogTitle>
                    <DialogDescription>
                      <ul className="flex flex-col gap-5 mt-6">
                        <li className="flex">
                          <Slider
                            id="slider"
                            className="w-32"
                            defaultValue={[5]}
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
                              5 secondes
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <Checkbox id="timer" />
                          <div className="grid gap-1.5 leading-none text-right grow">
                            <label
                              htmlFor="timer"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Timer
                            </label>
                          </div>
                        </li>
                        <li className="flex">
                          <Slider
                            id="timer-slider"
                            className="w-32"
                            defaultValue={[5]}
                            min={3}
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
                            <p className="text-xs text-muted-foreground">
                              6 minutes
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <Checkbox id="audio" />
                          <div className="grid gap-1.5 leading-none text-right grow">
                            <label
                              htmlFor="audio"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Fond sonore (WIP)
                            </label>
                          </div>
                        </li>
                        <li className="grid grid-cols-3 gap-2">
                          <Button
                            className="text-purple-950 bg-purple-50 border border-purple-950"
                            size="lg"
                          >
                            Blanc
                          </Button>
                          <Button
                            className="text-purple-950 bg-pink-400"
                            size="lg"
                          >
                            Rose
                          </Button>
                          <Button
                            className="text-purple-50 bg-yellow-950"
                            size="lg"
                          >
                            Brun
                          </Button>
                        </li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
      <BreathingGuideController />
    </>
  );
}

export default App;
