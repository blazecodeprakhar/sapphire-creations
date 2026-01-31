import InteractiveBentoGallery from "@/components/blocks/interactive-bento-gallery"
import { useEffect, useState } from "react"

// Define available images for each category
const imagePool = {
  concerts: [
    "/portfolio/concerts/447.webp",
    "/portfolio/concerts/142.webp",
    "/portfolio/concerts/61.webp",
    "/portfolio/concerts/37.webp",
    "/portfolio/concerts/14.webp",
    "/portfolio/concerts/463.webp",
    "/portfolio/concerts/440.webp",
    "/portfolio/concerts/400.webp",
    "/portfolio/concerts/370.webp",
    "/portfolio/concerts/332.webp",
    "/portfolio/concerts/287.webp"
  ],
  bars: [
    "/portfolio/bars/59.webp",
    "/portfolio/bars/61.webp",
    "/portfolio/bars/62.webp",
    "/portfolio/bars/94.webp",
    "/portfolio/bars/97.webp",
    "/portfolio/bars/131.webp"
  ],
  realEstate: [
    "/portfolio/real-estate/3.webp",
    "/portfolio/real-estate/26.webp",
    "/portfolio/real-estate/34.webp",
    "/portfolio/real-estate/43.webp",
    "/portfolio/real-estate/44.webp",
    "/portfolio/real-estate/48.webp",
    "/portfolio/real-estate/75.webp",
    "/portfolio/real-estate/82.webp",
    "/portfolio/real-estate/84.webp",
    "/portfolio/real-estate/85.webp",
    "/portfolio/real-estate/91.webp"
  ],
  spas: [
    "/portfolio/spas-and-salons/4.webp",
    "/portfolio/spas-and-salons/7.webp",
    "/portfolio/spas-and-salons/8.webp",
    "/portfolio/spas-and-salons/12.webp",
    "/portfolio/spas-and-salons/14.webp",
    "/portfolio/spas-and-salons/16.webp",
    "/portfolio/spas-and-salons/18.webp",
    "/portfolio/spas-and-salons/25.webp",
    "/portfolio/spas-and-salons/26.webp",
    "/portfolio/spas-and-salons/36.webp",
    "/portfolio/spas-and-salons/54.webp",
    "/portfolio/spas-and-salons/57.webp",
    "/portfolio/spas-and-salons/61.webp"
  ],
  education: [
    "/portfolio/education/4.png",
    "/portfolio/education/5.png",
    "/portfolio/education/10.png",
    "/portfolio/education/5.jpg",
    "/portfolio/education/10.jpg",
    "/portfolio/education/12.jpg",
    "/portfolio/education/13.jpg",
    "/portfolio/education/15.jpg",
    "/portfolio/education/16.jpg",
    "/portfolio/education/18.jpg"
  ]
}

// Helper function to get random item from array with fallback
const getRandomItem = (array: string[], fallbackArray?: string[]) => {
  if (!array.length) {
    if (fallbackArray?.length) {
      return fallbackArray[Math.floor(Math.random() * fallbackArray.length)]
    }
    return null
  }
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function to preload image and verify it exists
const verifyImage = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

export function BentoGridGalleryDemo() {
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      type: "video",
      title: "Video Editing",
      desc: "Turning raw footage into pure cinematic magic! 🎬✨",
      url: "/portfolio/video-editing/High.mp4",
      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2"
    }
  ])

  // Add a reload trigger that changes on mount
  const [reloadTrigger] = useState(() => Date.now())

  useEffect(() => {
    const initializeGallery = () => {
      // Create randomized media items
      const randomizedItems = [
        mediaItems[0], // Keep the video as first item
        {
          id: 2,
          type: "image",
          title: "Concert Experience",
          desc: "Our designs hit harder than the bass drop! 🎶🔥",
          url: getRandomItem(imagePool.concerts),
          span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 3,
          type: "image",
          title: "Bars & Restaurants",
          desc: "Our designs pair well with your best-selling dish!",
          url: getRandomItem(imagePool.bars),
          span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2"
        },
        {
          id: 4,
          type: "image",
          title: "Real Estate",
          desc: "Turning \"For Sale\" into \"Sold\" faster than you can say \"dream home\"!",
          url: getRandomItem(imagePool.realEstate),
          span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 5,
          type: "image",
          title: "Spas & Salons",
          desc: "Because your brand deserves a glow-up too!",
          url: getRandomItem(imagePool.spas),
          span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        },
        {
          id: 6,
          type: "image",
          title: "Educational Posters",
          desc: "So good, even backbenchers start paying attention!",
          url: getRandomItem(imagePool.education),
          span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2"
        }
      ]

      setMediaItems(randomizedItems)
    }

    initializeGallery()
  }, [reloadTrigger]) // Add reloadTrigger to dependencies

  return (
    <div className="min-h-screen scrollbar-hide">
      <InteractiveBentoGallery
        key={reloadTrigger} // Use reloadTrigger as key
        mediaItems={mediaItems}
        title="Our Portfolio"
        description="Drag and explore our creative work across various industries"
      />
    </div>
  )
} 