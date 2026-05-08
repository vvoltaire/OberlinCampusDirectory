"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { iconMap, directionsUrls, buildings } from "./campus-directory"

// Building descriptions
const buildingDescriptions = {
  "King Building":
    "King Memorial Building is the main classroom building for social sciences, humanities, math, and computer science classes. In addition to classrooms, large lecture halls are equipped with data and video projectors with touch-screen controls and network access.\n\nAcademic and faculty offices of the departments of anthropology, classics, computer science, East Asian studies, rhetoric and composition, mathematics, philosophy, and sociology are in King. Designed by Minoru Yamasaki in 1966, the building resembles the Conservatory of Music nearby with its large picture windows and white structure.",
  "Rice Hall":
    "Rice Hall holds faculty and academic department offices for the social sciences and the humanities. Constructed in the years 1909 and 1910 at a cost of $110,000, the building was named to commemorate the life services of Professor Fenleon B. Rice and Helen M. Rice. Professor Rice was director of Oberlin Conservatory for 31 years, and along with his wife, are credited with the early musical development of the conservatory.\n\nRice Memorial Hall was, until the mid-1960s, used exclusively for the work of the conservatory as an extension of the adjacent Warner Hall built in 1884. When Warner, the old conservatory building, was replaced in 1964 by the conservatory complex designed by Minoru Yamaski, Rice Hall was incorporated into the new King Memorial Hall complex.",
  "Phillips Gym":
    "The Jesse Philips Physical Education Center is the college's athletic complex. It includes studios for strength training and free weights; treadmills, elliptical trainers, and cycling and rowing machines; three basketball and volleyball courts, six racquetball courts, and nine squash courts; two saunas, a training room and coaches' offices for Oberlin's 21 varsity teams; and special rooms for fencing, fitness classes, and a variety of club sports.",
  "South Gym":
    "South Gym, located in the basement, offers students access to a fully equipped fitness room, a dance studio, and soundproof music practice rooms, making it a popular spot for both physical activity and creativity.\n  This secondary gym serves as an important recreational space for students, hosting intramural sports, club practices, fitness classes, and casual play.\n\nThe facility features a full-sized basketball court with hardwood flooring that can be converted for volleyball and other indoor sports. The gym is equipped with adjustable basketball hoops, volleyball nets, and has court markings for multiple sports including basketball, volleyball, and badminton.\n\nAdditional amenities include:\n\n• Equipment storage room with sports equipment available for checkout\n• Small spectator seating area\n• ADA-accessible entrance via elevator\n• Drinking fountains and restrooms nearby\n\nSouth Gym provides an alternative workout space to Phillips Gym, especially convenient for South Hall residents and students on south campus.",
  "Student Health":
    "Student Health Services practitioners provide primary care services to all Oberlin College students, regardless of the type of insurance coverage. Students may see a certified nurse practitioner, or a registered nurse for a broad spectrum of illness and injuries, as well as follow-up care. \n\nThese are some of the services we offer:\n\n• Acute care services\n• Sexual and Reproductive Health Services\n• Laboratory\n• Select Routine Immunizations\n• Specialty Care Referrals\n\nWe also maintain a network of local experts who can offer additional specialty care as needed.",
  "Campus Safety":
    "Campus Safety supports a safe environment in which all members of the college community can learn, live, teach, and work. Open 24 hours a day, the staff responds to potential criminal incidents, suspicious activity, requests for assistance, and emergency situations. We also alert appropriate representatives of the college when they are needed after regular business hours.\n\nCampus Safety officers regularly patrol campus buildings, residence halls, and grounds by foot, vehicle, and bicycle. Though not sworn police officers, they work closely with the Oberlin police and fire departments to carry out their responsibilities in a diligent and courteous manner.",
  Umami:
    "Umami is an Asian fusion restaurant located in Wilder Hall. It offers a diverse menu of Asian-inspired dishes with plenty of vegetarian and vegan options, made with fresh ingredients and authentic flavors.",
  "Azariah's Café":
    "Students hunkering down for a long study session in Mudd don't have to go without refreshments, snacks, gourmet coffee, and specialty hot and cold beverages. These and other goodies are readily available in Azariah's Café.\n\nBuy a grab-and-go sandwich or salad, fresh fruit, or avocado toast. Enjoy freshly prepared espresso-based beverages. Cappuccinos and Lattes are a specialty!",
  Decafe:
    "DeCafé is a central campus grab-and-go spot offering fresh sandwiches, wraps, snacks, and beverages. Decafe includes a market section with grocery items, local goods, and specialty foods for a range of dietary needs.",
  Rathskeller:
    'The Rathskeller, affectionately known as "The Rat," is a cozy, late-night dining spot located in the basement of Wilder Hall. It\'s known for comfort food favorites and is popular for study breaks, hangouts, and casual bites. The menu features traditional and light grill options, beef burgers, fries, and more.',
  Stevenson:
    "Stevenson Dining Hall is a major dining destination on campus, offering a variety of themed concepts and freshly prepared meals using locally sourced ingredients. With comfortable indoor seating and a central location, it's a go-to spot for daily dining.",
  "Dascomb Hall":
    "As the First Year Experience hall for the center and south campus, Dascomb is home to nearly 170 students. Seven resident assistants and one live-in professional staff member reside in Dascomb. The residence hall offers single and double occupancy.\n\nDascomb features theme-based areas that include the All-Female Wing and the World Cultures Wing. Each floor has a lounge, TV, and laundry facilities.\n\nPrograms here are geared toward understanding and mastering the transition into college. Social programs help students make connections and friends, while educational programs allow students to learn valuable concepts outside the classroom.\n\nIn an effort to centralize essential student services, Dascomb now houses Campus Safety, and the Student Health and Counseling Center. These offices are on the north side of Dascomb facing Wilder Bowl, the campus's main student thoroughfare.",
  "South Hall":
    "South Hall is a traditional residence hall and among the largest on campus with a capacity for about 240 students. Its three floors have four wings each, including an All-Female Wing, accommodating several resident assistants and a professional live-in staff member.\n\nSouth's first floor has the largest lounge on campus, equipped with television and study areas, and a piano. Two large kitchen/lounges on the second floor allow culinary pursuits. The basement of South Hall features a dance studio, a fitness gym, and several music practice rooms.\n",
  "Residence Life":
    "The Office of Residence Life (ResLife) enables the extension and enhancement of academic learning beyond the classroom by providing quality programming, efficient services, and safe facilities.\n\n ResLife leaders maintain a personal presence in students’ lives through its undergraduate staff of Lead Resident Assistants (LRAs), Resident Assistants (RAs), and Village Assistants (VAs). Professional staff train these live-in team members to help build community, involve students in college programs, resolve conflicts, and uphold college policies and norms. LRAs, RAs, and VAs report to live-on professional staff who support and oversee their efforts toward fostering a safe and educational community.\n",
  "Warner Concert Hall":
    "This 496-seat hall adjoins the Conservatory of Music and is used for numerous student and faculty recitals, as well as recording sessions. Architect Minoru Yamasaki completed the design in 1963, along with the main conservatory complex.\n\nThe hall now features a 44-stop Flentrop organ with 3,400 pipes, built in the northern European style of the 18th century as well as the addition as of a Spanish Baroque organ, installed in 2018.",
  "Mudd Library":
    "The Seeley G. Mudd Center houses the Mary Church Terrell Main Library, the central library facility for Oberlin College and the primary location for materials in the humanities and social sciences.\n\nMudd Center or Mudd, as the building is often called, also houses the main library's interdisciplinary and or general interest works, as well as the mathematics and computer science collections. In addition, administrative and most technical services staff for the entire library system are located in Mudd Center, as is the Robert S. Lemle '75 and Roni Kohen-Lemle '76 Academic Commons and the Writing Center, both on the main level.",
  "Dionysus Sco":
    "The Student Union's Oberlin College (SCO) is a student-run venue that hosts concerts, dances, and other social events throughout the academic year. It's a popular gathering space for students to enjoy live music and performances from both student groups and visiting artists.",
  "Wilder Hall":
    "Wilder Hall serves as a gathering place for students, faculty, staff, alumni, and guests. The Student Union Board and staff work to create a sense of community within the college environment and to provide opportunities that support the development of the whole student outside the classroom.\n\nIts programs and services strive to meet the social, cultural, educational, spiritual, and recreational needs of all members of the Oberlin College community.",
  Mailroom:
    "The Student Mail Room is on the west end of the lower level of Wilder Hall. The mail room is staffed with two full-time Oberlin College employees and supplemented with approximately 10 part-time student employees during the academic year.\n\n In addition to distributing U.S. mail, the student mail room distributes campus mail, UPS, Federal Express and Amazon packages.\n\n Mailboxes are also available for faculty in residence and resident directors for personal mail and packages. Contact the assistant dean or an assistant director in the Office of Residential Education for details.",
  // Default description
  default: "Building description will be available soon.",
}

