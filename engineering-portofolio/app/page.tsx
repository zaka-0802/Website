"use client"

import { ClickableCard } from "@/components/ui/clickable_card"
import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

// Music Player Component
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.9
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
    <main className="relative min-h-screen bg-gray-0 px-4 py-10 sm:px-10 md:px-20">
      {/* Music Player */}
      <MusicPlayer />

      <div ref={headerRef} className="sticky top-0 z-50 bg-white/0 py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
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