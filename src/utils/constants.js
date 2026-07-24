export const experiences = [
  {
    position: "Python, AI & Robotics Instructor",
    type: "teaching", // drives the "Teaching" badge in the Experience UI
    duration: "Present",
    company: "Schools & Training Institutes, Kathmandu",
    description:
      "Teach Python, applied AI, and hands-on robotics to students moving from first principles to working builds. Design the curriculum, write the lab exercises, and run every class as a build session rather than a lecture.",
    achievements: [
      "Built a three-track curriculum: Python, applied AI, and robotics.",
      "Run Arduino and Raspberry Pi labs — first sensor to line-following robot.",
      "Teach ROS, simulation, and autonomous navigation past the fundamentals.",
      "Mentor capstone builds and code review.",
    ],
    technologies: ["Python", "Arduino", "Raspberry Pi", "ROS", "Robotics", "Curriculum Design"],
  },
  {
    position: "Full-Stack",
    duration: "Jan 2024 – Apr 2024",
    company: "Smart Care Connects (Capstone Project)",
    description:
      "Designed and built a responsive healthcare platform enabling real-time consultations between patients and doctors. Focused on user interface design, accessibility, and performance.",
    technologies: ["Next.js", "Tailwind CSS", "Google Firebase", "Twilio"],
  },
  {
    position: "Developer",
    duration: "Oct 2023 – Dec 2023",
    company: "Personal Project – Online Learning Platform",
    description:
      "Developed a full-stack web app offering curated programming courses with authentication, role-based access, and dynamic lesson navigation.",
    technologies: ["Spring Boot", "Thymeleaf", "MySQL", "REST APIs"],
  },
  {
    position: "Web Designer Traineeship",
    duration: "Aug 2023 – Oct 2023",
    company: "Broadway Infosys",
    description:
      "Worked on multiple real-world website designs focusing on UI/UX, layout planning, and client collaboration.",
    technologies: ["React", "Next.js", "JavaScript", "jQuery", "Bootstrap", "Tailwind"],
  },
  {
    position: "Freelance Frontend Developer",
    duration: "Jun 2023 – Jul 2023",
    company: "Self-initiated",
    description:
      "Created custom responsive websites for small clients, improving their online presence with SEO and performance optimizations.",
    technologies: ["React", "CSS Modules", "SEO"],
  },
];

  
  export const projects = [
    {
      id: 1,
      title: 'Pixl Tools',
      description: 'A free online platform offering 30+ image utilities like compression, resizing, format conversion, and background removal. Fast, browser-based, and no sign-up required, making it ideal for quick and private image editing.',
      technologies: ['Next.js', 'Typescript', 'Sharp', 'Tailwind CSS'],
      githubUrl: 'https://github.com/aashish-nepal/pixltools',
      liveUrl: 'https://www.pixltools.com/',
      image: '/images/pixltools.jpeg'
    },
    {
      id: 2,
      title: 'Web3 OS',
      description: 'Full-stack Web3 app with wallet integration (MetaMask, WalletConnect, Coinbase), real-time balances, responsive design, and dark mode, built with Next.js, TypeScript, and Tailwind CSS.',
      technologies: ['Next.js', 'Typescript', 'Tailwind CSS', 'wagmi', 'viem', 'Resposive'],
      githubUrl: 'https://github.com/aashish-nepal/Web3-Website',
      liveUrl: 'https://aashishwebmarket.vercel.app/',
      image: '/images/webos.jpeg'
    },

    {
      id: 3,
      title: 'Smart Care Connects',
      description: 'A full-featured healthcare platform enabling real-time consultations between patients and doctors. Focused on user interface design, accessibility, and performance.',
      technologies: ['Next.js', 'NodeMailer', 'Twilio WebRTC', 'Google FireBase', 'Tailwind CSS'],
      githubUrl: 'https://github.com/aashish-nepal/Smart-Care-Connects',
      liveUrl: 'https://smartcareconnect.vercel.app/',
      image: '/images/smart-care.png'
    },

    {
      id: 4,
      title: 'Keyes Real Estate',
      description: 'A modern real estate website showcasing property listings with a clean UI, responsive design, and smooth user experience.',
      technologies: ['React', 'Typescript', 'Taillwind', 'Material UI'],
      githubUrl: 'https://github.com/aashish-nepal/Keyes-Real-Estate',
      liveUrl: 'https://keyes-realestate.vercel.app/',
      image: '/images/keyes.png'
    },
    {
      id: 5,
      title: 'Precision Plumbing',
      description: 'A professional plumbing business website designed to generate leads, highlight services, and provide easy contact options for customers.',
      technologies: ['React', 'Node.js', 'TypeScript', 'Tailwind', 'Responsive'],
      githubUrl: 'https://github.com/aashish-nepal/Precision-Plumbing',
      liveUrl: 'https://precision-plumbing-sample.vercel.app/',
      image: '/images/plumb.png'
    },
    {
      id: 6,
      title: 'Marketo',
      description: 'A full-featured e-commerce platform with product listings and Good UI-Designs.',
      technologies: ['Next.js', 'Fake-Store Api', 'Bootstrap', 'Material UI'],
      githubUrl: 'https://github.com/aashish-nepal/Ecommerce-Site',
      liveUrl: 'https://marketonepal.vercel.app/',
      image: '/images/marketo.png'
    },
  ];

