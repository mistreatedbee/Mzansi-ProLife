import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, Mail, Phone, MapPin, Calendar, Edit, LogOut, FileText, 
  Heart, Settings, Shield, ClipboardList, Download, Eye, Clock, CheckCircle, Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import SEO from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function ProfileContent() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  // Fetch user submissions
  const { data: submissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ['userSubmissions', user?.email],
    queryFn: async () => {
      const allSubmissions = await base44.entities.Submission.list();
      // Filter by user email (in production, use proper user ID)
      return allSubmissions.filter((s: any) => s.email === user?.email);
    },
    enabled: !!user?.email,
  });

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSave = () => {
    updateUser({ name: userData.name, phone: userData.phone });
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  if (!user) return null;

  return (
    <>
      <SEO
        title="My Profile - Mzansi Prolife Development Institute NPC"
        description="Manage your Mzansi Prolife account, track submissions, and update your profile information."
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your account and track your submissions</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white rounded-xl p-1 shadow-sm">
            <TabsTrigger value="overview" className="rounded-lg px-6">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="submissions" className="rounded-lg px-6">
              <FileText className="w-4 h-4 mr-2" />
              My Submissions
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg px-6">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Personal Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="rounded-xl"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-500 text-sm">Full Name</Label>
                      {isEditing ? (
                        <Input
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          className="rounded-xl"
                        />
                      ) : (
                        <p className="text-lg font-medium text-gray-900">{user.name || 'Not set'}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500 text-sm">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <p className="text-lg text-gray-900">{user.email}</p>
                        <Badge variant="outline" className="ml-2">Verified</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500 text-sm">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <p className="text-lg text-gray-900">{user.phone || 'Not set'}</p>
                        </div>
                      )}
                    </div>
                  {isEditing && (
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 rounded-xl"
                    >
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Submissions</span>
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {submissionsLoading ? '...' : submissions?.length || 0}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Pending</span>
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {submissionsLoading ? '...' : submissions?.filter((s: any) => s.status === 'new' || s.status === 'in_progress').length || 0}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Completed</span>
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {submissionsLoading ? '...' : submissions?.filter((s: any) => s.status === 'completed').length || 0}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl">My Submissions</CardTitle>
                <CardDescription>
                  Track all your questionnaire submissions and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading submissions...</p>
                  </div>
                ) : submissions && submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission: any) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg text-gray-900">
                                {submission.submission_type?.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                              </h3>
                              <Badge
                                variant={
                                  submission.status === 'completed' ? 'default' :
                                  submission.status === 'in_progress' ? 'secondary' :
                                  submission.status === 'contacted' ? 'outline' : 'destructive'
                                }
                                className="rounded-full"
                              >
                                {submission.status?.replace(/_/g, ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Reference: <span className="font-mono font-medium">{submission.reference_number}</span>
                            </p>
                            {submission.created_date && (
                              <p className="text-xs text-gray-500">
                                Submitted: {new Date(submission.created_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">You haven't made any submissions yet.</p>
                    <Link to="/questionnaire">
                      <Button className="bg-green-600 hover:bg-green-700 rounded-xl">
                        Start Questionnaire
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Security
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Shield className="w-4 h-4 mr-2" />
                      Two-Factor Authentication
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-600" />
                    Preferences
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Phone className="w-4 h-4 mr-2" />
                      SMS Notifications
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

