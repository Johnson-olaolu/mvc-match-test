export interface IProject {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
}

export interface IGateway {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
}

export interface IReport {
  amount: number;
  created: string;
  gatewayId: string;
  modified: string;
  paymentId: string;
  projectId: string;
  userIds: string[];
}
