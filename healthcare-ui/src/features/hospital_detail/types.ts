export interface Specialist {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: string;
  availability: string;
  imageUrl: string;
}

export interface RealTimeMetric {
  label: string;
  value: string;
  icon: string;
  status: 'good' | 'limited' | 'full';
}

export interface CenterOfExcellence {
  name: string;
  icon: string;
}

export interface HospitalDetailData {
  name: string;
  tagline: string;
  rating: number;
  reviewCount: string;
  imageUrl: string;
  badge: string;
  specialists: number;
  bedCapacity: string;
  founded: number;
  clinicalPhilosophy: string;
  centers: CenterOfExcellence[];
  realTimeMetrics: RealTimeMetric[];
  doctorsList: Specialist[];
}
