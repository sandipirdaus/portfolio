import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useInView } from "framer-motion";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={5} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.55 : 0.75}
        position={isMobile ? [0.8, -2.6, -1.8] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isManualRotate, setIsManualRotate] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    // Add a listener for changes to the screen size (<= 640px)
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
      if (!event.matches) {
        setIsManualRotate(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handle manual rotate toggle on mobile
  const toggleManualRotate = () => {
    setIsManualRotate((prev) => {
      const next = !prev;
      if (next) {
        // Auto-lock back to scroll mode after 15 seconds of inactivity
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsManualRotate(false);
        }, 15000);
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
      return next;
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Mobile Interactive 3D Control Pill */}
      {isMobile && (
        <div className="absolute bottom-[92px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-auto">
          <button
            onClick={toggleManualRotate}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-md border transition-all duration-300 shadow-lg flex items-center gap-1.5 active:scale-95 ${
              isManualRotate
                ? "bg-[#915EFF] text-white border-white/50 shadow-[0_0_16px_rgba(145,94,255,0.7)] animate-pulse"
                : "bg-black-200/90 text-white/90 border-[#915EFF]/50 hover:border-[#915EFF]"
            }`}
          >
            <span>{isManualRotate ? "🔒" : "🔄"}</span>
            <span>
              {isManualRotate ? "Selesai (Kunci Scroll)" : "Sentuh untuk Putar Manual"}
            </span>
          </button>
          {isManualRotate && (
            <span className="text-[9px] text-white/90 bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
              Geser 1 jari untuk memutar 3D
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full h-full ${
          isMobile && !isManualRotate ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {isInView && (
          <Canvas
            frameloop={isMobile && !isManualRotate ? "always" : "demand"}
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: false, powerPreference: "low-power" }}
            style={{ touchAction: isManualRotate ? "none" : "pan-y" }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <OrbitControls
                enableZoom={false}
                enableRotate={!isMobile || isManualRotate}
                autoRotate={!isManualRotate}
                autoRotateSpeed={0.9}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
              <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
          </Canvas>
        )}
      </div>
    </div>
  );
};

export default ComputersCanvas;
