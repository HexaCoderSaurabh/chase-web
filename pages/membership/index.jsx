import { useState } from 'react';
import { Search, Filter, UserX, X, Edit2 } from 'lucide-react';
import { Button, Input, Badge } from "@relume_io/relume-ui";
import Switch from "@mui/material/Switch";
import { toast } from 'sonner';
import EditMembershipDialogue from '@/components/EditMembershipDialogue';
// Mock data for demonstration
const initialMembers = [
  {
    id: 1,
    name: 'John Anderson',
    phone: '+1 (555) 123-4567',
    membershipType: 'Premium',
    subscriptionStart: '2024-01-15',
    subscriptionEnd: '2025-01-15',
    amountPaid: 1200,
    ptAmountPaid: 500,
    ptAmountDue: 0,
    isActive: true,
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    phone: '+1 (555) 234-5678',
    membershipType: 'Basic',
    subscriptionStart: '2024-11-01',
    subscriptionEnd: '2024-12-01',
    amountPaid: 600,
    ptAmountPaid: 0,
    ptAmountDue: 300,
    isActive: false,
  },
  {
    id: 3,
    name: 'Michael Chen',
    phone: '+1 (555) 345-6789',
    membershipType: 'Premium',
    subscriptionStart: '2024-10-01',
    subscriptionEnd: '2025-10-01',
    amountPaid: 1200,
    ptAmountPaid: 800,
    ptAmountDue: 200,
    isActive: true,
  },
  {
    id: 4,
    name: 'Emma Davis',
    phone: '+1 (555) 456-7890',
    membershipType: 'Standard',
    subscriptionStart: '2024-08-15',
    subscriptionEnd: '2024-11-15',
    amountPaid: 800,
    ptAmountPaid: 400,
    ptAmountDue: 0,
    isActive: true,
  },
  {
    id: 5,
    name: 'David Wilson',
    phone: '+1 (555) 567-8901',
    membershipType: 'Basic',
    subscriptionStart: '2024-06-01',
    subscriptionEnd: '2024-12-01',
    amountPaid: 600,
    ptAmountPaid: 0,
    ptAmountDue: 0,
    isActive: false,
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    phone: '+1 (555) 678-9012',
    membershipType: 'Premium',
    subscriptionStart: '2024-09-01',
    subscriptionEnd: '2025-09-01',
    amountPaid: 1200,
    ptAmountPaid: 600,
    ptAmountDue: 100,
    isActive: true,
  },
];

const Membership = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showExpiredOnly, setShowExpiredOnly] = useState(false);
  const [showInactiveOnly, setShowInactiveOnly] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if subscription is expired
  const isSubscriptionExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  // Filter members based on search and filters
  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery) ||
      member.membershipType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExpiredFilter = !showExpiredOnly || isSubscriptionExpired(member.subscriptionEnd);
    const matchesInactiveFilter = !showInactiveOnly || !member.isActive;

    return matchesSearch && matchesExpiredFilter && matchesInactiveFilter;
  });

  // Open edit modal
  const handleEditMember = (member) => {
    setEditingMember({ ...member });
    setIsModalOpen(true);
  };

  // Update member information
  const handleUpdateMember = () => {
    setMembers(members.map(m => m.id === editingMember.id ? editingMember : m));
    setIsModalOpen(false);
    toast.success('Member information updated successfully!');
  };

  // Handle input change in modal
  const handleInputChange = (field, value) => {
    setEditingMember({ ...editingMember, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="members-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="page-title">Members Management</h1>
          <p className="text-gray-600">Manage your gym members, subscriptions, and payments</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                data-testid="search-input"
                type="text"
                placeholder="Search by name, phone, or membership type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center px-4">
                <span className="text-sm font-medium text-gray-700">Active</span>
                <Switch
                  checked={showInactiveOnly}
                  onChange={(e) =>
                    setShowInactiveOnly(e.target.checked)
                  }
                  data-testid="modal-active-status-switch"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#000",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                      {
                        backgroundColor: "#000",
                      },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#9ca3af", // gray when off
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(showExpiredOnly || showInactiveOnly || searchQuery) && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSearchQuery('')}
                  />
                </Badge>
              )}
              {showExpiredOnly && (
                <Badge variant="secondary" className="gap-1">
                  Expired Subscriptions
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setShowExpiredOnly(false)}
                  />
                </Badge>
              )}
              {showInactiveOnly && (
                <Badge variant="secondary" className="gap-1">
                  Inactive Members
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setShowInactiveOnly(false)}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Members Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredMembers.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{members.length}</span> members
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="members-grid">
          {filteredMembers.map((member) => {
            const isExpired = isSubscriptionExpired(member.subscriptionEnd);
            const totalDue = member.ptAmountDue;

            return (
              <div
                key={member.id}
                data-testid={`member-card-${member.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1" data-testid={`member-name-${member.id}`}>
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600" data-testid={`member-phone-${member.id}`}>{member.phone}</p>
                  </div>
                  <Button
                    data-testid={`edit-member-btn-${member.id}`}
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEditMember(member)}
                    className="h-8 w-8"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Status Badges */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Badge
                    variant={member.isActive ? 'default' : 'secondary'}
                    data-testid={`member-status-${member.id}`}
                  >
                    {member.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge
                    variant={isExpired ? 'destructive' : 'outline'}
                    data-testid={`member-subscription-status-${member.id}`}
                  >
                    {isExpired ? 'Expired' : 'Valid'}
                  </Badge>
                  <Badge variant="outline" data-testid={`member-type-${member.id}`}>{member.membershipType}</Badge>
                </div>

                {/* Member Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Subscription Period</p>
                    <p className="text-sm text-gray-900">
                      {new Date(member.subscriptionStart).toISOString().slice(0, 10)} -{' '}
                      {new Date(member.subscriptionEnd).toISOString().slice(0, 10)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Subscription Paid</p>
                      <p className="text-sm font-semibold text-gray-900">${member.amountPaid}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">PT Paid</p>
                      <p className="text-sm font-semibold text-gray-900">${member.ptAmountPaid}</p>
                    </div>
                  </div>

                  {totalDue > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Total Due</p>
                      <p className="text-lg font-bold text-red-600" data-testid={`member-due-${member.id}`}>${totalDue}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center" data-testid="no-members-found">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Edit Member Modal */}
      <EditMembershipDialogue open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Membership;