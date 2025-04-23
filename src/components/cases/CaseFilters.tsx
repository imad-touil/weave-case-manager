
import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CaseFiltersProps {
  onStatusChange: (status: string) => void;
  onTypeChange: (type: string) => void;
  onPriorityChange: (priority: string) => void;
  onNewCase: () => void;
}

const CaseFilters: React.FC<CaseFiltersProps> = ({
  onStatusChange,
  onTypeChange,
  onPriorityChange,
  onNewCase
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Case Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Insurance">Insurance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={onPriorityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <Button className="w-full sm:w-auto" onClick={onNewCase}>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Case
      </Button>
    </div>
  );
};

export default CaseFilters;
