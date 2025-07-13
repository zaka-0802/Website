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
