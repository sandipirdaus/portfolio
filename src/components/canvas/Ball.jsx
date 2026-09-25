import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture
} from "@react-three/drei";
import { useInView } from "framer-motion";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("Ball canvas 3D render issue, using fallback icon:", error);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center p-2">
          <img
            src={this.props.icon}
            alt="tech icon"
            className="w-16 h-16 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    return this.props.children;
  }
}

const BallCanvas = ({ icon }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "100px" });
  const [retryKey, setRetryKey] = useState(0);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    if (contextLost) {
      const timer = setTimeout(() => {
        setContextLost(false);
        setRetryKey((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [contextLost]);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
      {isInView && !contextLost ? (
        <CanvasErrorBoundary
          icon={icon}
          resetKey={retryKey}
        >
          <Canvas
            key={retryKey}
            frameloop="demand"
            dpr={[1, 1.5]}
            gl={{ preserveDrawingBuffer: false, powerPreference: "low-power" }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener(
                "webglcontextlost",
                (event) => {
                  event.preventDefault();
                  setContextLost(true);
                },
                false
              );
              gl.domElement.addEventListener(
                "webglcontextrestored",
                () => {
                  setContextLost(false);
                },
                false
              );
            }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <OrbitControls enableZoom={false} />
              <Ball imgUrl={icon} />
            </Suspense>

            <Preload all />
          </Canvas>
        </CanvasErrorBoundary>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-2">
          <img
            src={icon}
            alt="tech icon"
            className="w-16 h-16 object-contain drop-shadow-md opacity-80"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default BallCanvas;
