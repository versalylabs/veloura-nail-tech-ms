export type NailCategory = 
  | 'All'
  | 'Chrome'
  | 'French'
  | 'Floral'
  | 'Luxury'
  | 'Minimal'
  | 'Custom Art'
  | 'Acrylic'
  | 'Gel';

export type NailShape = 'Almond' | 'Coffin' | 'Square' | 'Squoval' | 'Stiletto' | 'Oval';
export type NailLength = 'Short' | 'Medium' | 'Long' | 'Extra Long';

export interface NailDesign {
  id: string;
  title: string;
  category: Exclude<NailCategory, 'All'>;
  priceKES: number;
  durationMinutes: number;
  photos: string[];
  description: string;
  tags: string[];
  isFeatured: boolean;
  isAvailableForBooking: boolean;
  shapeRecommendation?: NailShape;
  lengthRecommendation?: NailLength;
  viewCount?: number;
  bookingCount?: number;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Manicure' | 'Extensions' | 'Nail Art' | 'Pedicure' | 'Care & Removal';
  startingPriceKES: number;
  durationMinutes: number;
  description: string;
  includes: string[];
  isPopular?: boolean;
}

export interface Appointment {
  id: string;
  bookingCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientInstagram?: string;
  serviceId: string;
  serviceName: string;
  designId?: string;
  designName?: string;
  designPhoto?: string;
  shape: NailShape;
  length: NailLength;
  date: string; // YYYY-MM-DD
  timeSlot: string; // "10:00 AM"
  technicianId: string;
  technicianName: string;
  totalPriceKES: number;
  depositPaidKES: number;
  remainingBalanceKES: number;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'pending_deposit';
  paymentStatus: 'deposit_paid' | 'fully_paid' | 'unpaid';
  specialNotes?: string;
  clientPhotosBefore?: string[];
  clientPhotosAfter?: string[];
  createdAt: string;
}

export interface ClientVisitRecord {
  id: string;
  appointmentId: string;
  date: string;
  serviceName: string;
  designTitle: string;
  shape: NailShape;
  length: NailLength;
  colorUsed?: string;
  technicianName: string;
  priceKES: number;
  notes?: string;
  photos?: string[];
}

export interface ClientProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  instagram?: string;
  avatarUrl?: string;
  visitCount: number;
  totalSpendKES: number;
  loyaltyPoints: number;
  preferredTechnician: string;
  preferredShape: NailShape;
  preferredLength: NailLength;
  allergies?: string;
  notes: string;
  firstVisitDate: string;
  lastVisitDate: string;
  history: ClientVisitRecord[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Gel Polishes' | 'Acrylic Powders' | 'Tips & Forms' | 'Chrome & Glitters' | 'Tools & Hygiene' | 'Builder Gels';
  brand: string;
  stockQuantity: number;
  unit: string;
  minThreshold: number;
  costPerUnitKES: number;
  lastRestockedDate: string;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  pointsCost: number;
  description: string;
  valueDescription: string;
}

export interface Technician {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialties: string[];
  active: boolean;
  commissionRate: number; // e.g. 40%
}

export interface BeforeAfterPortfolioItem {
  id: string;
  clientName: string;
  title: string;
  serviceName: string;
  beforePhoto: string;
  afterPhoto: string;
  shape: NailShape;
  length: NailLength;
  transformationNotes: string;
  featuredInPublicGallery: boolean;
  date: string;
}

export interface ReminderItem {
  id: string;
  appointmentId: string;
  clientName: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  type: '24h_reminder' | '2h_alert' | '3week_infill' | 'aftercare_followup';
  status: 'pending' | 'sent';
  scheduledTime: string;
  messagePreview: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number; // 1 to 5
  text: string;
  set: string;
  date: string;
}

export interface StudioSettings {
  businessName: string;
  tagline: string;
  leadArtist: string;
  currency: string;
  depositPercentage: number;
  cancellationHours: number;
  gracePeriodMinutes: number;
  mpesaTillNumber: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  instagram: string;
  openTime: string;
  closeTime: string;
  multiStaffMode: boolean;
  aftercareAdvice: string;
}
