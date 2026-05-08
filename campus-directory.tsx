"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Book,
  Dumbbell,
  Heart,
  Utensils,
  HomeIcon,
  Theater,
  Library,
  Mail,
  Star,
  MoreHorizontal,
  Search,
  X,
  Building,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Export iconMap for use in other components
export const iconMap = {
  Academics: <Book className="w-4 h-4 mr-2" />,
  Athletics: <Dumbbell className="w-4 h-4 mr-2" />,
  Health: <Heart className="w-4 h-4 mr-2" />,
  Dining: <Utensils className="w-4 h-4 mr-2" />,
  Housing: <HomeIcon className="w-4 h-4 mr-2" />,
  Performance: <Theater className="w-4 h-4 mr-2" />,
  Library: <Library className="w-4 h-4 mr-2" />,
  Mail: <Mail className="w-4 h-4 mr-2" />,
  Other: <MoreHorizontal className="w-4 h-4 mr-2" />,
  Facilities: <Building className="w-4 h-4 mr-2" />, // Added Facilities icon
}

// Export directionsUrls for use in other components
export const directionsUrls = {
  "King Building":
    "https://www.google.com/maps/dir//King+Building,+King+Bldg,+10+N+Professor+St,+Oberlin,+OH+44074/@41.2922565,-82.2231247,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x883a0bf1a0b1cb3f:0x51d4629e171a9ed2!2m2!1d-82.220457!2d41.2922555!3e0!5m1!1e3?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
  "Rice Hall":
    "https://www.google.com/maps/dir//Rice+Hall,+164+W+College+St,+Oberlin,+OH+44074/@41.2921468,-82.2235763,887m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x883a0a7bc2b3cc8f:0x1bd6ec2ef1a07589!2m2!1d-82.2210014!2d41.2921428!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  "Phillips Gym":
    "https://www.google.com/maps/dir//Philips+Gym+%26+Shanks+Health+and+Wellness+Center,+Woodland+Street,+Oberlin,+OH/@41.2977442,-82.2639627,14183m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x883a0a878f9141f1:0x7c1c22e86859913d!2m2!1d-82.2225008!2d41.2976847!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  "South Hall":
    "https://www.google.com/maps/dir//South+Hall,+Elm+Street,+Oberlin,+OH/@41.2897321,-82.2627683,14185m/data=!3m2!1e3!4b1!4m9!4m8!1m0!1m5!1m1!1s0x883a0bf5286ec023:0xc7546316533ff86c!2m2!1d-82.2215674!2d41.2898061!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  "South Gym":
    "https://www.google.com/maps/place/South+Hall/@41.289675,-82.2241492,662m/data=!3m2!1e3!4b1!4m6!3m5!1s0x883a0bf5286ec023:0xc7546316533ff86c!8m2!3d41.289675!4d-82.2215689!16s%2Fg%2F11s7my_95j?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
  "Student Health":
    "https://www.google.com/maps/dir//Student+Health+Center,+West+Lorain+Street,+Oberlin,+OH/@41.2935924,-82.2673963,14184m/data=!3m2!1e3!4b1!4m9!4m8!1m0!1m5!1m1!1s0x883a0a64a9256f01:0x7aa6525c806557eb!2m2!1d-82.2261969!2d41.2935353!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  "Campus Safety":
    "https://www.google.com/maps/dir/Oberlin,+OH/Oberlin+College+Campus+Safety,+West+College+Street,+Oberlin,+OH/@41.2932212,-82.2202517,355m/data=!3m1!1e3!4m13!4m12!1m5!1m1!1s0x8830a0693354a9db:0xf78dd22181d6c6af!2m2!1d-82.2173786!2d41.2939386!1m5!1m1!1s0x883a0a7c8732bfa7:0x7129bba7846cbe6e!2m2!1d-82.2225913!2d41.2923881?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D",
  "Warner Concert Hall":
    "https://www.google.com/maps/dir//Warner+Concert+Hall,+West+College+Street,+Oberlin,+OH/@41.2909629,-82.2608386,14184m/data=!3m2!1e3!4b1!4m9!4m8!1m0!1m5!1m1!1s0x883a0a797f541783:0x1cd84dbab8b92abf!2m2!1d-82.2198337!2d41.29091!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  "Mudd Library":
    "https://www.google.com/maps/dir//Oberlin+College+Libraries,+West+College+Street,+Oberlin,+OH/@41.2931515,-82.2641383,14184m/data=!3m2!1e3!4b1!4m9!4m8!1m0!1m5!1m1!1s0x883a0a7ba50b6121:0xf405d3e9c3a6ad70!2m2!1d-82.2229389!2d41.2930944!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  Mailroom:
    "https://www.google.com/maps/place/Wilder+Hall,+135+W+Lorain+St,+Oberlin,+OH+44074/@41.2938167,-82.2246765,661m/data=!3m2!1e3!4b1!4m6!3m5!1s0x883a0a7c76c97c51:0x94bb4f5d600ff947!8m2!3d41.2938167!4d-82.2220962!16s%2Fg%2F1tfn3dlx?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
  "Wilder Hall":
    "https://www.google.com/maps/place/Wilder+Hall,+135+W+Lorain+St,+Oberlin,+OH+44074/@41.2938167,-82.2246765,661m/data=!3m2!1e3!4b1!4m6!3m5!1s0x883a0a7c76c97c51:0x94bb4f5d600ff947!8m2!3d41.2938167!4d-82.2220962!16s%2Fg%2F1tfn3dlx?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
  "Dascomb Hall":
    "https://www.google.com/maps/dir//Dascomb+Hall,+West+College+Street,+Oberlin,+OH/@41.2922138,-82.263589,14184m/data=!3m2!1e3!4b1!4m9!4m8!1m0!1m5!1m1!1s0x883a0bac286491a3:0x1368feeba0d34c13!2m2!1d-82.2223149!2d41.2920136!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  Umami:
    "https://www.google.com/maps/dir//Wilder+Hall,+West+Lorain+Street,+Oberlin,+OH/@41.2938738,-82.2632956,14184m/data=!3m2!1e3!4b1!4m9!4m8!1m0!1m5!1m1!1s0x883a0a7c76c97c51:0x94bb4f5d600ff947!2m2!1d-82.2220962!2d41.2938167!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  Decafe:
    "https://www.google.com/maps/place/Oberlin+College+Libraries/@41.2930983,-82.2278098,1457m/data=!3m2!1e3!4b1!4m6!3m5!1s0x883a0a7ba50b6121:0xf405d3e9c3a6ad70!8m2!3d41.2930944!4d-82.2229389!16s%2Fm%2F0bh8013?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
  "Azariah's Café":
    "https://www.google.com/maps/place/Oberlin+College+Libraries/@41.2930983,-82.2278098,1457m/data=!3m2!1e3!4b1!4m6!3m5!1s0x883a0a7ba50b6121:0xf405d3e9c3a6ad70!8m2!3d41.2930944!4d-82.2229389!16s%2Fm%2F0bh8013?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
  Rathskeller:
    "https://www.google.com/maps/place/Wilder+Hall,+135+W+Lorain+St,+Oberlin,+OH+44074/@41.2938167,-82.2246765,661m/data=!3m2!1e3!4b1!4m6!3m5!1s0x883a0a7c76c97c51:0x94bb4f5d600ff947!8m2!3d41.2938167!4d-82.2220962!16s%2Fg%2F1tfn3dlx?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
  Stevenson:
    "https://www.google.com/maps/place/Stevenson+Dining+Hall/@41.2944444,-82.2194444,17z/data=!4m6!3m5!1s0x883a0a7c76c97c51:0x94bb4f5d600ff947!8m2!3d41.2944444!4d-82.2194444",
  "Residence Life":
    "https://www.google.com/maps/dir//Stevenson+Hall,+North+Professor+Street,+Oberlin,+OH/@41.2958188,-82.2605603,14183m/data=!3m2!1e3!4b1!4m9!4m8!1m0!1m5!1m1!1s0x883a0a7e89eaaaab:0x7975728900f3af9e!2m2!1d-82.2195689!2d41.2957652!3e0?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
  "Dionysus Sco":
    "https://www.google.com/maps/dir/Oberlin,+OH/Wilder+Hall,+135+W+Lorain+St,+Oberlin,+OH+44074/@41.2933276,-82.2223883,709m/data=!3m2!1e3!4b1!4m13!4m12!1m5!1m1!1s0x8830a0693354a9db:0xf78dd22181d6c6af!2m2!1d-82.2173786!2d41.2939386!1m5!1m1!1s0x883a0a7c73829159:0x92b4477ccdfb6249!2m2!1d-82.2222482!2d41.2937747!5m1!1e3?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D",
}

