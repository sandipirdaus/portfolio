import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { useInView } from "framer-motion";
import * as random from "maath/random/dist/maath-random.esm";
import { useTheme } from "../../context";

const Stars = ({ isLight, ...props }) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={isLight ? "#915EFF" : "#f272c8"}
          size={isLight ? 0.0018 : 0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isLight ? 0.4 : 0.9}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const { isLight } = useTheme();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef} className="w-full h-auto absolute inset-0 z-[-1] transition-opacity duration-300">
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 1.5]}
          gl={{ preserveDrawingBuffer: false, powerPreference: "low-power" }}
        >
          <Suspense fallback={null}>
            <Stars isLight={isLight} />
          </Suspense>

          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default StarsCanvas;

