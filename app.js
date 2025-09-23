// InternFinder App JavaScript - Fixed Version

// Application State
let currentUser = {
    profile: {
        personalInfo: {},
        skills: [],
        preferences: {
            locations: [],
            workTypes: [],
            categories: []
        }
    },
    savedInternships: [],
    applications: []
};

let internships = [];
let filteredInternships = [];
let currentPage = 1;
const itemsPerPage = 4;
let currentTab = 'dashboard';
let filterSkills = [];
let searchTerms = [];

// ... (the rest of your mock data and helper functions remain the same) ...

// Main Application Logic



// ... (other functions like renderInternships, createInternshipCard, etc., remain the same) ...


function nextPage() {
    const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderInternships();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderInternships();
    }
}


function setupEventListeners() {
    // Search and filter inputs
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('locationFilter').addEventListener('change', applyFilters);
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('workTypeFilter').addEventListener('change', applyFilters);
    document.getElementById('companySizeFilter').addEventListener('change', applyFilters);
    document.getElementById('stipendFilter').addEventListener('input', applyFilters);

    // Skill filter input
    const skillsFilterInput = document.getElementById('skillsFilterInput');
    if (skillsFilterInput) {
        skillsFilterInput.addEventListener('input', () => showSkillsFilterSuggestions(skillsFilterInput.value));
        skillsFilterInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkillFilter(skillsFilterInput.value);
                hideSkillsFilterSuggestions();
            }
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortInternships();
            renderInternships();
        });
    }

    // FIXED: Pagination event listeners
    const nextPageBtn = document.getElementById('nextPage');
    const prevPageBtn = document.getElementById('prevPage');
    if (nextPageBtn) nextPageBtn.addEventListener('click', nextPage);
    if (prevPageBtn) prevPageBtn.addEventListener('click', prevPage);


    // Modal close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    console.log('✅ Event listeners set up');
}

// ... (rest of the file remains the same) ...

// Global functions for HTML onclick handlers
window.toggleSave = toggleSave;
window.applyToInternship = applyToInternship;
window.viewInternship = viewInternship;
window.switchTab = switchTab;
window.openModal = openModal;
window.closeModal = closeModal;
window.saveProfile = saveProfile;
window.clearFilters = clearFilters;
window.addSkill = addSkill;
window.removeSkill = removeSkill;
window.addSkillFilter = addSkillFilter;
window.removeSkillFilter = removeSkillFilter;
// We keep these for any potential inline `onclick` calls, though it's better to rely on event listeners
window.nextPage = nextPage;
window.prevPage = prevPage;

console.log('🎉 InternFinder AI-Enhanced App Loaded - FIXED VERSION');