// Building hours
const buildingHours = {
  "King Building": "Always open",
  "Rice Hall": "Always open",
  "Phillips Gym":
    "**Building Hours:**\n• **Monday - Friday:** 7:00 AM - 9:00 PM\n• **Saturday - Sunday:** 9:00 AM - 5:00 PM\n\n**Pool Hours:**\n• **Monday - Friday:** 11:00 AM - 1:00 PM\n• **Saturday - Sunday:** Closed",
  "South Gym": "Always open",
  "Student Health":
    "**Regular Hours:**\n• **Monday - Wednesday:** 8:30 AM to 4:30 PM\n• **Thursday:** 8:30 AM to 7 PM\n• **Friday:** 8:30 AM to 4:30 PM\n\n**Walk-ins:**\n• **Monday - Friday,** 9 to 11 AM\n• Please call to schedule an appointment.\n\n**After-hours and Emergency Care:**\n• If you are experiencing an emergency, please call 911 or go to Mercy Allen Hospital Emergency Department at 200 W. Lorain St.\n• For non-emergencies, visit Mercy Health–Oberlin Walk-in Care by calling 844-462-3806 option 4.",
  "Campus Safety":
    "• **Open 24/7** for most services\n• **Monday - Friday,** 8am - 12pm and 1 - 4:30pm (except holidays)\n\n**Contact:**\n• 440-775-8444\n• 440-775-8886\n• Campus.Safety@oberlin.edu",
  Umami: "• **Monday - Friday:** 11:00 AM - 8:00 PM\n• **Saturday - Sunday:** 12:00 PM - 8:00 PM",
  "Azariah's Café": "• **Monday - Friday:** 8:00 - 5:00\n• **Saturday:** 10:00 - 2:00\n• **Sunday:** 10:00 - 4:00",
  Decafe: "• **Monday - Friday:** 8:00 AM - 11:30 PM\n• **Saturday - Sunday:** 2:00 PM - 10:30 PM",
  Rathskeller:
    "• **Monday-Thursday:** 8:00 PM - 12:00 AM\n• **Friday-Saturday:** 8:00 PM - 2:00 AM\n• **Sunday:** Closed",
  Stevenson:
    "**Monday - Friday:**\n• 7:30 AM - 8:00 PM\n• **Breakfast:** 7:30 - 10:00 AM\n• **Continental Breakfast:** 10:00 - 11:00 AM\n• **Lunch:** 11:00 AM - 2:00 PM\n• **Light Lunch:** 2:00 - 5:00 PM\n• **Dinner:** 5:00 - 8:00 PM\n\n**Saturday - Sunday:**\n• 8:00 AM - 8:00 PM\n• **Breakfast/Lunch:** 8:00 AM - 2:00 PM\n• **Dinner:** 5:00 - 8:00 PM",
  "Residence Life": "• **Monday - Friday,** 8am - 12pm and 1- 4:30pm (except holidays)",
  "Warner Concert Hall": "• **Open during Events.**",
  "Mudd Library":
    "• **Monday - Thursday:** 8:00 a.m. to 12am\n• **Friday:** 8:00am to 8pm\n• **Saturday:** 8 a.m. to 6pm\n• When classes are in session",
  "Dionysus Sco":
    "• **Mondays - Saturdays:** 10:00 pm - 1:00 am\n• If there is not a band, hours are 9:00 pm - Midnight\n• **Office Hours:** 4:00 PM - 7:00 PM on days of ticketed events",
  "Wilder Hall": "• **Monday-Sunday:** 8:00 AM - 12:00 PM",
  Mailroom:
    "•**Monday - Friday:** 8 a.m. to 4:20 p.m.\n•**Saturday:** 9 a.m. to noon, when classes are in session\n•**Sunday:** Closed",
  // Default hours
  default: "Hours information will be available soon.",
}

