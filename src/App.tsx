import { useState, useEffect, FunctionComponent } from 'react';

import { Button } from "@/components/ui/button"

import './App.css'

const HalfCircleBreath: FunctionComponent<{value: number, duration: number}> = ({ value, duration }) => {
  // Scale factor mapped from 0-100 to a range suitable for SVG
  const scale = 0.5 + (value / 100) * 0.5; // Scale from 0.5 (smallest) to 1 (full size)
  const translateY = (1 - scale) * 50; // Translate upward as scale increases


  return (
    <svg className="text-purple-300 drop-shadow-2xl self-end bottom-0 fill-current h-2/3 w-screen" viewBox="0 0 200 200">

      {/* Expanding and retracting half-circle */}
      <path
        d="M -150,250 A 90,90 0 0,1 350,250"
        stroke="none"
        strokeLinecap="round"
        style={{
          transform: `scaleX(${scale / 0.9}) scaleY(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center bottom",
          transition: `transform ${duration}s`
        }}
      />
    </svg>
  );
};

function App() {
  /*
  Phase % 4 = 1 => Inspiration
  Phase % 4 = 2 => Hold
  Phase % 4 = 3 => Expiration
  Phase % 4 = 0 => Hold
  */
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(-1);
  const [timer, setTimer] = useState(0); // Start with 2 seconds
  const [countdown, setCountdown] = useState(timer); // Countdown value

  useEffect(() => {
    if (running) {
      if (countdown > 0) {
        const interval = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      } else {
        const newTimer = [2, 0].includes(phase % 4) ? 2 : isShorterPeriods ? 3 : 5;

        setTimer(newTimer);
        setPhase(phase + 1);
        setCountdown(timer);
      }
    }
  }, [countdown, phase, running, timer]);

  const toggle = () => {
    if (running) {
      setRunning(false);
      setTimer(0);
      setPhase(-1);
    } else {
      setRunning(true);
    }
  }


  const isInhalePhase = [1, 2].includes(phase % 4);
  const isShorterPeriods = phase <= 12;

  return (
    <>
      <div className="absolute top-10 left-0 right-0 z-10 self-center p-8">
        {running ?
          <div className="flex flex-col text-6xl items-center">
            <strong>{phase % 4 == 1 ? "Inspirez" : phase % 4 == 3 ? "Expirez" : "..."}</strong>
            <Button onClick={toggle} className="mt-10" size="lg" variant="outline">Arrêter</Button>
          </div> : <div>
            <h1 className='text-5xl'>Bébou</h1>
            <h2 className='text-2xl'>(BrEathe-in, Breathe-OUt)</h2>
            <div className='mt-4'>
              Bébou est un outil pour caler ta respiration
              et t'aider à te calmer dans un moment stressant.
            </div>
            <Button onClick={toggle} className="mt-10" size="lg" variant="outline">Démarrer</Button>
          </div>
        }
      </div>
      <HalfCircleBreath value={isInhalePhase ? 100 : 0} duration={isShorterPeriods ? 4 : 6} />
    </>
  )
}

export default App