// Enhanced Mock Data with original + PMIS internships
const mockInternships = [
    // Original internships
   {
        id: 1,
        title: "Software Development Intern",
        company: "TechCorp Solutions",
        location: "Bangalore, India",
        type: "Remote/Hybrid",
        duration: "3 months",
        stipend: "₹25,000/month",
        description: "Join our dynamic development team to work on cutting-edge web applications using React, Node.js, and MongoDB.",
        requirements: ["JavaScript", "React", "Node.js", "Git", "Problem Solving"],
        posted: "2025-09-15",
        deadline: "2025-09-30",
        companySize: "500-1000",
        category: "Technology",
        tags: ["Full Stack", "Web Development", "Startup"],
        logo: "TC"
    },
    {
        id: 2,
        title: "Data Science Intern",
        company: "Analytics Pro",
        location: "Mumbai, India",
        type: "On-site",
        duration: "6 months",
        stipend: "₹30,000/month",
        description: "Work with our data science team to analyze large datasets and build predictive models using Python and machine learning.",
        requirements: ["Python", "Machine Learning", "Pandas", "SQL", "Statistics"],
        posted: "2025-09-14",
        deadline: "2025-10-15",
        companySize: "100-500",
        category: "Data Science",
        tags: ["AI/ML", "Analytics", "Python"],
        logo: "AP"
    },
    {
        id: 3,
        title: "UI/UX Design Intern",
        company: "Creative Studios",
        location: "Delhi, India",
        type: "Hybrid",
        duration: "4 months",
        stipend: "₹20,000/month",
        description: "Design intuitive user interfaces and experiences for mobile and web applications using Figma and Adobe Creative Suite.",
        requirements: ["Figma", "Adobe Creative Suite", "UI Design", "User Research", "Prototyping"],
        posted: "2025-09-13",
        deadline: "2025-09-28",
        companySize: "50-100",
        category: "Design",
        tags: ["Design", "Creative", "Mobile"],
        logo: "CS"
    },
    {
        id: 4,
        title: "Mobile App Development Intern",
        company: "AppVenture",
        location: "Pune, India",
        type: "Remote",
        duration: "4 months",
        stipend: "₹22,000/month",
        description: "Develop native Android and iOS applications using Flutter and React Native frameworks.",
        requirements: ["Flutter", "Dart", "React Native", "Mobile Development", "Firebase"],
        posted: "2025-09-12",
        deadline: "2025-10-05",
        companySize: "100-500",
        category: "Technology",
        tags: ["Mobile", "Cross-platform", "Flutter"],
        logo: "AV"
    },
    {
        id: 5,
        title: "DevOps Engineering Intern",
        company: "CloudTech Systems",
        location: "Hyderabad, India",
        type: "On-site",
        duration: "3 months",
        stipend: "₹28,000/month",
        description: "Learn cloud infrastructure, CI/CD pipelines, and automation using AWS, Docker, and Kubernetes.",
        requirements: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD"],
        posted: "2025-09-11",
        deadline: "2025-09-25",
        companySize: "1000+",
        category: "Technology",
        tags: ["Cloud", "DevOps", "Infrastructure"],
        logo: "CTS"
    },
    {
        id: 6,
        title: "Digital Marketing Intern",
        company: "GrowthHacker Inc",
        location: "Chennai, India",
        type: "Hybrid",
        duration: "3 months",
        stipend: "₹18,000/month",
        description: "Execute digital marketing campaigns, manage social media, and analyze marketing metrics.",
        requirements: ["Social Media Marketing", "Google Analytics", "Content Creation", "SEO", "Digital Marketing"],
        posted: "2025-09-10",
        deadline: "2025-09-22",
        companySize: "50-100",
        category: "Marketing",
        tags: ["Digital Marketing", "Social Media", "Growth"],
        logo: "GH"
    },
    {
        id: 7,
        title: "Cybersecurity Intern",
        company: "SecureNet Solutions",
        location: "Gurgaon, India",
        type: "On-site",
        duration: "6 months",
        stipend: "₹35,000/month",
        description: "Learn ethical hacking, vulnerability assessment, and security auditing in enterprise environments.",
        requirements: ["Network Security", "Penetration Testing", "Linux", "Python", "CISSP Knowledge"],
        posted: "2025-09-09",
        deadline: "2025-10-01",
        companySize: "500-1000",
        category: "Cybersecurity",
        tags: ["Security", "Ethical Hacking", "Enterprise"],
        logo: "SS"
    },
    {
        id: 8,
        title: "Business Analyst Intern",
        company: "Consulting Partners",
        location: "Kolkata, India",
        type: "Hybrid",
        duration: "4 months",
        stipend: "₹24,000/month",
        description: "Analyze business processes, create documentation, and support strategic decision-making initiatives.",
        requirements: ["Business Analysis", "Excel", "SQL", "Documentation", "Process Mapping"],
        posted: "2025-09-08",
        deadline: "2025-09-30",
        companySize: "500-1000",
        category: "Business",
        tags: ["Analysis", "Consulting", "Strategy"],
        logo: "CP"
    },
    {
    id: 9,
    title: "Software Engineering Intern",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    type: "Remote",
    duration: "6 months",
    stipend: "₹32,000/month",
    description: "Develop scalable web applications and collaborate on full-stack projects.",
    requirements: ["JavaScript", "React", "Node.js", "Git"],
    posted: "2025-09-10",
    deadline: "2025-09-28",
    companySize: "100-500",
    category: "Technology",
    tags: ["Web Development", "Full Stack"],
    logo: "TN"
   },
   {
    id: 10,
    title: "Digital Marketing Intern",
    company: "Marketiq Agency",
    location: "Delhi, India",
    type: "Hybrid",
    duration: "3 months",
    stipend: "₹15,000/month",
    description: "Assist in planning and executing social media campaigns, SEO analysis, and content marketing.",
    requirements: ["SEO", "Analytics", "Content Writing", "Creativity"],
    posted: "2025-09-09",
    deadline: "2025-09-26",
    companySize: "50-200",
    category: "Marketing",
    tags: ["SEO", "Social Media", "Content"],
    logo: "MQ"
  },
  {
    id: 11,
    title: "Data Science Intern",
    company: "DataBridge AI",
    location: "Mumbai, India",
    type: "Remote",
    duration: "5 months",
    stipend: "₹28,000/month",
    description: "Work on machine learning models, data cleaning, and visualization projects.",
    requirements: ["Python", "Machine Learning", "Pandas", "Data Visualization"],
    posted: "2025-09-11",
    deadline: "2025-10-01",
    companySize: "200-500",
    category: "Data Science",
    tags: ["AI", "ML", "Data Analytics"],
    logo: "DB"
  },
  {
    id: 12,
    title: "Graphic Design Intern",
    company: "PixelCraft Studios",
    location: "Chennai, India",
    type: "Onsite",
    duration: "2 months",
    stipend: "₹12,000/month",
    description: "Design marketing materials, banners, and assist in branding projects.",
    requirements: ["Photoshop", "Illustrator", "Creativity", "Brand Awareness"],
    posted: "2025-09-07",
    deadline: "2025-09-21",
    companySize: "30-100",
    category: "Design",
    tags: ["Graphics", "Branding"],
    logo: "PC"
  },
  {
    id: 13,
    title: "HR Intern",
    company: "TalentRise HR",
    location: "Noida, India",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹15,000/month",
    description: "Support recruitment, onboarding, and employee engagement initiatives.",
    requirements: ["Communication", "MS Office", "People Management"],
    posted: "2025-09-08",
    deadline: "2025-09-23",
    companySize: "100-300",
    category: "Human Resources",
    tags: ["Recruitment", "Onboarding"],
    logo: "TR"
  },
  {
    id: 14,
    title: "Frontend Developer Intern",
    company: "Weblytics",
    location: "Remote",
    type: "Remote",
    duration: "5 months",
    stipend: "₹26,000/month",
    description: "Build responsive frontend interfaces and optimize for performance.",
    requirements: ["HTML", "CSS", "JavaScript", "React"],
    posted: "2025-09-12",
    deadline: "2025-09-27",
    companySize: "20-80",
    category: "Technology",
    tags: ["Frontend", "UI"],
    logo: "WL"
  },
  {
    id: 15,
    title: "Content Writer Intern",
    company: "WriteSphere",
    location: "Gurgaon, India",
    type: "Hybrid",
    duration: "3 months",
    stipend: "₹10,000/month",
    description: "Research and develop blog posts, articles, and social media content.",
    requirements: ["English Proficiency", "Creativity", "SEO Basics"],
    posted: "2025-09-06",
    deadline: "2025-09-22",
    companySize: "40-120",
    category: "Content",
    tags: ["Writing", "Blogs"],
    logo: "WS"
  },
  {
    id: 16,
    title: "Finance Intern",
    company: "FinCorp Ltd.",
    location: "Pune, India",
    type: "Onsite",
    duration: "4 months",
    stipend: "₹20,000/month",
    description: "Assist in budgets, forecasts, and financial reports analysis.",
    requirements: ["Accounting", "Excel", "Financial Modelling"],
    posted: "2025-09-13",
    deadline: "2025-09-29",
    companySize: "300-900",
    category: "Finance",
    tags: ["Finance", "Analysis"],
    logo: "FC"
  },
  {
    id: 17,
    title: "Operations Intern",
    company: "OpsGen",
    location: "Jaipur, India",
    type: "Hybrid",
    duration: "3 months",
    stipend: "₹18,000/month",
    description: "Optimize workflows, support logistics, and assist team operations.",
    requirements: ["Logistics", "Coordination", "MS Office"],
    posted: "2025-09-07",
    deadline: "2025-09-20",
    companySize: "500-1000",
    category: "Operations",
    tags: ["Logistics", "Coordination"],
    logo: "OG"
  },
  {
    id: 18,
    title: "Backend Developer Intern",
    company: "AlgoWorks",
    location: "Indore, India",
    type: "Remote",
    duration: "5 months",
    stipend: "₹27,000/month",
    description: "Develop REST APIs, work on database integration, and server deployment.",
    requirements: ["Java", "Spring Boot", "SQL", "APIs"],
    posted: "2025-09-04",
    deadline: "2025-09-19",
    companySize: "150-600",
    category: "Technology",
    tags: ["Backend", "Java"],
    logo: "AW"
  },

  {
    id: 19,
    title: "Quality Assurance Intern",
    company: "TestLab Technologies",
    location: "Bengaluru, India",
    type: "Remote",
    duration: "4 months",
    stipend: "₹22,000/month",
    description: "Design test cases, perform automated and manual testing, and report bugs.",
    requirements: ["Selenium", "TestNG", "Attention to Detail"],
    posted: "2025-09-14",
    deadline: "2025-10-05",
    companySize: "150-400",
    category: "Technology",
    tags: ["QA", "Automation"],
    logo: "TL"
  },
  {
    id: 20,
    title: "Product Management Intern",
    company: "InnovateX",
    location: "Mumbai, India",
    type: "Hybrid",
    duration: "6 months",
    stipend: "₹30,000/month",
    description: "Assist in product roadmap planning, user research, and feature prioritization.",
    requirements: ["Agile", "Wireframing", "User Research"],
    posted: "2025-09-15",
    deadline: "2025-10-01",
    companySize: "200-600",
    category: "Business",
    tags: ["PM", "Agile"],
    logo: "IX"
  },
  {
    id: 21,
    title: "Social Media Intern",
    company: "BuzzWave Media",
    location: "Hyderabad, India",
    type: "Onsite",
    duration: "3 months",
    stipend: "₹14,000/month",
    description: "Create and schedule social media posts, monitor engagement, analyze metrics.",
    requirements: ["Instagram", "Facebook Ads", "Analytics"],
    posted: "2025-09-10",
    deadline: "2025-09-25",
    companySize: "50-150",
    category: "Marketing",
    tags: ["Social Media", "Analytics"],
    logo: "BW"
  },
  {
    id: 22,
    title: "UX/UI Design Intern",
    company: "PixelFlow",
    location: "Chennai, India",
    type: "Remote",
    duration: "5 months",
    stipend: "₹25,000/month",
    description: "Design wireframes, prototypes, and conduct user testing sessions.",
    requirements: ["Figma", "Sketch", "User Testing"],
    posted: "2025-09-12",
    deadline: "2025-09-29",
    companySize: "80-250",
    category: "Design",
    tags: ["UX", "UI"],
    logo: "PF"
  },
  {
    id: 23,
    title: "Business Development Intern",
    company: "GrowthSphere",
    location: "Pune, India",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹20,000/month",
    description: "Research market opportunities, support lead generation and partnerships.",
    requirements: ["Research", "Communication", "CRM"],
    posted: "2025-09-08",
    deadline: "2025-09-30",
    companySize: "120-350",
    category: "Business",
    tags: ["BD", "Sales"],
    logo: "GS"
  },
  {
    id: 24,
    title: "Cybersecurity Intern",
    company: "SecureNode",
    location: "Gurgaon, India",
    type: "Onsite",
    duration: "6 months",
    stipend: "₹35,000/month",
    description: "Conduct vulnerability assessments, monitor threats, and assist in audits.",
    requirements: ["Networking", "Penetration Testing", "Wireshark"],
    posted: "2025-09-11",
    deadline: "2025-09-28",
    companySize: "300-800",
    category: "Technology",
    tags: ["Security", "PenTesting"],
    logo: "SN"
  },
  {
    id: 25,
    title: "HR Analytics Intern",
    company: "PeopleMetrics",
    location: "Noida, India",
    type: "Remote",
    duration: "3 months",
    stipend: "₹18,000/month",
    description: "Analyze employee data, build HR dashboards, and report insights.",
    requirements: ["Power BI", "Excel", "Statistics"],
    posted: "2025-09-13",
    deadline: "2025-10-02",
    companySize: "100-300",
    category: "Human Resources",
    tags: ["Analytics", "HR"],
    logo: "PM"
  },
  {
    id: 26,
    title: "DevOps Intern",
    company: "CloudWave",
    location: "Bengaluru, India",
    type: "Hybrid",
    duration: "5 months",
    stipend: "₹30,000/month",
    description: "Assist in CI/CD pipeline setup, AWS resource management, and automation.",
    requirements: ["Docker", "Kubernetes", "AWS"],
    posted: "2025-09-14",
    deadline: "2025-09-30",
    companySize: "250-700",
    category: "Technology",
    tags: ["DevOps", "Cloud"],
    logo: "CW"
  },
  {
    id: 27,
    title: "Mechanical Engineering Intern",
    company: "MechSense Solutions",
    location: "Coimbatore, India",
    type: "Onsite",
    duration: "4 months",
    stipend: "₹16,000/month",
    description: "Support design and prototyping of mechanical components using CAD tools.",
    requirements: ["AutoCAD", "SolidWorks", "Mechanical Design"],
    posted: "2025-09-07",
    deadline: "2025-09-24",
    companySize: "80-200",
    category: "Engineering",
    tags: ["CAD", "Design"],
    logo: "MS"
  },
  {
    id: 28,
    title: "Chemical Lab Intern",
    company: "ChemQuest Labs",
    location: "Ahmedabad, India",
    type: "Onsite",
    duration: "3 months",
    stipend: "₹15,000/month",
    description: "Assist in sample analysis, lab maintenance, and experiment documentation.",
    requirements: ["Lab Safety", "Titration", "Data Recording"],
    posted: "2025-09-05",
    deadline: "2025-09-20",
    companySize: "60-150",
    category: "Science",
    tags: ["Lab", "Analysis"],
    logo: "CQ"
  },
  {
    id: 29,
    title: "Civil Engineering Intern",
    company: "UrbanBuild Constructions",
    location: "Kochi, India",
    type: "Hybrid",
    duration: "6 months",
    stipend: "₹18,000/month",
    description: "Assist site surveys, drafting, and structural analysis documentation.",
    requirements: ["AutoCAD", "Surveying", "MS Office"],
    posted: "2025-09-09",
    deadline: "2025-10-03",
    companySize: "500-1000",
    category: "Engineering",
    tags: ["Civil", "Survey"],
    logo: "UB"
  },
  {
    id: 30,
    title: "Biomedical Engineering Intern",
    company: "BioInnovate",
    location: "Hyderabad, India",
    type: "Onsite",
    duration: "4 months",
    stipend: "₹20,000/month",
    description: "Work on prototype development of biomedical devices and test protocols.",
    requirements: ["MATLAB", "Prototyping", "Biomedical Concepts"],
    posted: "2025-09-12",
    deadline: "2025-09-30",
    companySize: "100-250",
    category: "Engineering",
    tags: ["Biomedical", "R&D"],
    logo: "BI"
  },
  {
    id: 31,
    title: "Video Editing Intern",
    company: "VidArt Creations",
    location: "Remote",
    type: "Remote",
    duration: "3 months",
    stipend: "₹18,000/month",
    description: "Edit gaming and promotional videos using Premiere Pro and After Effects.",
    requirements: ["Premiere Pro", "After Effects", "Creativity"],
    posted: "2025-09-06",
    deadline: "2025-09-22",
    companySize: "40-100",
    category: "Media",
    tags: ["Video", "Editing"],
    logo: "VA"
  },
  {
    id: 32,
    title: "Animation Intern",
    company: "AniMotion Studios",
    location: "Pune, India",
    type: "Onsite",
    duration: "4 months",
    stipend: "₹16,000/month",
    description: "Create 2D animations and storyboards for marketing videos.",
    requirements: ["Toon Boom", "Storyboarding", "Creativity"],
    posted: "2025-09-08",
    deadline: "2025-09-25",
    companySize: "50-120",
    category: "Design",
    tags: ["Animation", "2D"],
    logo: "AM"
  },
  {
    id: 33,
    title: "Research Intern",
    company: "EcoFuture Research",
    location: "Chennai, India",
    type: "Hybrid",
    duration: "6 months",
    stipend: "₹22,000/month",
    description: "Conduct environmental impact assessments and data analysis.",
    requirements: ["R", "GIS", "Report Writing"],
    posted: "2025-09-10",
    deadline: "2025-10-06",
    companySize: "90-300",
    category: "Science",
    tags: ["Environment", "Analysis"],
    logo: "EF"
  },
  {
    id: 34,
    title: "Legal Intern",
    company: "LawBridge Associates",
    location: "Delhi, India",
    type: "Onsite",
    duration: "3 months",
    stipend: "₹25,000/month",
    description: "Assist in drafting contracts, legal research, and case documentation.",
    requirements: ["Legal Research", "Drafting", "MS Office"],
    posted: "2025-09-11",
    deadline: "2025-09-28",
    companySize: "60-180",
    category: "Legal",
    tags: ["Contracts", "Research"],
    logo: "LB"
  },
  {
    id: 35,
    title: "Supply Chain Intern",
    company: "LogistiCore",
    location: "Mumbai, India",
    type: "Hybrid",
    duration: "5 months",
    stipend: "₹19,000/month",
    description: "Coordinate with suppliers, manage inventory data, and optimize routes.",
    requirements: ["SAP", "Excel", "Coordination"],
    posted: "2025-09-07",
    deadline: "2025-09-27",
    companySize: "400-900",
    category: "Operations",
    tags: ["Supply Chain", "Inventory"],
    logo: "LC"
  },
  {
    id: 36,
    title: "Electrical Engineering Intern",
    company: "ElectroWorks",
    location: "Kolkata, India",
    type: "Onsite",
    duration: "4 months",
    stipend: "₹17,000/month",
    description: "Support circuit design, PCB layout, and testing procedures.",
    requirements: ["Circuit Design", "PCB", "Multimeter"],
    posted: "2025-09-05",
    deadline: "2025-09-23",
    companySize: "80-220",
    category: "Engineering",
    tags: ["Electrical", "Hardware"],
    logo: "EW"
  },
  {
    id: 37,
    title: "Mobile App Development Intern",
    company: "AppCraft Studios",
    location: "Bengaluru, India",
    type: "Remote",
    duration: "5 months",
    stipend: "₹28,000/month",
    description: "Develop Android and iOS app features using Flutter.",
    requirements: ["Flutter", "Dart", "Git"],
    posted: "2025-09-09",
    deadline: "2025-09-30",
    companySize: "150-350",
    category: "Technology",
    tags: ["Mobile", "Flutter"],
    logo: "AC"
  },
  {
    id: 38,
    title: "Business Intelligence Intern",
    company: "InsightEdge",
    location: "Gurgaon, India",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹24,000/month",
    description: "Build BI dashboards, ETL pipelines, and performance reports.",
    requirements: ["Tableau", "SQL", "ETL"],
    posted: "2025-09-12",
    deadline: "2025-10-02",
    companySize: "200-500",
    category: "Data Science",
    tags: ["BI", "Analytics"],
    logo: "IE"
  },
  {
    id: 39,
    title: "Public Relations Intern",
    company: "PRConnect",
    location: "Hyderabad, India",
    type: "Onsite",
    duration: "3 months",
    stipend: "₹13,000/month",
    description: "Draft press releases, manage media outreach, and track mentions.",
    requirements: ["Writing", "Media Relations", "MS Office"],
    posted: "2025-09-06",
    deadline: "2025-09-24",
    companySize: "70-160",
    category: "Marketing",
    tags: ["PR", "Communication"],
    logo: "PR"
  },
  {
    id: 40,
    title: "Electrical Design Intern",
    company: "GreenGrid Energy",
    location: "Pune, India",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹21,000/month",
    description: "Assist in renewable energy system design and simulations.",
    requirements: ["MATLAB", "PV Design", "Simulation"],
    posted: "2025-09-08",
    deadline: "2025-10-01",
    companySize: "100-300",
    category: "Engineering",
    tags: ["Renewables", "Design"],
    logo: "GG"
  },
  {
    id: 41,
    title: "Event Management Intern",
    company: "Eventia",
    location: "Mumbai, India",
    type: "Onsite",
    duration: "3 months",
    stipend: "₹12,000/month",
    description: "Coordinate event logistics, vendor communication, and attendee management.",
    requirements: ["Coordination", "Negotiation", "Excel"],
    posted: "2025-09-05",
    deadline: "2025-09-20",
    companySize: "60-140",
    category: "Operations",
    tags: ["Events", "Logistics"],
    logo: "EV"
  },
  {
    id: 42,
    title: "3D Modeling Intern",
    company: "VirtuaDesign",
    location: "Bengaluru, India",
    type: "Remote",
    duration: "4 months",
    stipend: "₹19,000/month",
    description: "Create 3D assets for AR/VR using Blender and Unity.",
    requirements: ["Blender", "Unity", "3D Texturing"],
    posted: "2025-09-10",
    deadline: "2025-09-29",
    companySize: "80-220",
    category: "Design",
    tags: ["3D", "AR/VR"],
    logo: "VD"
  },
  {
    id: 43,
    title: "Research & Development Intern",
    company: "NanoTech Innovations",
    location: "Ahmedabad, India",
    type: "Onsite",
    duration: "6 months",
    stipend: "₹24,000/month",
    description: "Work on nanomaterials synthesis and characterization experiments.",
    requirements: ["Lab Techniques", "SEM", "Research"],
    posted: "2025-09-07",
    deadline: "2025-10-05",
    companySize: "50-150",
    category: "Science",
    tags: ["Nanotech", "R&D"],
    logo: "NI"
  },
  {
    id: 44,
    title: "E-commerce Intern",
    company: "ShopEase",
    location: "Gurgaon, India",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹18,000/month",
    description: "Manage product listings, optimize listings, and analyze sales data.",
    requirements: ["Shopify", "Analytics", "Photoshop"],
    posted: "2025-09-09",
    deadline: "2025-10-03",
    companySize: "300-700",
    category: "Business",
    tags: ["E-commerce", "Analytics"],
    logo: "SE"
  },
  {
    id: 45,
    title: "Financial Modeling Intern",
    company: "ModelPro Finance",
    location: "Mumbai, India",
    type: "Onsite",
    duration: "3 months",
    stipend: "₹22,000/month",
    description: "Build financial models, valuation analysis, and investor decks.",
    requirements: ["Excel", "Valuation", "PowerPoint"],
    posted: "2025-09-11",
    deadline: "2025-09-28",
    companySize: "150-350",
    category: "Finance",
    tags: ["Modeling", "Valuation"],
    logo: "MP"
  },
  {
    id: 46,
    title: "Interior Design Intern",
    company: "SpaceCraft Interiors",
    location: "Delhi, India",
    type: "Hybrid",
    duration: "4 months",
    stipend: "₹17,000/month",
    description: "Support in drafting interior layouts and choosing materials.",
    requirements: ["AutoCAD", "3ds Max", "Creativity"],
    posted: "2025-09-06",
    deadline: "2025-09-24",
    companySize: "60-160",
    category: "Design",
    tags: ["Interior", "Layout"],
    logo: "SC"
  },
  {
    id: 47,
    title: "Blockchain Development Intern",
    company: "ChainWorks",
    location: "Remote",
    type: "Remote",
    duration: "5 months",
    stipend: "₹32,000/month",
    description: "Develop smart contracts on Ethereum and assist in dApp development.",
    requirements: ["Solidity", "Web3.js", "Git"],
    posted: "2025-09-08",
    deadline: "2025-10-02",
    companySize: "100-250",
    category: "Technology",
    tags: ["Blockchain", "Smart Contracts"],
    logo: "CW"
  },
  {
    id: 48,
    title: "Market Research Intern",
    company: "InsightPulse",
    location: "Chennai, India",
    type: "Onsite",
    duration: "3 months",
    stipend: "₹14,000/month",
    description: "Conduct competitor analysis, surveys, and prepare market reports.",
    requirements: ["Surveys", "Excel", "Report Writing"],
    posted: "2025-09-05",
    deadline: "2025-09-23",
    companySize: "70-180",
    category: "Business",
    tags: ["Research", "Analysis"],
    logo: "IP"
  },
  {
    id: 49,
    title: "AI Research Intern",
    company: "DeepMind Innovations",
    location: "Bengaluru, India",
    type: "Onsite",
    duration: "6 months",
    stipend: "₹40,000/month",
    description: "Work on NLP and reinforcement learning research projects.",
    requirements: ["Python", "TensorFlow", "Research"],
    posted: "2025-09-10",
    deadline: "2025-10-06",
    companySize: "200-600",
    category: "Data Science",
    tags: ["AI", "RL"],
    logo: "DM"
  },
  {
    id: 50,
    title: "Technical Writing Intern",
    company: "DocuTech Solutions",
    location: "Remote",
    type: "Remote",
    duration: "4 months",
    stipend: "₹13,000/month",
    description: "Draft technical manuals, API documentation, and user guides.",
    requirements: ["Writing", "Markdown", "Attention to Detail"],
    posted: "2025-09-07",
    deadline: "2025-09-26",
    companySize: "90-220",
    category: "Content",
    tags: ["Documentation", "API"],
    logo: "DT"
  },
  {
    id: 51,
    title: "Game Development Intern",
    company: "PlayForge Studios",
    location: "Hyderabad, India",
    type: "Onsite",
    duration: "5 months",
    stipend: "₹30,000/month",
    description: "Develop gameplay features in Unity and optimize performance.",
    requirements: ["C#", "Unity", "Problem Solving"],
    posted: "2025-09-09",
    deadline: "2025-10-03",
    companySize: "120-300",
    category: "Technology",
    tags: ["GameDev", "Unity"],
    logo: "PF"
  },
  {
    id: 52,
    title: "Data Engineering Intern",
    company: "DataGrid Labs",
    location: "Pune, India",
    type: "Hybrid",
    duration: "6 months",
    stipend: "₹29,000/month",
    description: "Build data pipelines, ETL workflows, and optimize data storage.",
    requirements: ["Python", "Airflow", "SQL"],
    posted: "2025-09-11",
    deadline: "2025-10-06",
    companySize: "200-500",
    category: "Data Science",
    tags: ["ETL", "Pipelines"],
    logo: "DG"
  },
  {
    id: 53,
    title: "Audio Engineering Intern",
    company: "SoundWave Studios",
    location: "Chennai, India",
    type: "Onsite",
    duration: "3 months",
    stipend: "₹12,000/month",
    description: "Record, mix, and master audio tracks for podcasts and videos.",
    requirements: ["Pro Tools", "Mixing", "Sound Editing"],
    posted: "2025-09-05",
    deadline: "2025-09-24",
    companySize: "40-110",
    category: "Media",
    tags: ["Audio", "Mixing"],
    logo: "SW"
  },
  {
    id: 54,
    title: "Biotechnology Intern",
    company: "GenLab Biotech",
    location: "Ahmedabad, India",
    type: "Onsite",
    duration: "6 months",
    stipend: "₹23,000/month",
    description: "Assist in genetic sequencing, cell culture, and protocol development.",
    requirements: ["PCR", "Cell Culture", "Lab Safety"],
    posted: "2025-09-08",
    deadline: "2025-10-06",
    companySize: "70-180",
    category: "Science",
    tags: ["Biotech", "Lab"],
    logo: "GL"
  },
  {
    id: 55,
    title: "Corporate Strategy Intern",
    company: "StratEdge Consulting",
    location: "Mumbai, India",
    type: "Onsite",
    duration: "4 months",
    stipend: "₹26,000/month",
    description: "Support strategic initiatives, market analysis, and executive presentations.",
    requirements: ["PowerPoint", "Strategy", "Research"],
    posted: "2025-09-10",
    deadline: "2025-09-30",
    companySize: "250-600",
    category: "Business",
    tags: ["Strategy", "Consulting"],
    logo: "SE"
  },
  {
    id: 56,
    title: "Environmental Engineering Intern",
    company: "GreenTech Solutions",
    location: "Bengaluru, India",
    type: "Hybrid",
    duration: "5 months",
    stipend: "₹22,000/month",
    description: "Assist in waste management projects and water treatment design.",
    requirements: ["AutoCAD", "Environmental Science", "Data Analysis"],
    posted: "2025-09-07",
    deadline: "2025-09-29",
    companySize: "100-300",
    category: "Engineering",
    tags: ["Environmental", "Water Treatment"],
    logo: "GT"
  },
  {
    id: 57,
    title: "UX Research Intern",
    company: "UserFirst Labs",
    location: "Remote",
    type: "Remote",
    duration: "4 months",
    stipend: "₹19,000/month",
    description: "Conduct user interviews, usability studies, and analyze findings.",
    requirements: ["User Testing", "Surveys", "Qualitative Analysis"],
    posted: "2025-09-12",
    deadline: "2025-10-04",
    companySize: "80-220",
    category: "Design",
    tags: ["UX", "Research"],
    logo: "UF"
  },
  {
    id: 58,
    title: "Augmented Reality Intern",
    company: "ARVisions",
    location: "Pune, India",
    type: "Onsite",
    duration: "5 months",
    stipend: "₹28,000/month",
    description: "Develop AR experiences using ARKit/ARCore and 3D asset integration.",
    requirements: ["ARKit", "Unity", "3D Modeling"],
    posted: "2025-09-13",
    deadline: "2025-10-06",
    companySize: "90-210",
    category: "Technology",
    tags: ["AR", "Unity"],
    logo: "AV"
  },
];

