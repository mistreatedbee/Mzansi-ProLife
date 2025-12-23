/**
 * Base44 API Client - Now uses Backend API
 * This file maintains compatibility with existing code while using the new backend
 */

import { submissionsAPI, adminAPI, chatAPI } from './apiClient';

// Maintain the same interface for backward compatibility
interface Base44EntityClient<T> {
  list: (orderBy?: string, limit?: number) => Promise<T[]>;
  get: (id: string) => Promise<T>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

interface Base44Integrations {
  Core: {
    InvokeLLM: (params: { prompt: string }) => Promise<string>;
    UploadFile: (params: { file: File }) => Promise<{ file_url: string }>;
  };
}

interface Base44Client {
  entities: {
    Submission: Base44EntityClient<any>;
    ChatConversation: Base44EntityClient<any>;
  };
  integrations: Base44Integrations;
}

// Create adapter that uses the backend API
const createSubmissionClient = (): Base44EntityClient<any> => ({
  async list(orderBy = '-created_date', limit = 100) {
    try {
      const submissions = await submissionsAPI.list();
      // Sort and limit (backend should handle this, but client-side fallback)
      const sorted = submissions.sort((a: any, b: any) => {
        const dateA = new Date(a.created_date || 0).getTime();
        const dateB = new Date(b.created_date || 0).getTime();
        return orderBy.startsWith('-') ? dateB - dateA : dateA - dateB;
      });
      return sorted.slice(0, limit);
    } catch (error) {
      console.error('Error listing submissions:', error);
      return [];
    }
  },

  async get(id: string) {
    return await submissionsAPI.get(id);
  },

  async create(data: Partial<any>) {
    return await submissionsAPI.create(data);
  },

  async update(id: string, data: Partial<any>) {
    return await submissionsAPI.update(id, data);
  },

  async delete(id: string) {
    // Backend doesn't have delete yet, but we can add it
    console.warn('Delete not implemented in backend yet');
    throw new Error('Delete not implemented');
  },
});

const createChatConversationClient = (): Base44EntityClient<any> => ({
  async list() {
    try {
      const conversations = await adminAPI.getConversations();
      return conversations;
    } catch (error) {
      console.error('Error listing conversations:', error);
      return [];
    }
  },

  async get(id: string) {
    return await chatAPI.getConversation(id);
  },

  async create(data: Partial<any>) {
    return await chatAPI.createConversation(data.session_id);
  },

  async update(id: string, data: Partial<any>) {
    // Chat updates are done via messages endpoint
    if (data.messages && data.messages.length > 0) {
      const lastMessage = data.messages[data.messages.length - 1];
      return await chatAPI.addMessage(id, lastMessage.role, lastMessage.content);
    }
    return data;
  },

  async delete(id: string) {
    console.warn('Delete not implemented in backend yet');
    throw new Error('Delete not implemented');
  },
});

const base44Client: Base44Client = {
  entities: {
    Submission: createSubmissionClient(),
    ChatConversation: createChatConversationClient(),
  },
  integrations: {
    Core: {
      // LLM integration - you can keep using Base44 or integrate with your own LLM
      async InvokeLLM({ prompt }: { prompt: string }): Promise<string> {
        // For now, return a placeholder
        // You can integrate with OpenAI, Anthropic, or keep Base44 here
        console.log('LLM Invocation:', prompt);
        
        // Fallback response
        return "I'm processing your request. Please ensure the LLM service is configured.";
      },

      // File upload - integrate with your storage service
      async UploadFile({ file }: { file: File }): Promise<{ file_url: string }> {
        // TODO: Implement file upload to your storage (AWS S3, Cloudinary, etc.)
        console.log('File upload:', file.name);
        
        // For now, return a placeholder URL
        // In production, upload to your storage service
        return {
          file_url: `https://storage.example.com/uploads/${Date.now()}-${file.name}`
        };
      },
    },
  },
};

export { base44Client as base44 };
