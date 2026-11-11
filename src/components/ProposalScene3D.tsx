import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ProposalScene3DProps {
  isOpen: boolean;
  onOpenTrigger?: () => void;
  className?: string;
}

export const ProposalScene3D: React.FC<ProposalScene3DProps> = ({
  isOpen,
  onOpenTrigger,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as required by Three.js skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 520;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    // Warm deep burgundy/midnight horizon fog
    scene.fog = new THREE.FogExp2(0x10090D, 0.08);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.9, 3.8);

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    // Warm Directional Key Light
    const keyLight = new THREE.DirectionalLight(0xFFF0DD, 2.8);
    keyLight.position.set(2.5, 4.5, 3.0);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Cool Hemisphere Fill Light
    const hemiLight = new THREE.HemisphereLight(0xFDF4E7, 0x350D19, 1.4);
    scene.add(hemiLight);

    // Romantic Wine Red Rim Light
    const rimLight = new THREE.DirectionalLight(0xBD3A58, 2.2);
    rimLight.position.set(-3.0, 2.0, -2.5);
    scene.add(rimLight);

    // Inner Golden Glow Light inside ring box
    const innerLight = new THREE.PointLight(0xFFD37A, 0, 3.0);
    innerLight.position.set(0, 0.45, 0);
    scene.add(innerLight);

    // 5. Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xD6B779,
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.5
    });

    const velvetMaterial = new THREE.MeshStandardMaterial({
      color: 0x480816, // Luxurious deep wine red velvet
      roughness: 0.88,
      metalness: 0.04,
      envMapIntensity: 0.4
    });

    const cushionMaterial = new THREE.MeshStandardMaterial({
      color: 0x1A050A, // Dark black-burgundy cushion
      roughness: 0.95,
      metalness: 0.0
    });

    const satinMaterial = new THREE.MeshStandardMaterial({
      color: 0xF7EDE5, // Warm ivory silk lining
      roughness: 0.38,
      metalness: 0.1
    });

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      roughness: 0.02,
      metalness: 0.05,
      ior: 2.417,
      transmission: isSoftwareGl ? 0 : 0.94,
      transparent: true,
      opacity: isSoftwareGl ? 0.45 : 1.0,
      thickness: 1.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      attenuationColor: new THREE.Color(0xFFF7FA),
      attenuationDistance: 0.8,
      envMapIntensity: 2.2
    });

    // 6. Geometry construction: Composite Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Pedestal
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -0.55;

    // Marble plinth
    const plinthGeo = new THREE.CylinderGeometry(1.4, 1.5, 0.45, 48);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x160C12,
      roughness: 0.35,
      metalness: 0.2
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.receiveShadow = !isSoftwareGl;
    pedestalGroup.add(plinth);

    // Gold decorative band on plinth
    const goldBandGeo = new THREE.CylinderGeometry(1.42, 1.42, 0.05, 48);
    const goldBand = new THREE.Mesh(goldBandGeo, goldMaterial);
    goldBand.position.y = 0.18;
    pedestalGroup.add(goldBand);

    // Ground contact shadow disc
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.22;
    pedestalGroup.add(shadowMesh);

    mainGroup.add(pedestalGroup);

    // Ring Box Root
    const boxGroup = new THREE.Group();
    boxGroup.position.y = -0.12;

    // --- Lower Box Base ---
    const baseBoxGeo = new THREE.BoxGeometry(1.05, 0.42, 1.05);
    const baseBoxMesh = new THREE.Mesh(baseBoxGeo, velvetMaterial);
    baseBoxMesh.castShadow = !isSoftwareGl;
    baseBoxMesh.receiveShadow = !isSoftwareGl;
    baseBoxMesh.position.y = 0.21;
    boxGroup.add(baseBoxMesh);

    // Lower box gold rim
    const baseRimGeo = new THREE.BoxGeometry(1.08, 0.03, 1.08);
    const baseRimMesh = new THREE.Mesh(baseRimGeo, goldMaterial);
    baseRimMesh.position.y = 0.42;
    boxGroup.add(baseRimMesh);

    // Cushion
    const cushionGeo = new THREE.BoxGeometry(0.92, 0.18, 0.92);
    const cushionMesh = new THREE.Mesh(cushionGeo, cushionMaterial);
    cushionMesh.position.y = 0.36;
    boxGroup.add(cushionMesh);

    // Cushion ring slot groove
    const slotGeo = new THREE.BoxGeometry(0.55, 0.08, 0.06);
    const slotMesh = new THREE.Mesh(slotGeo, new THREE.MeshBasicMaterial({ color: 0x050102 }));
    slotMesh.position.set(0, 0.43, 0);
    boxGroup.add(slotMesh);

    // --- Box Lid (Hinged at the rear) ---
    // Rear hinge axis is at z = -0.525, y = 0.42
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0.42, -0.525);

    const lidMeshGeo = new THREE.BoxGeometry(1.05, 0.40, 1.05);
    const lidMesh = new THREE.Mesh(lidMeshGeo, velvetMaterial);
    lidMesh.castShadow = !isSoftwareGl;
    // Offset lid mesh so its pivot is at the rear bottom edge
    lidMesh.position.set(0, 0.20, 0.525);
    lidPivot.add(lidMesh);

    // Lid gold trim rim
    const lidRimGeo = new THREE.BoxGeometry(1.08, 0.03, 1.08);
    const lidRimMesh = new THREE.Mesh(lidRimGeo, goldMaterial);
    lidRimMesh.position.set(0, 0.015, 0.525);
    lidPivot.add(lidRimMesh);

    // Inner satin top
    const innerSatinGeo = new THREE.BoxGeometry(0.92, 0.02, 0.92);
    const innerSatin = new THREE.Mesh(innerSatinGeo, satinMaterial);
    innerSatin.position.set(0, 0.03, 0.525);
    lidPivot.add(innerSatin);

    // Golden front clasp
    const claspGeo = new THREE.BoxGeometry(0.12, 0.08, 0.04);
    const claspMesh = new THREE.Mesh(claspGeo, goldMaterial);
    claspMesh.position.set(0, 0.04, 1.06);
    lidPivot.add(claspMesh);

    // Rear golden hinges
    const hingeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.2, 16);
    hingeGeo.rotateZ(Math.PI / 2);
    const hingeLeft = new THREE.Mesh(hingeGeo, goldMaterial);
    hingeLeft.position.set(-0.32, 0, 0);
    const hingeRight = new THREE.Mesh(hingeGeo, goldMaterial);
    hingeRight.position.set(0.32, 0, 0);
    lidPivot.add(hingeLeft);
    lidPivot.add(hingeRight);

    boxGroup.add(lidPivot);

    // --- Engagement Ring ---
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, 0.46, 0);

    // Ring band (luxury champagne gold torus)
    const bandGeo = new THREE.TorusGeometry(0.24, 0.038, 24, 48);
    bandGeo.rotateX(Math.PI / 2);
    const bandMesh = new THREE.Mesh(bandGeo, goldMaterial);
    bandMesh.castShadow = !isSoftwareGl;
    ringGroup.add(bandMesh);

    // Prong setting crown basket
    const crownGeo = new THREE.CylinderGeometry(0.09, 0.04, 0.12, 6, 1, true);
    const crownMesh = new THREE.Mesh(crownGeo, goldMaterial);
    crownMesh.position.set(0, 0.28, 0);
    ringGroup.add(crownMesh);

    // 4 Solitaire prongs
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const prongGeo = new THREE.CylinderGeometry(0.012, 0.016, 0.15, 8);
      const prongMesh = new THREE.Mesh(prongGeo, goldMaterial);
      prongMesh.position.set(Math.cos(angle) * 0.075, 0.32, Math.sin(angle) * 0.075);
      prongMesh.rotation.z = Math.sin(angle) * 0.12;
      prongMesh.rotation.x = -Math.cos(angle) * 0.12;
      ringGroup.add(prongMesh);
    }

    // Solitaire Brilliant Cut Diamond
    // Formed with an upper brilliant table and lower pavilion
    const diamondCrownGeo = new THREE.ConeGeometry(0.14, 0.10, 16);
    diamondCrownGeo.rotateX(Math.PI);
    const diamondCrown = new THREE.Mesh(diamondCrownGeo, diamondMaterial);
    diamondCrown.position.set(0, 0.37, 0);
    diamondCrown.castShadow = !isSoftwareGl;
    ringGroup.add(diamondCrown);

    const diamondPavilionGeo = new THREE.ConeGeometry(0.14, 0.16, 16);
    const diamondPavilion = new THREE.Mesh(diamondPavilionGeo, diamondMaterial);
    diamondPavilion.position.set(0, 0.28, 0);
    ringGroup.add(diamondPavilion);

    // Diamond Sparkle Light
    const diamondSparkle = new THREE.PointLight(0xFFFFFF, 1.2, 1.5);
    diamondSparkle.position.set(0, 0.40, 0);
    ringGroup.add(diamondSparkle);

    boxGroup.add(ringGroup);
    mainGroup.add(boxGroup);

    // 7. Floating Rose Petals & Golden Sparkles
    const petalCount = 28;
    const petalGeos: THREE.Mesh[] = [];
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0x8C1B34, // Velvet rose crimson
      roughness: 0.75,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    // Petal curved shape
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.08, 0.04, 0.12, 0.18, 0.04, 0.26);
    petalShape.bezierCurveTo(0, 0.30, -0.04, 0.26, -0.12, 0.18);
    petalShape.bezierCurveTo(-0.08, 0.04, 0, 0, 0, 0);
    const petalGeometry = new THREE.ShapeGeometry(petalShape);

    for (let i = 0; i < petalCount; i++) {
      const pMesh = new THREE.Mesh(petalGeometry, petalMat);
      pMesh.position.set(
        (Math.random() - 0.5) * 4.2,
        Math.random() * 3.5 - 0.5,
        (Math.random() - 0.5) * 3.5
      );
      pMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const s = 0.6 + Math.random() * 0.7;
      pMesh.scale.set(s, s, s);
      pMesh.userData = {
        speedY: 0.003 + Math.random() * 0.006,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2
      };
      scene.add(pMesh);
      petalGeos.push(pMesh);
    }

    // Golden Sparkle particles
    const sparkleCount = 60;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePos[i] = (Math.random() - 0.5) * 3.8;
      sparklePos[i + 1] = Math.random() * 3.2 - 0.4;
      sparklePos[i + 2] = (Math.random() - 0.5) * 3.2;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));
    const sparkleCanvas = document.createElement('canvas');
    sparkleCanvas.width = 32;
    sparkleCanvas.height = 32;
    const spCtx = sparkleCanvas.getContext('2d')!;
    const spGrad = spCtx.createRadialGradient(16, 16, 1, 16, 16, 15);
    spGrad.addColorStop(0, 'rgba(255, 235, 175, 1)');
    spGrad.addColorStop(0.3, 'rgba(214, 183, 121, 0.8)');
    spGrad.addColorStop(1, 'rgba(214, 183, 121, 0)');
    spCtx.fillStyle = spGrad;
    spCtx.fillRect(0, 0, 32, 32);
    const sparkleTex = new THREE.CanvasTexture(sparkleCanvas);
    sparkleTex.colorSpace = THREE.SRGBColorSpace;
    const sparkleMat = new THREE.PointsMaterial({
      size: 0.09,
      map: sparkleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparkles);

    // 8. Mouse Parallax
    let targetRotY = 0;
    let targetRotX = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = nx * 0.25;
      targetRotX = ny * 0.12;
    };
    container.addEventListener('mousemove', onMouseMove);

    // 9. Animation State Variables
    let currentLidAngle = 0;
    let targetLidAngle = 0;
    let ringElevateY = 0;
    let targetElevateY = 0;
    let innerLightTarget = 0;

    // 10. Frame Loop & Software WebGL pacing
    let frameId = 0;
    let destroyed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (destroyed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 6);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 6);
    }

    const startTime = performance.now();
    let lastTime = performance.now();

    function tick() {
      if (destroyed) return;
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsedTime = (now - startTime) / 1000;

      // Handle Open / Close target
      const open = isOpenRef.current;
      targetLidAngle = open ? -2.05 : 0; // ~118 degrees open
      targetElevateY = open ? 0.32 : 0;
      innerLightTarget = open ? 4.5 : 0;

      // Exponential damping
      currentLidAngle += (targetLidAngle - currentLidAngle) * Math.min(1, delta * 3.8);
      ringElevateY += (targetElevateY - ringElevateY) * Math.min(1, delta * 3.2);
      innerLight.intensity += (innerLightTarget - innerLight.intensity) * Math.min(1, delta * 4.0);

      lidPivot.rotation.x = currentLidAngle;
      ringGroup.position.y = 0.46 + ringElevateY;

      // Slowly spin the ring when opened to glisten facets
      if (open) {
        ringGroup.rotation.y += delta * 0.65;
        diamondSparkle.intensity = 1.4 + Math.sin(elapsedTime * 6) * 0.6;
      }

      // Parallax smooth interpolation
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

      // Subtle breathing pedestal float
      boxGroup.position.y = -0.12 + Math.sin(elapsedTime * 1.5) * 0.035;

      // Floating petals movement
      petalGeos.forEach((p) => {
        p.position.y -= p.userData.speedY;
        p.rotation.x += p.userData.rotSpeedX;
        p.rotation.y += p.userData.rotSpeedY;
        p.position.x += Math.sin(elapsedTime + p.userData.wobble) * 0.002;
        if (p.position.y < -1.2) {
          p.position.y = 3.2;
          p.position.x = (Math.random() - 0.5) * 3.8;
        }
      });

      // Drifting golden sparkles
      const positions = sparkleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < sparkleCount * 3; i += 3) {
        positions[i] += 0.003;
        if (positions[i] > 3.0) {
          positions[i] = -0.4;
        }
      }
      sparkleGeo.attributes.position.needsUpdate = true;

      // Camera smooth glide
      const targetCamZ = open ? 2.9 : 3.8;
      const targetCamY = open ? 1.45 : 1.9;
      camera.position.z += (targetCamZ - camera.position.z) * Math.min(1, delta * 2.5);
      camera.position.y += (targetCamY - camera.position.y) * Math.min(1, delta * 2.5);
      camera.lookAt(0, 0.42 + ringElevateY * 0.6, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    // Kick off animation loop
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 640;
      const nh = container.clientHeight || 520;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      destroyed = true;
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      renderer.dispose();
      scene.clear();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[480px] sm:h-[560px] md:h-[620px] flex items-center justify-center overflow-hidden cursor-pointer select-none ${className}`}
      onClick={onOpenTrigger}
      title={isOpen ? 'Click to admire ring' : 'Click to open ring box'}
      data-testid="proposal-3d-canvas-container"
    />
  );
};
