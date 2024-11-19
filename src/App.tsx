import { Environment, MapControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import "./App.css";

import { useState } from "react";

const setBase64 = (
  file: File | undefined | null,
  callback: (buffer: string) => void
) => {
  if (!file) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () =>
    typeof reader.result === "string" && callback(reader.result);
};

function App() {
  const [glb, setGlb] = useState<string>("/preview/room.glb");

  const { scene } = useGLTF(glb);

  return (
    <main>
      <input
        type="file"
        placeholder=".glb"
        onChange={(e) => setBase64(e.target.files?.item(0), setGlb)}
      />

      <Canvas camera={{ fov: 45, position: [-7, 1.6, 0] }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <primitive object={scene} />
        <MapControls />

        <Environment files="/preview/berlin.hdr" background />
      </Canvas>
    </main>
  );
}

export default App;