// Local Storage Functions
function saveToLocalStorage() {
    try {
        localStorage.setItem('internFinderUser', JSON.stringify(currentUser));
        console.log('✅ Profile saved to localStorage');
    } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
    }
}

function loadFromLocalStorage() {
    try {
        const savedUser = localStorage.getItem('internFinderUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            console.log('✅ Profile loaded from localStorage');
            return true;
        }
    } catch (error) {
        console.error('❌ Error loading from localStorage:', error);
    }
    return false;
}

// FIXED: Enhanced AI Match Score Calculation
function calculateMatchScore(internship, userProfile) {
    if (!userProfile || !userProfile.skills || userProfile.skills.length === 0) {
        return 0;
    }

    const userSkills = userProfile.skills.map(skill => skill.name.toLowerCase());
    const internshipSkills = internship.requirements.map(req => req.toLowerCase());

    // Calculate skill matches
    let skillMatches = 0;
    userSkills.forEach(userSkill => {
        if (internshipSkills.some(reqSkill => 
            reqSkill.includes(userSkill) || userSkill.includes(reqSkill)
        )) {
            skillMatches++;
        }
    });

    // Base score from skill matches (avoid division by zero)
    let score = internshipSkills.length > 0 ? 
        Math.round((skillMatches / internshipSkills.length) * 70) : 0;

    // Bonus points for location preference
    if (userProfile.preferences && userProfile.preferences.locations && userProfile.preferences.locations.length > 0) {
        const preferredLocations = userProfile.preferences.locations.map(loc => loc.toLowerCase());
        if (preferredLocations.some(loc => internship.location.toLowerCase().includes(loc))) {
            score += 15;
        }
    }

    // Bonus points for work type preference
    if (userProfile.preferences && userProfile.preferences.workTypes && userProfile.preferences.workTypes.length > 0) {
        const preferredTypes = userProfile.preferences.workTypes.map(type => type.toLowerCase());
        if (preferredTypes.some(type => internship.type.toLowerCase().includes(type))) {
            score += 15;
        }
    }

    return Math.min(100, Math.max(0, score));
}

