import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { adminAPI } from '@/api/apiClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Heart, 
  Briefcase, 
  MessageSquare, 
  ShoppingBag,
  Megaphone,
  Headphones,
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  FileText,
  X,
  Calendar,
  UserPlus,
  Bot,
  Settings,
  Mail,
  MessageCircle,
  TrendingUp,
  LogOut,
  Save,
  Edit,
  Trash2,
  Plus,
  FileSpreadsheet,
  FileText as FileTextIcon,
  File,
  Shield
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { motion } from 'framer-motion';
import { exportToCSV, exportToExcel, exportToPDF, formatSubmissionsForExport } from '@/utils/export';
import AdminLogin from '@/components/admin/AdminLogin';
import UserManagement from '@/components/admin/UserManagement';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import ContentManagement from '@/components/admin/ContentManagement';
import CommunicationCenter from '@/components/admin/CommunicationCenter';
import DonationManagement from '@/components/admin/DonationManagement';
import SecurityCompliance from '@/components/admin/SecurityCompliance';
import ChatConversations from '@/components/admin/ChatConversations';
import { toast } from 'sonner';

const submissionTypes = {
  ambassador: { label: 'Ambassador', icon: Users, color: 'bg-blue-100 text-blue-700' },
  product_order: { label: 'Product Order', icon: ShoppingBag, color: 'bg-purple-100 text-purple-700' },
  advertise: { label: 'Advertise', icon: Megaphone, color: 'bg-amber-100 text-amber-700' },
  donate: { label: 'Donation', icon: Heart, color: 'bg-rose-100 text-rose-700' },
  job_application: { label: 'Job Application', icon: Briefcase, color: 'bg-teal-100 text-teal-700' },
  question_comment: { label: 'Question/Comment', icon: MessageSquare, color: 'bg-indigo-100 text-indigo-700' },
  outreach_participation: { label: 'Outreach', icon: Users, color: 'bg-green-100 text-green-700' },
  agent_request: { label: 'Agent Request', icon: Headphones, color: 'bg-gray-100 text-gray-700' },
};

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  contacted: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-700',
};

const projects = [
  'Social Life Change Ambassadors',
  'Sizanani Community Help Centres',
  'Community Outreach & Healing',
  'Entrepreneurship & Business Development',
  'Skills Development & Industrialisation',
  'Farming, Agriculture & Sports Development',
];

