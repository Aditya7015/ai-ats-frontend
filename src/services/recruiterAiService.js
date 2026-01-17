// frontend/src/services/recruiterAiService.js - DEBUG VERSION
import api from "./api";

// Get AI-generated email templates for candidate
export const getAiEmailTemplate = async (applicationId, templateType) => {
  try {
    console.log('Sending email template request:', { applicationId, templateType });
    const response = await api.post("/ai/recruiter/email-template", {
      applicationId,
      templateType
    });
    console.log('Email template response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Email template error:', error.response?.data || error.message);
    throw error;
  }
};

// Get AI interview questions for candidate
export const getAiInterviewQuestions = async (applicationId) => {
  try {
    console.log('Sending interview questions request:', { applicationId });
    const response = await api.post("/ai/recruiter/interview-questions", {
      applicationId
    });
    console.log('Interview questions response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Interview questions error:', error.response?.data || error.message);
    throw error;
  }
};

// Get AI comparison of candidates
export const getAiCandidateComparison = async (candidateIds) => {
  try {
    console.log('Sending comparison request:', { candidateIds });
    const response = await api.post("/ai/recruiter/compare-candidates", {
      candidateIds
    });
    console.log('Comparison response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Comparison error:', error.response?.data || error.message);
    throw error;
  }
};

// Get AI ranking of all applicants
export const getAiCandidateRanking = async (jobId) => {
  try {
    console.log('Sending ranking request:', { jobId });
    const response = await api.post("/ai/recruiter/rank-candidates", {
      jobId
    });
    console.log('Ranking response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ranking error:', error.response?.data || error.message);
    throw error;
  }
};

// Send email directly to candidate
export const sendEmailToCandidate = async (applicationId, emailData) => {
  try {
    console.log('Sending email:', { applicationId, emailData });
    const response = await api.post("/ai/recruiter/send-email", {
      applicationId,
      emailData
    });
    console.log('Send email response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Send email error:', error.response?.data || error.message);
    throw error;
  }
};