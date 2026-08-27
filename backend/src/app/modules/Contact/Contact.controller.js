import catchAsync from "../../utils/catchAsync.js";
import { ContactServices } from "./Contact.service.js";
import sendResponse from "../../utils/sendResponse.js";
import { sendEmail } from "../../utils/sendEmail.js";

// Create Contact
// Create Contact
const createContact = catchAsync(async (req, res) => {
  // 1. Create contact using service
  const result = await ContactServices.createContact(req.body);

  // 2. Send notification email with beautiful green-themed template
  try {
    await sendEmail(
      "ecoshieldpestbd@gmail.com", // admin notification email
      `New Contact Form Submission from ${result.name}`,
      `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.7; 
            color: #2c3e50; 
            margin: 0; 
            padding: 0; 
            background-color: #f0f7f4; 
        }
        .container { 
            max-width: 620px; 
            margin: 30px auto; 
            background-color: #ffffff; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 8px 30px rgba(0, 128, 96, 0.1); 
        }
        .header { 
            background: linear-gradient(135deg, #27ae60, #2ecc71); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
        }
        .logo { 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 8px; 
            letter-spacing: 1px; 
        }
        .tagline { 
            font-size: 16px; 
            opacity: 0.95; 
        }
        .content { 
            padding: 35px 30px; 
        }
        .highlight { 
            background-color: #e8f7f0; 
            border-left: 5px solid #27ae60; 
            padding: 20px; 
            margin: 25px 0; 
            border-radius: 8px; 
        }
        .field-group { 
            margin-bottom: 20px; 
            padding-bottom: 18px; 
            border-bottom: 1px solid #e0f0e9; 
        }
        .field-label { 
            font-weight: 600; 
            color: #27ae60; 
            margin-bottom: 6px; 
            font-size: 15px; 
        }
        .field-value { 
            color: #2c3e50; 
            font-size: 15px; 
            word-break: break-word; 
        }
        .footer { 
            background-color: #e8f7f0; 
            padding: 30px 20px; 
            text-align: center; 
            color: #2c3e50; 
            font-size: 14px; 
        }
        .company-info { 
            margin-bottom: 20px; 
            line-height: 1.6; 
        }
        .social-icons { 
            margin-top: 20px; 
        }
        .social-icons a { 
            margin: 0 10px; 
            display: inline-block; 
            transition: transform 0.3s; 
        }
        .social-icons a:hover { 
            transform: translateY(-3px); 
        }
        .social-icons img { 
            width: 32px; 
            height: 32px; 
            border-radius: 50%; 
        }
        @media (max-width: 600px) {
            .container { margin: 15px; }
            .content { padding: 25px 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Eco Shield BD</div>
            <div class="tagline">Eco-Friendly Pest Control Solutions</div>
        </div>
        
        <div class="content">
            <div class="highlight">
                <p><strong>A new contact form submission has been received!</strong><br>
                Please review the details below and respond promptly.</p>
            </div>
            
            <div class="field-group">
                <div class="field-label">Name</div>
                <div class="field-value">${result.name}</div>
            </div>
            
            <div class="field-group">
                <div class="field-label">Email</div>
                <div class="field-value">${result.email}</div>
            </div>
            
            <div class="field-group">
                <div class="field-label">Phone</div>
                <div class="field-value">${result.phone || "N/A"}</div>
            </div>
            
            <div class="field-group">
                <div class="field-label">Subject</div>
                <div class="field-value">${result.subject || "N/A"}</div>
            </div>
            
            <div class="field-group">
                <div class="field-label">Message</div>
                <div class="field-value" style="white-space: pre-wrap;">${result.message}</div>
            </div>
        </div>
        
        <div class="footer">
            <div class="company-info">
                <strong>Eco Shield Pest BD</strong><br>
                Middle Halishahr Bandar, Chittagong, PO: 4100<br>
                Phone: 014055-55822<br>
                Email: info@ecoshieldpestbd.com<br>
                Website: <a href="https://www.ecoshieldpestbd.com" style="color: #27ae60;">www.ecoshieldpestbd.com</a>
            </div>
            
            <div class="social-icons">
                <a href="https://www.facebook.com/ecoshieldpestbd" target="_blank">
                    <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook">
                </a>
                <a href="https://www.instagram.com/ecoshieldpestbd" target="_blank">
                    <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram">
                </a>
                <a href="https://wa.me/8801405555822" target="_blank">
                    <img src="https://img.icons8.com/color/48/whatsapp.png" alt="WhatsApp">
                </a>
                <a href="https://www.ecoshieldpestbd.com" target="_blank">
                    <img src="https://img.icons8.com/color/48/domain.png" alt="Website">
                </a>
            </div>
            
            <div style="margin-top: 20px;">
                &copy; ${new Date().getFullYear()} Eco Shield Pest BD. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
      `
    );
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }

  // 3. Send API response
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Contact created successfully",
    data: result,
  });
});
// Get all Contact
const getAllContact = catchAsync(async (req, res) => {
  const result = await ContactServices.getAllContact(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Contact fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Contact
const getSingleContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContactServices.getSingleContact(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Contact fetched successfully",
    data: result,
  });
});

// Update Contact
const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContactServices.updateContact(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Contact updated successfully",
    data: result,
  });
});

// Delete Contact
const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContactServices.deleteContact(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Contact deleted successfully",
    data: result,
  });
});

export const ContactControllers = {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
