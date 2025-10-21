import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_APPLICANT = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_APPLICANT;
const TEMPLATE_ID_ADMIN = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS only if configured
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
} else {
  console.warn('EmailJS not configured. Email notifications will be disabled.');
}

/**
 * Send application confirmation email to applicant
 */
export const sendApplicationConfirmation = async (applicantData) => {
  if (!PUBLIC_KEY || !SERVICE_ID) {
    console.warn('EmailJS not configured, skipping email send');
    return { success: true, skipped: true };
  }
  
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
  if (!PUBLIC_KEY || !SERVICE_ID) {
    console.warn('EmailJS not configured, skipping email send');
    return { success: true, skipped: true };
  }
  
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
  if (!PUBLIC_KEY || !SERVICE_ID) {
    console.warn('EmailJS not configured, skipping email send');
    return { success: true, skipped: true };
  }
  
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
  if (!PUBLIC_KEY || !SERVICE_ID) {
    console.warn('EmailJS not configured, skipping email send');
    return { success: true, skipped: true };
  }
  
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

/**
 * Send admission status update email to applicant
 */
export const sendAdmissionStatusEmail = async (applicantData, status) => {
  if (!PUBLIC_KEY || !SERVICE_ID) {
    console.warn('EmailJS not configured, skipping email send');
    return { success: true, skipped: true };
  }
  
  try {
    let statusMessage = '';
    let subject = '';
    
    if (status === 'accepted') {
      subject = '🎉 Congratulations! Admission Offer from Cradle Bridge Schools';
      statusMessage = `Congratulations! We are delighted to inform you that your application for admission to Cradle Bridge Schools has been ACCEPTED. We are excited to welcome you to our school community. Please contact our admissions office for the next steps in the enrollment process.`;
    } else if (status === 'rejected') {
      subject = 'Application Status Update - Cradle Bridge Schools';
      statusMessage = `Thank you for your interest in Cradle Bridge Schools. After careful review, we regret to inform you that we are unable to offer admission at this time. We encourage you to reapply in the future.`;
    } else if (status === 'reviewed') {
      subject = 'Application Under Review - Cradle Bridge Schools';
      statusMessage = `Your application for admission to Cradle Bridge Schools is currently under review. We will notify you of our decision soon. Thank you for your patience.`;
    } else {
      // Default pending message
      return { success: true, skipped: true }; // Don't send email for pending status
    }

    const templateParams = {
      to_email: applicantData.email,
      to_name: applicantData.fullName,
      student_name: applicantData.fullName,
      grade: applicantData.gradeApplyingFor,
      status: status.toUpperCase(),
      subject: subject,
      message: statusMessage,
      school_email: process.env.REACT_APP_SCHOOL_EMAIL || 'info@cradlebridgeschools.com',
      school_name: 'Cradle Bridge Schools',
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_APPLICANT,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Failed to send admission status email:', error);
    return { success: false, error };
  }
};
