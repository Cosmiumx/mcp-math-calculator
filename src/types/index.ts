/**
 * 类型定义
 */

export interface CalculateInput {
  expression: string;
  precision?: number;
}

export interface CalculateResult {
  result: string;
  expression: string;
  precision: number;
}

export interface MathError {
  code: string;
  message: string;
  expression?: string;
}

export const ErrorCodes = {
  INVALID_EXPRESSION: 'INVALID_EXPRESSION',
  TIMEOUT: 'TIMEOUT',
  OVERFLOW: 'OVERFLOW',
  DIVISION_BY_ZERO: 'DIVISION_BY_ZERO',
  FORBIDDEN_FUNCTION: 'FORBIDDEN_FUNCTION',
  SECURITY_VIOLATION: 'SECURITY_VIOLATION',
} as const;

