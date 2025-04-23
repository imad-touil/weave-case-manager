
import React from "react";
import { Case } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseTableProps {
  cases: Case[];
  onViewCase: (caseId: string) => void;
}

const CaseTable: React.FC<CaseTableProps> = ({ cases, onViewCase }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-status-active text-white hover:bg-status-active/90';
      case 'pending':
        return 'bg-status-pending text-white hover:bg-status-pending/90';
      case 'closed':
        return 'bg-status-closed text-white hover:bg-status-closed/90';
      case 'urgent':
        return 'bg-status-urgent text-white hover:bg-status-urgent/90';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case #</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                No cases found
              </TableCell>
            </TableRow>
          ) : (
            cases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
                <TableCell>{caseItem.title}</TableCell>
                <TableCell>{caseItem.clientName}</TableCell>
                <TableCell>{caseItem.caseType}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(caseItem.status)}>
                    {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(caseItem.priority)}>
                    {caseItem.priority.charAt(0).toUpperCase() + caseItem.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{caseItem.dateUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewCase(caseItem.id)}>
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CaseTable;