// Building menus
const buildingMenus = {
  Umami:
    "• Sushi\n  - Freshly made rolls\n\n• Rice Bowls & Noodle Bowls\n  - Build-your-own with a variety of proteins, vegetables, and toppings\n\n• Specialty Entrées\n  - Rotating chef-selected dishes\n\n• Vegetarian & Vegan Options\n  - Available across all categories",
  "Azariah's Café":
    "• Snacks, Coffee, and Cold Drinks\n  - Assorted packaged snacks and bottled beverages\n\n• Coffee\n  - Freshly prepared lattes, cappuccinos, and other specialty drinks\n  - Locally roasted beans from Goldberry Roasting Co.\n\n• Tea\n  - English breakfast, peach, and other seasonal flavors\n\n• Grab-and-Go Items\n  - Sandwiches, salads, and fresh fruit\n\n• Bakery Items\n  - House-baked specialties and pastries\n\n• Avocado Toast & Bagels\n  - Student favorites, served daily",
  Decafe:
    "• Fresh sandwiches, salads, fruits, & wraps\n\n• Snacks and beverages\n\n• Grocery and market items\n\n• Vegan, gluten-free, and allergy-conscious options",
  Rathskeller:
    "• Burgers, fries, salads, and grilled sandwiches\n\n• Breakfast sandwiches and wraps\n\n• Late-night snacks and comfort meals\n\n• Vegetarian options available",
  Stevenson:
    "• Smoke & Fire\n  - Classic comfort dishes using locally-sourced produce\n\n• Grill\n  - Sizzling grilled specialties and traditional favorites\n\n• The Carvery\n  - In-house roasted deli meats on local breads\n\n• Trattoria\n  - Handmade pizzas and pastas with scratch sauces\n\n• Roots\n  - Plant-forward meals and seasonal vegetarian options\n\n• NutriBar\n  - Fresh salads crafted daily with local produce\n\n• Blue Fin\n  - Ethically sourced seafood and salads\n\n• Bake Shoppe\n  - House-baked cakes, cookies, and pastries",
  // Default menu
  default: "Menu information will be available soon.",
}

