# Let me create the enhanced InternFinder app with full AI features
# I'll create all files with the improvements requested

# First, let me create the enhanced HTML file
html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InternFinder - AI-Powered Internship Search</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="header-brand">
                    <h1 class="header-logo">InternFinder</h1>
                    <span class="header-tagline">AI-Powered Internship Discovery</span>
                </div>
                <nav class="header-nav">
                    <button class="btn btn--outline header-nav-btn" data-tab="dashboard">Dashboard</button>
                    <button class="btn btn--outline header-nav-btn" data-tab="saved">Saved</button>
                    <button class="btn btn--outline header-nav-btn" data-tab="applications">Applications</button>
                </nav>
                <div class="header-actions">
                    <button class="btn btn--secondary" id="themeToggle">🌙</button>
                    <button class="btn btn--primary" id="profileToggle">Profile</button>
                </div>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="main-layout">
                <!-- Sidebar -->
                <aside class="sidebar">
                    <div class="sidebar-section">
                        <h3>Search Filters</h3>
                        <div class="search-container">
                            <input type="text" class="form-control" id="searchInput" placeholder="Search internships...">
                            <div class="ai-auto-suggestion" id="searchSuggestions" style="display: none;"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="locationFilter">Location</label>
                            <select class="form-control" id="locationFilter">
                                <option value="">All Locations</option>
                                <option value="Remote">Remote</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Pune">Pune</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Chennai">Chennai</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="categoryFilter">Category</label>
                            <select class="form-control" id="categoryFilter">
                                <option value="">All Categories</option>
                                <option value="Technology">Technology</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business">Business</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Finance">Finance</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Skills Filter</label>
                            <div class="skills-filter-container">
                                <input type="text" class="form-control" id="skillsFilterInput" placeholder="Add skill filter...">
                                <div class="ai-auto-suggestion" id="skillsFilterSuggestions" style="display: none;"></div>
                                <div class="skills-filter-list" id="skillsFilterList"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="durationFilter">Duration</label>
                            <select class="form-control" id="durationFilter">
                                <option value="">All Durations</option>
                                <option value="2 months">2 months</option>
                                <option value="3 months">3 months</option>
                                <option value="4 months">4 months</option>
                                <option value="5 months">5 months</option>
                                <option value="6 months">6 months</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="typeFilter">Work Type</label>
                            <select class="form-control" id="typeFilter">
                                <option value="">All Types</option>
                                <option value="Remote">Remote</option>
                                <option value="On-site">On-site</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        <button class="btn btn--secondary btn--full" onclick="clearFilters()">Clear Filters</button>
                    </div>
                </aside>

                <!-- Main Content -->
                <div class="main-content">
                    <!-- Dashboard Tab -->
                    <div class="tab-content" id="dashboard" style="display: block;">
                        <div class="dashboard-header">
                            <h2>AI-Powered Dashboard</h2>
                            <p>Personalized recommendations based on your profile</p>
                        </div>

                        <!-- AI Recommendations Section -->
                        <div class="ai-recommendations-section">
                            <h3>🤖 AI Recommendations for You</h3>
                            <div class="ai-recommendations" id="aiRecommendations">
                                <div class="ai-recommendation-empty">
                                    <div class="ai-icon">🎯</div>
                                    <h4>Complete your profile to get AI recommendations!</h4>
                                    <p>Add your skills, preferences, and location to get personalized internship suggestions.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Stats -->
                        <div class="stats-grid">
                            <div class="stat-card">
                                <h4 id="totalInternships">0</h4>
                                <p>Available Internships</p>
                            </div>
                            <div class="stat-card">
                                <h4 id="matchingInternships">0</h4>
                                <p>Matching Your Skills</p>
                            </div>
                            <div class="stat-card">
                                <h4 id="savedCount">0</h4>
                                <p>Saved Internships</p>
                            </div>
                            <div class="stat-card">
                                <h4 id="appliedCount">0</h4>
                                <p>Applications Sent</p>
                            </div>
                        </div>

                        <!-- Controls -->
                        <div class="controls">
                            <div class="controls-left">
                                <span id="resultsCount">0 internships found</span>
                            </div>
                            <div class="controls-right">
                                <select class="form-control" id="sortSelect">
                                    <option value="relevance">Sort by Relevance</option>
                                    <option value="stipend">Sort by Stipend</option>
                                    <option value="deadline">Sort by Deadline</option>
                                    <option value="posted">Sort by Posted Date</option>
                                </select>
                            </div>
                        </div>

                        <!-- Internships Grid -->
                        <div class="internships-grid" id="internshipsGrid">
                            <!-- Internships will be rendered here -->
                        </div>

                        <!-- Pagination -->
                        <div class="pagination" id="pagination" style="display: none;">
                            <button class="btn btn--outline" id="prevPage">Previous</button>
                            <span id="pageInfo">Page 1 of 1</span>
                            <button class="btn btn--outline" id="nextPage">Next</button>
                        </div>
                    </div>

                    <!-- Saved Tab -->
                    <div class="tab-content" id="saved" style="display: none;">
                        <div class="tab-header">
                            <h2>Saved Internships</h2>
                            <p>Your bookmarked opportunities</p>
                        </div>
                        <div class="saved-list" id="savedList">
                            <div class="empty-state">
                                <div class="empty-icon">💾</div>
                                <h3>No saved internships yet</h3>
                                <p>Start exploring and save internships that interest you!</p>
                            </div>
                        </div>
                    </div>

                    <!-- Applications Tab -->
                    <div class="tab-content" id="applications" style="display: none;">
                        <div class="tab-header">
                            <h2>My Applications</h2>
                            <p>Track your application progress</p>
                        </div>
                        <div class="applications-list" id="applicationsList">
                            <div class="empty-state">
                                <div class="empty-icon">📄</div>
                                <h3>No applications yet</h3>
                                <p>Apply to internships to track your progress here!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Profile Modal -->
    <div class="modal" id="profileModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Complete Your Profile</h3>
                <span class="close" onclick="closeModal('profileModal')">&times;</span>
            </div>
            <div class="modal-body">
                <div class="profile-progress">
                    <span>Profile Completion: <span id="progressPercent">0</span>%</span>
                    <div class="progress-bar">
                        <div class="progress-fill" id="profileProgress"></div>
                    </div>
                </div>

                <form id="profileForm">
                    <div class="form-section">
                        <h4>Personal Information</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="studentName">Full Name *</label>
                                <input type="text" class="form-control" id="studentName" required>
                            </div>
                            <div class="form-group">
                                <label for="studentEmail">Email *</label>
                                <input type="email" class="form-control" id="studentEmail" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="university">University *</label>
                                <input type="text" class="form-control" id="university" required>
                            </div>
                            <div class="form-group">
                                <label for="yearOfStudy">Year of Study *</label>
                                <select class="form-control" id="yearOfStudy" required>
                                    <option value="">Select Year</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="major">Major/Field of Study *</label>
                            <input type="text" class="form-control" id="major" required>
                        </div>
                    </div>

                    <div class="form-section">
                        <h4>Skills</h4>
                        <div class="skills-input-container">
                            <input type="text" class="form-control" id="skillInput" placeholder="Add a skill...">
                            <div class="ai-auto-suggestion" id="skillsSuggestions"></div>
                        </div>
                        <div class="skills-list" id="skillsList"></div>
                    </div>

                    <div class="form-section">
                        <h4>Preferences</h4>
                        <div class="form-group">
                            <label>Preferred Locations</label>
                            <div class="checkbox-group" id="locationPreferences">
                                <label><input type="checkbox" value="Remote"> Remote</label>
                                <label><input type="checkbox" value="Bangalore"> Bangalore</label>
                                <label><input type="checkbox" value="Mumbai"> Mumbai</label>
                                <label><input type="checkbox" value="Delhi"> Delhi</label>
                                <label><input type="checkbox" value="Pune"> Pune</label>
                                <label><input type="checkbox" value="Hyderabad"> Hyderabad</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Work Types</label>
                            <div class="checkbox-group" id="workTypePreferences">
                                <label><input type="checkbox" value="Remote"> Remote</label>
                                <label><input type="checkbox" value="On-site"> On-site</label>
                                <label><input type="checkbox" value="Hybrid"> Hybrid</label>
                                <label><input type="checkbox" value="Part-time"> Part-time</label>
                                <label><input type="checkbox" value="Full-time"> Full-time</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn--secondary" onclick="closeModal('profileModal')">Cancel</button>
                <button class="btn btn--primary" onclick="saveProfile()">Save Profile</button>
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div class="notification" id="notification"></div>

    <script src="app.js"></script>
</body>
</html>"""

# Save the HTML file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✅ Enhanced HTML file created with AI features")