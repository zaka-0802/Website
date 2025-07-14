"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ExternalLink, Zap, Calendar, Users } from "lucide-react"

interface ClickableCardProps {
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

export const ClickableCard: React.FC<ClickableCardProps> = ({
  imageUrl,
  title,
  description,
  fullContent,
  tags = [],
  projectDate,
  teamSize,
  githubUrl,
  liveUrl,
}) => {
  const [imageError, setImageError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="w-full max-w-[36rem] h-[240px] relative overflow-hidden cursor-pointer group rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110">
            <Image
              src={imageError ? "/placeholder.svg?height=240&width=576" : imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/50 transition-all duration-500" />

          {/* Content */}
          <CardContent className="relative z-10 h-full flex flex-col justify-end px-6 py-6 text-white">
            <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-2 leading-tight">{title}</h3>
              <p className="text-sm text-white/90 mb-4 leading-relaxed">{description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 4 && (
                  <span className="bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20 font-medium">
                    +{tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="space-y-2">
            <DialogTitle className="text-3xl font-bold text-gray-900">{title}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={imageError ? "/placeholder.svg?height=256&width=896" : imageUrl}
              alt={title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectDate && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{projectDate}</span>
              </div>
            )}
            {teamSize && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{teamSize}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Zap className="h-4 w-4" />
              <span>Mechatronics</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Project Overview</h3>
            <p className="text-gray-700 leading-relaxed">{fullContent}</p>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {(githubUrl || liveUrl) && (
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              {githubUrl && (
                <Button asChild variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Code</span>
                  </a>
                </Button>
              )}
              {liveUrl && (
                <Button asChild className="flex items-center space-x-2">
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
