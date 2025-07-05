
// Global variables
let resumeData = '';
let jobsData = [];
let applicationsData = JSON.parse(localStorage.getItem('applications')) || [];
let selectedJobId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeFileUpload();
    updateTracker();
    loadApplicationsTable();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// File upload functionality
function initializeFileUpload() {
    const resumeFileInput = document.getElementById('resumeFile');
    resumeFileInput.addEventListener('change', handleFileUpload);
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            resumeData = e.target.result;
            document.getElementById('resumeText').value = resumeData;
            analyzeResume();
        };
        reader.readAsText(file);
    }
}

// Resume analysis
function analyzeResume() {
    const resumeText = document.getElementById('resumeText').value || resumeData;
    if (!resumeText.trim()) {
        alert('Please upload a resume or paste resume text first.');
        return;
    }
    
    const analysisDiv = document.getElementById('resumeAnalysis');
    analysisDiv.innerHTML = '<div class="loading">Analyzing resume...</div>';
    
    // Simulate AI analysis (replace with actual AI API)
    setTimeout(() => {
        const analysis = performResumeAnalysis(resumeText);
        displayResumeAnalysis(analysis);
    }, 2000);
}

function performResumeAnalysis(resumeText) {
    // Simulate AI analysis - replace with actual AI service
    const skills = extractSkills(resumeText);
    const experience = extractExperience(resumeText);
    const education = extractEducation(resumeText);
    
    return {
        skills: skills,
        experience: experience,
        education: education,
        recommendations: [
            'Add more quantifiable achievements',
            'Include relevant certifications',
            'Optimize for ATS keywords',
            'Consider adding a professional summary'
        ]
    };
}

function extractSkills(text) {
    const commonSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git', 'Machine Learning', 'Data Analysis'];
    return commonSkills.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));
}

function extractExperience(text) {
    const lines = text.split('\n');
    const experienceLines = lines.filter(line => 
        line.includes('years') || 
        line.includes('experience') || 
        line.match(/\d{4}\s*-\s*\d{4}/) ||
        line.match(/\d{4}\s*-\s*present/i)
    );
    return experienceLines.slice(0, 3);
}

function extractEducation(text) {
    const educationKeywords = ['Bachelor', 'Master', 'PhD', 'University', 'College', 'Degree'];
    const lines = text.split('\n');
    return lines.filter(line => 
        educationKeywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()))
    ).slice(0, 2);
}

function displayResumeAnalysis(analysis) {
    const analysisDiv = document.getElementById('resumeAnalysis');
    analysisDiv.innerHTML = `
        <div class="analysis-section">
            <h4>🎯 Skills Found</h4>
            <p>${analysis.skills.join(', ') || 'No specific skills detected'}</p>
        </div>
        <div class="analysis-section">
            <h4>💼 Experience</h4>
            <ul>${analysis.experience.map(exp => `<li>${exp}</li>`).join('')}</ul>
        </div>
        <div class="analysis-section">
            <h4>🎓 Education</h4>
            <ul>${analysis.education.map(edu => `<li>${edu}</li>`).join('')}</ul>
        </div>
        <div class="analysis-section">
            <h4>💡 Recommendations</h4>
            <ul>${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>
        </div>
    `;
}

// Job search functionality
function searchJobs() {
    const jobTitle = document.getElementById('jobTitle').value;
    const location = document.getElementById('location').value;
    const keywords = document.getElementById('keywords').value;
    
    if (!jobTitle.trim()) {
        alert('Please enter a job title to search.');
        return;
    }
    
    const jobResultsDiv = document.getElementById('jobResults');
    jobResultsDiv.innerHTML = '<div class="loading">Searching for jobs...</div>';
    
    // Simulate job search (replace with actual job search API)
    setTimeout(() => {
        const jobs = performJobSearch(jobTitle, location, keywords);
        displayJobResults(jobs);
    }, 2000);
}

