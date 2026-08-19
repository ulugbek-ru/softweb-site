export interface ProjectOrderPayload {
  fullName: string;
  telegram: string;
  phone?: string;
  email: string;
  company?: string;
  projectType: string;
  selectedServices: string[];
  estimatedBudget: string;
  deadline: string;
  description: string;
  calculatorSpecs?: {
    pages?: string;
    design?: string;
    features?: string[];
  };
}

export interface QuickContactPayload {
  fullName: string;
  telegramOrEmail: string;
  phone?: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
