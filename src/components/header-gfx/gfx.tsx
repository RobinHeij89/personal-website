import style from './gfx.module.css';
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { EffectComposer, ASCII, Noise, TiltShift2 } from '@react-three/postprocessing'

import { SVGLoader } from "three/examples/jsm/Addons.js";

// import { noise } from "./perlin";

import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";


function Terrain() {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new THREE.Color("#FFE486") },
      u_colorB: { value: new THREE.Color("#FEB3D9") },
    }), []
  );

  useFrame(({ clock }) => {
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

function Logo() {
  const svgData = useLoader(SVGLoader, "logo.svg");
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(true));
  }, [svgData]);

  const ref = useRef<THREE.Group>(null!)
  useFrame(() => {
    ref.current.rotation.y = Math.sin((window.scrollY / 500))
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
          color="#ffffff"
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
        <Logo />
        <Terrain />
        <EffectComposer multisampling={4}>
          {/* <Noise premultiply blendFunction={THREE.AdditiveBlending} /> */}

          {/* <TiltShift2 blur={0.5} /> */}
          {/* <ASCII /> */}
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default HeaderGfx