/**
 * Teaching practice — the three tracks I run, ordered as a progression.
 * `level` and `topics` drive the card UI in components/Teaching.jsx.
 */
export const courses = [
  {
    id: 1,
    track: "Track 01",
    title: "Python Foundations",
    level: "Beginner",
    tagline: "From first line to first program that matters.",
    description:
      "The language, properly. Syntax and control flow, then data structures, functions, and object-oriented design — finishing with automation scripts students actually keep using.",
    topics: [
      "Syntax & control flow",
      "Data structures",
      "Functions & modules",
      "OOP",
      "File & data handling",
      "Automation scripting",
    ],
    outcome: "Write and debug real Python independently.",
  },
  {
    id: 2,
    track: "Track 02",
    title: "Arduino & Raspberry Pi",
    level: "Intermediate",
    tagline: "Where the code leaves the screen.",
    description:
      "Microcontrollers and single-board computers from the ground up. Students wire their first circuit, read a sensor, drive a motor, and close the loop into a robot that responds to the world.",
    topics: [
      "Microcontrollers",
      "Sensors & actuators",
      "Embedded C",
      "Motor control",
      "Serial communication",
      "Line-follower bots",
    ],
    outcome: "Build and program a working autonomous robot.",
  },
  {
    id: 3,
    track: "Track 03",
    title: "ROS & Advanced Robotics",
    level: "Advanced",
    tagline: "Robots that think before they move.",
    description:
      "The Robot Operating System as professionals use it — nodes, topics, and services — plus simulation and the navigation stack that turns a chassis into an autonomous system.",
    topics: [
      "ROS architecture",
      "Nodes & topics",
      "Simulation",
      "SLAM & mapping",
      "Autonomous navigation",
      "Sensor fusion",
    ],
    outcome: "Ship an autonomous navigation project end to end.",
  },
];

/** How the classes are run — the pedagogy, not the syllabus. */
export const teachingApproach = [
  {
    title: "Build first, theory second",
    description:
      "Every session ends with something that runs. Concepts land when there is working code to attach them to.",
  },
  {
    title: "Taught from practice",
    description:
      "I ship production software daily. Students learn the tools and habits actually used in the field, not textbook abstractions.",
  },
  {
    title: "Hardware in hand",
    description:
      "Robotics is not a slide deck. Real boards, real sensors, real wiring mistakes — and the debugging skill that comes from fixing them.",
  },
];

  

  