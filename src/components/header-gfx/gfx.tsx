import style from './gfx.module.css';
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { EffectComposer, ASCII, Noise, TiltShift2 } from '@react-three/postprocessing'

import { SVGLoader } from "three/examples/jsm/Addons.js";

// import { noise } from "./perlin";

const vertexShader = `uniform float u_time;

varying float vZ;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  modelPosition.y += sin(modelPosition.x * 5.0 + u_time * 3.0) * 0.1;
  modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;
  
  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`
const fragmentShader = `uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying float vZ;


void main() {
  vec3 color = mix(u_colorA, u_colorB, vZ * 2.0 + 0.5); 
  gl_FragColor = vec4(color, 1.0);
}
`

function Terrain() {
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new THREE.Color("#999999") },
      u_colorB: { value: new THREE.Color("#ffffff") },
    }), []
  );


  useFrame((state) => {
    const { clock } = state;
    (mesh.current!.material as THREE.ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime();
  });


  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={10}>
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
          color="#000000"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function HeaderGfx() {
  return (
    <div className={style.canvas}>
      <Canvas camera={{}} style={{ position: 'absolute', zIndex: 2 }}>
        <ambientLight />
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Logo />
        <EffectComposer multisampling={4}>
          {/* <Noise premultiply blendFunction={THREE.AdditiveBlending} /> */}

          {/* <TiltShift2 blur={0.5} /> */}
        </EffectComposer>
      </Canvas>


      <Canvas camera={{ position: [0, 2.0, 0] }} style={{ position: 'absolute', zIndex: 1 }}>
        <ambientLight />
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Terrain />

      </Canvas>
    </div>
  );
}

export default HeaderGfx