// Building facilities
const buildingFacilities = {
  "Phillips Gym":
    "• Cardio Room\n\n• Weight Room\n\n• Dance Room\n\n• Equipment Room\n\n• Indoor Track\n\n• Carr Pool\n\n• Rock Climbing Wall\n\n• Locker Rooms\n\n• Sauna\n\n• Tennis Courts",
  // Default facilities
  default: "Facilities information will be available soon.",
}

// Define building websites
const buildingWebsites = {
  "King Building": "https://www.oberlin.edu/king-building",
  "Rice Hall": "https://www.oberlin.edu/rice-hall",
  "Phillips Gym": "https://goyeo.com/facilities/philips-gymnasium/10",
  "South Hall": "https://www.oberlin.edu/south-hall",
  "South Gym": "https://www.oberlin.edu/south-hall",
  "Student Health": "https://www.oberlin.edu/student-health-services",
  "Campus Safety": "https://www.oberlin.edu/campus-safety",
  Umami: "https://www.aviserves.com/Oberlin/meal-plans-and-dining.html",
  "Azariah's Café": "https://www.aviserves.com/Oberlin/meal-plans-and-dining.html",
  Decafe: "https://www.aviserves.com/Oberlin/meal-plans-and-dining.html",
  Rathskeller: "https://www.aviserves.com/Oberlin/meal-plans-and-dining.html",
  Stevenson: "https://www.aviserves.com/Oberlin/meal-plans-and-dining.html",
  "Dascomb Hall": "https://www.oberlin.edu/dascomb",
  "Residence Life": "https://www.oberlin.edu/housing",
  "Warner Concert Hall": "https://www.oberlin.edu/warner-concert-hall",
  "Mudd Library": "https://libraries.oberlin.edu/libraries/mary-church-terrell",
  "Dionysus Sco": "https://www.dionysusdisco.com/",
  "Wilder Hall": "https://www.oberlin.edu/wilder-hall",
  Mailroom: "https://www.oberlin.edu/student-mail-room",
  // Default website
  default: "https://www.oberlin.edu",
}

