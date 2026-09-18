// import { useRef, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";

// // Deterministic random generator.
// // Unlike Math.random(), this is pure and safe for React rendering.
// const random = (seed) => {
//   const x = Math.sin(seed) * 10000;
//   return x - Math.floor(x);
// };

// const Particles = ({ count = 200 }) => {
//   const mesh = useRef();

//   const { positions, speeds } = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     const speeds = new Float32Array(count);

//     for (let i = 0; i < count; i++) {
//       const xRandom = random(i * 3 + 1);
//       const yRandom = random(i * 3 + 2);
//       const zRandom = random(i * 3 + 3);
//       const speedRandom = random(i * 3 + 4);

//       positions[i * 3] =
//         (xRandom - 0.5) * 10;

//       positions[i * 3 + 1] =
//         yRandom * 10 + 5;

//       positions[i * 3 + 2] =
//         (zRandom - 0.5) * 10;

//       speeds[i] =
//         0.005 + speedRandom * 0.001;
//     }

//     return {
//       positions,
//       speeds,
//     };
//   }, [count]);

//   useFrame(() => {
//     if (!mesh.current) return;

//     const positionAttribute =
//       mesh.current.geometry.attributes.position;

//     const positionArray =
//       positionAttribute.array;

//     for (let i = 0; i < count; i++) {
//       const index = i * 3 + 1;

//       let y = positionArray[index];

//       y -= speeds[i];

//       if (y < -2) {
//         // Deterministic reset position
//         y = random(i * 7 + Math.floor(y * -100)) * 10 + 5;
//       }

//       positionArray[index] = y;
//     }

//     positionAttribute.needsUpdate = true;
//   });

//   return (
//     <points ref={mesh}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={count}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>

//       <pointsMaterial
//         color="#ffffff"
//         size={0.05}
//         transparent
//         opacity={0.9}
//         depthWrite={false}
//       />
//     </points>
//   );
// };

// export default Particles;

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const Particles = ({ count = 200 }) => {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 10 + 2, // higher starting point
          (Math.random() - 0.5) * 10,
        ],
        speed: 0.005 + Math.random() * 0.005,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = Math.random() * 10 + 5;
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = new Float32Array(count * 3);
  particles.forEach((p, i) => {
    positions[i * 3] = p.position[0];
    positions[i * 3 + 1] = p.position[1];
    positions[i * 3 + 2] = p.position[2];
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;

