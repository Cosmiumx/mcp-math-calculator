/**
 * 输入验证和安全检查
 */

import { ErrorCodes } from '../types/index.js';

// 黑名单：禁止的模式
const FORBIDDEN_PATTERNS = [
  /import\s/i,
  /require\s*\(/i,
  /eval\s*\(/i,
  /function\s*\(/i,
  /=>/,
  /\bthis\b/,
  /\bwindow\b/,
  /\bprocess\b/,
  /\bglobal\b/,
  /__proto__/,
  /constructor/i,
  /prototype/i,
];

// 允许的函数白名单
const ALLOWED_FUNCTIONS = [
  // 基础运算
  'add', 'subtract', 'multiply', 'divide', 'mod',
  // 幂运算
  'pow', 'sqrt', 'cbrt', 'square', 'cube',
  // 三角函数
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2',
  'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
  // 对数和指数
  'log', 'log10', 'log2', 'exp',
  // 取整和绝对值
  'abs', 'round', 'floor', 'ceil', 'fix', 'sign',
  // 最大最小值
  'max', 'min',
  // 数学常数
  'pi', 'e', 'tau', 'phi',
  // 其他
  'gcd', 'lcm', 'factorial', 'combinations', 'permutations',
];

/**
 * 验证表达式是否安全
 */
export function validateExpression(expression: string): { valid: boolean; error?: string } {
  // 检查是否为空
  if (!expression || typeof expression !== 'string') {
    return {
      valid: false,
      error: '表达式不能为空',
    };
  }

  // 检查长度
  if (expression.length > 1000) {
    return {
      valid: false,
      error: '表达式过长（最大1000字符）',
    };
  }

  // 检查黑名单模式
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(expression)) {
      return {
        valid: false,
        error: `表达式包含禁止的模式: ${pattern}`,
      };
    }
  }

  return { valid: true };
}

/**
 * 验证精度参数
 */
export function validatePrecision(precision?: number): number {
  if (precision === undefined || precision === null) {
    return 15; // 默认精度
  }

  if (typeof precision !== 'number' || !Number.isInteger(precision)) {
    return 15;
  }

  // 限制精度范围 1-64
  return Math.max(1, Math.min(64, precision));
}

export { ALLOWED_FUNCTIONS };

