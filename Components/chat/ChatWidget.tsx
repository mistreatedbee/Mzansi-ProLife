import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, X, Send, Loader2, Heart, ClipboardList, Info, Phone, 
  Banknote, Users, Building, Briefcase, FileText, MessageSquare, 
  HeartHandshake, Clock, CheckCircle, AlertCircle, ArrowRight, ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { chatAPI } from '@/api/apiClient';

// Types
interface Message {
  role: 'user' | 'assistant';
  content: string;
  options?: MessageOption[];
  timestamp?: Date;
}

interface MessageOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: 'flow' | 'link' | 'whatsapp' | 'escalate';
}

interface ConversationState {
  currentFlow: string | null;
  flowStep: number;
  flowData: Record<string, any>;
  confidence: number;
  escalationCount: number;
  lastUserIntent: string;
}

const WHATSAPP_NUMBER = '27737353200';
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

// Main Menu Options
const MAIN_MENU_OPTIONS: MessageOption[] = [
  { label: 'Become a Social Change Ambassador', value: 'ambassador', icon: Users, action: 'flow' },
  { label: 'Order / Buy Products', value: 'products', icon: ShoppingBag, action: 'flow' },
  { label: 'Advertise Your Company', value: 'advertise', icon: Building, action: 'flow' },
  { label: 'Donate to the Organization', value: 'donate', icon: Banknote, action: 'flow' },
  { label: 'Apply for Job Opportunities', value: 'jobs', icon: Briefcase, action: 'flow' },
  { label: 'Submit a Question or Comment', value: 'question', icon: MessageSquare, action: 'flow' },
  { label: 'Community Outreach Participation', value: 'outreach', icon: HeartHandshake, action: 'flow' },
  { label: 'Speak to an Agent', value: 'agent', icon: Phone, action: 'escalate' },
];

// Flow Handlers
class AdvancedChatbotEngine {
  private state: ConversationState;
  private conversationHistory: Message[];

  constructor() {
    this.state = {
      currentFlow: null,
      flowStep: 0,
      flowData: {},
      confidence: 100,
      escalationCount: 0,
      lastUserIntent: '',
    };
    this.conversationHistory = [];
  }

  // Confidence scoring based on input quality
  calculateConfidence(userInput: string, expectedType: 'text' | 'email' | 'phone' | 'address' | 'number'): number {
    const text = userInput.toLowerCase().trim();
    
    if (expectedType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(text) ? 100 : 30;
    }
    
    if (expectedType === 'phone') {
      const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
      return phoneRegex.test(text) ? 100 : 40;
    }
    
    if (expectedType === 'address') {
      const hasNumbers = /\d/.test(text);
      const hasWords = /[a-zA-Z]/.test(text);
      return (hasNumbers && hasWords && text.length > 10) ? 90 : 50;
    }
    
    if (expectedType === 'number') {
      return !isNaN(Number(text)) ? 100 : 20;
    }
    
    // Text quality
    if (text.length < 3) return 20;
    if (text.length < 10) return 50;
    if (text.length > 20) return 90;
    return 70;
  }

  // Detect user intent
  detectIntent(userInput: string): { intent: string; confidence: number } {
    const text = userInput.toLowerCase().trim();
    
    // Greeting
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(text)) {
      return { intent: 'greeting', confidence: 95 };
    }
    
    // Main menu options
    const menuMatches: Record<string, RegExp> = {
      ambassador: /(ambassador|social change|become.*ambassador|join.*community)/i,
      products: /(product|buy|order|purchase|shop)/i,
      advertise: /(advertise|advertising|company|business.*partner)/i,
      donate: /(donate|donation|contribute|give|support|money)/i,
      jobs: /(job|apply|employment|career|work|position)/i,
      question: /(question|comment|feedback|suggestion|complaint|praise)/i,
      outreach: /(outreach|community.*participate|join.*program)/i,
      agent: /(agent|human|speak.*someone|talk.*person|help.*human)/i,
    };
    
    for (const [intent, regex] of Object.entries(menuMatches)) {
      if (regex.test(text)) {
        return { intent, confidence: 85 };
      }
    }
    
    // Contact info
    if (/(contact|phone|call|number|whatsapp|email|address)/i.test(text)) {
      return { intent: 'contact', confidence: 90 };
    }
    
    // Projects
    if (/(project|program|initiative|what.*do)/i.test(text)) {
      return { intent: 'projects', confidence: 80 };
    }
    
    // Mission/Vision
    if (/(mission|vision|about|who.*are|what.*organization)/i.test(text)) {
      return { intent: 'about', confidence: 85 };
    }
    
