import { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeDBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // ─── Renderer ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x02020f, 1);
    mount.appendChild(renderer.domElement);

    // ─── Scene & Camera ─────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);

    // ─── Mouse tracking ─────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / mount.clientWidth - 0.5) * 2;
      mouse.ty = -(e.clientY / mount.clientHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ─── 1. AURORA RIBBONS ───────────────────────────────────────
    const ribbonData = [
      { color: 0x6d28d9, z: -8, speed: 0.18, amp: 2.2, freq: 0.18, phase: 0 },
      { color: 0x0ea5e9, z: -6, speed: 0.25, amp: 1.6, freq: 0.24, phase: 2.1 },
      { color: 0xdb2777, z: -4, speed: 0.2, amp: 1.9, freq: 0.2, phase: 4.2 },
    ];

    const ribbons = ribbonData.map((d) => {
      const geo = new THREE.PlaneGeometry(60, 3, 120, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: d.color,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = d.z;
      mesh.userData = d;
      scene.add(mesh);
      return mesh;
    });

    // ─── 2. PARTICLE NEBULA ──────────────────────────────────────
    const PCOUNT = 180;
    const pPos = new Float32Array(PCOUNT * 3);
    const pVel = new Float32Array(PCOUNT * 3);
    const pData = new Float32Array(PCOUNT * 3);

    for (let i = 0; i < PCOUNT; i++) {
      const x = (Math.random() - 0.5) * 38;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 6;
      pPos[i * 3] = x;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = z;
      pData[i * 3] = x;
      pData[i * 3 + 1] = y;
      pData[i * 3 + 2] = z;
      pVel[i * 3] = (Math.random() - 0.5) * 0.012;
      pVel[i * 3 + 1] = (Math.random() - 0.5) * 0.009;
      pVel[i * 3 + 2] = 0;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // ─── 3. CONSTELLATION LINES ──────────────────────────────────
    const MAX_CONN = 220;
    const lPos = new Float32Array(MAX_CONN * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
    lGeo.setDrawRange(0, 0);
    const lMat = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(lGeo, lMat));

    // ─── 4. DEEP STARS ───────────────────────────────────────────
    const SCOUNT = 600;
    const sPos = new Float32Array(SCOUNT * 3);
    for (let i = 0; i < SCOUNT * 3; i += 3) {
      sPos[i] = (Math.random() - 0.5) * 80;
      sPos[i + 1] = (Math.random() - 0.5) * 50;
      sPos[i + 2] = -15 - Math.random() * 10;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const sMat = new THREE.PointsMaterial({
      color: 0xdde8ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    scene.add(new THREE.Points(sGeo, sMat));

    // ─── 5. SHOOTING STARS ───────────────────────────────────────
    const STREAK_COUNT = 6;
    const streaks = Array.from({ length: STREAK_COUNT }, () => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-3.5, -0.15, 0),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: 0xe0d4ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      line.visible = false;
      scene.add(line);
      return {
        line,
        active: false,
        cooldown: 3 + Math.random() * 6,
        timer: Math.random() * 5,
        speed: 0,
      };
    });

    const spawnStreak = (s) => {
      s.line.position.set(
        16 + Math.random() * 6,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 3,
      );
      s.line.material.opacity = 0.9;
      s.line.visible = true;
      s.active = true;
      s.timer = 0;
      s.speed = 0.4 + Math.random() * 0.35;
    };

    // ─── 6. GLOWING ORB ──────────────────────────────────────────
    const orbGeo = new THREE.SphereGeometry(0.6, 16, 16);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(0, 0, 2);
    scene.add(orb);

    const haloGeo = new THREE.RingGeometry(0.9, 1.4, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(orb.position);
    scene.add(halo);

    // ─── Animation ───────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;
    const MAX_DIST_SQ = 5.5 * 5.5;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const t = clock.elapsedTime;

      // Smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // Camera parallax
      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.025;
      camera.position.y += (mouse.y * 0.7 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      // Ribbons
      ribbons.forEach((r) => {
        const d = r.userData;
        const arr = r.geometry.attributes.position.array;
        const n = arr.length / 3;
        for (let i = 0; i < n; i++) {
          const x = arr[i * 3];
          arr[i * 3 + 1] =
            Math.sin(x * d.freq + t * d.speed + d.phase) * d.amp +
            Math.sin(x * d.freq * 1.7 + t * d.speed * 0.6 + d.phase) *
              (d.amp * 0.35);
        }
        r.geometry.attributes.position.needsUpdate = true;
        r.material.opacity = 0.06 + Math.sin(t * 0.4 + d.phase) * 0.025;
      });

      // Particles
      for (let i = 0; i < PCOUNT; i++) {
        const ix = i * 3,
          iy = ix + 1;
        pPos[ix] += pVel[ix];
        pPos[iy] += pVel[iy];
        if (pPos[ix] > 19) pPos[ix] = -19;
        else if (pPos[ix] < -19) pPos[ix] = 19;
        if (pPos[iy] > 11) pPos[iy] = -11;
        else if (pPos[iy] < -11) pPos[iy] = 11;
        pData[ix] = pPos[ix];
        pData[iy] = pPos[iy];
      }
      pGeo.attributes.position.needsUpdate = true;
      pMat.color.setHSL(0.72 + Math.sin(t * 0.07) * 0.06, 0.75, 0.72);

      // Connections
      let connCount = 0;
      for (let i = 0; i < PCOUNT && connCount < MAX_CONN; i++) {
        const ax = pData[i * 3],
          ay = pData[i * 3 + 1],
          az = pData[i * 3 + 2];
        for (let j = i + 1; j < PCOUNT && connCount < MAX_CONN; j++) {
          const dx = ax - pData[j * 3];
          const dy = ay - pData[j * 3 + 1];
          if (dx * dx + dy * dy < MAX_DIST_SQ) {
            const b = connCount * 6;
            lPos[b] = ax;
            lPos[b + 1] = ay;
            lPos[b + 2] = az;
            lPos[b + 3] = pData[j * 3];
            lPos[b + 4] = pData[j * 3 + 1];
            lPos[b + 5] = pData[j * 3 + 2];
            connCount++;
          }
        }
      }
      lGeo.attributes.position.needsUpdate = true;
      lGeo.setDrawRange(0, connCount * 2);

      // Shooting stars
      streaks.forEach((s) => {
        if (!s.active) {
          s.timer += delta;
          if (s.timer > s.cooldown) spawnStreak(s);
        } else {
          s.line.position.x -= s.speed;
          s.line.material.opacity -= delta * 1.1;
          if (s.line.position.x < -18 || s.line.material.opacity <= 0) {
            s.active = false;
            s.line.visible = false;
            s.timer = 0;
            s.cooldown = 3 + Math.random() * 7;
          }
        }
      });

      // Orb pulse
      const pulse = 1 + Math.sin(t * 1.4) * 0.12;
      orb.scale.setScalar(pulse);
      halo.scale.setScalar(pulse * 1.05);
      halo.rotation.z += delta * 0.3;
      orbMat.opacity = 0.16 + Math.sin(t * 1.4) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Resize ──────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ─── Cleanup ─────────────────────────────────────────────────
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
      pGeo.dispose();
      pMat.dispose();
      lGeo.dispose();
      lMat.dispose();
      sGeo.dispose();
      sMat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      ribbons.forEach((r) => {
        r.geometry.dispose();
        r.material.dispose();
      });
      streaks.forEach((s) => {
        s.line.geometry.dispose();
        s.line.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
};

export default ThreeDBackground;