// Define event calendar URLs
const eventCalendars = {
  "King Building": "https://calendar.oberlin.edu/king_building/calendar",
  "Phillips Gym": "https://goyeo.com/calendar",
  "Warner Concert Hall": "https://calendar.oberlin.edu/warner_concert_hall/calendar",
  "Mudd Library": "https://calendar.oberlin.edu/mudd_center_main_library/calendar",
  "Dionysus Sco": "https://calendar.oberlin.edu/sco_dionysus_club_wilder_hall/calendar",
  "Wilder Hall": "https://calendar.oberlin.edu/wilder_hall_student_union/calendar",
  // Default calendar
  default: "https://calendar.oberlin.edu/",
}

// Define special booking URLs
const bookingUrls = {
  "Warner Concert Hall": "https://oberlin.emscloudservice.com/web/Default.aspx",
  "Mudd Library": "https://oberlin.libcal.com/reserve/mudd-study-rooms",
  "Dionysus Sco": "https://www.dionysusdisco.com/tech-specs",
  "King Building": "https://oberlin.emscloudservice.com/web/RoomRequest.aspx",
  // Default booking URL
  default: "https://oberlin.emscloudservice.com/web/Default.aspx",
}

// Define floor plan URLs
const floorPlanUrls = {
  "Dascomb Hall": "https://www.oberlin.edu/housing/options/traditional",
  "South Hall": "https://www.oberlin.edu/housing/options/traditional",
  // Default floor plan URL
  default: "https://www.oberlin.edu/housing/options/traditional",
}

// Define mobile order URLs
const mobileOrderUrls = {
  Umami: "https://www.aviserves.com/Oberlin/documents/mobileordering.pdf",
  Rathskeller: "https://www.aviserves.com/Oberlin/documents/mobileordering.pdf",
  "Azariah's Café": "https://www.aviserves.com/Oberlin/documents/mobileordering.pdf",
  // Default mobile order URL
  default: "https://www.aviserves.com/Oberlin/documents/mobileordering.pdf",
}

// Define YeoFit classes URL
const yeoFitUrl = "https://yeofit.oberlinathletics.com/schedule/"

// Function to get building description
const getBuildingDescription = (buildingName) => {
  return buildingDescriptions[buildingName] || buildingDescriptions.default
}

// Function to get building hours
const getBuildingHours = (buildingName) => {
  return buildingHours[buildingName] || buildingHours.default
}

// Function to get building menu
const getBuildingMenu = (buildingName) => {
  return buildingMenus[buildingName] || buildingMenus.default
}

// Function to get building facilities
const getBuildingFacilities = (buildingName) => {
  return buildingFacilities[buildingName] || buildingFacilities.default
}

