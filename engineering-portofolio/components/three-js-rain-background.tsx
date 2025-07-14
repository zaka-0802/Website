"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

// RainEffect class (moved from your prompt into a dedicated utility)
class RainEffect {
  container: HTMLDivElement
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  rainCount: number
  velocityArray: Float32Array
  rain: THREE.Points | null = null
  animationFrameId: number | null

  constructor(container: HTMLDivElement) {
    this.container = container
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.rainCount = 25000
    this.velocityArray = new Float32Array(this.rainCount)
    this.animationFrameId = null

    this.init()
  }

  init() {
    this.setupRenderer()
    this.createRain()
    this.setupCamera()
    this.setupEventListeners()
    this.animate()
  }

  setupRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.renderer.domElement)
  }

  createRain() {
    const rainGeometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(this.rainCount * 3)

    for (let i = 0; i < this.rainCount * 3; i += 3) {
      posArray[i] = Math.random() * 400 - 200
      posArray[i + 1] = Math.random() * 500 - 250
      posArray[i + 2] = Math.random() * 400 - 200
      this.velocityArray[i / 3] = 0.1 + Math.random() * 0.3
    }

    rainGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    const rainMaterial = new THREE.PointsMaterial({
      color: 0xccceff,
      size: 0.2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    this.rain = new THREE.Points(rainGeometry, rainMaterial)
    this.scene.add(this.rain)
  }

  setupCamera() {
    this.camera.position.z = 30
  }

  setupEventListeners() {
    window.addEventListener("resize", this.handleResize.bind(this))
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this))

    if (!this.rain) return

    const positions = this.rain.geometry.attributes.position.array
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= this.velocityArray[(i - 1) / 3]
      if (positions[i] < -250) {
        positions[i] = 250
      }
    }
    this.rain.geometry.attributes.position.needsUpdate = true
    this.rain.rotation.y += 0.0005
    this.renderer.render(this.scene, this.camera)
  }

  cleanup() {
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement)
    }
    window.removeEventListener("resize", this.handleResize)
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
    this.scene.clear()
    this.renderer.dispose()
  }
}

const ThreeJsRainBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const rainEffectRef = useRef<RainEffect | null>(null)

  useEffect(() => {
    if (mountRef.current) {
      rainEffectRef.current = new RainEffect(mountRef.current)
    }

    return () => {
      if (rainEffectRef.current) {
        rainEffectRef.current.cleanup()
        rainEffectRef.current = null
      }
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0" />
}

export default ThreeJsRainBackground