    return { intent: 'unknown', confidence: 30 };
  }

  // Generate greeting message
  getGreeting(): Message {
    return {
      role: 'assistant',
      content: `Hi 👋 Welcome to **Mzansi Prolife Development Institute**!

I'm your digital assistant 🤖 here to guide you. Please choose an option below to get started:`,
      options: MAIN_MENU_OPTIONS,
    };
  }

  // Handle main menu selection
  handleMainMenu(selection: string): Message {
    this.state.currentFlow = selection;
    this.state.flowStep = 0;
    this.state.flowData = {};
    
    const flowHandlers: Record<string, () => Message> = {
      ambassador: () => this.startAmbassadorFlow(),
      products: () => this.startProductsFlow(),
      advertise: () => this.startAdvertiseFlow(),
      donate: () => this.startDonateFlow(),
      jobs: () => this.startJobsFlow(),
      question: () => this.startQuestionFlow(),
      outreach: () => this.startOutreachFlow(),
      agent: () => this.getEscalationMessage(),
    };
    
    return flowHandlers[selection]?.() || this.getGreeting();
  }

  // Ambassador Flow
  startAmbassadorFlow(): Message {
    this.state.flowStep = 1;
    return {
      role: 'assistant',
      content: `Fantastic! 🎉 To become a **Social Change Ambassador**, I'll need to verify your identity.

Please upload a clear selfie holding your Identity Document on your chest.

**What you'll need:**
- A clear photo of yourself
- Your ID document visible in the photo
- Good lighting

Once you're ready, you can upload the photo through our questionnaire form. Would you like me to guide you through the next steps?`,
      options: [
        { label: 'Continue to Form', value: 'continue_ambassador', action: 'link' },
        { label: 'Get More Info', value: 'info_ambassador', action: 'flow' },
        { label: 'Speak to Agent', value: 'escalate', action: 'escalate' },
      ],
    };
  }

  handleAmbassadorStep(userInput: string): Message {
    const step = this.state.flowStep;
    
    if (step === 1) {
      // Address collection
      this.state.flowStep = 2;
      const confidence = this.calculateConfidence(userInput, 'address');
      
      if (confidence >= 80) {
        this.state.flowData.address = userInput;
        return {
          role: 'assistant',
          content: `Perfect! ✅ We have your address: ${userInput}

You will soon be added to your local WhatsApp ambassador group for training and project implementation.

**Next step:** Tell us why you want to be a Social Change Ambassador. What motivates you to help your community?`,
        };
      } else {
        return {
          role: 'assistant',
          content: `⚠️ Please provide your full address starting from your house number, including township/rural area, city/town, and province.

Example: "123 Main Street, Soweto, Johannesburg, Gauteng"`,
        };
      }
    }
    
    if (step === 2) {
      // Motivation
      this.state.flowStep = 3;
      const confidence = this.calculateConfidence(userInput, 'text');
      
      if (confidence >= 70) {
        this.state.flowData.motivation = userInput;
        return {
          role: 'assistant',
          content: `That's inspiring! 💪 This motivation fits perfectly with our mission.

**Next:** What skills or experience do you have that will help your community? (e.g., teaching, farming, business, sports, safety)`,
        };
      } else {
        return {
          role: 'assistant',
          content: `I see. Could you elaborate a bit more on why you want to help your community? What drives you to make a difference?`,
        };
      }
    }
    
    if (step === 3) {
      // Skills
      this.state.flowStep = 4;
      this.state.flowData.skills = userInput;
      return {
        role: 'assistant',
        content: `Awesome! 🎯 That skill will be very valuable for our projects.

**Final question:** Are you ready to commit a few hours per week to participate in community projects?`,
        options: [
          { label: 'Yes, I\'m ready!', value: 'yes_commit', action: 'flow' },
          { label: 'Not yet, but interested', value: 'maybe_commit', action: 'flow' },
        ],
      };
    }
    
    if (step === 4) {
      // Commitment
      this.state.flowStep = 0;
      this.state.currentFlow = null;
      return {
        role: 'assistant',
        content: `Excellent! 🎉 You're all set!

**What happens next:**
1. We'll review your information
2. Add you to your local WhatsApp ambassador group
3. You'll receive training materials and project schedules
4. Start making a difference in your community!

Would you like to:
- Fill out the complete form now
- Get more information
- Speak to an agent`,
        options: [
          { label: 'Fill Complete Form', value: 'form_ambassador', action: 'link' },
          { label: 'More Information', value: 'info', action: 'flow' },
          { label: 'Speak to Agent', value: 'escalate', action: 'escalate' },
        ],
      };
    }
    
    return this.getDefaultResponse();
  }

  // Products Flow
  startProductsFlow(): Message {
    this.state.flowStep = 1;
    return {
      role: 'assistant',
      content: `Great! 🛍️ Here are the products available for purchase:

**Available Products:**
1. **Car Emergency Kit** (including 500ml Fire Extinguisher) - **R420**
2. **Fire Extinguisher 1000ml** - **R150**
3. **African Aloe Tablets** - **R50**
4. **Bitter Kola Nuts** - **R50**

Which product would you like to order?`,
      options: [
        { label: 'Car Emergency Kit (R420)', value: 'product_kit', action: 'flow' },
        { label: 'Fire Extinguisher (R150)', value: 'product_extinguisher', action: 'flow' },
        { label: 'African Aloe (R50)', value: 'product_aloe', action: 'flow' },
        { label: 'Bitter Kola (R50)', value: 'product_kola', action: 'flow' },
      ],
    };
  }

  handleProductsStep(selection: string): Message {
    const products: Record<string, { name: string; price: number }> = {
      product_kit: { name: 'Car Emergency Kit', price: 420 },
      product_extinguisher: { name: 'Fire Extinguisher 1000ml', price: 150 },
      product_aloe: { name: 'African Aloe Tablets', price: 50 },
      product_kola: { name: 'Bitter Kola Nuts', price: 50 },
    };
    
    const product = products[selection];
    if (product) {
      this.state.flowData.product = product.name;
      this.state.flowData.price = product.price;
      this.state.flowStep = 2;
      
      return {
        role: 'assistant',
        content: `Thank you for selecting **${product.name}**! 💳

**Payment Instructions:**

Please transfer **R${product.price}** (plus R60 courier fees = **R${product.price + 60}** total) to:

**Account Name:** Mzansi Prolife Development Institute NPC  
**Bank:** Capitec Business  
**Account Number:** 1053 5763 31

**Important:**
- Include your contact number as the reference
- Provide your nearest PEP store code for delivery
- Upload proof of payment after transfer

Would you like to:
- Get the full order form
- See delivery information
- Speak to an agent`,
        options: [
          { label: 'Fill Order Form', value: 'form_products', action: 'link' },
          { label: 'Delivery Info', value: 'delivery_info', action: 'flow' },
          { label: 'Speak to Agent', value: 'escalate', action: 'escalate' },
        ],
      };
    }
    
    return this.getDefaultResponse();
  }

  // Donate Flow
  startDonateFlow(): Message {
    this.state.flowStep = 1;
    return {
      role: 'assistant',
      content: `Thank you for your generosity! 🙏 Your donation makes a real difference.

**First, where would you like your donation to go?**`,
      options: [
        { label: 'Head Office (Central Projects)', value: 'head_office', action: 'flow' },
        { label: 'Branch Office (Local Projects)', value: 'branch', action: 'flow' },
      ],
    };
  }

  handleDonateStep(selection: string, userInput?: string): Message {
    const step = this.state.flowStep;
    
    if (step === 1) {
      this.state.flowData.allocation = selection;
      this.state.flowStep = 2;
      
      if (selection === 'branch') {
        return {
          role: 'assistant',
          content: `Great! Which branch location would you like to support?

Please provide the branch name or location.`,
        };
      }
      
      // Head office - show projects
      return {
        role: 'assistant',
        content: `Perfect! Which project would you like to support?

**Our Projects:**
1. Community Dialogue Projects
2. Family Building & Capacitating Projects
3. Entrepreneurship & Business Development
4. Skills Development & Industrialisation
5. Farming & Agriculture
6. Sports Facilities & Management`,
        options: [
          { label: 'Community Dialogue', value: 'project_dialogue', action: 'flow' },
          { label: 'Family Building', value: 'project_family', action: 'flow' },
          { label: 'Entrepreneurship', value: 'project_entrepreneurship', action: 'flow' },
          { label: 'Skills Development', value: 'project_skills', action: 'flow' },
          { label: 'Farming & Agriculture', value: 'project_farming', action: 'flow' },
          { label: 'Sports Facilities', value: 'project_sports', action: 'flow' },
        ],
      };
    }
    
    if (step === 2) {
      const projectName = selection.includes('project_') 
        ? selection.replace('project_', '').replace('_', ' ')
        : userInput || 'your chosen project';
      
      this.state.flowData.project = projectName;
      this.state.flowStep = 3;
      
      return {
        role: 'assistant',
        content: `Thank you! 💚 Your donation will support **${projectName}**.

**Banking Details:**
**Account Name:** Mzansi Prolife Development Institute NPC  
**Bank:** Capitec Business  
**Account Number:** 1053 5763 31

**Reference:** Your name or "Donation"

Would you like to add a comment or suggestion for this project? (Optional)`,
        options: [
          { label: 'Add Comment', value: 'add_comment', action: 'flow' },
          { label: 'Skip, Just Donate', value: 'skip_comment', action: 'flow' },
        ],
      };
    }
    
    if (step === 3) {
      if (selection === 'add_comment' && userInput) {
        const confidence = this.calculateConfidence(userInput, 'text');
        if (confidence >= 60) {
          this.state.flowData.comment = userInput;
          return {
            role: 'assistant',
            content: `Thank you! 🙏 Your suggestion is valuable and will be considered for implementation.

**Next Steps:**
1. Make your payment using the banking details above
2. Upload proof of payment through our donation form
3. We'll allocate your donation to ${this.state.flowData.project}

Would you like to fill out the donation form now?`,
            options: [
              { label: 'Fill Donation Form', value: 'form_donate', action: 'link' },
              { label: 'More Info', value: 'info', action: 'flow' },
            ],
          };
        } else {
          return {
            role: 'assistant',
            content: `Thanks! Could you clarify your suggestion a bit more so it can be helpful for the team?`,
          };
        }
      } else {
        return {
          role: 'assistant',
          content: `Perfect! 💰

**Next Steps:**
1. Make your payment using the banking details provided
2. Upload proof of payment through our donation form
3. We'll allocate your donation to ${this.state.flowData.project}

Would you like to fill out the donation form now?`,
          options: [
            { label: 'Fill Donation Form', value: 'form_donate', action: 'link' },
            { label: 'More Info', value: 'info', action: 'flow' },
          ],
        };
      }
    }
    
    return this.getDefaultResponse();
  }

  // Jobs Flow
  startJobsFlow(): Message {
    this.state.flowStep = 1;
    return {
      role: 'assistant',
      content: `Excellent! 🎯 We're always looking for passionate people to join our team.

**To apply, I'll need:**
- Your full name
- Email address
- Phone number
- Your CV or relevant documents

Let's start! What's your full name?`,
    };
  }

  handleJobsStep(userInput: string, field: 'name' | 'email' | 'phone' | 'skills'): Message {
    const step = this.state.flowStep;
    
    if (field === 'name' && step === 1) {
      this.state.flowData.name = userInput;
      this.state.flowStep = 2;
      return {
        role: 'assistant',
        content: `Nice to meet you, ${userInput}! 👋

What's your email address?`,
      };
    }
    
    if (field === 'email' && step === 2) {
      const confidence = this.calculateConfidence(userInput, 'email');
      if (confidence >= 80) {
        this.state.flowData.email = userInput;
        this.state.flowStep = 3;
        return {
          role: 'assistant',
          content: `Got it! 📧

What's your phone number?`,
        };
      } else {
        return {
          role: 'assistant',
          content: `⚠️ That doesn't look like a valid email address.

Please enter a valid email (example: name@email.com)`,
        };
      }
    }
    
    if (field === 'phone' && step === 3) {
      const confidence = this.calculateConfidence(userInput, 'phone');
      if (confidence >= 80) {
        this.state.flowData.phone = userInput;
        this.state.flowStep = 4;
        return {
          role: 'assistant',
          content: `Perfect! 📱

**Next:** Briefly describe your relevant skills or experience:`,
        };
      } else {
        return {
          role: 'assistant',
          content: `⚠️ Please provide a valid phone number (e.g., 079 123 4567)`,
        };
      }
    }
    
    if (field === 'skills' && step === 4) {
      this.state.flowData.skills = userInput;
      this.state.flowStep = 0;
      this.state.currentFlow = null;
      return {
        role: 'assistant',
        content: `Thank you! ✅ Your application has been received.

**What happens next:**
- We'll review your application
- If there's a match, we'll contact you
- You can also upload your CV through our full application form

Would you like to:
- Fill out the complete application form
- Wait for a human agent
- Chat on WhatsApp for immediate support`,
        options: [
          { label: 'Fill Application Form', value: 'form_jobs', action: 'link' },
          { label: 'Wait for Agent', value: 'wait_agent', action: 'escalate' },
          { label: 'Chat on WhatsApp', value: 'whatsapp', action: 'whatsapp' },
        ],
      };
    }
    
    return this.getDefaultResponse();
  }

  // Question/Comment Flow
  startQuestionFlow(): Message {
    this.state.flowStep = 1;
    return {
      role: 'assistant',
      content: `We'd love to hear from you! 💬

Please type your question or comment, and I'll do my best to help.`,
    };
  }

  handleQuestionStep(userInput: string): Message {
    const intent = this.detectIntent(userInput);
    const confidence = this.calculateConfidence(userInput, 'text');
    
    // High confidence - provide answer
    if (confidence >= 80 && intent.confidence >= 80) {
      this.state.flowStep = 0;
      this.state.currentFlow = null;
      
      // Provide contextual answer based on intent
      if (intent.intent === 'donate') {
        return {
          role: 'assistant',
          content: `**Donation Information:**

**Banking Details:**
- Account: Mzansi Prolife Development Institute NPC
- Bank: Capitec Business
- Account Number: 1053 5763 31
- Reference: Your name or "Donation"

You can donate to any of our 6 projects. Would you like more details?`,
          options: [
            { label: 'More Donation Info', value: 'donate', action: 'flow' },
            { label: 'Fill Donation Form', value: 'form_donate', action: 'link' },
          ],
        };
      }
      
      if (intent.intent === 'contact') {
        return {
          role: 'assistant',
          content: `**Contact Information:**

**Phone:** [079 822 2269](tel:0798222269) (Vodacom)  
**WhatsApp:** [073 735 3200](https://wa.me/27737353200)  
**Email:** mzansiprolifedevelopment@gmail.com

**Address:** 32 Bell Street, Caltex Building, Office No. 106, Nelspruit, 1200

Is there anything else I can help with?`,
        };
      }
      
      return {
        role: 'assistant',
        content: `Thank you for your question! I've noted it down.

Would you like to:
- Submit this through our official form
- Get more information
- Speak to an agent`,
        options: [
          { label: 'Submit Form', value: 'form_question', action: 'link' },
          { label: 'More Info', value: 'info', action: 'flow' },
          { label: 'Speak to Agent', value: 'escalate', action: 'escalate' },
        ],
      };
    }
    
    // Medium confidence - tentative answer
    if (confidence >= 50 && confidence < 80) {
      return {
        role: 'assistant',
        content: `I want to make sure I help you correctly 😊

Could you please tell me a bit more about what you need? This will help me provide a better answer.`,
      };
    }
    
    // Low confidence - escalate
    this.state.escalationCount++;
    return this.getEscalationMessage();
  }

  // Outreach Flow
  startOutreachFlow(): Message {
    this.state.flowStep = 1;
    return {
      role: 'assistant',
      content: `Wonderful! 🌟 Join our community outreach programs!

**Select your life stage:**
- Boyhood (10-18 years)
- Manhood (18-33 years)
- Girlhood (10-18 years)
- Womanhood (18-33 years)`,
      options: [
        { label: 'Boyhood (10-18)', value: 'boyhood', action: 'flow' },
        { label: 'Manhood (18-33)', value: 'manhood', action: 'flow' },
        { label: 'Girlhood (10-18)', value: 'girlhood', action: 'flow' },
        { label: 'Womanhood (18-33)', value: 'womanhood', action: 'flow' },
      ],
    };
  }

  handleOutreachStep(selection: string, userInput?: string): Message {
    const step = this.state.flowStep;
    
    if (step === 1) {
      this.state.flowData.lifeStage = selection;
      this.state.flowStep = 2;
      
      const responses: Record<string, string> = {
        boyhood: `This is a time for talent discovery and learning! 🎯

Please describe what skills or hobbies you enjoy, and how you would like to grow.`,
        manhood: `Focus on skills development and generating income! 💼

What skills would you like to develop further?`,
        girlhood: `Focus on skills development and personal growth! 🌸

Which areas are you most interested in learning?`,
        womanhood: `This stage is about supporting your family and community! 👑

How would you like to contribute or lead in your area?`,
      };
      
      return {
        role: 'assistant',
        content: responses[selection] || 'Tell us about your interests and goals.',
      };
    }
    
    if (step === 2 && userInput) {
      this.state.flowData.interests = userInput;
      this.state.flowStep = 0;
      this.state.currentFlow = null;
      
      return {
        role: 'assistant',
        content: `Perfect! 🎉 We'll match you with the right projects based on your interests.

**Next Steps:**
1. Fill out the complete outreach participation form
2. We'll contact you with project opportunities
3. Join your local community group

Would you like to fill out the form now?`,
        options: [
          { label: 'Fill Outreach Form', value: 'form_outreach', action: 'link' },
          { label: 'More Information', value: 'info', action: 'flow' },
          { label: 'Speak to Agent', value: 'escalate', action: 'escalate' },
        ],
      };
    }
    
    return this.getDefaultResponse();
  }

  // Advertise Flow
  startAdvertiseFlow(): Message {
    this.state.flowStep = 1;
    return {
      role: 'assistant',
      content: `Great! 📢 Perfect for businesses wanting to partner with us.

**We offer:**
- Banner ads
- Featured listings
- Sponsorship opportunities

**I'll need:**
- Company name
- Industry
- Contact person details
- Advertisement type preference

Let's start! What's your company name?`,
    };
  }

  // Escalation Messages
  getEscalationMessage(): Message {
    this.state.escalationCount++;
    
    const context = this.state.currentFlow 
      ? `I need help with ${this.state.currentFlow}`
      : 'I need assistance from the website chatbot';
    
    const whatsappUrl = `${WHATSAPP_BASE_URL}${encodeURIComponent(context)}`;
    
    return {
      role: 'assistant',
      content: `I want to make sure you get the right help. 😊

You can choose one of the options below:`,
      options: [
        { 
          label: '⏳ Wait for a human agent', 
          value: 'wait_agent', 
          icon: Clock,
          action: 'escalate' 
        },
        { 
          label: '💬 Chat with us on WhatsApp', 
          value: 'whatsapp', 
          icon: MessageCircle,
          action: 'whatsapp',
        },
      ],
    };
  }

  getWaitForAgentMessage(): Message {
    return {
      role: 'assistant',
      content: `Thanks! 👍

A human agent will assist you as soon as possible.

You can stay here, or switch to WhatsApp if you prefer faster help.

**Contact Options:**
- **Phone:** [079 822 2269](tel:0798222269) (Vodacom)
- **WhatsApp:** [073 735 3200](https://wa.me/27737353200)
- **Email:** mzansiprolifedevelopment@gmail.com

Our team is available Monday-Friday, 8 AM - 5 PM.`,
      options: [
        { 
          label: '💬 Try WhatsApp Instead', 
          value: 'whatsapp', 
          icon: MessageCircle,
          action: 'whatsapp' 
        },
        { label: 'Back to Menu', value: 'menu', action: 'flow' },
      ],
    };
  }

  // Default/Unknown Response
  getDefaultResponse(): Message {
    this.state.escalationCount++;
    
    if (this.state.escalationCount >= 3) {
      return this.getEscalationMessage();
    }
    
    return {
      role: 'assistant',
      content: `I didn't quite understand that. 😅

Please choose one of the options below, or type your question in a different way:`,
      options: MAIN_MENU_OPTIONS.slice(0, 4), // Show top 4 options
    };
  }

  // Process user input
  processInput(userInput: string, selectedOption?: string): Message {
    this.conversationHistory.push({ role: 'user', content: userInput });
    this.state.lastUserIntent = userInput;
    
    // Handle option selection
    if (selectedOption) {
      if (selectedOption === 'menu' || selectedOption === 'back') {
        this.state.currentFlow = null;
        this.state.flowStep = 0;
        return this.getGreeting();
      }
      
      if (selectedOption === 'escalate' || selectedOption === 'wait_agent') {
        return this.getWaitForAgentMessage();
      }
      
      if (selectedOption === 'whatsapp') {
        const context = this.state.currentFlow 
          ? `Hi, I need help with ${this.state.currentFlow} from the website chatbot.`
          : 'Hi, I need assistance from the website chatbot.';
        const url = `${WHATSAPP_BASE_URL}${encodeURIComponent(context)}`;
        window.open(url, '_blank');
        return {
          role: 'assistant',
          content: `Perfect! 💬 I've opened WhatsApp for you.

**WhatsApp Number:** [073 735 3200](https://wa.me/27737353200)

A real person will respond to you there. Response time may vary, but usually within a few hours during business hours.

Is there anything else I can help with?`,
          options: [
            { label: 'Back to Menu', value: 'menu', action: 'flow' },
          ],
        };
      }
      
      // Handle flow-specific options
      if (this.state.currentFlow === 'products' && selectedOption.startsWith('product_')) {
        return this.handleProductsStep(selectedOption);
      }
      
      if (this.state.currentFlow === 'donate') {
        return this.handleDonateStep(selectedOption, userInput);
      }
      
      if (this.state.currentFlow === 'outreach') {
        return this.handleOutreachStep(selectedOption, userInput);
      }
      
      // Handle form links
      if (selectedOption.startsWith('form_')) {
        const formType = selectedOption.replace('form_', '');
        const formUrl = createPageUrl('Questionnaire');
        window.open(formUrl, '_blank');
        return {
          role: 'assistant',
          content: `Great! I've opened the questionnaire form for you. 📝

Fill it out and we'll process your request.

Is there anything else I can help with?`,
          options: [
            { label: 'Back to Menu', value: 'menu', action: 'flow' },
          ],
        };
      }
      
      // Default: treat as flow selection
      return this.handleMainMenu(selectedOption);
    }
    
    // Handle text input based on current flow
    if (this.state.currentFlow === 'ambassador') {
      return this.handleAmbassadorStep(userInput);
    }
    
    if (this.state.currentFlow === 'jobs') {
      // Detect field type from conversation context
      const lastMessage = this.conversationHistory[this.conversationHistory.length - 2];
      let field: 'name' | 'email' | 'phone' | 'skills' = 'name';
      
      if (lastMessage?.content.includes('email')) field = 'email';
      else if (lastMessage?.content.includes('phone')) field = 'phone';
      else if (lastMessage?.content.includes('skills')) field = 'skills';
      
      return this.handleJobsStep(userInput, field);
    }
    
    if (this.state.currentFlow === 'question') {
      return this.handleQuestionStep(userInput);
    }
    
    if (this.state.currentFlow === 'advertise') {
      // Similar to jobs flow
      return {
        role: 'assistant',
        content: `Got it! 📝

Would you like to fill out the complete advertising form now?`,
        options: [
          { label: 'Fill Advertising Form', value: 'form_advertise', action: 'link' },
          { label: 'More Info', value: 'info', action: 'flow' },
        ],
      };
    }
    
    // No active flow - detect intent
    const intent = this.detectIntent(userInput);
    
    if (intent.confidence >= 70) {
      return this.handleMainMenu(intent.intent);
    }
    
    // Contact info
    if (intent.intent === 'contact') {
      return {
        role: 'assistant',
        content: `**Contact Information:**

**Phone Numbers:**
- Vodacom: [079 822 2269](tel:0798222269)
- MTN: [078 081 3955](tel:0780813955)
- Cell C: [061 708 3753](tel:0617083753)
- Telkom: [061 473 0612](tel:0614730612)

**WhatsApp:** [073 735 3200](https://wa.me/27737353200)

**Email:** [mzansiprolifedevelopment@gmail.com](mailto:mzansiprolifedevelopment@gmail.com)

**Address:** 32 Bell Street | Caltex Building, Office No. 106, Nelspruit, 1200, South Africa

For general inquiries, call Vodacom: 079 822 2269`,
      };
    }
    
    // Projects
    if (intent.intent === 'projects') {
      return {
        role: 'assistant',
        content: `**Our 6 Main Projects:**

1. **Social Life Change Ambassadors** - Recruitment and training of community change agents
2. **Sizanani Community Help Centres** - Establishing help centres across townships and rural areas
3. **Community Outreach & Healing** - Dialogue and collaboration for community healing
4. **Entrepreneurship & Business Development** - Innovative entrepreneurship support
5. **Skills Development & Industrialisation** - Converting practical skills into wealth
6. **Farming, Agriculture & Sports Development** - Agricultural and sports excellence programs

Would you like more details about any specific project?`,
        options: MAIN_MENU_OPTIONS.filter(opt => opt.value === 'outreach' || opt.value === 'donate'),
      };
    }
    
    // About
    if (intent.intent === 'about') {
      return {
        role: 'assistant',
        content: `**About Mzansi Prolife Development Institute NPC**

We are a Non-Profit Cooperation (Registration: 2025/205554/08) aimed at enabling and improving the lives of ordinary citizens of South Africa to achieve extraordinary outcomes.

**Our Mission:** Enable and empower township and rural communities to achieve extraordinary life improvement and self-reliance through health and safety, farming and agriculture, innovative entrepreneurship, business establishment, skills development, and sport excellence.

**Our Vision:** A nation where every household is safe, every youth is skilled, and every dream is supported.

**Core Values:** Ubuntu, Integrity, Action, Learning, Sustainability`,
      };
    }
    
    return this.getDefaultResponse();
  }

  // Reset conversation
  reset(): void {
    this.state = {
      currentFlow: null,
      flowStep: 0,
      flowData: {},
      confidence: 100,
      escalationCount: 0,
      lastUserIntent: '',
    };
    this.conversationHistory = [];
  }
}

