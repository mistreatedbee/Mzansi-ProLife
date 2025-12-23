import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, TrendingUp, Users, FileText, Heart, MessageSquare,
  Download, Calendar
} from 'lucide-react';
import { analyticsAPI } from '@/api/apiClient';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { toast } from 'sonner';

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('');

  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case '7days':
        return { startDate: format(subDays(now, 7), 'yyyy-MM-dd'), endDate: format(now, 'yyyy-MM-dd') };
      case '30days':
        return { startDate: format(subDays(now, 30), 'yyyy-MM-dd'), endDate: format(now, 'yyyy-MM-dd') };
      case '90days':
        return { startDate: format(subDays(now, 90), 'yyyy-MM-dd'), endDate: format(now, 'yyyy-MM-dd') };
      case 'month':
        return { startDate: format(startOfMonth(now), 'yyyy-MM-dd'), endDate: format(endOfMonth(now), 'yyyy-MM-dd') };
      default:
        return {};
    }
  };

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: () => analyticsAPI.getOverview(getDateRange()),
  });

  const handleGenerateReport = async (type: string) => {
    try {
      const report = await analyticsAPI.generateReport(type, getDateRange());
      toast.success(`Report generated: ${type}`);
      // In production, download the report
      console.log('Report:', report);
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate report');
    }
  };

  const analyticsData = analytics?.data || {};

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex items-center gap-4">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[200px] rounded-xl">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-3xl font-bold">{analyticsData.users?.total || 0}</p>
                <p className="text-xs text-green-600 mt-1">
                  +{analyticsData.users?.new || 0} new
                </p>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Submissions</p>
                <p className="text-3xl font-bold">{analyticsData.submissions?.total || 0}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {analyticsData.submissions?.completionRate || 0}% completed
                </p>
              </div>
              <FileText className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Donations</p>
                <p className="text-3xl font-bold">
                  R{analyticsData.donations?.total?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {analyticsData.donations?.count || 0} donations
                </p>
              </div>
              <Heart className="w-12 h-12 text-rose-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Chat Conversations</p>
                <p className="text-3xl font-bold">{analyticsData.chat?.totalConversations || 0}</p>
                <p className="text-xs text-amber-600 mt-1">
                  {analyticsData.chat?.escalatedConversations || 0} escalated
                </p>
              </div>
              <MessageSquare className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analyticsData.submissions?.byType?.map((item: any) => (
              <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium capitalize">{item._id?.replace(/_/g, ' ')}</span>
                <Badge variant="outline">{item.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Generate Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => handleGenerateReport('user_engagement')}
              className="h-auto flex-col py-4 rounded-xl"
            >
              <Users className="w-6 h-6 mb-2" />
              User Engagement
            </Button>
            <Button
              variant="outline"
              onClick={() => handleGenerateReport('questionnaire_completion')}
              className="h-auto flex-col py-4 rounded-xl"
            >
              <FileText className="w-6 h-6 mb-2" />
              Questionnaire Completion
            </Button>
            <Button
              variant="outline"
              onClick={() => handleGenerateReport('donation_summary')}
              className="h-auto flex-col py-4 rounded-xl"
            >
              <Heart className="w-6 h-6 mb-2" />
              Donation Summary
            </Button>
            <Button
              variant="outline"
              onClick={() => handleGenerateReport('submission_trends')}
              className="h-auto flex-col py-4 rounded-xl"
            >
              <TrendingUp className="w-6 h-6 mb-2" />
              Submission Trends
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

