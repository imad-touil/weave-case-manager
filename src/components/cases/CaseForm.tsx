
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Case } from "@/types";

interface CaseFormProps {
  initialData?: Case;
  onSubmit: (data: Partial<Case>) => void;
  onCancel: () => void;
  isNew?: boolean;
}

const CaseForm: React.FC<CaseFormProps> = ({ initialData, onSubmit, onCancel, isNew = true }) => {
  const [formData, setFormData] = React.useState<Partial<Case>>(
    initialData || {
      title: "",
      clientName: "",
      status: "active",
      priority: "medium",
      description: "",
      caseType: "Legal",
      assignedTo: "User 1"
    }
  );

  const handleChange = (field: keyof Case, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isNew ? "Create New Case" : "Edit Case"}</CardTitle>
        <CardDescription>
          {isNew 
            ? "Enter the details for the new case." 
            : "Update the case information below."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Case Title</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => handleChange("title", e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input 
                id="clientName" 
                value={formData.clientName} 
                onChange={(e) => handleChange("clientName", e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="caseType">Case Type</Label>
              <Select 
                value={formData.caseType} 
                onValueChange={(value) => handleChange("caseType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleChange("status", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => handleChange("priority", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select 
                value={formData.assignedTo} 
                onValueChange={(value) => handleChange("assignedTo", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User 1">User 1</SelectItem>
                  <SelectItem value="User 2">User 2</SelectItem>
                  <SelectItem value="User 3">User 3</SelectItem>
                  <SelectItem value="User 4">User 4</SelectItem>
                  <SelectItem value="User 5">User 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => handleChange("description", e.target.value)} 
              rows={5}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{isNew ? "Create Case" : "Update Case"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CaseForm;