// Main Component
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ name: string; phone: string } | null>(null);
  const [collectingInfo, setCollectingInfo] = useState<'name' | 'phone' | 'complete' | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<AdvancedChatbotEngine>(new AdvancedChatbotEngine());

  // Initialize conversation when chat opens
  useEffect(() => {
    if (isOpen && !sessionId) {
      initializeConversation();
    }
  }, [isOpen]);

  const initializeConversation = async () => {
    try {
      const newSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const response = await chatAPI.createConversation(newSessionId);
      setSessionId(response.conversation?.session_id || newSessionId);
      
      // Start collecting user info
      setCollectingInfo('name');
      setMessages([{
        role: 'assistant',
        content: `Hi 👋 Welcome to **Mzansi Prolife Development Institute**!

I'm your digital assistant 🤖. To provide you with the best assistance, I'll need a few details first.

**What's your name?**`,
      }]);
    } catch (error) {
      console.error('Failed to initialize conversation:', error);
      // Fallback: still show greeting
      setCollectingInfo('name');
      setMessages([{
        role: 'assistant',
        content: `Hi 👋 Welcome to **Mzansi Prolife Development Institute**!

I'm your digital assistant 🤖. To provide you with the best assistance, I'll need a few details first.

**What's your name?**`,
      }]);
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (scrollElement) {
          scrollElement.scrollTo({
            top: scrollElement.scrollHeight,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  const handleSend = async (text = input, selectedOption?: string) => {
    if (!text.trim() && !selectedOption) return;
    
    const userMessage: Message = { 
      role: 'user', 
      content: text || selectedOption || '',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    const messageContent = text || selectedOption || '';
    setInput('');
    setIsLoading(true);

    // Handle user info collection
    if (collectingInfo === 'name') {
      const name = messageContent.trim();
      if (name.length < 2) {
        setIsLoading(false);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Please provide your full name (at least 2 characters).`,
        }]);
        return;
      }
      setUserInfo({ name, phone: '' });
      setCollectingInfo('phone');
      setIsLoading(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Nice to meet you, **${name}**! 👋

**What's your phone number?** (e.g., 079 123 4567)`,
      }]);
      return;
    }

    if (collectingInfo === 'phone') {
      const phone = messageContent.trim().replace(/\s+/g, '');
      const phoneRegex = /^[\d\+\-\(\)]{10,}$/;
      if (!phoneRegex.test(phone)) {
        setIsLoading(false);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ Please provide a valid phone number (e.g., 079 123 4567 or 0791234567)`,
        }]);
        return;
      }
      const updatedUserInfo = { ...userInfo!, phone };
      setUserInfo(updatedUserInfo);
      setCollectingInfo('complete');
      
      // Update conversation with user info
      if (sessionId) {
        try {
          await chatAPI.createConversation(sessionId, updatedUserInfo.name, updatedUserInfo.phone);
        } catch (error) {
          console.error('Failed to update conversation:', error);
        }
      }
      
      setIsLoading(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Perfect! ✅ I have your information:
- **Name:** ${updatedUserInfo.name}
- **Phone:** ${updatedUserInfo.phone}

Now, how can I help you today? Please choose an option below:`,
        options: MAIN_MENU_OPTIONS,
      }]);
      return;
    }

    // Save message to backend
    if (sessionId && collectingInfo === 'complete') {
      try {
        await chatAPI.addMessage(sessionId, 'user', messageContent, selectedOption ? [selectedOption] : undefined);
      } catch (error) {
        console.error('Failed to save message:', error);
      }
    }

    // Simulate thinking delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const response = engineRef.current.processInput(text, selectedOption);
      setMessages(prev => [...prev, response]);
      
      // Save assistant response to backend
      if (sessionId && collectingInfo === 'complete') {
        try {
          await chatAPI.addMessage(sessionId, 'assistant', response.content, response.options);
        } catch (error) {
          console.error('Failed to save message:', error);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ Something went wrong on our side. Please try again in a moment.`,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option: MessageOption) => {
    handleSend('', option.value);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-2xl shadow-green-600/40 flex items-center justify-center z-50 group"
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] z-50"
          >
            <Card className="overflow-hidden shadow-2xl border-0 flex flex-col h-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Mzansi ProLife Assistant</h3>
                      <p className="text-xs text-green-100">Online • Ready to help</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full p-4" ref={scrollRef}>
                  <div className="space-y-4 pb-2">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        msg.role === 'user' 
                          ? 'bg-green-600 text-white rounded-br-md' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <>
                            <ReactMarkdown className="text-sm prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                              {msg.content}
                            </ReactMarkdown>
                            {msg.options && msg.options.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {msg.options.map((option, optIdx) => {
                                  const Icon = option.icon || ArrowRight;
                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleOptionClick(option)}
                                      className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all text-left"
                                    >
                                      <Icon className="w-4 h-4 flex-shrink-0" />
                                      <span className="flex-1">{option.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                        <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                      </div>
                    </div>
                  )}
                  </div>
                </ScrollArea>
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-gray-50 flex-shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white border-gray-200 rounded-full focus-visible:ring-green-500"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()}
                    className="bg-green-600 hover:bg-green-700 rounded-full w-10 h-10 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

