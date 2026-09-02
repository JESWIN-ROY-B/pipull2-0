export type Role = 'customer' | 'worker'

export type LanguageCode = 'en' | 'hi' | 'ta' | 'bn' | 'mr'

export const LANGUAGES: { code: LanguageCode; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
]

export type VerificationBadge =
  | 'kyc'
  | 'police'
  | 'skill'
  | 'endorsed'

export const BADGE_META: Record<
  VerificationBadge,
  { label: string; tip: string }
> = {
  kyc: {
    label: 'Aadhaar KYC',
    tip: 'Aadhaar-linked KYC verified via DigiLocker. Identity confirmed by Government of India records.',
  },
  police: {
    label: 'Police Cleared',
    tip: 'Police background verification cleared. No pending criminal records.',
  },
  skill: {
    label: 'Skill Certified',
    tip: 'Trade skill assessed and certified by a Pipull cooperative training partner.',
  },
  endorsed: {
    label: 'RWA Endorsed',
    tip: 'Endorsed by a local Resident Welfare Association or campus cooperative committee.',
  },
}

export type WorkerProfile = {
  id: string
  name: string
  role: string
  category: string
  rating: number
  jobs: number
  rate: number
  rateUnit: string
  distanceKm: number
  availability: string
  available: boolean
  match: number
  badges: VerificationBadge[]
  initials: string
  hue: number
}

export type Category = {
  id: string
  name: string
  blurb: string
}

