"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ClickableCardProps {
  imageUrl: string
  title: string
  description: string
  fullContent: string
}

export const ClickableCard: React.FC<ClickableCardProps> = ({
  imageUrl,
  title,
  description,
  fullContent,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full max-w-[36rem] h-[200px] relative overflow-hidden cursor-pointer transition-shadow hover:shadow-lg group">
          {/* Transparent Image Background */}
          <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-300">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          {/* Text Overlay */}
          <CardContent className="relative z-10 p-6 h-full flex flex-col justify-center text-white bg-black/30 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-sm">{description}</p>
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
