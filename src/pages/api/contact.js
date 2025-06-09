import { createTransport } from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Enhanced validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Professional email to owner with brand styling
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'nepal.aashish00@gmail.com',
      subject: `New Contact Submission: ${name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 8px;">
          <div style="background-color: #2c3e50; padding: 20px; border-radius: 8px 8px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 22px;">New Contact Form Submission</h1>
            <p style="margin: 5px 0 0; opacity: 0.9; font-size: 14px;">${timestamp}</p>
          </div>
          
          <div style="padding: 25px; background-color: #f9f9f9;">
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
              <h2 style="margin: 0 0 10px; color: #2c3e50; font-size: 18px;">Contact Details</h2>
              <p style="margin: 5px 0;"><strong style="display: inline-block; width: 80px;">Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong style="display: inline-block; width: 80px;">Email:</strong> <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a></p>
            </div>
            
            <div>
              <h2 style="margin: 0 0 10px; color: #2c3e50; font-size: 18px;">Message</h2>
              <div style="background-color: white; border-left: 3px solid #3498db; padding: 15px; margin: 10px 0; font-style: italic; color: #555;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="background-color: #f1f1f1; padding: 15px 25px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #777;">
            <p style="margin: 0;">This message was sent via your website contact form. Please respond within 24-48 hours.</p>
          </div>
        </div>
      `
    });

    // Professional confirmation email to user
    await transporter.sendMail({
      from: `"Aashish Nepal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting us, ${name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 8px;">
          <div style="background-color: #3498db; padding: 25px; border-radius: 8px 8px 0 0; color: white; text-align: center;">
            <h1 style="margin: 0 0 10px; font-size: 24px;">Thank You, ${name}!</h1>
            <p style="margin: 0; opacity: 0.9;">We've received your message and will respond soon.</p>
          </div>
          
          <div style="padding: 25px; background-color: #f9f9f9;">
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
              <h2 style="margin: 0 0 15px; color: #2c3e50; font-size: 18px; text-align: center;">Your Message Summary</h2>
              <div style="background-color: white; padding: 15px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <p style="margin: 5px 0;"><strong>Sent:</strong> ${timestamp}</p>
                <p style="margin: 5px 0;"><strong>From:</strong> ${email}</p>
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <div style="background-color: white; border-left: 3px solid #3498db; padding: 15px; margin: 10px 0; font-style: italic; color: #555; border-radius: 0 4px 4px 0;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
              <p style="margin: 0 0 15px; color: #555;">We typically respond within 1-2 business days.</p>
              <a href="mailto:nepal.aashish00@gmail.com" style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500;">Reply Directly</a>
            </div>
          </div>
          
          <div style="background-color: #f1f1f1; padding: 15px 25px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #777;">
            <p style="margin: 0;">This is an automated confirmation. Please do not reply to this email.</p>
            <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Aashish Nepal. All rights reserved.</p>
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      message: 'Failed to send email', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
}