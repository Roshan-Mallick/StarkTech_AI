# Now let me create the enhanced JavaScript file with all AI features
js_content = """// InternFinder App JavaScript - Enhanced with AI Features

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

// Enhanced Skills Database for AI Suggestions
const allSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'HTML', 'CSS', 'Java', 'C++', 
    'SQL', 'MongoDB', 'Git', 'Docker', 'AWS', 'Machine Learning', 'Data Analysis',
    'UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Marketing', 'Content Writing',
    'Social Media', 'SEO', 'Google Analytics', 'Excel', 'PowerPoint', 'Communication',
    'Problem Solving', 'Team Collaboration', 'Project Management', 'Agile', 'Scrum',
    'Angular', 'Vue.js', 'TypeScript', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Flutter',
    'Dart', 'React Native', 'Xamarin', 'Unity', 'C#', 'Go', 'Rust', 'Scala',
    'R', 'MATLAB', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn',
    'Tableau', 'Power BI', 'Hadoop', 'Spark', 'Kafka', 'Redis', 'PostgreSQL',
    'MySQL', 'Oracle', 'GraphQL', 'REST API', 'Microservices', 'DevOps',
    'CI/CD', 'Jenkins', 'Kubernetes', 'Terraform', 'Ansible', 'Linux',
    'Network Security', 'Cybersecurity', 'Penetration Testing', 'Ethical Hacking',
    'Blockchain', 'Solidity', 'Web3', 'Cryptocurrency', 'IoT', 'Embedded Systems',
    'Arduino', 'Raspberry Pi', 'AutoCAD', 'SolidWorks', 'MATLAB Simulink',
    'Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'Blender',
    'Sketch', 'InVision', 'Wireframing', 'Prototyping', 'User Research',
    'A/B Testing', 'Growth Hacking', 'Email Marketing', 'PPC', 'Facebook Ads',
    'Google Ads', 'Influencer Marketing', 'Brand Management', 'PR',
    'Copywriting', 'Technical Writing', 'Salesforce', 'HubSpot', 'CRM',
    'Business Intelligence', 'Financial Modeling', 'Accounting', 'Investment',
    'Trading', 'Risk Management', 'Compliance', 'Legal Research', 'Contract Law'
];

// AI-powered search suggestions
const searchSuggestions = {
    tech: ['Software Development', 'Web Development', 'Mobile App Development', 'Data Science', 'AI/ML'],
    design: ['UI/UX Design', 'Graphic Design', 'Product Design', 'Interior Design'],
    business: ['Business Analysis', 'Product Management', 'Strategy', 'Consulting'],
    marketing: ['Digital Marketing', 'Social Media Marketing', 'Content Marketing', 'SEO'],
    companies: ['TechCorp', 'Analytics Pro', 'Creative Studios', 'AppVenture', 'CloudTech'],
    locations: ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Remote']
};

// Enhanced Mock Data with more diverse internships
const mockInternships = [
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
    // Adding more diverse internships for better AI recommendations
    {
        id: 7,
        title: "AI Research Intern",
        company: "DeepMind Labs",
        location: "Remote",
        type: "Remote",
        duration: "6 months",
        stipend: "₹40,000/month",
        description: "Work on cutting-edge AI research projects including NLP, computer vision, and reinforcement learning.",
        requirements: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Research"],
        posted: "2025-09-16",
        deadline: "2025-10-20",
        companySize: "200-500",
        category: "Data Science",
        tags: ["AI", "Research", "ML"],
        logo: "DL"
    },
    {
        id: 8,
        title: "Full Stack Developer Intern",
        company: "WebCraft Solutions",
        location: "Gurgaon, India",
        type: "Hybrid",
        duration: "5 months",
        stipend: "₹26,000/month",
        description: "Build end-to-end web applications using modern technologies like React, Node.js, and PostgreSQL.",
        requirements: ["JavaScript", "React", "Node.js", "PostgreSQL", "Git"],
        posted: "2025-09-15",
        deadline: "2025-10-01",
        companySize: "100-300",
        category: "Technology",
        tags: ["Full Stack", "React", "Node.js"],
        logo: "WS"
    },
    {
        id: 9,
        title: "Product Design Intern",
        company: "DesignHub Studio",
        location: "Remote",
        type: "Remote",
        duration: "4 months",
        stipend: "₹23,000/month",
        description: "Create user-centered designs for digital products, conduct user research, and prototype solutions.",
        requirements: ["Figma", "User Research", "Prototyping", "Design Thinking", "Wireframing"],
        posted: "2025-09-14",
        deadline: "2025-09-29",
        companySize: "50-150",
        category: "Design",
        tags: ["Product Design", "UX", "Research"],
        logo: "DH"
    },
    {
        id: 10,
        title: "Content Marketing Intern",
        company: "ContentCraft Media",
        location: "Mumbai, India",
        type: "Hybrid",
        duration: "3 months",
        stipend: "₹16,000/month",
        description: "Create engaging content for blogs, social media, and marketing campaigns across various platforms.",
        requirements: ["Content Writing", "SEO", "Social Media", "Adobe Creative Suite", "Analytics"],
        posted: "2025-09-13",
        deadline: "2025-09-27",
        companySize: "30-80",
        category: "Marketing",
        tags: ["Content", "Writing", "SEO"],
        logo: "CM"
    }
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

// Enhanced Utility Functions
function calculateMatchScore(internship, userProfile) {
    if (!userProfile.skills || userProfile.skills.length === 0) {
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

    // Base score from skill matches
    let score = Math.round((skillMatches / internshipSkills.length) * 70);

    // Bonus points for location preference
    if (userProfile.preferences.locations.length > 0) {
        const preferredLocations = userProfile.preferences.locations.map(loc => loc.toLowerCase());
        if (preferredLocations.some(loc => internship.location.toLowerCase().includes(loc))) {
            score += 15;
        }
    }

    // Bonus points for work type preference
    if (userProfile.preferences.workTypes.length > 0) {
        const preferredTypes = userProfile.preferences.workTypes.map(type => type.toLowerCase());
        if (preferredTypes.some(type => internship.type.toLowerCase().includes(type))) {
            score += 15;
        }
    }

    return Math.min(100, score);
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
    if (profile.skills.length > 0) completedFields++;
    if (profile.preferences.locations.length > 0 || profile.preferences.workTypes.length > 0) completedFields++;

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
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        university: document.getElementById('university').value,
        year: document.getElementById('yearOfStudy').value,
        major: document.getElementById('major').value
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
    
    if (profile.personalInfo.name) document.getElementById('studentName').value = profile.personalInfo.name;
    if (profile.personalInfo.email) document.getElementById('studentEmail').value = profile.personalInfo.email;
    if (profile.personalInfo.university) document.getElementById('university').value = profile.personalInfo.university;
    if (profile.personalInfo.year) document.getElementById('yearOfStudy').value = profile.personalInfo.year;
    if (profile.personalInfo.major) document.getElementById('major').value = profile.personalInfo.major;

    renderSkills();

    profile.preferences.locations.forEach(location => {
        const checkbox = document.querySelector(`#locationPreferences input[value="${location}"]`);
        if (checkbox) checkbox.checked = true;
    });

    profile.preferences.workTypes.forEach(workType => {
        const checkbox = document.querySelector(`#workTypePreferences input[value="${workType}"]`);
        if (checkbox) checkbox.checked = true;
    });

    updateProfileProgress();
}

// Enhanced Skills Management with AI
function addSkill(skillName, level = 'Beginner') {
    if (!skillName || currentUser.profile.skills.some(skill => 
        skill.name.toLowerCase() === skillName.toLowerCase())) {
        return;
    }

    currentUser.profile.skills.push({
        name: skillName,
        level: level
    });

    renderSkills();
    saveToLocalStorage();
    generateAIRecommendations();
    document.getElementById('skillInput').value = '';
    hideSkillSuggestions();
}

function removeSkill(index) {
    currentUser.profile.skills.splice(index, 1);
    renderSkills();
    saveToLocalStorage();
    generateAIRecommendations();
}

function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';

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
    
    if (!query) {
        hideSkillSuggestions();
        return;
    }

    const filteredSuggestions = allSkills.filter(skill =>
        skill.toLowerCase().includes(query.toLowerCase()) &&
        !currentUser.profile.skills.some(userSkill =>
            userSkill.name.toLowerCase() === skill.toLowerCase()
        )
    );

    if (filteredSuggestions.length === 0) {
        hideSkillSuggestions();
        return;
    }

    suggestions.innerHTML = '';
    filteredSuggestions.slice(0, 8).forEach(skill => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <span class="suggestion-text">${skill}</span>
            <span class="suggestion-type">Skill</span>
        `;
        item.onclick = () => addSkill(skill);
        suggestions.appendChild(item);
    });

    suggestions.classList.add('show');
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
            document.getElementById('searchInput').value = result.text;
            hideSearchSuggestions();
            filterInternships();
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

// Skills Filter Management
function addSkillFilter(skillName) {
    if (!filterSkills.includes(skillName)) {
        filterSkills.push(skillName);
        renderSkillsFilter();
        filterInternships();
    }
    document.getElementById('skillsFilterInput').value = '';
    hideSkillsFilterSuggestions();
}

function removeSkillFilter(skillName) {
    filterSkills = filterSkills.filter(skill => skill !== skillName);
    renderSkillsFilter();
    filterInternships();
}

function renderSkillsFilter() {
    const container = document.getElementById('skillsFilterList');
    container.innerHTML = '';

    filterSkills.forEach(skill => {
        const skillChip = document.createElement('div');
        skillChip.className = 'skill-filter-chip';
        skillChip.innerHTML = `
            <span>${skill}</span>
            <button onclick="removeSkillFilter('${skill}')" aria-label="Remove filter">×</button>
        `;
        container.appendChild(skillChip);
    });
}

function showSkillsFilterSuggestions(query) {
    const suggestions = document.getElementById('skillsFilterSuggestions');
    
    if (!query) {
        hideSkillsFilterSuggestions();
        return;
    }

    const filteredSuggestions = allSkills.filter(skill =>
        skill.toLowerCase().includes(query.toLowerCase()) &&
        !filterSkills.includes(skill)
    );

    if (filteredSuggestions.length === 0) {
        hideSkillsFilterSuggestions();
        return;
    }

    suggestions.innerHTML = '';
    filteredSuggestions.slice(0, 6).forEach(skill => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <span class="suggestion-text">${skill}</span>
            <span class="suggestion-type">Filter</span>
        `;
        item.onclick = () => addSkillFilter(skill);
        suggestions.appendChild(item);
    });

    suggestions.style.display = 'block';
}

function hideSkillsFilterSuggestions() {
    const suggestions = document.getElementById('skillsFilterSuggestions');
    if (suggestions) {
        suggestions.style.display = 'none';
    }
}

// Enhanced AI Recommendations
function generateAIRecommendations() {
    const recommendationsContainer = document.getElementById('aiRecommendations');
    
    if (currentUser.profile.skills.length === 0) {
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
    if (currentUser.profile.preferences.locations.length > 0) {
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

// Enhanced Search and Filter Functions
function filterInternships() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const durationFilter = document.getElementById('durationFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

    filteredInternships = internships.filter(internship => {
        const matchesSearch = !searchQuery || 
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

        return matchesSearch && matchesLocation && matchesCategory && 
               matchesDuration && matchesType && skillMatches;
    });

    sortInternships();
    currentPage = 1;
    renderInternships();
    updateStats();
}

function sortInternships() {
    const sortBy = document.getElementById('sortSelect').value;
    
    filteredInternships.sort((a, b) => {
        switch (sortBy) {
            case 'stipend':
                return parseInt(b.stipend.replace(/[^\\d]/g, '')) - parseInt(a.stipend.replace(/[^\\d]/g, ''));
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
    document.getElementById('searchInput').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('durationFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('skillsFilterInput').value = '';
    filterSkills = [];
    renderSkillsFilter();
    hideSearchSuggestions();
    hideSkillsFilterSuggestions();
    filterInternships();
}

// Enhanced Render Functions
function renderInternships() {
    const grid = document.getElementById('internshipsGrid');
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
    const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);

    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'flex';
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function renderSavedInternships() {
    const container = document.getElementById('savedList');
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

// Enhanced Stats Update
function updateStats() {
    const matchingInternships = filteredInternships.filter(internship => 
        calculateMatchScore(internship, currentUser.profile) > 50
    ).length;

    document.getElementById('totalInternships').textContent = internships.length;
    document.getElementById('matchingInternships').textContent = matchingInternships;
    document.getElementById('savedCount').textContent = currentUser.savedInternships.length;
    document.getElementById('appliedCount').textContent = currentUser.applications.length;
    document.getElementById('resultsCount').textContent = `${filteredInternships.length} internships found`;
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
    alert(`${internship.title} at ${internship.company}\\n\\n${internship.description}\\n\\nRequirements: ${internship.requirements.join(', ')}\\n\\nStipend: ${internship.stipend}\\nDeadline: ${internship.deadline}`);
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
    document.getElementById(tabName).style.display = 'block';
    
    // Add active class to clicked button
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

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
    document.getElementById(modalId).style.display = 'flex';
    if (modalId === 'profileModal') {
        loadProfile();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
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
    themeBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Initialize App
function initializeApp() {
    console.log('🚀 Initializing InternFinder App...');
    
    // Load saved data
    loadFromLocalStorage();
    
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('themeToggle').textContent = '☀️';
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

    console.log('✅ App initialized successfully');
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.header-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Profile toggle
    document.getElementById('profileToggle').addEventListener('click', () => openModal('profileModal'));

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Search input with AI suggestions
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        showSearchSuggestions(e.target.value);
        filterInternships();
    });
    searchInput.addEventListener('blur', () => {
        setTimeout(hideSearchSuggestions, 200);
    });

    // Skills input with AI suggestions
    const skillInput = document.getElementById('skillInput');
    skillInput.addEventListener('input', (e) => {
        showSkillSuggestions(e.target.value);
    });
    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            addSkill(e.target.value.trim());
        }
    });
    skillInput.addEventListener('blur', () => {
        setTimeout(hideSkillSuggestions, 200);
    });

    // Skills filter input
    const skillsFilterInput = document.getElementById('skillsFilterInput');
    skillsFilterInput.addEventListener('input', (e) => {
        showSkillsFilterSuggestions(e.target.value);
    });
    skillsFilterInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            addSkillFilter(e.target.value.trim());
        }
    });
    skillsFilterInput.addEventListener('blur', () => {
        setTimeout(hideSkillsFilterSuggestions, 200);
    });

    // Filter inputs
    ['locationFilter', 'categoryFilter', 'durationFilter', 'typeFilter'].forEach(id => {
        document.getElementById(id).addEventListener('change', filterInternships);
    });

    // Sort select
    document.getElementById('sortSelect').addEventListener('change', () => {
        sortInternships();
        renderInternships();
    });

    // Pagination
    document.getElementById('nextPage').addEventListener('click', nextPage);
    document.getElementById('prevPage').addEventListener('click', prevPage);

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

console.log('🤖 InternFinder AI-Enhanced App Loaded');
"""

# Save the enhanced JavaScript file
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("✅ Enhanced JavaScript file created with full AI features")