function performJobSearch(title, location, keywords) {
    // Simulate job search results - replace with actual job search API
    const mockJobs = [
        {
            id: 1,
            title: `${title} - Senior Level`,
            company: 'Tech Corp',
            location: location || 'Remote',
            description: `We are looking for a skilled ${title} with experience in ${keywords || 'various technologies'}. Join our innovative team and work on cutting-edge projects.`,
            requirements: ['3+ years experience', 'Bachelor\'s degree', 'Strong communication skills'],
            salary: '$80,000 - $120,000'
        },
        {
            id: 2,
            title: `${title} - Mid Level`,
            company: 'Innovation Labs',
            location: location || 'San Francisco, CA',
            description: `Exciting opportunity for a ${title} to work on revolutionary products. We value creativity and technical excellence.`,
            requirements: ['2+ years experience', 'Portfolio required', 'Team player'],
            salary: '$70,000 - $100,000'
        },
        {
            id: 3,
            title: `Junior ${title}`,
            company: 'StartupXYZ',
            location: location || 'New York, NY',
            description: `Great entry-level position for a ${title}. We offer mentorship and growth opportunities in a fast-paced environment.`,
            requirements: ['0-2 years experience', 'Relevant education', 'Eager to learn'],
            salary: '$50,000 - $70,000'
        }
    ];
    
    jobsData = mockJobs;
    return mockJobs;
}

function displayJobResults(jobs) {
    const jobResultsDiv = document.getElementById('jobResults');
    const jobSelect = document.getElementById('selectedJob');
    
    if (jobs.length === 0) {
        jobResultsDiv.innerHTML = '<p>No jobs found. Try different search criteria.</p>';
        return;
    }
    
    jobResultsDiv.innerHTML = jobs.map(job => `
        <div class="job-card" onclick="selectJob(${job.id})">
            <div class="job-title">${job.title}</div>
            <div class="company">${job.company} - ${job.location}</div>
            <div class="job-description">${job.description}</div>
            <div class="job-details">
                <strong>Requirements:</strong> ${job.requirements.join(', ')}<br>
                <strong>Salary:</strong> ${job.salary}
            </div>
        </div>
    `).join('');
    
    // Update job select dropdown
    jobSelect.innerHTML = '<option value="">Select a job to apply for</option>' + 
        jobs.map(job => `<option value="${job.id}">${job.title} - ${job.company}</option>`).join('');
}

function selectJob(jobId) {
    selectedJobId = jobId;
    document.querySelectorAll('.job-card').forEach(card => card.classList.remove('selected'));
    event.target.closest('.job-card').classList.add('selected');
    
    // Update selected job in dropdown
    document.getElementById('selectedJob').value = jobId;
}

// Application generation
function generateApplication() {
    const selectedJobSelect = document.getElementById('selectedJob');
    const jobId = selectedJobSelect.value || selectedJobId;
    
    if (!jobId) {
        alert('Please select a job first.');
        return;
    }
    
    const resumeText = document.getElementById('resumeText').value;
    if (!resumeText.trim()) {
        alert('Please upload your resume first.');
        return;
    }
    
    const job = jobsData.find(j => j.id == jobId);
    if (!job) {
        alert('Selected job not found.');
        return;
    }
    
    // Generate personalized cover letter
    const coverLetter = generateCoverLetter(resumeText, job);
    document.getElementById('coverLetter').value = coverLetter;
    
    // Find recruiter information (simulated)
    findRecruiterInfo(job);
}

