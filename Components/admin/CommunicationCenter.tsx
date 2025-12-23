import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Mail, MessageCircle, Send, Phone, CheckCircle, Clock, X, Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { communicationsAPI } from '@/api/apiClient';
import { format } from 'date-fns';

export default function CommunicationCenter() {
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState<any>(null);
  const [formData, setFormData] = useState({
    type: 'email',
    recipient: '',
    subject: '',
    message: '',
    template: ''
  });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['communications'],
    queryFn: () => communicationsAPI.list({ limit: 50 }),
  });

  const sendMutation = useMutation({
    mutationFn: (data: any) => communicationsAPI.send(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      toast.success('Message sent successfully');
      setShowSendDialog(false);
      setFormData({ type: 'email', recipient: '', subject: '', message: '', template: '' });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send message');
    },
  });

  const handleSend = () => {
    sendMutation.mutate(formData);
  };

  const communications = data?.data?.communications || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'read':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'failed':
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Communication Center</h2>
        <Button 
          className="bg-green-600 hover:bg-green-700 rounded-xl"
          onClick={() => setShowSendDialog(true)}
        >
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-gray-600">mzansiprolifedevelopment@gmail.com</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl" onClick={() => {
              setFormData({ ...formData, type: 'email' });
              setShowSendDialog(true);
            }}>
              Send Email
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-sm text-gray-600">073 735 3200</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl" onClick={() => {
              setFormData({ ...formData, type: 'whatsapp' });
              setShowSendDialog(true);
            }}>
              Send WhatsApp
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold">SMS</h3>
                <p className="text-sm text-gray-600">Send text messages</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl" onClick={() => {
              setFormData({ ...formData, type: 'sms' });
              setShowSendDialog(true);
            }}>
              Send SMS
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Communication History */}
      <Card>
        <CardHeader>
          <CardTitle>Communication History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">Loading...</div>
          ) : communications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No communications yet</div>
          ) : (
            <div className="space-y-3">
              {communications.map((comm: any) => (
                <div
                  key={comm._id || comm.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {comm.type === 'email' && <Mail className="w-5 h-5 text-blue-600" />}
                        {comm.type === 'whatsapp' && <MessageCircle className="w-5 h-5 text-green-600" />}
                        {comm.type === 'sms' && <Phone className="w-5 h-5 text-purple-600" />}
                        <h3 className="font-semibold">{comm.recipient}</h3>
                        <Badge variant="outline">{comm.type}</Badge>
                        {getStatusIcon(comm.status)}
                        <Badge variant={comm.status === 'sent' ? 'default' : 'outline'}>
                          {comm.status}
                        </Badge>
                      </div>
                      {comm.subject && (
                        <p className="font-medium text-gray-900 mb-1">{comm.subject}</p>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-2">{comm.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {comm.sentAt 
                          ? format(new Date(comm.sentAt), 'MMM dd, yyyy HH:mm')
                          : format(new Date(comm.created_date), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCommunication(comm)}
                      className="rounded-xl"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Send Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send {formData.type.toUpperCase()}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Recipient</label>
              <Input
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                placeholder="Email or phone number"
                className="rounded-xl"
              />
            </div>
            {formData.type === 'email' && (
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="rounded-xl"
                placeholder="Enter your message..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSend}
                className="bg-green-600 hover:bg-green-700 rounded-xl flex-1"
                disabled={sendMutation.isPending || !formData.recipient || !formData.message}
              >
                <Send className="w-4 h-4 mr-2" />
                {sendMutation.isPending ? 'Sending...' : 'Send'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSendDialog(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Communication Dialog */}
      <Dialog open={!!selectedCommunication} onOpenChange={() => setSelectedCommunication(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Communication Details</DialogTitle>
          </DialogHeader>
          {selectedCommunication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <Badge>{selectedCommunication.type}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge variant={selectedCommunication.status === 'sent' ? 'default' : 'outline'}>
                    {selectedCommunication.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Recipient</p>
                  <p className="font-semibold">{selectedCommunication.recipient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sent At</p>
                  <p className="font-semibold">
                    {selectedCommunication.sentAt 
                      ? format(new Date(selectedCommunication.sentAt), 'MMM dd, yyyy HH:mm')
                      : 'Not sent yet'}
                  </p>
                </div>
              </div>
              {selectedCommunication.subject && (
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-semibold">{selectedCommunication.subject}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 mb-2">Message</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="whitespace-pre-wrap">{selectedCommunication.message}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

