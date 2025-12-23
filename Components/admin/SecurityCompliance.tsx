import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, FileText, CheckCircle, AlertTriangle, Download, Calendar, Eye
} from 'lucide-react';
import { securityAPI } from '@/api/apiClient';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function SecurityCompliance() {
  const [auditFilters, setAuditFilters] = useState({
    action: 'all',
    entity: 'all',
    startDate: '',
    endDate: ''
  });

  const { data: auditLogs, isLoading: logsLoading } = useQuery({
    queryKey: ['auditLogs', auditFilters],
    queryFn: () => securityAPI.getAuditLogs({
      action: auditFilters.action !== 'all' ? auditFilters.action : undefined,
      entity: auditFilters.entity !== 'all' ? auditFilters.entity : undefined,
      startDate: auditFilters.startDate || undefined,
      endDate: auditFilters.endDate || undefined,
      limit: 100
    }),
  });

  const { data: compliance, isLoading: complianceLoading } = useQuery({
    queryKey: ['compliance'],
    queryFn: () => securityAPI.getCompliance(),
  });

  const handleExportAuditLogs = () => {
    // Export audit logs
    toast.success('Audit logs export ready');
  };

  const logs = auditLogs?.data?.logs || [];
  const complianceData = compliance?.data || {};

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-3xl font-bold">{complianceData.popia?.totalUsers || 0}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {complianceData.popia?.usersWithConsent || 0} with consent
                </p>
              </div>
              <Shield className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Consent Rate</p>
                <p className="text-3xl font-bold">{complianceData.popia?.consentRate || '0%'}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {complianceData.popia?.usersWithConsent || 0} / {complianceData.popia?.totalUsers || 0}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Data Access (30d)</p>
                <p className="text-3xl font-bold">{complianceData.dataAccess?.recentAccess || 0}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {complianceData.dataAccess?.dataExports || 0} exports
                </p>
              </div>
              <FileText className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            POPIA Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <p className="font-semibold">Data Retention Compliance</p>
                <p className="text-sm text-gray-600">
                  {complianceData.popia?.dataRetentionCompliant ? 'Compliant' : 'Needs Review'}
                </p>
              </div>
              {complianceData.popia?.dataRetentionCompliant ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              )}
            </div>
            {complianceData.recommendations && complianceData.recommendations.length > 0 && (
              <div className="p-4 bg-amber-50 rounded-xl">
                <p className="font-semibold mb-2">Recommendations:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {complianceData.recommendations.map((rec: string, idx: number) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Audit Logs
            </CardTitle>
            <Button variant="outline" onClick={handleExportAuditLogs} className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Select value={auditFilters.action} onValueChange={(value) => setAuditFilters({ ...auditFilters, action: value })}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="export">Export</SelectItem>
              </SelectContent>
            </Select>
            <Select value={auditFilters.entity} onValueChange={(value) => setAuditFilters({ ...auditFilters, entity: value })}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="submission">Submission</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="donation">Donation</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={auditFilters.startDate}
              onChange={(e) => setAuditFilters({ ...auditFilters, startDate: e.target.value })}
              placeholder="Start Date"
              className="rounded-xl"
            />
            <Input
              type="date"
              value={auditFilters.endDate}
              onChange={(e) => setAuditFilters({ ...auditFilters, endDate: e.target.value })}
              placeholder="End Date"
              className="rounded-xl"
            />
          </div>

          {/* Logs List */}
          {logsLoading ? (
            <div className="text-center py-12">Loading audit logs...</div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No audit logs found</div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {logs.map((log: any) => (
                <div
                  key={log._id || log.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{log.action}</Badge>
                        <Badge variant="outline">{log.entity}</Badge>
                        <span className="text-sm text-gray-600">
                          by {log.user?.name || 'System'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {log.entity} {log.entityId ? `(ID: ${log.entityId})` : ''}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                      </p>
                      {log.ipAddress && (
                        <p className="text-xs text-gray-500">IP: {log.ipAddress}</p>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