// Add a default directions URL for any building not in the map
const defaultDirectionsUrl =
  "https://www.google.com/maps/place/Oberlin+College+and+Conservatory/@41.2942966,-82.2195451,17z/data=!3m1!4b1!4m6!3m5!1s0x8830a0693354a9db:0xf78dd22181d6c6af!8m2!3d41.2942966!4d-82.2173564!16zL20vMDFxcXRn?entry=ttu"

// Define building categories for multi-category buildings
const buildingCategories = {
  Wilder: ["Other", "Dining", "Mail"],
  "Mudd Library": ["Library", "Dining"],
  "Dascomb Hall": ["Housing", "Health"],
  "South Hall": ["Housing", "Athletics"],
  Stevenson: ["Dining", "Housing"],
}

// Export buildings for use in other components
export const buildings = [
  // --------------- ACADEMICS ---------------
  {
    category: "Academics",
    data: [
      {
        id: "1",
        name: "King Building",
        description: "Houses the Humanities departments",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/king_building.jpg-Md2EJPMbuKumLYLL7vjS0fshErkVlY.jpeg",
        categories: ["Academics"],
      },
      {
        id: "2",
        name: "Rice Hall",
        description: "Computer Science and Mathematics departments",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rice.jpg-pmp03dsqYWG9xVfj8d3ikDAWnolg8R.jpeg",
        categories: ["Academics"],
      },
    ],
  },

  // --------------- ATHLETICS ---------------
  {
    category: "Athletics",
    data: [
      {
        id: "3",
        name: "Phillips Gym",
        description: "Main athletic facility with pool and fitness center",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/philips_gym.jpg-QvECSDbgGBvomWa7Pc6zuIzWAvFlRp.jpeg",
        categories: ["Athletics"],
      },
      {
        id: "4",
        name: "South Gym",
        description: "Secondary athletic facility",
        location: "In South Hall",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/south_hall_trjones.jpg-VOtjrBbyuFDyKyg3zRCSrwIEx7fk55.jpeg", // Using South Hall image
        categories: ["Athletics"],
      },
    ],
  },

  // --------------- HEALTH ---------------
  {
    category: "Health",
    data: [
      {
        id: "5",
        name: "Student Health",
        description: "Medical and counseling services",
        location: "In Dascomb",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dascomb_hall.jpg-fAhpPu1tn4guBrqOcu3JaxhgiYtYD9.jpeg", // Using Dascomb Hall image as requested
        categories: ["Health"],
      },
    ],
  },

  // --------------- DINING ---------------
  {
    category: "Dining",
    data: [
      {
        id: "6",
        name: "Umami",
        description: "Asian fusion restaurant with vegetarian options",
        location: "In Wilder Hall",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wilder_hall.jpg-JwJ1Wl0TW97EhVPjJipelNk9YYzI5O.jpeg", // Using Wilder Hall image
        categories: ["Dining"],
      },
      {
        id: "7",
        name: "Decafe",
        description: "Grab-and-go meals and coffee",
        location: "In Wilder Hall",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wilder_hall.jpg-JwJ1Wl0TW97EhVPjJipelNk9YYzI5O.jpeg", // Using Mudd Library image
        categories: ["Dining"],
      },
      {
        id: "17",
        name: "Azariah's Café",
        description: "Coffee, pastries, late-night study fuel",
        location: "In Mudd Library",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mudd_library.jpg-Faql0UkmK4wd17s18HQA6PnHPVHmIL.jpeg", // Using Mudd Library image
        categories: ["Dining"],
      },
      {
        id: "8",
        name: "Rathskeller",
        description: "Late night dining venue",
        location: "In Wilder Hall",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wilder_hall.jpg-JwJ1Wl0TW97EhVPjJipelNk9YYzI5O.jpeg", // Using Wilder Hall image
        categories: ["Dining"],
      },
      {
        id: "9",
        name: "Stevenson",
        description: "Main dining hall with diverse food options",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stevenson.jpg-Yd9Yx9Yx9Yx9Yx9Yx9Yx9Yx9Yx9Y.jpeg", // Using new Stevenson image
        categories: ["Dining", "Housing"],
      },
    ],
  },

  // --------------- HOUSING ---------------
  {
    category: "Housing",
    data: [
      {
        id: "10",
        name: "Dascomb Hall",
        description: "First-year residence hall",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dascomb_hall.jpg-fAhpPu1tn4guBrqOcu3JaxhgiYtYD9.jpeg",
        categories: ["Housing", "Health"],
      },
      {
        id: "11",
        name: "South Hall",
        description: "Upperclassman residence hall",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/south_hall_trjones.jpg-VOtjrBbyuFDyKyg3zRCSrwIEx7fk55.jpeg",
        categories: ["Housing", "Athletics"],
      },
    ],
  },

  // --------------- PERFORMANCE ---------------
  {
    category: "Performance",
    data: [
      {
        id: "12",
        name: "Warner Concert Hall",
        description: "Main performance venue for concerts",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/warner_hall.jpg-e9eL3qV7WF71FYko9OczSlizT7nxzy.jpeg",
        categories: ["Performance"],
      },
      {
        id: "19",
        name: "Dionysus Sco",
        description: "Student-run venue for concerts and social events",
        location: "In Wilder Hall",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wilder_hall.jpg-JwJ1Wl0TW97EhVPjJipelNk9YYzI5O.jpeg", // Using Wilder Hall image
        categories: ["Performance"],
      },
    ],
  },

  // --------------- LIBRARY ---------------
  {
    category: "Library",
    data: [
      {
        id: "14",
        name: "Mudd Library",
        description: "Main campus library with extensive collections",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mudd_library.jpg-Faql0UkmK4wd17s18HQA6PnHPVHmIL.jpeg",
        categories: ["Library", "Dining"],
      },
    ],
  },

  // --------------- MAIL ---------------
  {
    category: "Mail",
    data: [
      {
        id: "15",
        name: "Mailroom",
        description: "Campus mail and package services",
        location: "In Wilder",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wilder_hall.jpg-JwJ1Wl0TW97EhVPjJipelNk9YYzI5O.jpeg", // Using Wilder Hall image
        categories: ["Mail"],
      },
    ],
  },

  // --------------- FACILITIES ---------------
  {
    category: "Facilities",
    data: [
      // Moved from Other category
      {
        id: "13",
        name: "Campus Safety",
        description: "24/7 campus security services",
        location: "In Dascomb Hall",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dascomb_hall.jpg-fAhpPu1tn4guBrqOcu3JaxhgiYtYD9.jpeg",
        categories: ["Facilities"], // Changed from Other to Facilities
      },
      // Moved from Other category
      {
        id: "18",
        name: "Residence Life",
        description: "Housing administration and services",
        location: "In Stevenson",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stevenson.jpg-Yd9Yx9Yx9Yx9Yx9Yx9Yx9Yx9Yx9Y.jpeg",
        categories: ["Facilities"], // Changed from Other to Facilities
      },
    ],
  },

  // --------------- OTHER ---------------
  {
    category: "Other",
    data: [
      {
        id: "16",
        name: "Wilder Hall",
        description: "Student union and administrative offices",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wilder_hall.jpg-JwJ1Wl0TW97EhVPjJipelNk9YYzI5O.jpeg",
        categories: ["Other", "Dining", "Mail"],
      },
    ],
  },
]