function generateCoverLetter(resumeText, job) {
    // Simulate AI-generated cover letter
    const skills = extractSkills(resumeText);
    const relevantSkills = skills.slice(0, 3);
    
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${job.title} position at ${job.company}. With my background in ${relevantSkills.join(', ')}, I am confident that I would be a valuable addition to your team.

Based on your job requirements, I believe my experience aligns well with what you're looking for:
${job.requirements.map(req => `• ${req} - I have demonstrated this through my previous work experience`).join('\n')}

I am particularly excited about the opportunity to work at ${job.company} because of your reputation for innovation and excellence in the industry. Your commitment to ${job.location.includes('Remote') ? 'remote work flexibility' : 'collaborative in-person work'} aligns perfectly with my work style.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success. Thank you for considering my application.

Best regards,
[Your Name]

P.S. I have attached my resume for your review and look forward to hearing from you soon.`;
}

function findRecruiterInfo(job) {
    // Simulate finding recruiter information
    const recruiters = [
        { name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com' },
        { name: 'Michael Chen', email: 'michael.chen@innovationlabs.com' },
        { name: 'Emily Rodriguez', email: 'emily.rodriguez@startupxyz.com' }
    ];
    
    const recruiter = recruiters[Math.floor(Math.random() * recruiters.length)];
    document.getElementById('recruiterName').value = recruiter.name;
    document.getElementById('recruiterEmail').value = recruiter.email;
}

// Send application
function sendApplication() {
    const jobId = document.getElementById('selectedJob').value;
    const coverLetter = document.getElementById('coverLetter').value;
    const recruiterEmail = document.getElementById('recruiterEmail').value;
    const recruiterName = document.getElementById('recruiterName').value;
    
    if (!jobId || !coverLetter || !recruiterEmail) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const job = jobsData.find(j => j.id == jobId);
    
    // Create application record
    const application = {
        id: Date.now(),
        jobId: jobId,
        company: job.company,
        position: job.title,
        dateApplied: new Date().toISOString().split('T')[0],
        status: 'applied',
        recruiterName: recruiterName,
        recruiterEmail: recruiterEmail,
        coverLetter: coverLetter
    };
    
    applicationsData.push(application);
    localStorage.setItem('applications', JSON.stringify(applicationsData));
    
    // Simulate sending email
    alert(`Application sent to ${recruiterName} at ${recruiterEmail}!\n\nYour application has been recorded in the tracker.`);
    
    // Clear form
    document.getElementById('selectedJob').value = '';
    document.getElementById('coverLetter').value = '';
    document.getElementById('recruiterEmail').value = '';
    document.getElementById('recruiterName').value = '';
    
    // Update tracker
    updateTracker();
    loadApplicationsTable();
}

// Tracker functionality
function updateTracker() {
    const totalApps = applicationsData.length;
    const pendingApps = applicationsData.filter(app => app.status === 'applied' || app.status === 'pending').length;
    const responseRate = totalApps > 0 ? Math.round((applicationsData.filter(app => app.status === 'interview' || app.status === 'offer').length / totalApps) * 100) : 0;
    
    document.getElementById('totalApps').textContent = totalApps;
    document.getElementById('pendingApps').textContent = pendingApps;
    document.getElementById('responseRate').textContent = responseRate + '%';
}

function loadApplicationsTable() {
    const tbody = document.getElementById('applicationsBody');
    tbody.innerHTML = applicationsData.map(app => `
        <tr>
            <td>${app.company}</td>
            <td>${app.position}</td>
            <td>${app.dateApplied}</td>
            <td><span class="status ${app.status}">${app.status}</span></td>
            <td>
                <button onclick="updateApplicationStatus(${app.id})" class="action-btn" style="padding: 4px 8px; font-size: 0.8rem;">Update</button>
                <button onclick="viewApplication(${app.id})" class="action-btn secondary" style="padding: 4px 8px; font-size: 0.8rem;">View</button>
            </td>
        </tr>
    `).join('');
}

function updateApplicationStatus(appId) {
    const newStatus = prompt('Enter new status (pending, applied, interview, offer, rejected):');
    if (newStatus && ['pending', 'applied', 'interview', 'offer', 'rejected'].includes(newStatus)) {
        const app = applicationsData.find(a => a.id === appId);
        if (app) {
            app.status = newStatus;
            localStorage.setItem('applications', JSON.stringify(applicationsData));
            updateTracker();
            loadApplicationsTable();
        }
    }
}

function viewApplication(appId) {
    const app = applicationsData.find(a => a.id === appId);
    if (app) {
        alert(`Application Details:\n\nCompany: ${app.company}\nPosition: ${app.position}\nDate Applied: ${app.dateApplied}\nStatus: ${app.status}\nRecruiter: ${app.recruiterName}\nEmail: ${app.recruiterEmail}\n\nCover Letter:\n${app.coverLetter}`);
    }
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

// Add some CSS for loading states
const style = document.createElement('style');
style.textContent = `
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        font-style: italic;
        color: #666;
    }
    
    .loading::after {
        content: '';
        width: 20px;
        height: 20px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 10px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .analysis-section {
        margin-bottom: 15px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 6px;
        border-left: 4px solid #667eea;
    }
    
    .analysis-section h4 {
        margin-bottom: 8px;
        color: #4a5568;
    }
    
    .analysis-section ul {
        margin-left: 20px;
    }
    
    .job-details {
        margin-top: 10px;
        font-size: 0.85rem;
        color: #4a5568;
    }
`;
document.head.appendChild(style);
