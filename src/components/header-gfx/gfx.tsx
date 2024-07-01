import style from './gfx.module.css';
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { SVGLoader } from "three/examples/jsm/Addons.js";

function Logo() {
  const svgData = useLoader(SVGLoader, "logo.svg");
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(true));
  }, [svgData]);

  const ref = useRef<THREE.Group>(null!)
  useFrame(() => {
    ref.current.rotation.y = Math.sin((window.scrollY / 500))
  })

  const scale = 0.25;

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
      </Canvas>
    </div>
  );
}

export default HeaderGfx