// Add Facilities to categories
const categories = [
  "All",
  "Academics",
  "Athletics",
  "Health",
  "Dining",
  "Housing",
  "Performance",
  "Library",
  "Mail",
  "Facilities",
  "Other",
]

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [saved, setSaved] = useState([])
  const [viewSaved, setViewSaved] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const searchRef = useRef(null)

  // Function to get directions URL for a building
  const getDirectionsUrl = (buildingName) => {
    return directionsUrls[buildingName] || defaultDirectionsUrl
  }

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 0) {
      // Get all buildings from all categories
      const allBuildings = buildings.flatMap((section) => section.data)

      // Filter buildings based on search query
      const filteredSuggestions = allBuildings
        .filter(
          (building) =>
            building.name.toLowerCase().includes(query.toLowerCase()) ||
            building.description.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5) // Limit to 5 suggestions

      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef])

  // Filter buildings based on search query and selected category
  const filteredBuildings = buildings
    .filter((section) => selectedCategory === "All" || section.category === selectedCategory)
    .map((section) => ({
      ...section,
      data: section.data.filter(
        (building) =>
          building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          building.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.data.length > 0)

  // Get buildings to display based on viewSaved state
  const displayedBuildings = viewSaved
    ? buildings
        .map((section) => ({
          ...section,
          data: section.data.filter((building) => saved.includes(building.id)),
        }))
        .filter((section) => section.data.length > 0)
    : filteredBuildings

  // Toggle saved status for a building
  const toggleSaved = (buildingId) => {
    setSaved((prev) => (prev.includes(buildingId) ? prev.filter((id) => id !== buildingId) : [...prev, buildingId]))
  }

  return (
    <div className="min-h-screen bg-red-700">
      {/* Top Bar - Made taller with py-5 instead of py-3 */}
      <header className="flex items-center justify-between px-6 py-5 bg-white border-b">
        {/* Left side with Oberlin Logo and title */}
        <div className="flex items-center gap-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OcC5Ox9nBTRQNb9qyRsXJlhjCO9evW.png"
            alt="Oberlin College & Conservatory"
            className="h-10"
          />

          {/* Title with Mercury serif font - made larger and darker */}
          <h1
            className="text-3xl font-bold"
            style={{
              color: "#D01323", // Slightly darker red
              fontFamily: "Mercury, Georgia, serif",
            }}
          >
            Oberlin Campus Directory
          </h1>
        </div>

        {/* Right-aligned content with search and navigation */}
        <div className="flex items-center gap-4">
          {/* Search bar adjusted width */}
          <div className="relative w-[400px]" ref={searchRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-16 border-gray-300"
              onFocus={() => {
                if (searchQuery && suggestions.length > 0) {
                  setShowSuggestions(true)
                }
              }}
            />
            <Button className="absolute right-0 top-0 h-full bg-red-500 hover:bg-red-600 text-white rounded-l-none">
              Search
            </Button>

            {/* Search suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {suggestions.map((building) => (
                  <div
                    key={building.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => {
                      router.push(`/building/${building.id}`)
                      setShowSuggestions(false)
                    }}
                  >
                    <div className="w-8 h-8 mr-2 flex-shrink-0">
                      <img
                        src={building.image || "/placeholder.svg"}
                        alt={building.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{building.name}</div>
                      <div className="text-xs text-gray-500 truncate">{building.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Clear search button */}
            {searchQuery && (
              <button
                className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setSearchQuery("")
                  setSuggestions([])
                  setShowSuggestions(false)
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            onClick={() => {
              setViewSaved(false)
              router.push("/")
            }}
            variant="ghost"
            className="font-medium"
          >
            Home
          </Button>

          <Button
            variant={viewSaved ? "default" : "ghost"}
            className={`font-medium flex items-center gap-2 ${
              viewSaved ? "bg-red-100 text-red-700 border border-red-300 shadow-sm hover:bg-gray-100" : ""
            }`}
            onClick={() => setViewSaved(!viewSaved)}
          >
            <Star className={`w-5 h-5 ${viewSaved ? "fill-yellow-400 text-yellow-400" : ""}`} />
            Saved
          </Button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto py-3 px-4 gap-2 bg-white border-b">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`rounded-md whitespace-nowrap ${
              selectedCategory === category ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category !== "All" && iconMap[category]}
            {category}
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-4">
        {displayedBuildings.map((section) => (
          <div key={section.category} className="mb-8">
            <div className="flex items-center mb-4 text-white">
              {iconMap[section.category]}
              <h2 className="text-2xl font-bold">{section.category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.data.map((building) => (
                <div key={building.id} className="bg-white rounded-lg overflow-hidden shadow">
                  <div className="relative p-3">
                    <img
                      src={building.image || "/placeholder.svg"}
                      alt={building.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-5 right-5 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                      onClick={() => toggleSaved(building.id)}
                    >
                      <Star
                        className={`w-5 h-5 ${saved.includes(building.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                      />
                    </Button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{building.name}</h3>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {building.categories.map((cat) => (
                        <span key={cat} className="inline-flex items-center px-2 py-1 bg-gray-100 text-sm rounded-full">
                          {iconMap[cat]}
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mb-2">
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => router.push(`/building/${building.id}`)}
                      >
                        View Details
                      </Button>
                      <Button variant="outline" onClick={() => window.open(getDirectionsUrl(building.name), "_blank")}>
                        Directions
                      </Button>
                    </div>

                    {building.location && (
                      <div className="bg-yellow-50 p-2 text-center rounded">{building.location}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Map Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-3 text-lg font-medium"
          onClick={() =>
            window.open(
              "https://oberlin.college-tour.com/map?_gl=1*1g4ye3z*_gcl_au*MjUwMDgwNzAuMTczMzUyMDQ2Nw..*_ga*MjY2MTM5MDI4LjE2OTg5MzAwMzY.*_ga_N88JD99WF9*MTc0MTEyMjczOS4yMC4wLjE3NDExMjI3MzkuNjAuMC4w#",
              "_blank",
            )
          }
        >
          Map
        </Button>
      </div>
    </div>
  )
}
