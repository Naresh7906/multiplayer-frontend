import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import Experience from "./components/Experience";
import { Room } from "colyseus.js";
import { connectRoom } from "./utilities/connectRoom";
import { EcctrlJoystick } from "ecctrl";

export function App() {
    const [room,setRoom] = useState<Room | null>(null);
    useEffect(()=>{
        connectRoom().then(setRoom);
    },[])
  return (
    <>
      <Leva collapsed />
      <EcctrlJoystickControls />
      <Canvas
        shadows
        camera={{
          fov: 65,
          near: 0.1,
          far: 1000,
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") {
            (e.target as HTMLCanvasElement).requestPointerLock();
          }
        }}
      >
        <Suspense fallback={null}>
          <Experience room={room} />
        </Suspense>
      </Canvas>
    </>
  );
}


const EcctrlJoystickControls = () => {
    const [isTouchScreen, setIsTouchScreen] = useState(false);
    useEffect(() => {
      // Check if using a touch control device, show/hide joystick
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        setIsTouchScreen(true);
      } else {
        setIsTouchScreen(false);
      }
    }, []);
  
  
    return <>{isTouchScreen && <EcctrlJoystick buttonNumber={5} />}</>;
  };
  