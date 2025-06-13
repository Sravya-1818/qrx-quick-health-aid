
export interface UserData {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  lastUpdated: string;
}

// Mock database - in production this would be Firebase/Supabase
const USERS_DB: Record<string, UserData> = {
  "user123": {
    id: "user123",
    name: "Rahul Verma",
    age: 45,
    bloodGroup: "B+",
    allergies: ["Penicillin", "Shellfish"],
    medicalConditions: ["Type 2 Diabetes", "Hypertension"],
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    emergencyContact: {
      name: "Priya Verma",
      phone: "+91 98765 43210",
      relation: "Wife"
    },
    lastUpdated: "2024-12-13"
  },
  "user456": {
    id: "user456",
    name: "Mary Joseph",
    age: 62,
    bloodGroup: "O-",
    allergies: ["Sulfa drugs"],
    medicalConditions: ["Asthma", "Osteoporosis"],
    medications: ["Albuterol inhaler", "Calcium supplements"],
    emergencyContact: {
      name: "John Joseph",
      phone: "+91 98123 45678",
      relation: "Son"
    },
    lastUpdated: "2024-12-10"
  },
  "user789": {
    id: "user789",
    name: "Ravi Kumar",
    age: 38,
    bloodGroup: "A+",
    allergies: [],
    medicalConditions: ["None known"],
    medications: [],
    emergencyContact: {
      name: "Sunita Kumar",
      phone: "+91 97654 32109",
      relation: "Wife"
    },
    lastUpdated: "2024-12-11"
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return USERS_DB[userId] || null;
};

export const saveUserData = async (userData: UserData): Promise<string> => {
  // Generate unique ID if not provided
  if (!userData.id) {
    userData.id = 'user' + Math.random().toString(36).substr(2, 9);
  }
  userData.lastUpdated = new Date().toISOString().split('T')[0];
  
  // In production, this would save to Firebase/Supabase
  USERS_DB[userData.id] = userData;
  return userData.id;
};

export const generateQRCodeUrl = (userId: string): string => {
  const profileUrl = `${window.location.origin}/user/${userId}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(profileUrl)}`;
};
