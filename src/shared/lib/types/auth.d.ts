// Matches the User Schema exactly from api response for t ype.PNG
export interface IUser {
    id: string; // uuid
    username: string;
    email: string;
    phone: string | null;
    firstName: string;
    lastName: string;
    gender: "MALE" | "FEMALE" | null;
    photo: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
    createdAt: string;
    updatedAt: string;
  }
  
  // The core data returned inside a successful login payload
  interface LoginPayload {
    token: string;
    user: SwaggerUser;
  }
  
  // Highly descriptive Type-Safe Login Response alias
  export type LoginResponse = ApiResponse<LoginPayload>;