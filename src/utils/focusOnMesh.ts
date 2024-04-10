import gsap from "gsap";
import { RefObject } from "react";
import * as THREE from "three";

import { CameraStatusType } from "@/src/types/camera";
import { viewTypes, WindowType } from "@/src/types/views";
import { views } from "@/src/utils/views/index";

export const focusOnMesh = (
  meshRef: RefObject<THREE.Mesh>,
  setActiveMesh: React.Dispatch<React.SetStateAction<THREE.Mesh | null>>,
  camera: THREE.Camera,
  currentView: viewTypes,
  windowType: WindowType
) => {

  if (meshRef.current) {
    const currentViewsObj = views.find((view) => view.slug === currentView) || views[0];
    const newPosition = currentViewsObj.windowWidths[windowType].cameraStatusForFocus.positionPlusModel;
    const worldPosition = new THREE.Vector3();
    const lookAtPosition = meshRef.current.getWorldPosition(worldPosition);
    setActiveMesh(meshRef.current);

    gsap.to(camera.position, {
      x: lookAtPosition.x + newPosition.x,
      y: lookAtPosition.y + newPosition.y,
      z: lookAtPosition.z + newPosition.z,
      duration: 0.3,
      ease: "power3.out",
    });

    const lookAtTween = { ...lookAtPosition };
    gsap.to(lookAtTween, {
      x: lookAtPosition.x,
      y: lookAtPosition.y,
      z: lookAtPosition.z,
      duration: 0.3,
      ease: "power3.out",
      onUpdate: () => camera.lookAt(lookAtTween.x, lookAtTween.y, lookAtTween.z)
    });
  }
};

export const resetCameraPosition = (
  camera: THREE.Camera,
  savedCameraStatusType: CameraStatusType
) => {
  camera.position.x = savedCameraStatusType.position[0];
  camera.position.y = savedCameraStatusType.position[1];
  camera.position.z = savedCameraStatusType.position[2];
  camera.rotation.x = savedCameraStatusType.rotation[0];
  camera.rotation.y = savedCameraStatusType.rotation[1];
  camera.rotation.z = savedCameraStatusType.rotation[2];
};
