  "use client";


import { useEffect, useRef, useState } from "react"
import { ClickableCard } from "@/components/ui/clickable_card"

interface ScrollFadeCardProps {
  imageUrl: string
  title: string
  description: string
  fullContent: string
  tags?: string[]
  projectDate?: string
  teamSize?: string
  githubUrl?: string
  liveUrl?: string
}

export function ScrollFadeCard(props: ScrollFadeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)
  const [transform, setTransform] = useState("translateY(0px)")

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const headerHeight = 320 // Height of header section (80rem = 320px)

      // Calculate how much the card overlaps with the header
      const overlapStart = headerHeight
      const overlapEnd = headerHeight - 100 // Start fading 100px before complete overlap

      if (rect.top <= overlapStart && rect.top >= overlapEnd) {
        // Card is entering the header area - start fading
        const fadeProgress = (overlapStart - rect.top) / (overlapStart - overlapEnd)
        const newOpacity = Math.max(0, 1 - fadeProgress)
        const translateY = fadeProgress * -20 // Slight upward movement

        setOpacity(newOpacity)
        setTransform(`translateY(${translateY}px)`)
      } else if (rect.top < overlapEnd) {
        // Card is fully in header area - completely hidden
        setOpacity(0)
        setTransform("translateY(-20px)")
      } else {
        // Card is below header area - fully visible
        setOpacity(1)
        setTransform("translateY(0px)")
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        opacity,
        transform,
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <ClickableCard {...props} />
    </div>
  )
}