export const CATEGORIES: Category[] = [
  { id: 'home', name: 'Household Maintenance & Repairs', blurb: 'Electrical, plumbing, carpentry, appliances, paint' },
  { id: 'care', name: 'Domestic Help & Caregiving', blurb: 'Housekeeping, cooking, caregiving, childcare' },
  { id: 'community', name: 'Community & RWA Services', blurb: 'Security, gardening, waste, event help' },
  { id: 'wellness', name: 'Beauty, Wellness & Specialized', blurb: 'Salon, therapy, tailoring, ceremonies' },
  { id: 'logistics', name: 'Logistics & Micro-Errands', blurb: 'Runners, drivers, micro-movers' },
]

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export const WORKERS: WorkerProfile[] = [
  // Household Maintenance & Repairs
  { id: 'w1', name: 'Rajesh Kumar', role: 'Electrician (wiring, fixtures, faults)', category: 'home', rating: 4.8, jobs: 120, rate: 250, rateUnit: '/hr', distanceKm: 1.2, availability: 'Available Today', available: true, match: 96, badges: ['kyc', 'police', 'skill', 'endorsed'], initials: initials('Rajesh Kumar'), hue: 174 },
  { id: 'w2', name: 'Dinesh Patel', role: 'Plumber (leakages, pipes, blockages)', category: 'home', rating: 4.6, jobs: 85, rate: 200, rateUnit: '/hr', distanceKm: 2.4, availability: 'On gig till 4 PM', available: false, match: 88, badges: ['kyc', 'skill', 'endorsed'], initials: initials('Dinesh Patel'), hue: 200 },
  { id: 'w3', name: 'Abdul Rahman', role: 'Carpenter (furniture, doors, woodwork)', category: 'home', rating: 4.9, jobs: 200, rate: 300, rateUnit: '/hr', distanceKm: 3.1, availability: 'Available Today', available: true, match: 92, badges: ['kyc', 'police', 'skill'], initials: initials('Abdul Rahman'), hue: 28 },
  { id: 'w4', name: 'Suresh Sharma', role: 'Appliance Technician (AC, fridge, RO)', category: 'home', rating: 4.7, jobs: 150, rate: 350, rateUnit: '/hr', distanceKm: 1.8, availability: 'Available from 2 PM', available: true, match: 90, badges: ['kyc', 'police', 'skill', 'endorsed'], initials: initials('Suresh Sharma'), hue: 260 },
  { id: 'w5', name: 'Manoj Verma', role: 'Painter (touch-ups, whitewashing)', category: 'home', rating: 4.5, jobs: 60, rate: 400, rateUnit: '/day', distanceKm: 4.6, availability: 'Available Tomorrow', available: false, match: 74, badges: ['kyc', 'skill'], initials: initials('Manoj Verma'), hue: 340 },

  // Domestic Help & Caregiving
  { id: 'w6', name: 'Sunita Devi', role: 'Housekeeper / Maid (sweeping, deep cleaning)', category: 'care', rating: 4.9, jobs: 300, rate: 150, rateUnit: '/hr', distanceKm: 0.9, availability: 'Available Today', available: true, match: 94, badges: ['kyc', 'police', 'endorsed'], initials: initials('Sunita Devi'), hue: 150 },
  { id: 'w7', name: 'Priya Iyer', role: 'Cook / Home Chef (daily meals, catering)', category: 'care', rating: 4.8, jobs: 180, rate: 250, rateUnit: '/hr', distanceKm: 2.0, availability: 'Available Today', available: true, match: 91, badges: ['kyc', 'skill', 'endorsed'], initials: initials('Priya Iyer'), hue: 12 },
  { id: 'w8', name: 'Lakshmi Narayanan', role: 'Caregiver / Nursing Aide (elderly, post-op)', category: 'care', rating: 4.9, jobs: 90, rate: 500, rateUnit: '/shift', distanceKm: 3.5, availability: 'On gig till 6 PM', available: false, match: 89, badges: ['kyc', 'police', 'skill', 'endorsed'], initials: initials('Lakshmi Narayanan'), hue: 190 },
  { id: 'w9', name: 'Anjali Desai', role: 'Babysitter / Nanny (hourly, emergency)', category: 'care', rating: 4.7, jobs: 110, rate: 200, rateUnit: '/hr', distanceKm: 1.5, availability: 'Available Today', available: true, match: 87, badges: ['kyc', 'police'], initials: initials('Anjali Desai'), hue: 300 },

  // Community & RWA Services
  { id: 'w10', name: 'Vikram Singh', role: 'Security Personnel (events, proxy shifts)', category: 'community', rating: 4.8, jobs: 250, rate: 600, rateUnit: '/shift', distanceKm: 2.7, availability: 'Available Tonight', available: true, match: 90, badges: ['kyc', 'police', 'skill', 'endorsed'], initials: initials('Vikram Singh'), hue: 220 },
  { id: 'w11', name: 'Ramu Kaka', role: 'Gardener / Landscaper (lawns, parks)', category: 'community', rating: 4.6, jobs: 140, rate: 150, rateUnit: '/hr', distanceKm: 1.1, availability: 'Available Today', available: true, match: 83, badges: ['kyc', 'endorsed'], initials: initials('Ramu Kaka'), hue: 130 },
  { id: 'w12', name: 'Ashok Kumar', role: 'Waste Management Worker (segregation, scrap)', category: 'community', rating: 4.7, jobs: 400, rate: 100, rateUnit: '/pickup', distanceKm: 0.7, availability: 'Available Today', available: true, match: 80, badges: ['kyc', 'endorsed'], initials: initials('Ashok Kumar'), hue: 90 },
  { id: 'w13', name: 'Ravi Teja', role: 'Event Helper (waitstaff, cleanup)', category: 'community', rating: 4.5, jobs: 75, rate: 300, rateUnit: '/event', distanceKm: 5.2, availability: 'Available Weekend', available: false, match: 72, badges: ['kyc', 'skill'], initials: initials('Ravi Teja'), hue: 46 },

  // Beauty, Wellness & Specialized
  { id: 'w14', name: 'Neha Sharma', role: 'At-Home Salon Expert (hair, makeup, mehndi)', category: 'wellness', rating: 4.9, jobs: 210, rate: 500, rateUnit: '/service', distanceKm: 2.2, availability: 'Available Today', available: true, match: 93, badges: ['kyc', 'skill', 'endorsed'], initials: initials('Neha Sharma'), hue: 320 },
  { id: 'w15', name: 'Meera Reddy', role: 'Wellness Therapist (massage, physio, yoga)', category: 'wellness', rating: 4.8, jobs: 130, rate: 600, rateUnit: '/hr', distanceKm: 3.8, availability: 'Available from 5 PM', available: true, match: 85, badges: ['kyc', 'police', 'skill'], initials: initials('Meera Reddy'), hue: 168 },
  { id: 'w16', name: 'Fatima Bibi', role: 'Tailor & Alteration Expert (doorstep repair)', category: 'wellness', rating: 4.7, jobs: 95, rate: 150, rateUnit: '/item', distanceKm: 1.3, availability: 'Available Today', available: true, match: 82, badges: ['kyc', 'skill'], initials: initials('Fatima Bibi'), hue: 280 },
  { id: 'w17', name: 'Pandit Vidyadhar Shastri', role: 'Pandit / Priest (pujas, ceremonies)', category: 'wellness', rating: 5.0, jobs: 500, rate: 1100, rateUnit: '/puja', distanceKm: 4.0, availability: 'Booking 2 days ahead', available: false, match: 79, badges: ['kyc', 'endorsed'], initials: initials('Pandit Vidyadhar'), hue: 40 },

  // Logistics & Micro-Errands
  { id: 'w18', name: 'Rohan Gupta', role: 'Hyperlocal Runner (groceries, medicines)', category: 'logistics', rating: 4.8, jobs: 320, rate: 50, rateUnit: '/run', distanceKm: 0.5, availability: 'Available Now', available: true, match: 95, badges: ['kyc', 'police'], initials: initials('Rohan Gupta'), hue: 210 },
  { id: 'w19', name: 'Tariq Khan', role: 'Driver (outstation, daily commute)', category: 'logistics', rating: 4.7, jobs: 280, rate: 400, rateUnit: '/trip', distanceKm: 2.9, availability: 'Available Today', available: true, match: 86, badges: ['kyc', 'police', 'skill'], initials: initials('Tariq Khan'), hue: 236 },
  { id: 'w20', name: 'Sandeep Balaji', role: 'Packers & Movers Micro (shifting rooms/appliances)', category: 'logistics', rating: 4.6, jobs: 115, rate: 800, rateUnit: '/move', distanceKm: 3.3, availability: 'Available Tomorrow', available: false, match: 70, badges: ['kyc', 'skill'], initials: initials('Sandeep Balaji'), hue: 20 },
]

export function formatINR(amount: number) {
  return '₹' + amount.toLocaleString('en-IN')
}

// The signed-in worker persona used for the Worker Dashboard
export const CURRENT_WORKER = WORKERS[0] // Rajesh Kumar
