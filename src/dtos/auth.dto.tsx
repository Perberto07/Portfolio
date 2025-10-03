// Data Transfer Object for authentication-related data

export interface LoginDto {
  name: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  //email: string;
  password: string;
}

export interface AuthResponseDto {
   token?: string;
   success: false;
   message: string;
}