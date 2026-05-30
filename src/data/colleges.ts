import { College } from "@/types";

const states = [
  "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Telangana",
  "Uttar Pradesh", "West Bengal", "Rajasthan", "Gujarat", "Kerala",
  "Madhya Pradesh", "Andhra Pradesh", "Punjab", "Haryana", "Bihar",
];

const cities: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Delhi: ["New Delhi", "Delhi"],
  Telangana: ["Hyderabad", "Warangal"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur"],
  "West Bengal": ["Kolkata", "Kharagpur"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar"],
  Haryana: ["Gurugram", "Faridabad", "Rohtak"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur"],
};

const collegeNames = [
  "Indian Institute of Technology", "National Institute of Technology",
  "Indian Institute of Information Technology", "Birla Institute of Technology and Science",
  "Vellore Institute of Technology", "SRM Institute of Science and Technology",
  "Manipal Institute of Technology", "Delhi Technological University",
  "Jadavpur University", "Anna University",
  "College of Engineering", "Institute of Engineering and Technology",
  "School of Technology", "Academy of Engineering",
  "University Institute of Technology", "Faculty of Engineering",
  "Institute of Technical Education", "College of Technology",
  "School of Engineering", "Centre for Advanced Studies",
];

const courseNames = [
  "Computer Science Engineering", "Electronics and Communication",
  "Mechanical Engineering", "Civil Engineering",
  "Electrical Engineering", "Information Technology",
  "Chemical Engineering", "Aerospace Engineering",
  "Biotechnology", "Data Science",
  "Artificial Intelligence", "Robotics Engineering",
];

const reviewerNames = [
  "Rahul Sharma", "Priya Patel", "Amit Kumar", "Sneha Reddy", "Vikram Singh",
  "Anjali Gupta", "Rohit Verma", "Kavya Nair", "Arjun Mehta", "Divya Iyer",
  "Suresh Babu", "Meera Krishnan", "Karthik Rajan", "Pooja Desai", "Nikhil Joshi",
  "Swati Mishra", "Aditya Rao", "Tanvi Kulkarni", "Manish Tiwari", "Riya Chopra",
];

const reviewComments = [
  "Great campus and excellent faculty. The placement support is outstanding.",
  "Good infrastructure but could improve on industry connections.",
  "One of the best colleges for engineering in the region. Highly recommended.",
  "Average experience. Some departments are better than others.",
  "Excellent research opportunities and modern labs. Faculty is very supportive.",
  "The college has improved a lot in recent years. Good placements.",
  "Decent college with good hostel facilities and campus life.",
  "Strong alumni network which helps a lot during placements.",
  "Very competitive environment that pushes you to do your best.",
  "Good college overall. The library and sports facilities are top-notch.",
  "Faculty could be better in some departments but overall a solid institution.",
  "Amazing campus, vibrant student community, and great tech fests.",
  "The curriculum is well-structured and industry-relevant.",
  "Affordable fees for the quality of education provided.",
  "World-class infrastructure with plenty of extracurricular opportunities.",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateCollege(index: number): College {
  const rand = seededRandom(index + 42);

  const stateIndex = index % states.length;
  const state = states[stateIndex];
  const stateCities = cities[state];
  const city = stateCities[Math.floor(rand() * stateCities.length)];

  const nameIndex = index % collegeNames.length;
  const suffix = index >= 20 ? `, ${city}` : "";
  const name = `${collegeNames[nameIndex]}${suffix}`;

  const types: ("Government" | "Private" | "Deemed")[] = ["Government", "Private", "Deemed"];
  const type = types[Math.floor(rand() * 3)];

  const fees = Math.floor(50000 + rand() * 1450000);
  const rating = Math.round((2.5 + rand() * 2.5) * 10) / 10;
  const placementPercentage = Math.floor(50 + rand() * 48);
  const averagePackage = Math.round((3 + rand() * 17) * 10) / 10;
  const highestPackage = Math.round((averagePackage * 2 + rand() * 30) * 10) / 10;
  const establishedYear = Math.floor(1950 + rand() * 65);

  const numCourses = 5 + Math.floor(rand() * 6);
  const courses = Array.from({ length: numCourses }, (_, i) => ({
    id: `course-${index}-${i}`,
    name: courseNames[(index + i) % courseNames.length],
    duration: rand() > 0.3 ? "4 Years" : "3 Years",
    fees: Math.floor(fees * (0.8 + rand() * 0.4)),
  }));

  const reviews = Array.from({ length: 5 }, (_, i) => ({
    id: `review-${index}-${i}`,
    reviewerName: reviewerNames[(index * 3 + i) % reviewerNames.length],
    rating: Math.round((2 + rand() * 3) * 10) / 10,
    comment: reviewComments[(index + i * 2) % reviewComments.length],
  }));

  const descriptions = [
    `${name} is a prestigious institution known for its excellent academic programs and research output. Established in ${establishedYear}, it has consistently been ranked among the top institutions in India.`,
    `Founded in ${establishedYear}, ${name} offers world-class education in engineering and technology. The institution is known for its strong industry connections and high placement rates.`,
    `${name} is one of India's premier educational institutions, established in ${establishedYear}. With state-of-the-art facilities and a dedicated faculty, it provides an exceptional learning environment.`,
  ];

  return {
    id: `college-${index + 1}`,
    name,
    description: descriptions[index % 3],
    city,
    state,
    type,
    establishedYear,
    fees,
    rating,
    placementPercentage,
    averagePackage,
    highestPackage,
    image: `/college-placeholder.svg`,
    courses,
    reviews,
  };
}

export const colleges: College[] = Array.from({ length: 100 }, (_, i) =>
  generateCollege(i)
);

export const allStates = [...new Set(colleges.map((c) => c.state))].sort();
export const allTypes = ["Government", "Private", "Deemed"];
