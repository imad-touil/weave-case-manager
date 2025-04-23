
import { Case, CasePriority, CaseStatus, CaseStatusCount } from "@/types";

// Generate random cases
const statuses: CaseStatus[] = ['active', 'pending', 'closed', 'urgent'];
const priorities: CasePriority[] = ['low', 'medium', 'high', 'critical'];
const caseTypes = ['Legal', 'Support', 'Financial', 'Medical', 'Insurance'];

// Generate a random date within the last 6 months
const getRandomDate = (months = 6) => {
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * months));
  date.setDate(Math.floor(Math.random() * 28) + 1);
  return date.toISOString().split('T')[0];
};

// Generate random cases
export const generateMockCases = (count: number): Case[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = `case-${i + 1}`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const dateCreated = getRandomDate();
    const dateUpdated = new Date(new Date(dateCreated).getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    return {
      id,
      title: `Case ${i + 1}`,
      clientName: `Client ${i + 1}`,
      status,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      dateCreated,
      dateUpdated,
      assignedTo: `User ${Math.floor(Math.random() * 5) + 1}`,
      description: `This is a sample description for case ${i + 1}.`,
      caseType: caseTypes[Math.floor(Math.random() * caseTypes.length)],
      caseNumber: `CN-${Math.floor(10000 + Math.random() * 90000)}`
    };
  });
};

// Mock cases
export const mockCases = generateMockCases(30);

// Status summary
export const statusCounts: CaseStatusCount[] = statuses.map(status => {
  const count = mockCases.filter(c => c.status === status).length;
  return { status, count };
});

// Mock statistics
export const mockStats = {
  totalCases: mockCases.length,
  activeCases: mockCases.filter(c => c.status === 'active').length,
  closedThisMonth: mockCases.filter(c => {
    const date = new Date(c.dateUpdated);
    const now = new Date();
    return c.status === 'closed' && 
           date.getMonth() === now.getMonth() && 
           date.getFullYear() === now.getFullYear();
  }).length,
  urgentCases: mockCases.filter(c => c.status === 'urgent').length
};
