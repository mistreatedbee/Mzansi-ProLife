import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminAPI } from '@/api/apiClient';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, Search, Phone, Mail, User, Clock, 
  AlertCircle, CheckCircle, Filter, RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';

interface Conversation {
  _id: string;
  session_id: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  platform: string;
  status: string;
  escalated: boolean;
  messageCount: number;
  lastMessageAt: string;
  created_date: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
}

export default function ChatConversations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin', 'conversations'],
    queryFn: async () => {
      const response = await adminAPI.getConversations();
      return response.conversations || [];
    },
  });

  const conversations: Conversation[] = data || [];

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = 
      !searchTerm ||
      conv.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.user_phone?.includes(searchTerm) ||
      conv.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.session_id.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: conversations.length,
    escalated: conversations.filter(c => c.escalated).length,
    active: conversations.filter(c => c.status === 'active').length,
    resolved: conversations.filter(c => c.status === 'resolved').length,
  };

  const getStatusBadge = (status: string, escalated: boolean) => {
    if (escalated) {
      return <Badge variant="destructive">Escalated</Badge>;
    }
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'resolved':
        return <Badge variant="secondary">Resolved</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Conversations</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Escalated</p>
                <p className="text-2xl font-bold text-red-600">{stats.escalated}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => refetch()}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <div className="space-y-3 mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, phone, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('active')}
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === 'escalated' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('escalated')}
                  className="text-red-600"
                >
                  Escalated
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading conversations...</div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No conversations found</div>
              ) : (
                <div className="space-y-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv._id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedConversation?._id === conv._id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-gray-400" />
                            <p className="font-semibold">
                              {conv.user_name || 'Anonymous'}
                            </p>
                            {getStatusBadge(conv.status, conv.escalated)}
                          </div>
                          {conv.user_phone && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              {conv.user_phone}
                            </div>
                          )}
                          {conv.user_email && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Mail className="w-3 h-3" />
                              {conv.user_email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                        <span>{conv.messageCount} messages</span>
                        <span>
                          {format(new Date(conv.lastMessageAt), 'MMM d, HH:mm')}
                        </span>
                      </div>
                      {conv.messages && conv.messages.length > 0 && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {conv.messages[conv.messages.length - 1].content.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Conversation Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedConversation ? 'Conversation Details' : 'Select a conversation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedConversation ? (
              <div className="space-y-6">
                {/* User Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">User Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedConversation.user_name || 'Anonymous'}</p>
                    </div>
                    {selectedConversation.user_phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedConversation.user_phone}</p>
                      </div>
                    )}
                    {selectedConversation.user_email && (
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedConversation.user_email}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Platform</p>
                      <Badge>{selectedConversation.platform}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      {getStatusBadge(selectedConversation.status, selectedConversation.escalated)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Started</p>
                      <p className="font-medium">
                        {format(new Date(selectedConversation.created_date), 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div>
                  <h3 className="font-semibold mb-3">Messages ({selectedConversation.messageCount})</h3>
                  <ScrollArea className="h-[500px] border rounded-lg p-4">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              msg.role === 'user'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {format(new Date(msg.timestamp), 'HH:mm:ss')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation from the list to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

