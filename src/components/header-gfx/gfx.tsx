import style from './gfx.module.css';
import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { EffectComposer, ASCII, Noise, TiltShift2 } from '@react-three/postprocessing'

import { SVGLoader } from "three/examples/jsm/Addons.js";

function Logo() {
  const svgData = useLoader(SVGLoader, "logo.svg");
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(true));
  }, [svgData]);

  const ref = useRef<THREE.Group>(null!)
  useFrame((state, delta) => {
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.4
  })

  const scale = 1.5;

  return (
    <group
      ref={ref}
    >
      <mesh
        scale={0.1 * scale}
        rotation={[1 * Math.PI, 0, 0]}
        position={[(-2.5 * scale), (1.75 * scale), 0]}
      >
        {shapes.map((s, i) => (
          <extrudeGeometry
            key={i}
            args={[
              s,
              {
                depth: 1,
                bevelEnabled: true,
                steps: 30,
              },
            ]}
          />
        ))}
        <meshPhongMaterial
          color="#D84E30"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function HeaderGfx() {
  return (
    <div className={style.canvas}>
      <Canvas>
        <ambientLight />
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {/* <Box position={[0, 0, 0]} /> */}
        <Logo />
        <EffectComposer multisampling={4}>
          <Noise premultiply blendFunction={THREE.AdditiveBlending} />

          <TiltShift2 blur={0.5} />
          <ASCII />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default HeaderGfx