// Function to get building events URL
const getEventsUrl = (buildingName) => {
  return eventCalendars[buildingName] || eventCalendars.default
}

// Function to get booking URL
const getBookingUrl = (buildingName) => {
  return bookingUrls[buildingName] || bookingUrls.default
}

// Function to get floor plan URL
const getFloorPlanUrl = (buildingName) => {
  return floorPlanUrls[buildingName] || floorPlanUrls.default
}

// Function to get mobile order URL
const getMobileOrderUrl = (buildingName) => {
  return mobileOrderUrls[buildingName] || mobileOrderUrls.default
}

// Add this new mapping of building names to their available menu options after the buildingHours object
const buildingMenuOptions = {
  "King Building": ["about", "hours", "classes", "reserve", "events", "website", "directions"],
  "Rice Hall": ["about", "hours", "website", "directions"],
  "Dascomb Hall": ["about", "floorplan", "website", "directions"],
  "South Hall": ["about", "floorplan", "website", "directions"],
  "Warner Concert Hall": ["about", "hours", "events", "bookpractice", "website", "directions"],
  "Campus Safety": ["about", "hours", "website", "directions"],
  "Student Health": ["about", "hours", "website", "directions"],
  Mailroom: ["about", "hours", "website", "directions"],
  "Dionysus Sco": ["about", "hours", "website", "events", "booksco", "directions"],
  Decafe: ["about", "hours", "menu", "mobileorder", "website", "directions"],
  Rathskeller: ["about", "hours", "menu", "mobileorder", "website", "directions"],
  Umami: ["about", "hours", "menu", "mobileorder", "website", "directions"],
  "Azariah's Café": ["about", "hours", "menu", "mobileorder", "website", "directions"],
  Stevenson: ["about", "hours", "menu", "website", "directions"],
  "Mudd Library": ["about", "hours", "events", "bookstudy", "directions"],
  "Phillips Gym": ["about", "hours", "events", "facilities", "yeofit", "website", "directions"],
  "Residence Life": ["about", "hours", "website", "directions"],
  "Wilder Hall": ["about", "hours", "events", "website", "directions"],
  // Default options for other buildings
  default: ["about", "hours", "website", "directions"],
}

