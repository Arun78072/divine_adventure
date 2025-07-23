import axios from "axios";
import Router from "next/router";

export const baseUrl = "https://divine-adventure.vercel.app/";
// export const baseUrl = "http://localhost:3000";

export const tourTypeOption = [
  {
    id: 1,
    key: "india",
    value: "India",
    category: [
      {
        key: "indianTour",
        value: "Indian Tour",
        tours: [
          {
            id: 101,
            value: "India Tour Packages",
            description:
              "All India Tour typically involves exploring diverse regions, cultures, and landscapes across India. It often includes visits to historical sites like the Taj Mahal, ancient temples, bustling cities, serene backwaters, and maybe even the Himalayas. Packages vary, offering options like cultural tours, wildlife safaris, or beach getaways, and may cover transportation, accommodation, and guided excursions",
            coverImage: "/assets/india-tour.jpg.jpg",
          },
          {
            id: 102,
            value: "Maharashtra Tour Packages",
            description:
              "Maharashtra offers a diverse range of tourist attractions, blending historical sites like the Ajanta and Ellora caves with bustling modern cities like Mumbai. The state also boasts natural beauty with hill stations such as Mahabaleshwar and Matheran, as well as wildlife reserves like those found in the interior. Religious sites, forts, and adventure opportunities further enrich the travel experience in Maharashtra.",
           coverImage: "/assets/maharashtra.jpeg",
              
          },
          {
            id: 103,
            value: "Jammu And Kashmir Tour Packages",
            description:
              "Jammu and Kashmir attracts tourists for its diverse landscape, cultures and weather as well as for adventure activities in the Himalayas such as skiing, mountaineering, hiking, trekking and camping. Some major tourist attractions in Jammu and Kashmir are Srinagar, with its renowned Dal Lake and Mughal Gardens, Gulmarg, Pahalgam, Bhaderwah, Devigol Bunjwah, Patnitop, Sonamarg and Jammu. Every year, thousands of Hindu pilgrims visit holy shrines of Vaishno Devi and Amarnath which has had a significant impact on the state's economy.",
            coverImage: "/assets/j&k.jpg",
             
          },
          {
            id: 104,
            value: "Kerala Tour Packages",
            description:
              "Kerala, known as God's Own Country, is a popular tourist destination in India, famous for its stunning natural beauty, vibrant culture, and unique experiences. Tourists are drawn to its picturesque beaches, serene backwaters, lush tea plantations, and diverse wildlife. Beyond the natural attractions, Kerala offers cultural richness through festivals, historical sites, and traditional art forms. ",
           coverImage: "/assets/kerala2.jpg",
          },
          {
            id: 105,
            value: "Goa Tour Packages",
            description:
              "Goa, India, is a popular tourist destination known for its stunning beaches, vibrant nightlife, and rich Portuguese-influenced culture. It attracts both domestic and international travelers seeking relaxation, adventure, and a taste of its unique blend of cultures. ",
             coverImage: "/assets/goa.png",
          },
          {
            id: 106,
            value: "Bhutan Tour Packages",
            description:
              "Bhutan, known as the Land of the Thunder Dragon, is a unique tourist destination that offers a blend of stunning natural landscapes, rich Buddhist culture, and a commitment to Gross National Happiness. Tourists are drawn to Bhutan for its majestic dzongs (fortresses), ancient monasteries, vibrant festivals, and opportunities for trekking and adventure. The country's self-imposed isolation has helped preserve its unique culture and traditions, making it a fascinating destination for those seeking an authentic and immersive travel experience.",
           coverImage: "/assets/butan.jpg",
          },
          {
            id: 107,
            value: "Sri Lanka Tour Packages",
            description:
              "Sri Lanka is a diverse island nation with a wide range of attractions for tourists, including stunning beaches, ancient cities, lush tea plantations, and abundant wildlife. Visitors can explore historical sites, experience the unique culture, enjoy delicious Sri Lankan cuisine, and engage in activities like whale watching, hiking, and water sports. ",
           coverImage: "/assets/Sri-Lanka.jpg",
          },
          {
            id: 108,
            value: "Nepal Tour Packages",
            description:
              "Nepal offers a diverse range of experiences for tourists, from thrilling adventure activities like trekking and mountaineering in the Himalayas to exploring ancient temples, cultural sites, and vibrant cities. The country is known for its stunning mountain scenery, rich cultural heritage, and warm hospitality, making it a popular destination for various types of travelers. ",
            coverImage: "/assets/nepal2.jpg",
          },
          {
            id: 109,
            value: "Himachal Tour Packages",
            description:
              "Himachal Pradesh, also known as Dev Bhoomi (Land of Gods), is a popular Indian tourist destination offering a blend of natural beauty, adventure, and cultural richness. It's a land of towering Himalayan peaks, lush valleys, ancient temples, and vibrant Tibetan culture. Popular destinations include Shimla, Manali, Dharamshala, Dalhousie, and Kasauli, each offering unique attractions. ",
            coverImage: "/assets/himachal.jpg",
          },
          {
            id: 110,
            value: "Andaman And Nicobar Tour Packages",
            description:
              "The Andaman and Nicobar Islands are a tropical archipelago in the Bay of Bengal, offering a diverse range of attractions for tourists, including stunning beaches, vibrant coral reefs, lush forests, and opportunities for adventure sports. Popular activities include scuba diving, snorkeling, and exploring historic sites like the Cellular Jail. ",
           coverImage: "/assets/andoman.png",
              
          },
          {
            id: 111,
            value: "Ladakh Tour Packages",
            description:
              "Ladakh, known as the Land of High Passes, is a Himalayan paradise attracting tourists with its stunning landscapes, unique culture, and adventure opportunities. Visitors are drawn to its majestic mountains, ancient monasteries, and thrilling activities like trekking and river rafting. The region also offers a rich cultural experience with festivals, traditional Ladakhi hospitality, and opportunities to explore Buddhist heritage. Key att",
            coverImage: "/assets/ladakh.jpg",
          },
          {
            id: 112,
            value: "Rajasthan Tour Packages",
            description:
              "Rajasthan, known as the Land of Kings, offers a rich tapestry of historical, cultural, and natural attractions for tourists. Popular destinations include Jaipur, the Pink City; Udaipur, the City of Lakes; Jodhpur, the Blue City; and Jaisalmer, the Golden City. Visitors can explore majestic forts like Amber Fort and Mehrangarh Fort, delve into vibrant bazaars, enjoy camel safaris in the Thar Desert, and experience the unique charm of Rajasthan's diverse landscapes.",
            coverImage: "/assets/jodhpur.jpeg",

          },
          {
            id: 113,
            value: "Char Dham Tour Packages",
            description:
              "The Char Dham Yatra is a Hindu pilgrimage in the Indian Himalayas, comprising four sacred sites: Yamunotri, Gangotri, Kedarnath, and Badrinath. This journey is believed to cleanse one's sins and bring spiritual enlightenment. It's a popular route for tourists seeking both religious and scenic experiences in Uttarakha",
            coverImage: "/assets/chardham.png",
              
          },
          {
            id: 114,
            value: "Uttarakhand Tour Packages",
            description:
              "Uttarakhand, also known as Devbhoomi (Land of the Gods), is a popular tourist destination in India, particularly for those seeking spiritual and natural experiences. The state is famous for its diverse landscapes, including the Himalayas, valleys, and rivers, as well as its rich cultural heritage and adventure tourism opportunities. ",
            coverImage: "/assets/utrakhand.jpeg",
          },
          {
            id: 115,
            value: "Sikkim And West Bengal Tour Packages",
            description:
              "A Sikkim and West Bengal tour offers a diverse experience, blending the cultural richness of West Bengal with the natural beauty of the Sikkim Himalayas. This journey typically includes exploring historical sites and vibrant cities in West Bengal, like Kolkata and Darjeeling, followed by a trip to the serene landscapes of Sikkim, with its snow-capped mountains and Buddhist monasteries. ",
            coverImage: "/assets/sikkim.jpg",
          },
          {
            id: 116,
            value: "Ayodhya Tour Packages",
            description:
              "Ayodhya tour packages offer a variety of itineraries focused on exploring the city's rich religious and historical significance, particularly its connection to Lord Rama. These packages often include visits to the Ram Janmabhoomi temple (the birthplace of Lord Rama), Hanuman Garhi, Kanak Bhawan, and other significant temples and historical sites. Travelers can choose from one-day tours to longer itineraries, potentially combining Ayodhya with other holy cities like Varanasi and Prayagraj.",
            coverImage: "/assets/Ayodhya.png",
          },
        ],
      },
      {
        key: "honeyMoonTour",
        value: "Honey Moon Tour",
        tours: [
          {
            id: 201,
            value: "Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 202,
            value: "India Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 203,
            value: "Goa Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 204,
            value: "Ooty Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 205,
            value: "Coorg Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 206,
            value: "Bhutan Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 207,
            value: "Jammu And Kashmir Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 208,
            value: "Kerala Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 209,
            value: "Andaman And Nicobar Islands Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 210,
            value: "Manali Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 211,
            value: "Munnar Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 212,
            value: "Shimla Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 213,
            value: "Darjeeling Honeymoon Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
        ],
      },
      {
        key: "indianSpecial",
        value: "Indian Special",
        tours: [
          {
            id: 301,
            value: "Air Inclusive Tour Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 302,
            value: "Wildlife & Safari Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 303,
            value: "Spiritual Journeys",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 304,
            value: "Bike Tour Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 305,
            value: "Short Getaway Tour Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 306,
            value: "Sporty Getaway",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 307,
            value: "Ramayan Trails",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 308,
            value: "Luxury Train Tour Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 309,
            value: "Buy 1 Get 1 Free Domestic Tour Packages",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    key: "international",
    value: "International",
    category: [
      {
        key: "indianTour",
        value: "Indian Tour",
        tours: [
          {
            id: 101,
            value: "Char Dham Yatra",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 102,
            value: "Honeymoon Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 103,
            value: "Adventure Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 104,
            value: "Pilgrimage Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 105,
            value: "Wildlife Safari",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 106,
            value: "Beach Retreats",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 107,
            value: "Heritage & Historical Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 108,
            value: "Hill Station Getaway",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 109,
            value: "Desert Safari Rajasthan",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 110,
            value: "Luxury Train Experience",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 111,
            value: "Yoga & Wellness Retreat",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 112,
            value: "Backwater Cruise - Kerala",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 113,
            value: "Cultural Exploration",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 114,
            value: "North East India Discovery",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 115,
            value: "South India Temple Trail",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 116,
            value: "Ladakh Trip",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 117,
            value: "Mini Char Dham Yatra",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 120,
            value: "All India Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 121,
            value: "Lahaul Spiti",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 122,
            value: "Rajasthan",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 123,
            value: "Kashmir",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 124,
            value: "Kerala",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 125,
            value: "Karnataka ",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 126,
            value: "Amarnath ",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
        ],
      },
      {
        key: "honeyMoonTour",
        value: "Honey Moon Tour",
        tours: [
          {
            id: 201,
            value: "Char Dham Yatra",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 202,
            value: "Honeymoon Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
        ],
      },
      {
        key: "indianSpecial",
        value: "Indian Special",
        tours: [
          {
            id: 301,
            value: "Char Dham Yatra",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
          {
            id: 302,
            value: "Honeymoon Tour",
            description:
              "dummyA spiritual journey to the four sacred shrines in the Himalayas. description",
            coverImage:
              "https://www.chardham-pilgrimage-tour.com/assets/images/banner-chardham-package.webp",
          },
        ],
      },
    ],
  },
];





const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Force no-cache only on GET requests
    if (config.method === "get") {
      config.headers["Cache-Control"] = "no-cache";
      config.headers["Pragma"] = "no-cache";
      config.headers["Expires"] = "0";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - maybe redirect to login");
      Router.push("/login");
      // Optionally: logout user, clear token, redirect, etc.
    }
    return Promise.reject(error);
  }
);

export default api;
