import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_APPLICANT = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_APPLICANT;
const TEMPLATE_ID_ADMIN = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

/**
 * Send application confirmation email to applicant
 */
export const sendApplicationConfirmation = async (applicantData) => {
  try {
    const templateParams = {
      to_email: applicantData.email,
      to_name: applicantData.fullName,
      student_name: applicantData.fullName,
      grade: applicantData.gradeApplyingFor,
      message: 'Thank you for applying to Cradle Bridge Schools. We have received your application and will review it shortly.',
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_APPLICANT,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return { success: false, error };
  }
};

/**
 * Send application notification to school admin
 */
export const sendApplicationNotification = async (applicationData) => {
  try {
    const templateParams = {
      to_email: process.env.REACT_APP_SCHOOL_EMAIL,
      applicant_name: applicationData.fullName,
      applicant_email: applicationData.email,
      applicant_phone: applicationData.phone,
      grade: applicationData.gradeApplyingFor,
      parent_name: applicationData.parentName || 'Not provided',
      message: applicationData.message || 'No additional message',
      submission_date: new Date().toLocaleDateString(),
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_ADMIN,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error };
  }
};

/**
 * Send contact inquiry confirmation
 */
export const sendContactConfirmation = async (contactData) => {
  try {
    const templateParams = {
      to_email: contactData.email,
      to_name: contactData.name,
      subject: contactData.subject,
      message: 'Thank you for contacting Cradle Bridge Schools. We have received your inquiry and will respond shortly.',
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_APPLICANT,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Failed to send contact confirmation:', error);
    return { success: false, error };
  }
};

/**
 * Send contact inquiry to school admin
 */
export const sendContactNotification = async (contactData) => {
  try {
    const templateParams = {
      to_email: process.env.REACT_APP_SCHOOL_EMAIL,
      from_name: contactData.name,
      from_email: contactData.email,
      from_phone: contactData.phone || 'Not provided',
      subject: contactData.subject,
      message: contactData.message,
      submission_date: new Date().toLocaleDateString(),
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_ADMIN,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    return { success: false, error };
  }
};
