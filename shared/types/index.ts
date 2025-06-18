// Common types shared across all services

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialData {
  id: string;
  userId: string;
  symbol: string;
  price: number;
  volume: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface FinancialAnalysis {
  symbol: string;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  analysis: string;
  factors: string[];
  timestamp: Date;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  timestamp: Date;
}

// Environment configuration
export interface Config {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  redisUrl: string;
  jwtSecret: string;
  allowedOrigins: string[];
  allowedHosts: string[];
}

// Error types
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(401, message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Access denied') {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
} 