import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Heart, Search, Eye, CheckCircle, Clock, Download, Calendar, Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { adminAPI } from '@/api/apiClient';
import { format } from 'date-fns';
import { exportToCSV, exportToExcel, exportToPDF, formatSubmissionsForExport } from '@/utils/export';

export default function DonationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [verifiedFilter, setVerifiedFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['donations', searchTerm, projectFilter, verifiedFilter, dateRange, startDate, endDate],
    queryFn: () => adminAPI.getDonations({
      search: searchTerm || undefined,
      project: projectFilter !== 'all' ? projectFilter : undefined,
      verified: verifiedFilter !== 'all' ? verifiedFilter : undefined,
      startDate: dateRange === 'custom' && startDate ? startDate : undefined,
      endDate: dateRange === 'custom' && endDate ? endDate : undefined,
      limit: 100
    }),
  });

  const verifyMutation = useMutation({
    mutationFn: (id: string) => adminAPI.verifyDonation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      toast.success('Donation verified successfully');
      setSelectedDonation(null);
    },
  });

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    const donations = data?.data?.donations || [];
    const exportData = formatSubmissionsForExport(donations);
    const filename = `donations_${format(new Date(), 'yyyy-MM-dd')}`;
    
    if (format === 'csv') {
      exportToCSV(exportData, filename);
    } else if (format === 'excel') {
      exportToExcel(exportData, filename);
    } else if (format === 'pdf') {
      exportToPDF(exportData, filename, 'Donations Report');
    }
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  const donations = data?.data?.donations || [];
  const totals = data?.totals || { totalAmount: 0, count: 0, average: 0 };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Donations</p>
                <p className="text-3xl font-bold">R{totals.totalAmount?.toLocaleString() || 0}</p>
              </div>
              <Heart className="w-12 h-12 text-rose-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Count</p>
                <p className="text-3xl font-bold">{totals.count || 0}</p>
              </div>
              <Heart className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Donation</p>
                <p className="text-3xl font-bold">R{Math.round(totals.average || 0).toLocaleString()}</p>
              </div>
              <Heart className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search donations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] rounded-xl"
        />
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-[180px] rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="Social Life Change Ambassadors">Social Life Change Ambassadors</SelectItem>
            <SelectItem value="Sizanani Community Help Centres">Sizanani Community Help Centres</SelectItem>
            <SelectItem value="Community Outreach & Healing">Community Outreach & Healing</SelectItem>
            <SelectItem value="Entrepreneurship & Business Development">Entrepreneurship & Business Development</SelectItem>
            <SelectItem value="Skills Development & Industrialisation">Skills Development & Industrialisation</SelectItem>
            <SelectItem value="Farming, Agriculture & Sports Development">Farming, Agriculture & Sports Development</SelectItem>
          </SelectContent>
        </Select>
        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
          <SelectTrigger className="w-[160px] rounded-xl">
            <SelectValue placeholder="Verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Verified</SelectItem>
            <SelectItem value="false">Unverified</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px] rounded-xl">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this_week">This Week</SelectItem>
            <SelectItem value="this_month">This Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        {dateRange === 'custom' && (
          <>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-xl"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-xl"
            />
          </>
        )}
        <Button onClick={() => handleExport('csv')} variant="outline" className="rounded-xl">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Donations List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Donations ({data?.total || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">Loading donations...</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No donations found</div>
          ) : (
            <div className="space-y-3">
              {donations.map((donation: any) => (
                <div
                  key={donation._id || donation.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          R{donation.donation_amount?.toLocaleString() || 0}
                        </h3>
                        <Badge variant="outline">{donation.donation_type || 'Once-off'}</Badge>
                        {donation.proof_of_payment_url ? (
                          <Badge className="bg-green-500">Verified</Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-600">Pending</Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Donor:</strong> {donation.full_name || donation.email || 'Anonymous'}</p>
                        {donation.project_allocation && (
                          <p><strong>Project:</strong> {donation.project_allocation}</p>
                        )}
                        <p><strong>Reference:</strong> {donation.reference_number}</p>
                        <p><strong>Date:</strong> {format(new Date(donation.created_date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDonation(donation)}
                        className="rounded-xl"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      {!donation.proof_of_payment_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => verifyMutation.mutate(donation._id || donation.id)}
                          className="text-green-600 rounded-xl"
                          disabled={verifyMutation.isPending}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Verify
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Donation Detail Modal */}
      <Dialog open={!!selectedDonation} onOpenChange={() => setSelectedDonation(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
          </DialogHeader>
          {selectedDonation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    R{selectedDonation.donation_amount?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge variant={selectedDonation.status === 'completed' ? 'default' : 'outline'}>
                    {selectedDonation.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Donor Name</p>
                  <p className="font-semibold">{selectedDonation.full_name || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{selectedDonation.email || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{selectedDonation.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Donation Type</p>
                  <p className="font-semibold">{selectedDonation.donation_type || 'Once-off'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Project Allocation</p>
                  <p className="font-semibold">{selectedDonation.project_allocation || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reference Number</p>
                  <p className="font-mono font-semibold">{selectedDonation.reference_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">
                    {format(new Date(selectedDonation.created_date), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>
              {selectedDonation.proof_of_payment_url && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Proof of Payment</p>
                  <a
                    href={selectedDonation.proof_of_payment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    View Proof of Payment
                  </a>
                </div>
              )}
              {!selectedDonation.proof_of_payment_url && (
                <Button
                  onClick={() => verifyMutation.mutate(selectedDonation._id || selectedDonation.id)}
                  className="w-full bg-green-600 hover:bg-green-700 rounded-xl"
                  disabled={verifyMutation.isPending}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify Payment
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

