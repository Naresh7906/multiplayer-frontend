import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useMemo, useState, useEffect } from "react";

export default function ShotCube() {
  const { camera, scene } = useThree();
  const [cubeMesh, setCubeMesh] = useState([]);
  const cubeRef = useRef<RapierRigidBody>();

  const direction = useMemo(() => new THREE.Vector3(), []);

  const clickToCreateBox = () => {
    let pos = scene.getObjectByName("CharacterModel")?.getWorldPosition(direction)
    if (document.pointerLockElement) {
      const newMesh = (
        <mesh
          position={[pos.x, pos.y + 1.5, pos.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      );
      setCubeMesh((prevMeshes) => [...prevMeshes, newMesh]);
    }
  };

  useEffect(() => {
    camera.getWorldDirection(direction);
    if (cubeMesh.length > 0) {
      cubeRef.current?.setLinvel(
        new THREE.Vector3(
          direction.x * 100,
          direction.y * 100 - 2,
          direction.z * 100
        ),
        false
      );
    }
  }, [cubeMesh]);

  useEffect(() => {
    window.addEventListener("click", () => clickToCreateBox());

    return () => {
      window.removeEventListener("click", () => clickToCreateBox());
    };
  }, []);

  return (
    <>
      {cubeMesh.map((item, i) => {
        return (
          <RigidBody key={i} mass={0.6} ref={cubeRef}>
            {item}
          </RigidBody>
        );
      })}
    </>
  );
}
