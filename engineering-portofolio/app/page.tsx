import { ClickableCard } from "@/components/ui/clickable_card"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-10 md:px-20">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12">
        Mechatronics Engineering
      </h1>

      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center">
        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Robotics Project"
          description="Autonomous arm for elderly care."
          fullContent="This project involves an AI-driven robotic arm that assists elderly individuals with everyday tasks using voice and vision-based control."
        />
        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Vision System"
          description="Object detection on embedded systems."
          fullContent="Uses YOLOv8 on Raspberry Pi with real-time inference for smart object detection in constrained environments."
        />
        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="IoT Automation"
          description="Smart switchboard module."
          fullContent="An ESP32-based smart switching module with app control and energy monitoring for home automation."
        />
        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Robotics Project"
          description="Autonomous arm for elderly care."
          fullContent="This project involves an AI-driven robotic arm that assists elderly individuals with everyday tasks using voice and vision-based control."
        />
        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="Vision System"
          description="Object detection on embedded systems."
          fullContent="Uses YOLOv8 on Raspberry Pi with real-time inference for smart object detection in constrained environments."
        />
        <ClickableCard
          imageUrl="/IMG-20241214-WA0087.jpg"
          title="IoT Automation"
          description="Smart switchboard module."
          fullContent="An ESP32-based smart switching module with app control and energy monitoring for home automation."
        />
      </div>
    </main>
  )
}
