export enum RiskLevel {
  HIGH = 'High Risk',
  LOW = 'Low Risk',
  UNKNOWN = 'Unknown'
}

export interface MedicineAnalysis {
  name: string;
  composition: string;
  expiryDate: string;
  riskLevel: RiskLevel;
  riskReason: string;
  disposalRecommendation: string;
}

export interface PickupRequest {
  id: string;
  medicine: MedicineAnalysis;
  address: string;
  date: string;
  status: 'Pending' | 'Scheduled' | 'Collected';
}

export type ViewState = 'HOME' | 'SCAN' | 'DASHBOARD' | 'MAP';