function getDaysUntilDeadline(deadline) {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function formatDeadline(deadline) {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return "Expired";
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `${days} days left`;
}

// Enhanced Profile Management
function updateProfileProgress() {
    const profile = currentUser.profile;
    let completedFields = 0;
    let totalFields = 7;

    if (profile.personalInfo.name) completedFields++;
    if (profile.personalInfo.email) completedFields++;
    if (profile.personalInfo.university) completedFields++;
    if (profile.personalInfo.year) completedFields++;
    if (profile.personalInfo.major) completedFields++;
    if (profile.skills && profile.skills.length > 0) completedFields++;
    if ((profile.preferences.locations && profile.preferences.locations.length > 0) || 
        (profile.preferences.workTypes && profile.preferences.workTypes.length > 0)) completedFields++;

    const percentage = Math.round((completedFields / totalFields) * 100);

    const progressFill = document.getElementById('profileProgress');
    const progressText = document.getElementById('progressPercent');

    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = percentage;

    return percentage;
}

function saveProfile() {
    // Update personal info
    currentUser.profile.personalInfo = {
        name: document.getElementById('studentName')?.value || '',
        email: document.getElementById('studentEmail')?.value || '',
        university: document.getElementById('university')?.value || '',
        year: document.getElementById('yearOfStudy')?.value || '',
        major: document.getElementById('major')?.value || ''
    };

    // Update preferences
    const locationPrefs = Array.from(document.querySelectorAll('#locationPreferences input:checked'))
        .map(input => input.value);
    const workTypePrefs = Array.from(document.querySelectorAll('#workTypePreferences input:checked'))
        .map(input => input.value);

    currentUser.profile.preferences = {
        locations: locationPrefs,
        workTypes: workTypePrefs,
        categories: currentUser.profile.preferences.categories || []
    };

    // Save to localStorage
    saveToLocalStorage();

    updateProfileProgress();
    generateAIRecommendations();
    closeModal('profileModal');
    showNotification('Profile saved successfully! AI recommendations updated.', 'success');

    // Update dashboard
    updateStats();
    renderInternships();
}

function loadProfile() {
    const profile = currentUser.profile;

    if (profile.personalInfo.name) {
        const nameInput = document.getElementById('studentName');
        if (nameInput) nameInput.value = profile.personalInfo.name;
    }
    if (profile.personalInfo.email) {
        const emailInput = document.getElementById('studentEmail');
        if (emailInput) emailInput.value = profile.personalInfo.email;
    }
    if (profile.personalInfo.university) {
        const uniInput = document.getElementById('university');
        if (uniInput) uniInput.value = profile.personalInfo.university;
    }
    if (profile.personalInfo.year) {
        const yearInput = document.getElementById('yearOfStudy');
        if (yearInput) yearInput.value = profile.personalInfo.year;
    }
    if (profile.personalInfo.major) {
        const majorInput = document.getElementById('major');
        if (majorInput) majorInput.value = profile.personalInfo.major;
    }

    renderSkills();

    if (profile.preferences && profile.preferences.locations) {
        profile.preferences.locations.forEach(location => {
            const checkbox = document.querySelector(`#locationPreferences input[value="${location}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    if (profile.preferences && profile.preferences.workTypes) {
        profile.preferences.workTypes.forEach(workType => {
            const checkbox = document.querySelector(`#workTypePreferences input[value="${workType}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    updateProfileProgress();
}

// FIXED: Enhanced Skills Management with AI
function addSkill(skillName, level = 'Beginner') {
    if (!skillName || !skillName.trim()) return;

    // Initialize skills array if it doesn't exist
    if (!currentUser.profile.skills) {
        currentUser.profile.skills = [];
    }

    // Check for duplicates
    if (currentUser.profile.skills.some(skill => 
        skill.name.toLowerCase() === skillName.toLowerCase())) {
        console.log('Skill already exists:', skillName);
        return;
    }

    currentUser.profile.skills.push({
        name: skillName.trim(),
        level: level
    });

    renderSkills();
    saveToLocalStorage();
    generateAIRecommendations();
    updateStats(); // Update the matching skills count

    const skillInput = document.getElementById('skillInput');
    if (skillInput) skillInput.value = '';
    hideSkillSuggestions();

    console.log('✅ Skill added:', skillName, '| Total skills:', currentUser.profile.skills.length);
}

function removeSkill(index) {
    if (!currentUser.profile.skills || index < 0 || index >= currentUser.profile.skills.length) {
        return;
    }

    currentUser.profile.skills.splice(index, 1);
    renderSkills();
    saveToLocalStorage();
    generateAIRecommendations();
    updateStats(); // Update the matching skills count

    console.log('✅ Skill removed | Total skills:', currentUser.profile.skills.length);
}

function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList) return;

    skillsList.innerHTML = '';

    if (!currentUser.profile.skills) {
        currentUser.profile.skills = [];
    }

    currentUser.profile.skills.forEach((skill, index) => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <span class="skill-level">${skill.level}</span>
            <button class="skill-remove" onclick="removeSkill(${index})" aria-label="Remove skill">×</button>
        `;
        skillsList.appendChild(skillElement);
    });
}

// Enhanced AI Auto-Suggestion for Skills
function showSkillSuggestions(query) {
    const suggestions = document.getElementById('skillsSuggestions');
    if (!suggestions) return;

    if (!query || query.length < 1) {
        hideSkillSuggestions();
        return;
    }

    if (!currentUser.profile.skills) {
        currentUser.profile.skills = [];
    }
    
    // Dynamic suggestions based on internship requirements
    const allSkillsFromInternships = new Set();
    internships.forEach(internship => {
        internship.requirements.forEach(req => {
            allSkillsFromInternships.add(req);
        });
    });
    
    // Convert to array and filter based on query
    const filteredSuggestions = Array.from(allSkillsFromInternships)
        .filter(skill => 
            skill.toLowerCase().includes(query.toLowerCase()) && 
            !currentUser.profile.skills.some(userSkill => 
                userSkill.name.toLowerCase() === skill.toLowerCase()
            )
        );

    suggestions.innerHTML = '';
    
    // Add user's exact input as first suggestion if it's not already in user skills
    const hasExactMatch = currentUser.profile.skills.some(
        userSkill => userSkill.name.toLowerCase() === query.toLowerCase()
    );
    
    if (!hasExactMatch) {
        const exactMatchItem = document.createElement('div');
        exactMatchItem.className = 'suggestion-item';
        exactMatchItem.innerHTML = `
            <span class="suggestion-text">${query}</span>
            <span class="suggestion-type">Custom</span>
        `;
        exactMatchItem.onclick = () => addSkill(query);
        suggestions.appendChild(exactMatchItem);
    }

    // Add matching skills from internships
    filteredSuggestions.slice(0, 7).forEach(skill => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <span class="suggestion-text">${skill}</span>
            <span class="suggestion-type">Skill</span>
        `;
        item.onclick = () => addSkill(skill);
        suggestions.appendChild(item);
    });

    if (suggestions.children.length > 0) {
        suggestions.classList.add('show');
    } else {
        hideSkillSuggestions();
    }
}

function hideSkillSuggestions() {
    const suggestions = document.getElementById('skillsSuggestions');
    if (suggestions) {
        suggestions.classList.remove('show');
    }
}

// AI Auto-Suggestion for Search
function showSearchSuggestions(query) {
    const suggestions = document.getElementById('searchSuggestions');
    if (!suggestions) return;

    if (!query || query.length < 2) {
        hideSearchSuggestions();
        return;
    }

    const results = [];

    // Search in different categories
    Object.keys(searchSuggestions).forEach(category => {
        searchSuggestions[category].forEach(item => {
            if (item.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    text: item,
                    type: category,
                    count: getInternshipCountForTerm(item)
                });
            }
        });
    });

    // Search in internship titles and companies
    internships.forEach(internship => {
        if (internship.title.toLowerCase().includes(query.toLowerCase()) ||
            internship.company.toLowerCase().includes(query.toLowerCase())) {
            if (!results.some(r => r.text === internship.title)) {
                results.push({
                    text: internship.title,
                    type: 'internship',
                    count: 1
                });
            }
        }
    });

    if (results.length === 0) {
        hideSearchSuggestions();
        return;
    }

    suggestions.innerHTML = '';
    results.slice(0, 6).forEach(result => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <span class="suggestion-text">${result.text}</span>
            <span class="suggestion-meta">${result.count} ${result.count === 1 ? 'result' : 'results'}</span>
        `;
        item.onclick = () => {
            addSearchTerm(result.text);
        };
        suggestions.appendChild(item);
    });

    suggestions.style.display = 'block';
}

function hideSearchSuggestions() {
    const suggestions = document.getElementById('searchSuggestions');
    if (suggestions) {
        suggestions.style.display = 'none';
    }
}

function getInternshipCountForTerm(term) {
    return internships.filter(internship =>
        internship.title.toLowerCase().includes(term.toLowerCase()) ||
        internship.company.toLowerCase().includes(term.toLowerCase()) ||
        internship.requirements.some(req => req.toLowerCase().includes(term.toLowerCase())) ||
        internship.category.toLowerCase().includes(term.toLowerCase())
    ).length;
}

// Enhanced AI Recommendations
function generateAIRecommendations() {
    const recommendationsContainer = document.getElementById('aiRecommendations');
    if (!recommendationsContainer) return;

    if (!currentUser.profile.skills || currentUser.profile.skills.length === 0) {
        recommendationsContainer.innerHTML = `
            <div class="ai-recommendation-empty">
                <div class="ai-icon">🤖</div>
                <h4>Complete your profile to get AI recommendations!</h4>
                <p>Add your skills, preferences, and location to get personalized internship suggestions.</p>
            </div>
        `;
        return;
    }

    const userSkills = currentUser.profile.skills.map(skill => skill.name.toLowerCase());
    const recommendations = [];

    // Get top matching internships
    const matchingInternships = internships
        .map(internship => ({
            ...internship,
            matchScore: calculateMatchScore(internship, currentUser.profile)
        }))
        .filter(internship => internship.matchScore > 30)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);

    if (matchingInternships.length > 0) {
        recommendations.push({
            type: 'skill-match',
            title: '🎯 Perfect Skill Matches',
            description: `Found ${matchingInternships.length} internships matching your ${userSkills.slice(0, 3).join(', ')} skills`,
            internships: matchingInternships
        });
    }

    // Location-based recommendations
    if (currentUser.profile.preferences && currentUser.profile.preferences.locations && currentUser.profile.preferences.locations.length > 0) {
        const locationInternships = internships.filter(internship =>
            currentUser.profile.preferences.locations.some(location =>
                internship.location.toLowerCase().includes(location.toLowerCase())
            )
        ).slice(0, 3);

        if (locationInternships.length > 0) {
            recommendations.push({
                type: 'location',
                title: '📍 In Your Preferred Locations',
                description: `Opportunities in ${currentUser.profile.preferences.locations.join(', ')}`,
                internships: locationInternships
            });
        }
    }

    // Trending recommendations based on user's field
    const userMajor = currentUser.profile.personalInfo.major?.toLowerCase() || '';
    const trendingInternships = internships.filter(internship => {
        if (userMajor.includes('computer') || userMajor.includes('software') || userMajor.includes('tech')) {
            return internship.category === 'Technology' || internship.category === 'Data Science';
        }
        if (userMajor.includes('design') || userMajor.includes('art')) {
            return internship.category === 'Design';
        }
        if (userMajor.includes('business') || userMajor.includes('management')) {
            return internship.category === 'Business' || internship.category === 'Marketing';
        }
        return internship.tags.includes('Trending') || internship.stipend.includes('30,000') || internship.stipend.includes('35,000');
    }).slice(0, 3);

    if (trendingInternships.length > 0) {
        recommendations.push({
            type: 'trending',
            title: '🔥 Trending in Your Field',
            description: 'High-demand internships based on your major and interests',
            internships: trendingInternships
        });
    }

    renderAIRecommendations(recommendations);
}

function renderAIRecommendations(recommendations) {
    const container = document.getElementById('aiRecommendations');
    if (!container) return;

    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="ai-recommendation-empty">
                <div class="ai-icon">🤖</div>
                <h4>Building your AI recommendations...</h4>
                <p>Complete more of your profile for better personalized suggestions.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    recommendations.forEach(rec => {
        const recElement = document.createElement('div');
        recElement.className = 'ai-recommendation-section';

        recElement.innerHTML = `
            <div class="ai-rec-header">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>
            <div class="ai-rec-internships">
                ${rec.internships.map(internship => `
                    <div class="ai-rec-card" onclick="viewInternship(${internship.id})">
                        <div class="ai-rec-logo">${internship.logo}</div>
                        <div class="ai-rec-content">
                            <h5>${internship.title}</h5>
                            <p>${internship.company}</p>
                            <span class="ai-rec-stipend">${internship.stipend}</span>
                            ${internship.matchScore ? `<span class="match-score">${internship.matchScore}% match</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.appendChild(recElement);
    });
}

// Search Terms Management
function addSearchTerm(term) {
    if (!term || !term.trim()) return;
    
    const trimmedTerm = term.trim();
    if (!searchTerms.some(existingTerm => 
        existingTerm.toLowerCase() === trimmedTerm.toLowerCase()
    )) {
        searchTerms.push(trimmedTerm);
        renderSearchTerms();
        filterInternships();
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    hideSearchSuggestions();
}

function removeSearchTerm(term) {
    console.log('Removing search term:', term);
    console.log('Before removal, searchTerms:', [...searchTerms]);
    
    // Case-insensitive comparison to ensure we find the term
    const index = searchTerms.findIndex(
        existingTerm => existingTerm.toLowerCase() === term.toLowerCase()
    );
    
    if (index !== -1) {
        searchTerms.splice(index, 1);
    }
    
    console.log('After removal, searchTerms:', [...searchTerms]);
    renderSearchTerms();
    filterInternships();
}

function renderSearchTerms() {
    const container = document.getElementById('searchTermsList');
    if (!container) return;

    container.innerHTML = '';

    searchTerms.forEach(term => {
        const termChip = document.createElement('div');
        termChip.className = 'search-term-chip';
        
        const termSpan = document.createElement('span');
        termSpan.textContent = term;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = '×';
        removeButton.setAttribute('aria-label', 'Remove search term');
        removeButton.addEventListener('click', function() {
            removeSearchTerm(term);
        });
        
        termChip.appendChild(termSpan);
        termChip.appendChild(removeButton);
        container.appendChild(termChip);
    });
}

// Enhanced Search and Filter Functions
function filterInternships() {
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const locationFilter = document.getElementById('locationFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const durationFilter = document.getElementById('durationFilter')?.value || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';

    filteredInternships = internships.filter(internship => {
        // Check if internship matches any of the search terms
        const matchesSearchTerms = searchTerms.length === 0 || 
            searchTerms.some(term => {
                const lowerTerm = term.toLowerCase();
                return internship.title.toLowerCase().includes(lowerTerm) ||
                    internship.company.toLowerCase().includes(lowerTerm) ||
                    internship.requirements.some(req => req.toLowerCase().includes(lowerTerm)) ||
                    internship.description.toLowerCase().includes(lowerTerm);
            });
            
        // Check if internship matches the current search input
        const matchesCurrentSearch = !searchQuery || 
            internship.title.toLowerCase().includes(searchQuery) ||
            internship.company.toLowerCase().includes(searchQuery) ||
            internship.requirements.some(req => req.toLowerCase().includes(searchQuery)) ||
            internship.description.toLowerCase().includes(searchQuery);

        const matchesLocation = !locationFilter || 
            internship.location.includes(locationFilter) || 
            internship.type.includes(locationFilter);

        const matchesCategory = !categoryFilter || internship.category === categoryFilter;
        const matchesDuration = !durationFilter || internship.duration === durationFilter;
        const matchesType = !typeFilter || internship.type.includes(typeFilter);

        const skillMatches = (filterSkills.length === 0) || 
            filterSkills.every(skill =>
                internship.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase())) ||
                internship.title.toLowerCase().includes(skill.toLowerCase()) ||
                internship.description.toLowerCase().includes(skill.toLowerCase())
            );

        return (matchesSearchTerms && matchesCurrentSearch) && 
               matchesLocation && matchesCategory && 
               matchesDuration && matchesType && skillMatches;
    });

    sortInternships();
    currentPage = 1;
    renderInternships();
    updateStats();
}

function sortInternships() {
    const sortBy = document.getElementById('sortSelect')?.value || 'relevance';

    filteredInternships.sort((a, b) => {
        switch (sortBy) {
            case 'stipend':
                return parseInt(b.stipend.replace(/[^\d]/g, '')) - parseInt(a.stipend.replace(/[^\d]/g, ''));
            case 'deadline':
                return new Date(a.deadline) - new Date(b.deadline);
            case 'posted':
                return new Date(b.posted) - new Date(a.posted);
            case 'relevance':
            default:
                const scoreA = calculateMatchScore(a, currentUser.profile);
                const scoreB = calculateMatchScore(b, currentUser.profile);
                return scoreB - scoreA;
        }
    });
}

function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('locationFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const durationFilter = document.getElementById('durationFilter');
    const typeFilter = document.getElementById('typeFilter');
    const skillsFilterInput = document.getElementById('skillsFilterInput');

    if (searchInput) searchInput.value = '';
    if (locationFilter) locationFilter.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (durationFilter) durationFilter.value = '';
    if (typeFilter) typeFilter.value = '';
    if (skillsFilterInput) skillsFilterInput.value = '';

    // Clear search terms and skills filters
    searchTerms = [];
    filterSkills = [];
    
    renderSearchTerms();
    renderSkillsFilter();
    hideSearchSuggestions();
    hideSkillsFilterSuggestions();
    filterInternships();
}

// Enhanced Render Functions
function renderInternships() {
    const grid = document.getElementById('internshipsGrid');
    if (!grid) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageInternships = filteredInternships.slice(startIndex, endIndex);

    if (pageInternships.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No internships found</h3>
                <p>Try adjusting your search criteria or filters.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    pageInternships.forEach(internship => {
        const matchScore = calculateMatchScore(internship, currentUser.profile);
        const isExpiring = getDaysUntilDeadline(internship.deadline) <= 3;
        const isSaved = currentUser.savedInternships.includes(internship.id);
        const hasApplied = currentUser.applications.some(app => app.internshipId === internship.id);

        const card = document.createElement('div');
        card.className = `internship-card ${isExpiring ? 'expiring' : ''} ${hasApplied ? 'applied' : ''}`;

        card.innerHTML = `
            <div class="card-header">
                <div class="company-logo">${internship.logo}</div>
                <div class="card-actions">
                    ${matchScore > 0 ? `<span class="match-badge">${matchScore}% match</span>` : ''}
                    <button class="btn-icon ${isSaved ? 'saved' : ''}" onclick="toggleSave(${internship.id})" title="${isSaved ? 'Remove from saved' : 'Save internship'}">
                        ${isSaved ? '💾' : '🤍'}
                    </button>
                </div>
            </div>
            <div class="card-content">
                <h3 class="internship-title">${internship.title}</h3>
                <p class="company-name">${internship.company}</p>
                <div class="internship-meta">
                    <span class="location">📍 ${internship.location}</span>
                    <span class="duration">⏱️ ${internship.duration}</span>
                    <span class="type">💼 ${internship.type}</span>
                </div>
                <p class="description">${internship.description}</p>
                <div class="requirements">
                    <strong>Requirements:</strong>
                    <div class="requirements-tags">
                        ${internship.requirements.map(req => `<span class="req-tag">${req}</span>`).join('')}
                    </div>
                </div>
                <div class="card-footer">
                    <div class="stipend">${internship.stipend}</div>
                    <div class="deadline ${isExpiring ? 'urgent' : ''}">${formatDeadline(internship.deadline)}</div>
                </div>
            </div>
            <div class="card-actions-bottom">
                <button class="btn btn--outline" onclick="viewInternship(${internship.id})">View Details</button>
                <button class="btn btn--primary ${hasApplied ? 'applied' : ''}" 
                        onclick="applyToInternship(${internship.id})"
                        ${hasApplied ? 'disabled' : ''}>
                    ${hasApplied ? 'Applied ✓' : 'Apply Now'}
                </button>
            </div>
        `;

        grid.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);

    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'flex';
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

// FIXED: Enhanced Stats Update
function updateStats() {
    // Calculate matching internships based on user skills
    let matchingCount = 0;
    if (currentUser.profile.skills && currentUser.profile.skills.length > 0) {
        matchingCount = internships.filter(internship => 
            calculateMatchScore(internship, currentUser.profile) > 50
        ).length;
    }

    const totalElement = document.getElementById('totalInternships');
    const matchingElement = document.getElementById('matchingInternships');
    const savedElement = document.getElementById('savedCount');
    const appliedElement = document.getElementById('appliedCount');
    const resultsElement = document.getElementById('resultsCount');

    if (totalElement) totalElement.textContent = internships.length;
    if (matchingElement) matchingElement.textContent = matchingCount;
    if (savedElement) savedElement.textContent = currentUser.savedInternships.length;
    if (appliedElement) appliedElement.textContent = currentUser.applications.length;
    if (resultsElement) resultsElement.textContent = `${filteredInternships.length} internships found`;

    console.log('✅ Stats updated - Matching skills:', matchingCount);
}

// Action Functions
function toggleSave(internshipId) {
    const index = currentUser.savedInternships.indexOf(internshipId);
    if (index > -1) {
        currentUser.savedInternships.splice(index, 1);
        showNotification('Removed from saved', 'info');
    } else {
        currentUser.savedInternships.push(internshipId);
        showNotification('Added to saved', 'success');
    }

    saveToLocalStorage();
    updateStats();

    if (currentTab === 'saved') {
        renderSavedInternships();
    }
    if (currentTab === 'dashboard') {
        renderInternships();
    }
}

function applyToInternship(internshipId) {
    const hasApplied = currentUser.applications.some(app => app.internshipId === internshipId);
    if (hasApplied) return;

    const application = {
        internshipId: internshipId,
        appliedDate: new Date().toISOString(),
        status: 'Applied'
    };

    currentUser.applications.push(application);
    saveToLocalStorage();

    showNotification('Application submitted successfully!', 'success');
    updateStats();

    if (currentTab === 'dashboard') {
        renderInternships();
    }
}

function viewInternship(internshipId) {
    const internship = internships.find(i => i.id === internshipId);
    if (!internship) return;

    // For now, just show details in a simple alert
    // In a real app, this would open a detailed modal
    alert(`${internship.title} at ${internship.company}\n\n${internship.description}\n\nRequirements: ${internship.requirements.join(', ')}\n\nStipend: ${internship.stipend}\nDeadline: ${internship.deadline}`);
}

// UI Functions
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Remove active class from all nav buttons
    document.querySelectorAll('.header-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.style.display = 'block';

    // Add active class to clicked button
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    currentTab = tabName;

    // Render appropriate content
    switch (tabName) {
        case 'dashboard':
            renderInternships();
            generateAIRecommendations();
            break;
        case 'saved':
            renderSavedInternships();
            break;
        case 'applications':
            renderApplications();
            break;
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        if (modalId === 'profileModal') {
            loadProfile();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Navigation Functions
function nextPage() {
    const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderInternships();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderInternships();
    }
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    }

    // Save theme preference
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Skills Filter Management (Stub functions for completeness)
function addSkillFilter(skillName) {
    if (!skillName || !skillName.trim()) return;
    
    const trimmedSkill = skillName.trim();
    if (!filterSkills.includes(trimmedSkill)) {
        filterSkills.push(trimmedSkill);
        renderSkillsFilter();
        filterInternships();
    }
    const skillsFilterInput = document.getElementById('skillsFilterInput');
    if (skillsFilterInput) skillsFilterInput.value = '';
    hideSkillsFilterSuggestions();
}

function removeSkillFilter(skillName) {
    console.log('Removing skill filter:', skillName);
    console.log('Before removal, filterSkills:', [...filterSkills]);
    
    // Case-insensitive comparison to ensure we find the skill
    const index = filterSkills.findIndex(
        skill => skill.toLowerCase() === skillName.toLowerCase()
    );
    
    if (index !== -1) {
        filterSkills.splice(index, 1);
    }
    
    console.log('After removal, filterSkills:', [...filterSkills]);
    renderSkillsFilter();
    filterInternships();
}

function renderSkillsFilter() {
    const container = document.getElementById('skillsFilterList');
    if (!container) return;

    container.innerHTML = '';

    filterSkills.forEach(skill => {
        const skillChip = document.createElement('div');
        skillChip.className = 'skill-filter-chip';
        
        const skillSpan = document.createElement('span');
        skillSpan.textContent = skill;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = '×';
        removeButton.setAttribute('aria-label', 'Remove filter');
        removeButton.addEventListener('click', function() {
            removeSkillFilter(skill);
        });
        
        skillChip.appendChild(skillSpan);
        skillChip.appendChild(removeButton);
        container.appendChild(skillChip);
    });
}

function showSkillsFilterSuggestions(query) {
    const suggestions = document.getElementById('skillsFilterSuggestions');
    if (!suggestions) return;

    if (!query || query.length < 1) {
        hideSkillsFilterSuggestions();
        return;
    }

    // Dynamic suggestions based on internship requirements
    const allSkillsFromInternships = new Set();
    internships.forEach(internship => {
        internship.requirements.forEach(req => {
            allSkillsFromInternships.add(req);
        });
    });
    
    // Convert to array and filter based on query
    const filteredSuggestions = Array.from(allSkillsFromInternships)
        .filter(skill => 
            skill.toLowerCase().includes(query.toLowerCase()) && 
            !filterSkills.some(fs => fs.toLowerCase() === skill.toLowerCase())
        );

    // Always show the exact user input as an option
    suggestions.innerHTML = '';
    
    // Add user's exact input as first suggestion if it's not already in filter skills
    if (!filterSkills.some(fs => fs.toLowerCase() === query.toLowerCase())) {
        const exactMatchItem = document.createElement('div');
        exactMatchItem.className = 'suggestion-item';
        exactMatchItem.innerHTML = `
            <span class="suggestion-text">${query}</span>
            <span class="suggestion-type">Custom</span>
        `;
        exactMatchItem.onclick = () => addSkillFilter(query);
        suggestions.appendChild(exactMatchItem);
    }

    // Add matching skills from internships
    filteredSuggestions.slice(0, 5).forEach(skill => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <span class="suggestion-text">${skill}</span>
            <span class="suggestion-type">Skill</span>
        `;
        item.onclick = () => addSkillFilter(skill);
        suggestions.appendChild(item);
    });

    if (suggestions.children.length > 0) {
        suggestions.style.display = 'block';
    } else {
        hideSkillsFilterSuggestions();
    }
}

function hideSkillsFilterSuggestions() {
    const suggestions = document.getElementById('skillsFilterSuggestions');
    if (suggestions) {
        suggestions.style.display = 'none';
    }
}

function renderSavedInternships() {
    const container = document.getElementById('savedList');
    if (!container) return;

    const savedInternships = internships.filter(internship => 
        currentUser.savedInternships.includes(internship.id)
    );

    if (savedInternships.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💾</div>
                <h3>No saved internships yet</h3>
                <p>Start exploring and save internships that interest you!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    savedInternships.forEach(internship => {
        const card = document.createElement('div');
        card.className = 'internship-card saved';
        card.innerHTML = `
            <div class="card-header">
                <div class="company-logo">${internship.logo}</div>
                <button class="btn-icon saved" onclick="toggleSave(${internship.id})" title="Remove from saved">💾</button>
            </div>
            <div class="card-content">
                <h3>${internship.title}</h3>
                <p>${internship.company}</p>
                <div class="internship-meta">
                    <span>📍 ${internship.location}</span>
                    <span>⏱️ ${internship.duration}</span>
                </div>
                <p class="description">${internship.description}</p>
            </div>
            <div class="card-actions-bottom">
                <button class="btn btn--outline" onclick="viewInternship(${internship.id})">View Details</button>
                <button class="btn btn--primary" onclick="applyToInternship(${internship.id})">Apply Now</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderApplications() {
    const container = document.getElementById('applicationsList');
    if (!container) return;

    if (currentUser.applications.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📄</div>
                <h3>No applications yet</h3>
                <p>Apply to internships to track your progress here!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    currentUser.applications.forEach(application => {
        const internship = internships.find(i => i.id === application.internshipId);
        if (!internship) return;

        const card = document.createElement('div');
        card.className = 'application-card';
        card.innerHTML = `
            <div class="application-header">
                <div class="company-logo">${internship.logo}</div>
                <span class="application-status ${application.status.toLowerCase()}">${application.status}</span>
            </div>
            <div class="application-content">
                <h3>${internship.title}</h3>
                <p>${internship.company}</p>
                <div class="application-meta">
                    <span>Applied on ${new Date(application.appliedDate).toLocaleDateString()}</span>
                    <span>${internship.location}</span>
                </div>
                <div class="application-details">
                    <span>${internship.companySize} employees</span>
                    <span>${internship.duration}</span>
                    <span>${internship.stipend}</span>
                </div>
                <p class="description">${internship.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize App
function initializeApp() {
    console.log('🚀 Initializing InternFinder App...');

    // Initialize profile structure if not exists
    if (!currentUser.profile.skills) {
        currentUser.profile.skills = [];
    }
    if (!currentUser.profile.preferences) {
        currentUser.profile.preferences = {
            locations: [],
            workTypes: [],
            categories: []
        };
    }

    // Load saved data
    loadFromLocalStorage();

    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    // Initialize data
    internships = [...mockInternships];
    filteredInternships = [...internships];

    // Set up event listeners
    setupEventListeners();

    // Initial render
    updateStats();
    renderInternships();
    generateAIRecommendations();
    updateProfileProgress();

    console.log('✅ App initialized successfully with', internships.length, 'internships');
    console.log('✅ User has', currentUser.profile.skills.length, 'skills');
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.header-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Profile toggle
    const profileToggle = document.getElementById('profileToggle');
    if (profileToggle) {
        profileToggle.addEventListener('click', () => openModal('profileModal'));
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Search input with AI suggestions
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            showSearchSuggestions(e.target.value);
            filterInternships();
        });
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                addSearchTerm(e.target.value.trim());
                e.preventDefault();
            }
        });
        searchInput.addEventListener('blur', () => {
            setTimeout(hideSearchSuggestions, 200);
        });
    }

    // Skills input with AI suggestions
    const skillInput = document.getElementById('skillInput');
    if (skillInput) {
        skillInput.addEventListener('input', (e) => {
            showSkillSuggestions(e.target.value);
        });
        skillInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                addSkill(e.target.value.trim());
                e.preventDefault();
            }
        });
        skillInput.addEventListener('blur', () => {
            setTimeout(hideSkillSuggestions, 200);
        });
    }
    
    // Skills filter input with suggestions
    const skillsFilterInput = document.getElementById('skillsFilterInput');
    if (skillsFilterInput) {
        skillsFilterInput.addEventListener('input', (e) => {
            showSkillsFilterSuggestions(e.target.value);
        });
        skillsFilterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                addSkillFilter(e.target.value.trim());
                e.preventDefault();
            }
        });
        skillsFilterInput.addEventListener('blur', () => {
            setTimeout(hideSkillsFilterSuggestions, 200);
        });
    }

    // Filter inputs
    ['locationFilter', 'categoryFilter', 'durationFilter', 'typeFilter'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', filterInternships);
        }
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortInternships();
            renderInternships();
        });
    }

 // FIXED: Pagination event listeners
const nextPageBtn = document.getElementById('nextPage');
const prevPageBtn = document.getElementById('prevPage'); // Corrected variable name

if (nextPageBtn) {
    nextPageBtn.addEventListener('click', nextPage);
}
if (prevPageBtn) {
    prevPageBtn.addEventListener('click', prevPage); // Use the new variable name here too
}

    // Modal close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    console.log('✅ Event listeners set up');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Global functions for HTML onclick handlers
window.toggleSave = toggleSave;
window.applyToInternship = applyToInternship;
window.viewInternship = viewInternship;
window.switchTab = switchTab;
window.openModal = openModal;
window.closeModal = closeModal;
window.saveProfile = saveProfile;
window.clearFilters = clearFilters;
window.addSkill = addSkill;
window.removeSkill = removeSkill;
window.addSkillFilter = addSkillFilter;
window.removeSkillFilter = removeSkillFilter;
window.nextPage = nextPage;
window.prevPage = prevPage;

console.log('🎉 InternFinder AI-Enhanced App Loaded - FIXED VERSION');