export default function BuildingDetails({ params }) {
  const router = useRouter()
  const [building, setBuilding] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    // Find the building from the URL parameter
    if (params?.buildingId) {
      const allBuildings = buildings.flatMap((section) => section.data)
      const foundBuilding = allBuildings.find((b) => b.id === params.buildingId)
      setBuilding(foundBuilding)
      setLoading(false)
    }
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!building) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Building not found</h1>
        <Button onClick={() => router.push("/")} className="bg-red-600 hover:bg-red-700 text-white">
          Back to Home
        </Button>
      </div>
    )
  }

  const buildingDescription = getBuildingDescription(building.name)
  const hours = getBuildingHours(building.name)
  const menu = getBuildingMenu(building.name)
  const facilities = getBuildingFacilities(building.name)

  // Render content based on active tab
  const renderTabContent = () => {
    // Common header with building name and categories
    const header = (
      <>
        <h1 className="text-3xl font-bold">{building.name}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {building.categories.map((cat) => (
            <span key={cat} className="text-black inline-flex items-center px-3 py-1 bg-gray-100 text-sm rounded-full">
              {iconMap[cat]}
              {cat}
            </span>
          ))}
        </div>
      </>
    )

    switch (activeTab) {
      case "about":
        return (
          <div className="text-white space-y-4">
            {header}
            <img
              src={building.image || "/placeholder.svg"}
              alt={building.name}
              className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            />
            <h2 className="text-2xl font-bold">About</h2>
            <p className="whitespace-pre-line">{buildingDescription}</p>
          </div>
        )
      case "hours":
        return (
          <div className="text-white space-y-4">
            {header}
            <h2 className="text-2xl font-bold">Hours</h2>
            <div
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: hours.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          </div>
        )
      case "menu":
        return (
          <div className="text-white space-y-4">
            {header}
            <h2 className="text-2xl font-bold">Menu</h2>
            <p className="whitespace-pre-line">{menu}</p>
          </div>
        )
      case "facilities":
        return (
          <div className="text-white space-y-4">
            {header}
            <h2 className="text-2xl font-bold">Facilities</h2>
            <p className="whitespace-pre-line">{facilities}</p>
          </div>
        )
      default:
        return (
          <div className="text-white space-y-4">
            {header}
            <p>Select a tab from the menu</p>
          </div>
        )
    }
  }

  // Function to render the menu based on building type
  const renderMenu = () => {
    // Get the available menu options for this building
    const availableOptions = buildingMenuOptions[building.name] || buildingMenuOptions.default

    // Define all possible menu items
    const allMenuItems = [
      {
        type: "tab",
        id: "about",
        label: "About",
      },
      {
        type: "tab",
        id: "hours",
        label: "Hours",
      },
      {
        type: "link",
        id: "floorplan",
        url: getFloorPlanUrl(building.name),
        label: "Floor Plan",
      },
      {
        type: "tab",
        id: "menu",
        label: "Menu",
      },
      {
        type: "tab",
        id: "facilities",
        label: "Facilities",
      },
      {
        type: "link",
        id: "events",
        url: getEventsUrl(building.name),
        label: "Events",
      },
      {
        type: "link",
        id: "mobileorder",
        url: getMobileOrderUrl(building.name),
        label: "Mobile Order",
      },
      {
        type: "link",
        id: "classes",
        url: "https://banner.cc.oberlin.edu/StudentRegistrationSsb/ssb/classSearch/classSearch",
        label: `View Classes in ${building.name}`,
      },
      {
        type: "link",
        id: "reserve",
        url: "https://oberlin.emscloudservice.com/web/RoomRequest.aspx",
        label: "Reserve a Room",
      },
      {
        type: "link",
        id: "website",
        url: buildingWebsites[building.name] || buildingWebsites.default,
        label: "Website",
      },
      {
        type: "link",
        id: "housingwebsite",
        url: "https://www.oberlin.edu/housing",
        label: "Housing Website",
      },
      {
        type: "link",
        id: "bookstudy",
        url: "https://oberlin.libcal.com/reserve/mudd-study-rooms",
        label: "Book a Study Room",
      },
      {
        type: "link",
        id: "bookpractice",
        url: "https://oberlin.libcal.com/reserve/practice-rooms",
        label: "Book a Practice Room",
      },
      {
        type: "link",
        id: "booksco",
        url: "https://www.dionysusdisco.com/tech-specs",
        label: "Book The 'Sco",
      },
      {
        type: "link",
        id: "yeofit",
        url: yeoFitUrl,
        label: "YeoFit Classes",
      },
      {
        type: "link",
        id: "directions",
        url: directionsUrls[building.name] || "#",
        label: "Directions",
      },
    ]

    // Filter menu items based on available options
    const menuItems = allMenuItems.filter((item) => availableOptions.includes(item.id))

    // Render the menu items
    return (
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          if (item.type === "tab") {
            return (
              <button
                key={index}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === item.id ? "bg-red-100 text-red-700 font-medium" : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            )
          } else if (item.type === "link") {
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 rounded-md hover:bg-gray-100 text-left"
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            )
          }
          return null
        })}
      </nav>
    )
  }

  return (
    <div className="min-h-screen bg-red-100">
      {/* Smaller top bar */}
      <div className="bg-white p-3 shadow-sm flex items-center">
        <Button onClick={() => router.push("/")} variant="outline" className="flex items-center gap-2" size="sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      {/* Main Content with Right-aligned Menu */}
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content Area - Takes up more space */}
          <div className="w-full md:w-2/3 bg-red-700 rounded-lg shadow-md p-6">{renderTabContent()}</div>

          {/* Right Menu Panel */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">{building.name}</h2>
            {renderMenu()}
          </div>
        </div>
      </div>
    </div>
  )
}
