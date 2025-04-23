
export type CaseStatus = 'active' | 'pending' | 'closed' | 'urgent';

export type CasePriority = 'low' | 'medium' | 'high' | 'critical';

export interface Case {
  id: string;
  title: string;
  clientName: string;
  status: CaseStatus;
  priority: CasePriority;
  dateCreated: string;
  dateUpdated: string;
  assignedTo: string;
  description: string;
  caseType: string;
  caseNumber: string;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface CaseStatusCount {
  status: CaseStatus;
  count: number;
}
