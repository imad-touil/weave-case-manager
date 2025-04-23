
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockCases, mockStats, statusCounts } from "@/data/mockData";
import { Activity, Calendar, FileText, ListChecks, Users } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import CaseStatusChart from "@/components/dashboard/CaseStatusChart";
import SearchInput from "@/components/ui/SearchInput";
import CaseFilters from "@/components/cases/CaseFilters";
import CaseTable from "@/components/cases/CaseTable";
import CaseForm from "@/components/cases/CaseForm";
import { Case } from "@/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showCaseForm, setShowCaseForm] = useState(false);

  // Filter cases based on search query and filter selections
  const filteredCases = mockCases.filter((caseItem) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;

    // Apply type filter
    const matchesType = typeFilter === "all" || caseItem.caseType === typeFilter;

    // Apply priority filter
    const matchesPriority = priorityFilter === "all" || caseItem.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const handleCreateCase = (caseData: Partial<Case>) => {
    // In a real app, you would submit this to an API
    console.log("Creating new case:", caseData);
    toast.success("Case created successfully!");
    setShowCaseForm(false);
  };

  const handleViewCase = (caseId: string) => {
    const selectedCase = mockCases.find(c => c.id === caseId);
    console.log("Viewing case:", selectedCase);
    // In a real app, you would navigate to the case detail page
    toast.info(`Viewing case ${caseId}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your case management system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Cases"
            value={mockStats.totalCases}
            icon={<FileText className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
            description="from last month"
          />
          <StatsCard
            title="Active Cases"
            value={mockStats.activeCases}
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
            description="from last month"
          />
          <StatsCard
            title="Cases Closed This Month"
            value={mockStats.closedThisMonth}
            icon={<ListChecks className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
            description="from last month"
          />
          <StatsCard
            title="Urgent Cases"
            value={mockStats.urgentCases}
            icon={<Calendar className="h-4 w-4" />}
            trend={{ value: 2, isPositive: false }}
            description="from last month"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <CaseStatusChart data={statusCounts} />
          <div className="bg-white rounded-md border p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New case assigned to User {i + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Date.now() - i * 3600000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Cases</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchInput
                placeholder="Search cases..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full sm:w-80"
              />
              <CaseFilters
                onStatusChange={setStatusFilter}
                onTypeChange={setTypeFilter}
                onPriorityChange={setPriorityFilter}
                onNewCase={() => setShowCaseForm(true)}
              />
            </div>
            <CaseTable cases={filteredCases.slice(0, 5)} onViewCase={handleViewCase} />
          </div>
        </div>
      </div>

      {/* Create Case Dialog */}
      <Dialog open={showCaseForm} onOpenChange={setShowCaseForm}>
        <DialogContent className="sm:max-w-[800px]">
          <CaseForm 
            onSubmit={handleCreateCase}
            onCancel={() => setShowCaseForm(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Index;