const staffMembers = [
  { id: 'staff1', name: 'John Doe', role: 'Admin' },
  { id: 'staff2', name: 'Jane Smith', role: 'Manager' },
  { id: 'staff3', name: 'Mike Johnson', role: 'Support' },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in (from localStorage)
    return localStorage.getItem('admin_authenticated') === 'true';
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const queryClient = useQueryClient();

  // Handle login
  const handleLogin = async (email: string, password: string) => {
    try {
      // Use admin login endpoint (verifies admin role)
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success && data.data.user.role === 'admin') {
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_email', email);
        localStorage.setItem('admin_name', data.data.user.name);
        localStorage.setItem('auth_token', data.data.token);
        setIsAuthenticated(true);
        toast.success('Admin login successful');
      } else {
        toast.error(data.message || 'Invalid credentials or insufficient permissions');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    setIsAuthenticated(false);
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Get stats from admin API
  const { data: statsData } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => adminAPI.getStats(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Get submissions from admin API with filters
  const { data: submissionsData, isLoading } = useQuery({
    queryKey: ['adminSubmissions', typeFilter, statusFilter, projectFilter, dateRange, startDate, endDate, searchTerm],
    queryFn: () => adminAPI.getSubmissions({
      type: typeFilter !== 'all' ? typeFilter : undefined,
      status: statusFilter !== 'all' ? statusFilter : undefined,
      project: projectFilter !== 'all' ? projectFilter : undefined,
      startDate: dateRange === 'custom' && startDate ? startDate : undefined,
      endDate: dateRange === 'custom' && endDate ? endDate : undefined,
      search: searchTerm || undefined,
      limit: 100
    }),
  });

  const submissions = submissionsData?.data?.submissions || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminAPI.updateSubmission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSubmissions'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success('Submission updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update submission');
    },
  });

  // Stats from API or calculated
  const stats = statsData?.data || {
    totalSubmissions: submissions.length,
    newSubmissions: submissions.filter((s: any) => s.status === 'new').length,
    inProgress: submissions.filter((s: any) => s.status === 'in_progress').length,
    completed: submissions.filter((s: any) => s.status === 'completed').length,
    totalDonations: submissions.filter((s: any) => s.submission_type === 'donate').reduce((sum: number, s: any) => sum + (parseFloat(s.donation_amount) || 0), 0),
  };

  // Normalize stats for display
  const displayStats = {
    total: stats.totalSubmissions || submissions.length,
    new: stats.newSubmissions || 0,
    inProgress: stats.inProgress || 0,
    completed: stats.completed || 0,
    donations: stats.totalDonations || 0,
  };

  // Filter submissions with all filters
  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = !searchTerm || 
      s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.reference_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || s.submission_type === typeFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesProject = projectFilter === 'all' || s.project_allocation === projectFilter;
    
    // Date range filter
    let matchesDate = true;
    if (dateRange === 'today') {
      const today = startOfDay(new Date());
      matchesDate = s.created_date && new Date(s.created_date) >= today;
    } else if (dateRange === 'week') {
      const weekAgo = startOfDay(subDays(new Date(), 7));
      matchesDate = s.created_date && new Date(s.created_date) >= weekAgo;
    } else if (dateRange === 'month') {
      const monthAgo = startOfDay(subDays(new Date(), 30));
      matchesDate = s.created_date && new Date(s.created_date) >= monthAgo;
    } else if (dateRange === 'custom' && startDate && endDate) {
      const start = startOfDay(new Date(startDate));
      const end = endOfDay(new Date(endDate));
      matchesDate = s.created_date && new Date(s.created_date) >= start && new Date(s.created_date) <= end;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesProject && matchesDate;
  });

  // Count by type
  const typeCounts = Object.keys(submissionTypes).reduce((acc, type) => {
    acc[type] = submissions.filter(s => s.submission_type === type).length;
    return acc;
  }, {});

  const handleStatusChange = (submission: any, newStatus: string) => {
    updateMutation.mutate({ id: submission.id, data: { status: newStatus } });
    toast.success('Status updated successfully');
  };

  const handleAssignStaff = (submission: any, staffId: string) => {
    const staff = staffMembers.find(s => s.id === staffId);
    updateMutation.mutate({ 
      id: submission.id, 
      data: { assigned_to: staff?.name || staffId } 
    });
    toast.success(`Assigned to ${staff?.name || 'staff member'}`);
  };

  const handleSaveNotes = (submission: any) => {
    updateMutation.mutate({ 
      id: submission.id, 
      data: { notes } 
    });
    toast.success('Notes saved');
    setNotes('');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    const exportData = formatSubmissionsForExport(filteredSubmissions);
    const filename = `submissions_${format(new Date(), 'yyyy-MM-dd')}`;
    
    if (format === 'csv') {
      exportToCSV(exportData, `${filename}.csv`);
    } else if (format === 'excel') {
      exportToExcel(exportData, `${filename}.xlsx`);
    } else if (format === 'pdf') {
      exportToPDF(exportData, `${filename}.pdf`, 'Submissions Report');
    }
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  // Load notes when submission is selected
  useEffect(() => {
    if (selectedSubmission) {
      setNotes(selectedSubmission.notes || '');
    }
  }, [selectedSubmission]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Mzansi Prolife Development Institute</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-600 border-green-200">
              NPC: 2025/205554/08
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{localStorage.getItem('admin_email') || 'Admin'}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600">
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-white shadow-sm rounded-xl p-1 flex-wrap">
            <TabsTrigger value="overview" className="rounded-lg px-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="submissions" className="rounded-lg px-6">
              <FileText className="w-4 h-4 mr-2" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="rounded-lg px-6">
              <Bot className="w-4 h-4 mr-2" />
              Chatbot
            </TabsTrigger>
            <TabsTrigger value="content" className="rounded-lg px-6">
              <Settings className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="communication" className="rounded-lg px-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="donations" className="rounded-lg px-6">
              <Heart className="w-4 h-4 mr-2" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg px-6">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg px-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg px-6">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-2xl font-bold">{displayStats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">New</p>
                      <p className="text-2xl font-bold">{displayStats.new}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">In Progress</p>
                      <p className="text-2xl font-bold">{displayStats.inProgress}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-2xl font-bold">{displayStats.completed}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Donations</p>
                      <p className="text-2xl font-bold">R{displayStats.donations.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* By Type */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Submissions by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(submissionTypes).map(([key, type]) => (
                    <div key={key} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                        <type.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{type.label}</p>
                        <p className="text-xl font-bold">{typeCounts[key] || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Submissions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Submissions</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('submissions')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submissions.slice(0, 5).map((submission) => {
                    const type = submissionTypes[submission.submission_type] || submissionTypes.question_comment;
                    return (
                      <div 
                        key={submission.id}
                        onClick={() => setSelectedSubmission(submission)}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                            <type.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{submission.full_name || 'Anonymous'}</p>
                            <p className="text-sm text-gray-500">{submission.reference_number}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={statusColors[submission.status]}>
                            {submission.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {submission.created_date && format(new Date(submission.created_date), 'MMM d')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            {/* Export Buttons */}
            <div className="flex flex-wrap gap-2 mb-6 justify-end">
              <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                <FileTextIcon className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                <File className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, email, reference, phone, ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="rounded-xl">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {Object.entries(submissionTypes).map(([key, type]) => (
                        <SelectItem key={key} value={key}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={projectFilter} onValueChange={setProjectFilter}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      {projects.map((project) => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Date Range Filter */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  {dateRange === 'custom' && (
                    <>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start Date"
                        className="rounded-xl"
                      />
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End Date"
                        className="rounded-xl"
                      />
                    </>
                  )}
                  <div className="text-sm text-gray-500 flex items-center">
                    Showing {filteredSubmissions.length} of {submissions.length} submissions
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submissions List */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                  ) : filteredSubmissions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No submissions found</div>
                  ) : (
                    filteredSubmissions.map((submission) => {
                      const type = submissionTypes[submission.submission_type] || submissionTypes.question_comment;
                      return (
                        <motion.div
                          key={submission.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                                <type.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-medium">{submission.full_name || 'Anonymous'}</p>
                                <p className="text-sm text-gray-500">{submission.email || 'No email'}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-mono text-gray-600">{submission.reference_number}</p>
                                <p className="text-xs text-gray-400">
                                  {submission.created_date && format(new Date(submission.created_date), 'MMM d, yyyy HH:mm')}
                                </p>
                              </div>
                              <Badge className={statusColors[submission.status]}>
                                {submission.status}
                              </Badge>
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

      {/* Detail Modal */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Submission Details</span>
              <Button variant="ghost" size="icon" onClick={() => setSelectedSubmission(null)}>
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            {selectedSubmission && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${submissionTypes[selectedSubmission.submission_type]?.color || 'bg-gray-100'}`}>
                    {(() => {
                      const Icon = submissionTypes[selectedSubmission.submission_type]?.icon || FileText;
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{submissionTypes[selectedSubmission.submission_type]?.label}</p>
                    <p className="text-sm text-gray-500 font-mono">{selectedSubmission.reference_number}</p>
                  </div>
                </div>

                {/* Status Update & Assignment */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Status:</span>
                    <Select 
                      value={selectedSubmission.status} 
                      onValueChange={(value) => {
                        handleStatusChange(selectedSubmission, value);
                        setSelectedSubmission({ ...selectedSubmission, status: value });
                      }}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Assign To:</span>
                    <Select 
                      value={selectedSubmission.assigned_to || ''} 
                      onValueChange={(value) => {
                        handleAssignStaff(selectedSubmission, value);
                        setSelectedSubmission({ ...selectedSubmission, assigned_to: value });
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select staff" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {staffMembers.map((staff) => (
                          <SelectItem key={staff.id} value={staff.id}>{staff.name} ({staff.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedSubmission.full_name && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedSubmission.full_name}</p>
                    </div>
                  )}
                  {selectedSubmission.email && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{selectedSubmission.email}</p>
                    </div>
                  )}
                  {selectedSubmission.phone && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Phone</p>
                      <a href={`tel:${selectedSubmission.phone}`} className="font-medium text-green-600">{selectedSubmission.phone}</a>
                    </div>
                  )}
                  {selectedSubmission.address && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-medium">{selectedSubmission.address}, {selectedSubmission.city}</p>
                    </div>
                  )}
                  {selectedSubmission.donation_amount && (
                    <div className="bg-rose-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Donation Amount</p>
                      <p className="font-bold text-rose-600">R{selectedSubmission.donation_amount}</p>
                    </div>
                  )}
                  {selectedSubmission.project_allocation && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Project</p>
                      <p className="font-medium">{selectedSubmission.project_allocation}</p>
                    </div>
                  )}
                  {selectedSubmission.created_date && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">Submitted</p>
                      <p className="font-medium">{format(new Date(selectedSubmission.created_date), 'MMM d, yyyy HH:mm')}</p>
                    </div>
                  )}
                </div>

                {/* Message / Motivation */}
                {(selectedSubmission.message || selectedSubmission.motivation) && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Message / Motivation</p>
                    <p className="text-gray-700">{selectedSubmission.message || selectedSubmission.motivation}</p>
                  </div>
                )}

                {/* Documents */}
                {(selectedSubmission.id_document_url || selectedSubmission.cv_url || selectedSubmission.proof_of_payment_url) && (
                  <div>
                    <p className="text-sm font-medium mb-3">Attached Documents</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubmission.id_document_url && (
                        <a href={selectedSubmission.id_document_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            ID Document
                          </Button>
                        </a>
                      )}
                      {selectedSubmission.cv_url && (
                        <a href={selectedSubmission.cv_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            CV
                          </Button>
                        </a>
                      )}
                      {selectedSubmission.proof_of_payment_url && (
                        <a href={selectedSubmission.proof_of_payment_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Proof of Payment
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                <div>
                  <p className="text-sm font-medium mb-2">Admin Notes</p>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this submission..."
                    rows={4}
                    className="mb-2"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleSaveNotes(selectedSubmission)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Notes
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Chatbot Management Tab */}
      <TabsContent value="chatbot">
        <ChatConversations />
      </TabsContent>

      {/* Content Management Tab */}
      <TabsContent value="content">
        <ContentManagement />
      </TabsContent>

      {/* Communication Center Tab */}
      <TabsContent value="communication">
        <CommunicationCenter />
      </TabsContent>

      {/* Donations Tab */}
      <TabsContent value="donations">
        <DonationManagement />
      </TabsContent>

      {/* User Management Tab */}
      <TabsContent value="users">
        <UserManagement />
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics">
        <AnalyticsDashboard />
      </TabsContent>

      {/* Security & Compliance Tab */}
      <TabsContent value="security">
        <SecurityCompliance />
      </TabsContent>
    </Tabs>
  </div>
</div>
);
}