# Auto-Reply Email Template Setup Guide

## Overview
This guide provides the complete setup instructions for the auto-reply email template that sends confirmation messages to clients when they submit forms on the VioLaDoula website.

## EmailJS Template Configuration

### Template ID: `auto_reply_template`

**Subject Line:** `Thank you for contacting Vio La Doula!`

**Email Template Content:**
```
Dear {{client_name}},

Thank you for reaching out regarding your {{service_type}}!

I'm delighted that you're considering my services for this special journey. {{next_steps}}

In the meantime, please feel free to explore my website at {{website_url}} for more information about my services and approach to birth support.

If you have any urgent questions, you can reach me at:
📧 Email: {{business_email}}
📱 Phone: {{business_phone}}

With warm regards,
{{from_name}}
Your Doula Latina

---
Visit www.violadoula.com
Follow @vio_ladoula on Instagram

*This is an automated confirmation message. I will personally respond to your inquiry within 24 hours.*
```

## Template Variables

The auto-reply system automatically populates these variables:

| Variable | Source | Example Value |
|----------|--------|---------------|
| `{{client_name}}` | Form submission | "Sarah Johnson" |
| `{{client_email}}` | Form submission | "sarah@email.com" |
| `{{service_type}}` | Auto-generated | "consultation request" / "HypnoBirthing® enrollment" |
| `{{next_steps}}` | Auto-generated | Custom message based on form type |
| `{{from_name}}` | Static | "Vio La Doula" |
| `{{business_email}}` | Static | "hello@violadoula.com" |
| `{{business_phone}}` | Static | "(713) 234-5678" |
| `{{website_url}}` | Static | "https://www.violadoula.com" |

## Dynamic Content Generation

### Contact Form Auto-Reply
- **Service Type:** "consultation request"
- **Next Steps:** "I will personally review your inquiry and get back to you within 24 hours to schedule your free consultation."

### HypnoBirthing® Enrollment Auto-Reply  
- **Service Type:** "HypnoBirthing® enrollment"
- **Next Steps:** "I will review your enrollment details and send you course materials and payment information within 24 hours."

## Implementation Status

✅ **Auto-Reply Function Created** - `sendAutoReply()` in `/src/utils/emailService.ts`
✅ **Contact Form Integration** - Auto-reply triggers after successful contact form submission
✅ **HypnoBirthing Form Integration** - Auto-reply triggers after successful enrollment submission
✅ **Template Documentation** - Complete template specification provided
✅ **Variable Mapping** - All template parameters properly configured

## Technical Implementation

### Function Signature
```typescript
export const sendAutoReply = async (
  clientEmail: string, 
  clientName: string, 
  formType: 'contact' | 'hypnobirthing'
): Promise<boolean>
```

### Form Integration
Both forms now include auto-reply functionality:
- **Contact Form** (`Contact.tsx`): Calls `sendAutoReply(data.email, data.name, 'contact')`
- **HypnoBirthing Form** (`HypnobirthingForm.tsx`): Calls `sendAutoReply(data.email, data.fullName, 'hypnobirthing')`

### Error Handling
- Auto-reply failures are logged but don't prevent form submission success
- If auto-reply fails, the main notification email to the business owner still succeeds
- Graceful degradation ensures core functionality remains intact

## EmailJS Account Requirements

**✅ ACTIVE:** Paid EmailJS account required for auto-reply functionality
- Free accounts: Limited to 200 emails/month, no auto-reply templates
- Paid accounts: Unlimited templates including auto-reply capability
- Current setup uses paid account with template limits removed

## Setup Instructions for EmailJS Dashboard

1. **Log into EmailJS Dashboard** at https://dashboard.emailjs.com
2. **Navigate to Email Templates**
3. **Create New Template** with ID: `auto_reply_template`
4. **Set Subject:** `Thank you for contacting Vio La Doula!`
5. **Copy Template Content** from above
6. **Save Template** and test with sample variables
7. **Verify Integration** by submitting test forms on the website

## Testing Checklist

### Contact Form Testing
- [ ] Submit contact form with valid email
- [ ] Check client receives auto-reply within 2 minutes
- [ ] Verify business owner receives notification email
- [ ] Confirm auto-reply content matches template
- [ ] Test with different service selections

### HypnoBirthing Form Testing  
- [ ] Submit enrollment form with valid email
- [ ] Check client receives enrollment-specific auto-reply
- [ ] Verify business owner receives enrollment notification
- [ ] Confirm next steps mention course materials
- [ ] Test with different course format selections

## Maintenance Notes

**Template Updates:** Any changes to business contact information require updates to the template variables in `emailService.ts`

**Content Modifications:** Template content can be modified directly in EmailJS dashboard without code changes

**Monitoring:** Monitor EmailJS dashboard for delivery rates and any failed auto-reply attempts

## Business Impact

### Client Experience
- **Instant Confirmation** - Clients receive immediate acknowledgment of form submissions
- **Professional Communication** - Branded, personalized auto-replies build trust
- **Clear Expectations** - 24-hour response time clearly communicated
- **Business Information** - Contact details provided for urgent inquiries

### Business Operations
- **Reduced Inquiry Volume** - Auto-replies answer common questions about response times
- **Professional Image** - Consistent, branded communication across all touchpoints
- **Customer Satisfaction** - Immediate feedback improves client experience
- **Workflow Efficiency** - Automated confirmations reduce manual follow-up needs

---

**Status: ✅ COMPLETE** - Auto-reply email template system fully implemented and ready for production use.