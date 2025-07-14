"use client"

import { ClickableCard } from "@/components/ui/clickable_card"
import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

// Animated Background Component
const AnimatedBackground = () => {
  const [particles, setParticles] = useState([])
  const [squares, setSquares] = useState([])
  const animationRef = useRef()

  useEffect(() => {
    // Initialize particles (rain pixels)
    const initParticles = () => {
      const newParticles = []
      for (let i = 0; i < 180; i++) {
        const layer = Math.floor(i / 60) // 3 layers of 60 particles each
        const baseSpeed = layer === 0 ? 0.8 : layer === 1 ? 2 : 4
        const baseSize = layer === 0 ? 0.8 : layer === 1 ? 1.5 : 2.5
        const baseOpacity = layer === 0 ? 0.15 : layer === 1 ? 0.4 : 0.7
        
        newParticles.push({
          id: i,
          x: Math.random() * (window.innerWidth + 100) - 50,
          y: Math.random() * (window.innerHeight + 200) - 100,
          speed: baseSpeed + Math.random() * 1.5,
          opacity: baseOpacity + Math.random() * 0.2,
          size: baseSize + Math.random() * 0.8,
          layer: layer,
          angle: Math.random() * 15 - 7.5, // Slight angle variation
          windOffset: Math.random() * 0.5 - 0.25,
          pulse: Math.random() * Math.PI * 2, // For subtle opacity pulsing
          trail: Math.random() > 0.7 // Some particles leave trails
        })
      }
      setParticles(newParticles)
    }

    // Initialize squares
    const initSquares = () => {
      const newSquares = []
      for (let i = 0; i < 25; i++) {
        newSquares.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -Math.random() * 500,
          speed: Math.random() * 2 + 0.5,
          size: Math.random() * 30 + 10,
          opacity: Math.random() * 0.3 + 0.1,
          rotation: Math.random() * 360
        })
      }
      setSquares(newSquares)
    }

    const animate = () => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const time = Date.now() * 0.001 // For time-based effects

      setParticles(prev => prev.map(particle => {
        let newY = particle.y + particle.speed
        let newX = particle.x + Math.sin(time + particle.id * 0.1) * particle.windOffset

        // Add slight diagonal movement based on angle
        newX += Math.sin(particle.angle * Math.PI / 180) * particle.speed * 0.3

        // Reset particle when it goes off screen
        if (newY > window.innerHeight + 20) {
          newY = -20 - Math.random() * 50
          newX = Math.random() * (window.innerWidth + 100) - 50
        }

        // Keep particles within extended bounds
        if (newX < -100) newX = window.innerWidth + 50
        if (newX > window.innerWidth + 100) newX = -50

        // Subtle opacity pulsing for some particles
        let currentOpacity = particle.opacity
        if (particle.pulse) {
          currentOpacity += Math.sin(time * 2 + particle.pulse) * 0.1
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          opacity: Math.max(0.05, currentOpacity),
          pulse: particle.pulse + 0.05
        }
      }))

      setSquares(prev => prev.map(square => {
        let newY = square.y + square.speed
        let newX = square.x
        let newSize = square.size

        // Calculate distance from center
        const distFromCenter = Math.sqrt(
          Math.pow(square.x - centerX, 2) + Math.pow(square.y - centerY, 2)
        )
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
        const sizeMultiplier = Math.max(0.3, 1 - (distFromCenter / maxDistance) * 0.7)
        newSize = square.size * sizeMultiplier

        // Reset square when it goes off screen
        if (newY > window.innerHeight + 50) {
          newY = -Math.random() * 500
          newX = Math.random() * window.innerWidth
        }

        return {
          ...square,
          x: newX,
          y: newY,
          size: newSize,
          rotation: square.rotation + 0.5
        }
      }))

      animationRef.current = requestAnimationFrame(animate)
    }

    initParticles()
    initSquares()
    animate()

    const handleResize = () => {
      initParticles()
      initSquares()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Rain particles with depth layers */}
      {particles.map(particle => (
        <div key={`particle-${particle.id}`}>
          {/* Main particle */}
          <div
            className={`absolute rounded-full ${
              particle.layer === 0 ? 'bg-blue-200' : 
              particle.layer === 1 ? 'bg-blue-300' : 
              'bg-blue-400'
            }`}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size * (particle.layer + 1)}px`,
              opacity: particle.opacity,
              transform: `translate(-50%, -50%) rotate(${particle.angle}deg)`,
              borderRadius: particle.layer === 2 ? '50%' : '50% 50% 50% 50% / 60% 60% 40% 40%',
              filter: particle.layer === 2 ? 'blur(0.3px)' : 'none'
            }}
          />
          
          {/* Trail effect for select particles */}
          {particle.trail && particle.layer === 2 && (
            <div
              className="absolute bg-blue-300 rounded-full"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y - particle.size * 2}px`,
                width: `${particle.size * 0.6}px`,
                height: `${particle.size * 1.5}px`,
                opacity: particle.opacity * 0.4,
                transform: `translate(-50%, -50%) rotate(${particle.angle}deg)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
              }}
            />
          )}
        </div>
      ))}
      
      {/* Falling squares */}
      {squares.map(square => (
        <div
          key={`square-${square.id}`}
          className="absolute bg-gradient-to-br from-purple-400 to-blue-500 rounded-sm"
          style={{
            left: `${square.x}px`,
            top: `${square.y}px`,
            width: `${square.size}px`,
            height: `${square.size}px`,
            opacity: square.opacity,
            transform: `translate(-50%, -50%) rotate(${square.rotation}deg)`,
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
          }}
        />
      ))}
    </div>
  )
}

// Music Player Component
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
        setIsMuted(false)
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false
        setIsMuted(false)
      } else {
        audioRef.current.muted = true
        setIsMuted(true)
      }
    }
  }

  const handleClick = () => {
    if (isPlaying) {
      toggleMute()
    } else {
      toggleMusic()
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <button
        onClick={handleClick}
        className="p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300"
        title={!isPlaying ? "Play music" : isMuted ? "Unmute music" : "Mute music"}
      >
        {!isPlaying ? (
          <Volume2 className="w-6 h-6 text-white opacity-60" />
        ) : isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  )
}

export default function HomePage() {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const headerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Initial measurement
    updateHeaderHeight()
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateHeaderHeight)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [])

  // Calculate the clip path based on scroll position and header height
  const getClipPath = () => {
    if (!containerRef.current) return 'none'
    
    const containerTop = containerRef.current.getBoundingClientRect().top + scrollY
    const headerBottom = headerHeight
    const intersectionDepth = headerBottom - (containerTop - scrollY)
    
    if (intersectionDepth > 0) {
      return `polygon(0 ${intersectionDepth}px, 100% ${intersectionDepth}px, 100% 100%, 0 100%)`
    }
    
    return 'none'
  }

  return (
    <main className="relative min-h-screen bg-gray-900 px-4 py-10 sm:px-10 md:px-20">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Music Player */}
      <MusicPlayer />

      <div ref={headerRef} className="sticky top-0 z-50 bg-white/0 py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-white">
          Mechatronics Engineering
        </h1>
      </div>

      <div 
        ref={containerRef}
        className="relative z-10 max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center"
        style={{
          clipPath: getClipPath()
        }}
      >
        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Assistive Robotic Arm"
          description="Voice-controlled aid for elderly."
          fullContent="An AI-driven robotic arm controlled through natural language processing and computer vision to assist elderly individuals with daily tasks."
          tags={["Raspberry Pi", "NLP", "Servo Motors", "OpenCV"]}
        />

        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Smart Vision Sorting System"
          description="Color and shape detection in real time."
          fullContent="Designed a Raspberry Pi-based object sorting system using OpenCV and YOLOv8 for industrial automation applications."
          tags={["YOLOv8", "OpenCV", "Raspberry Pi", "Python"]}
        />

        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="IoT-Based Energy Monitor"
          description="Smart energy dashboard."
          fullContent="Developed an ESP32-powered module to monitor and control home energy usage, integrated with a custom mobile app for real-time stats."
          tags={["ESP32", "IoT", "Mobile App", "Firebase"]}
        />

        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Gesture-Controlled Robot"
          description="Intuitive hand movement control."
          fullContent="Created a wireless robot that follows human hand gestures using an IMU and microcontroller-based transmitter-receiver system."
          tags={["IMU", "RF Modules", "Arduino", "Wireless"]}
        />

        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Embedded Facial Recognition"
          description="Real-time person identification."
          fullContent="Used a lightweight face recognition model on Raspberry Pi for identifying and greeting known users through a servo-driven face-following system."
          tags={["FaceNet", "Raspberry Pi", "Multiprocessing", "Servo"]}
        />

        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="ESP-NOW Mesh Lighting"
          description="Proximity-based dynamic lighting."
          fullContent="Built a mesh network of ESP32 modules using ESP-NOW protocol to trigger lighting sequences based on user proximity and movement."
          tags={["ESP-NOW", "ESP32", "Wireless Mesh", "Micropython"]}
        />

        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="BCI Music Generator"
          description="Mind-controlled music interface."
          fullContent="A brain-computer interface that maps brainwave signals into MIDI inputs to generate music for therapeutic and creative expression."
          tags={["BCI", "MIDI", "Signal Processing", "Machine Learning"]}
        />

        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Modular Home Automation Node"
          description="Custom PCB with SSRs and app."
          fullContent="Designed and fabricated a modular switchboard automation unit with solid-state relays, mobile control, and real-time monitoring using custom firmware."
          tags={["PCB Design", "Solid State Relay", "ESP32", "Custom Firmware"]}
        />
      </div>
    </main>
  )
}