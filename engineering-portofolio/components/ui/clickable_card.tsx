"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ClickableCardProps {
  imageUrl: string
  title: string
  description: string
  fullContent: string
  tags?: string[]
}

export const ClickableCard: React.FC<ClickableCardProps> = ({
  imageUrl,
  title,
  description,
  fullContent,
  tags = [],
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full max-w-[36rem] h-[200px] relative overflow-hidden cursor-pointer group rounded-xl border border-white/10 bg-black/70 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          {/* Text & Tags */}
          <CardContent className="relative z-10 h-full flex flex-col justify-center px-6 py-4 text-white">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-sm text-white/80 mt-1">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-sm text-muted-foreground">{fullContent}</p>
      </DialogContent>
    </Dialog>
  )
}
