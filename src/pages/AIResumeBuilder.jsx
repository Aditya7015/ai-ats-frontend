// components/AIResumeBuilder.jsx
import React, { useState, useEffect } from 'react';
import { 
  generateAIResume, 
  generateCoverLetter, 
  getResumeTemplates,
  exportResumeAsPDF,
  improveResumeText 
} from '../services/resumeService';
import { 
  Sparkles, 
  Download, 
  Copy, 
  Edit2, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award,
  Code,
  CheckCircle,
  Loader2,
  RefreshCw,
  Eye,
  FileCode,
  User,
  Mail,
  Phone,
  MapPin,
  Star
} from 'lucide-react';

const AIResumeBuilder = () => {
  // State
  const [step, setStep] = useState(1); // 1: Input, 2: Generate, 3: Result
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [generatedResume, setGeneratedResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [improvements, setImprovements] = useState({});

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    education: '',
    skills: '',
    projects: '',
    certifications: '',
    achievements: ''
  });

  const [jobDescription, setJobDescription] = useState('');

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
    
    // Try to load user data from localStorage
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData || formData);
        setJobDescription(parsed.jobDescription || '');
        setSelectedTemplate(parsed.selectedTemplate || 'modern');
      } catch (e) {
        console.log('Could not load saved data');
      }
    }
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    const saveData = {
      formData,
      jobDescription,
      selectedTemplate
    };
    localStorage.setItem('resumeBuilderData', JSON.stringify(saveData));
  }, [formData, jobDescription, selectedTemplate]);

  const loadTemplates = async () => {
    try {
      const result = await getResumeTemplates();
      if (result.success) {
        setTemplates(result.templates);
      }
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateResume = async () => {
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }

    setGenerating(true);
    setStep(2);

    try {
      const result = await generateAIResume(formData, jobDescription, selectedTemplate);
      
      if (result.success) {
        setGeneratedResume(result);
        setStep(3);
        
        // Generate cover letter if job description provided
        if (jobDescription.trim()) {
          try {
            const coverResult = await generateCoverLetter(formData, jobDescription);
            if (coverResult.success) {
              setCoverLetter(coverResult.coverLetter);
            }
          } catch (coverError) {
            console.log('Cover letter generation skipped');
          }
        }
      } else {
        alert('Failed to generate resume: ' + (result.error || 'Unknown error'));
        setStep(1);
      }
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate resume. Please try again.');
      setStep(1);
    } finally {
      setGenerating(false);
    }
  };

  const handleImproveSection = async (sectionKey, text) => {
    if (!text.trim()) return;

    setImprovements(prev => ({ ...prev, [sectionKey]: 'improving' }));

    try {
      const result = await improveResumeText(text, 'resume enhancement', 'professional');
      if (result.success) {
        setImprovements(prev => ({ ...prev, [sectionKey]: result.improvedText }));
      }
    } catch (error) {
      console.error('Improvement error:', error);
      setImprovements(prev => ({ ...prev, [sectionKey]: 'error' }));
    }
  };

  const handleExport = () => {
    if (generatedResume) {
      exportResumeAsPDF(generatedResume, formData.name.replace(/\s+/g, '_'));
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleReset = () => {
    setStep(1);
    setGeneratedResume(null);
    setCoverLetter('');
    setImprovements({});
  };

  const handleFillExample = () => {
    setFormData({
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      experience: 'Senior Software Engineer at TechCorp (2019-Present)\n- Led development of microservices architecture\n- Improved application performance by 40%\n- Mentored 5 junior developers\n\nSoftware Developer at StartupXYZ (2017-2019)\n- Built React frontend for SaaS product\n- Implemented CI/CD pipeline',
      education: 'M.S. Computer Science - Stanford University (2017)\nB.Tech Computer Engineering - MIT (2015)',
      skills: 'JavaScript, React, Node.js, Python, AWS, Docker, Kubernetes, GraphQL, TypeScript',
      projects: 'E-commerce Platform (2022)\n- Built full-stack application serving 10k+ users\n- Implemented real-time notifications\n\nAI Chatbot System (2021)\n- Developed NLP-based customer service chatbot\n- Reduced support tickets by 30%',
      certifications: 'AWS Certified Solutions Architect\nGoogle Cloud Professional Developer\nReact Advanced Certification',
      achievements: 'Employee of the Year 2022\nPublished 3 technical papers\nOpen source contributor with 500+ GitHub stars'
    });
    setJobDescription('We are looking for a Senior Full Stack Developer with 5+ years of experience in modern JavaScript frameworks, cloud infrastructure, and system design. The ideal candidate will lead our development team and architect scalable solutions.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI Resume Builder
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Let AI create a professional, tailored resume in minutes. Perfectly optimized for your target job.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  step >= stepNumber 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                } font-semibold`}>
                  {step > stepNumber ? <CheckCircle className="h-6 w-6" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-24 h-1 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Input Form */}
          {(step === 1 || step === 2) && (
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                {/* Step 1: Input Form */}
                {step === 1 && (
                  <>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Your Information
                      </h2>
                      <button
                        onClick={handleFillExample}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <FileCode className="h-4 w-4" />
                        Fill Example
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Personal Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-600" />
                          Personal Details
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                              </label>
                              <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="City, Country"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Templates */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-purple-600" />
                          Choose Template
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {templates.map(template => (
                            <button
                              key={template.id}
                              onClick={() => setSelectedTemplate(template.id)}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                selectedTemplate === template.id
                                  ? `border-blue-500 bg-gradient-to-r ${template.color} text-white`
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="text-2xl mb-2">{template.icon}</div>
                              <div className="font-medium">{template.name}</div>
                              <div className="text-xs opacity-80 mt-1">{template.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Professional Details */}
                    <div className="space-y-6">
                      {[
                        { 
                          icon: <Briefcase className="h-5 w-5 text-green-600" />, 
                          title: 'Work Experience', 
                          name: 'experience',
                          placeholder: 'Describe your work experience, roles, responsibilities, and achievements...',
                          rows: 4
                        },
                        { 
                          icon: <GraduationCap className="h-5 w-5 text-orange-600" />, 
                          title: 'Education', 
                          name: 'education',
                          placeholder: 'List your degrees, institutions, and academic achievements...',
                          rows: 3
                        },
                        { 
                          icon: <Code className="h-5 w-5 text-blue-600" />, 
                          title: 'Skills', 
                          name: 'skills',
                          placeholder: 'Technical skills, languages, tools, frameworks (comma separated)...',
                          rows: 2
                        },
                        { 
                          icon: <Award className="h-5 w-5 text-yellow-600" />, 
                          title: 'Projects & Achievements', 
                          name: 'projects',
                          placeholder: 'Notable projects, accomplishments, awards...',
                          rows: 3
                        }
                      ].map(section => (
                        <div key={section.name}>
                          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            {section.icon}
                            {section.title}
                          </h3>
                          <textarea
                            name={section.name}
                            value={formData[section.name]}
                            onChange={handleInputChange}
                            rows={section.rows}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                            placeholder={section.placeholder}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Job Description */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Target Job Description (Optional)
                        </h3>
                        <span className="text-sm text-gray-500">
                          For better customization
                        </span>
                      </div>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                        placeholder="Paste the job description you're targeting for better customization..."
                      />
                    </div>

                    {/* Generate Button */}
                    <div className="mt-10">
                      <button
                        onClick={handleGenerateResume}
                        disabled={!formData.name.trim()}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        <Sparkles className="h-5 w-5" />
                        Generate AI Resume
                      </button>
                      <p className="text-center text-gray-500 text-sm mt-3">
                        AI will analyze your information and create a professional resume
                      </p>
                    </div>
                  </>
                )}

                {/* Step 2: Generating */}
                {step === 2 && (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-8"></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Crafting Your Perfect Resume
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                      Our AI is analyzing your profile, optimizing content, and tailoring it for maximum impact...
                    </p>
                    <div className="space-y-4 max-w-lg mx-auto">
                      {['Analyzing your experience', 'Optimizing skills section', 'Tailoring for target job', 'Formatting professionally', 'Finalizing document'].map((task, idx) => (
                        <div 
                          key={task} 
                          className="flex items-center gap-3 text-left p-3 bg-gray-50 rounded-lg animate-pulse"
                          style={{ animationDelay: `${idx * 0.5}s` }}
                        >
                          <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                          <span className="text-gray-700">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Panel - Preview/Result */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {step === 1 && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    Quick Preview
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Your Information:</h4>
                      <div className="space-y-2">
                        {formData.name && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{formData.name}</span>
                          </div>
                        )}
                        {formData.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{formData.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Experience Level:</h4>
                      <p className="text-gray-700">
                        {formData.experience ? 'Professional experience detected' : 'Add experience for better results'}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Skills Identified:</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.split(',').slice(0, 5).map((skill, idx) => (
                          skill.trim() && (
                            <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
                              {skill.trim()}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && generatedResume && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    Your AI Resume
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Resume Generated!</h4>
                      <p className="text-gray-700 text-sm">
                        AI has created a professional resume tailored for your target role.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={handleExport}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="h-5 w-5" />
                        Download Resume
                      </button>
                      
                      <button
                        onClick={() => setShowCoverLetter(!showCoverLetter)}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <FileText className="h-5 w-5" />
                        {showCoverLetter ? 'Hide' : 'View'} Cover Letter
                      </button>

                      <button
                        onClick={handleReset}
                        className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="h-5 w-5" />
                        Create Another
                      </button>
                    </div>

                    {/* Cover Letter Preview */}
                    {showCoverLetter && coverLetter && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-green-600" />
                          AI Generated Cover Letter
                        </h4>
                        <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-60 overflow-y-auto">
                          {coverLetter}
                        </div>
                        <button
                          onClick={() => handleCopyToClipboard(coverLetter)}
                          className="mt-3 w-full py-2 bg-white border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                        >
                          <Copy className="h-4 w-4" />
                          Copy to Clipboard
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tips Card */}
              <div className="mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Pro Tips
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    Use specific achievements with numbers
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    Tailor resume to job description
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    Use action verbs for impact
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    Keep it concise and relevant
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3: Generated Resume Preview */}
          {step === 3 && generatedResume && (
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your AI Generated Resume
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template
                    </span>
                    <span>•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Resume Preview */}
                <div className="border-2 border-gray-200 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-white">
                  {/* Header */}
                  <div className="text-center mb-8 pb-8 border-b border-gray-300">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {formData.name || 'Your Name'}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                      {formData.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {formData.email}
                        </div>
                      )}
                      {formData.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {formData.phone}
                        </div>
                      )}
                      {formData.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {formData.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resume Sections */}
                  <div className="space-y-8">
                    {generatedResume.resume?.summary && (
                      <div className="group">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Professional Summary
                          </h3>
                          <button
                            onClick={() => handleImproveSection('summary', generatedResume.resume.summary)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                          >
                            Improve
                          </button>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {improvements.summary && improvements.summary !== 'improving' && improvements.summary !== 'error' 
                            ? improvements.summary 
                            : generatedResume.resume.summary}
                          {improvements.summary === 'improving' && ' Improving...'}
                          {improvements.summary === 'error' && ' (Improvement failed)'}
                        </p>
                      </div>
                    )}

                    {generatedResume.resume?.experience && (
                      <div className="group">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-green-600" />
                            Experience
                          </h3>
                          <button
                            onClick={() => handleImproveSection('experience', generatedResume.resume.experience)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                          >
                            Improve
                          </button>
                        </div>
                        <div className="text-gray-700 whitespace-pre-wrap">
                          {improvements.experience && improvements.experience !== 'improving' && improvements.experience !== 'error'
                            ? improvements.experience 
                            : generatedResume.resume.experience}
                          {improvements.experience === 'improving' && ' Improving...'}
                          {improvements.experience === 'error' && ' (Improvement failed)'}
                        </div>
                      </div>
                    )}

                    {generatedResume.resume?.skills && (
                      <div className="group">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Code className="h-5 w-5 text-purple-600" />
                            Skills
                          </h3>
                          <button
                            onClick={() => handleImproveSection('skills', generatedResume.resume.skills)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100"
                          >
                            Improve
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {generatedResume.resume.skills.split(',').map((skill, idx) => (
                            <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {generatedResume.resume?.education && (
                      <div className="group">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-orange-600" />
                            Education
                          </h3>
                          <button
                            onClick={() => handleImproveSection('education', generatedResume.resume.education)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100"
                          >
                            Improve
                          </button>
                        </div>
                        <div className="text-gray-700 whitespace-pre-wrap">
                          {improvements.education && improvements.education !== 'improving' && improvements.education !== 'error'
                            ? improvements.education 
                            : generatedResume.resume.education}
                          {improvements.education === 'improving' && ' Improving...'}
                          {improvements.education === 'error' && ' (Improvement failed)'}
                        </div>
                      </div>
                    )}

                    {generatedResume.resume?.projects && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5 text-yellow-600" />
                          Projects
                        </h3>
                        <div className="text-gray-700 whitespace-pre-wrap">
                          {generatedResume.resume.projects}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-500 text-sm">
                    <p>Generated by ATS-AI Resume Builder • {new Date().toLocaleDateString()}</p>
                    <p className="mt-1">AI-optimized for maximum impact</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={handleExport}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Download as PDF
                  </button>
                  <button
                    onClick={() => handleCopyToClipboard(JSON.stringify(generatedResume.resume, null, 2))}
                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Copy className="h-5 w-5" />
                    Copy Content
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="h-5 w-5" />
                    Generate New
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Use AI Resume Builder?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Instant Generation',
                desc: 'Get a professional resume in under 60 seconds'
              },
              {
                icon: '🎯',
                title: 'Job-Optimized',
                desc: 'Tailored specifically for your target position'
              },
              {
                icon: '📈',
                title: 'ATS-Friendly',
                desc: 'Optimized to pass through Applicant Tracking Systems'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeBuilder;