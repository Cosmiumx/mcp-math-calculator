/**
 * 数学计算引擎 - 使用 mathjs 进行安全的高精度计算
 */

import { create, all, MathJsStatic, ConfigOptions } from 'mathjs';
import { validateExpression, validatePrecision } from './validator.js';
import { CalculateResult, ErrorCodes } from '../types/index.js';

// 创建独立的 math 实例，配置为高精度模式
const config: ConfigOptions = {
  number: 'BigNumber',  // 使用 BigNumber 替代原生 number
  precision: 64,        // 64位精度
};

const math: MathJsStatic = create(all, config);

/**
 * 计算数学表达式
 */
export async function calculate(
  expression: string,
  precision?: number
): Promise<CalculateResult> {
  // 验证表达式
  const validation = validateExpression(expression);
  if (!validation.valid) {
    throw new Error(`${ErrorCodes.INVALID_EXPRESSION}: ${validation.error}`);
  }

  // 验证精度
  const validPrecision = validatePrecision(precision);

  try {
    // 设置超时保护（5秒）
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`${ErrorCodes.TIMEOUT}: 计算超时（5秒）`));
      }, 5000);
    });

    // 执行计算
    const calculationPromise = Promise.resolve().then(() => {
      // 使用 mathjs 的 evaluate 方法（安全，不使用 eval）
      const result = math.evaluate(expression);

      // 格式化结果
      let formattedResult: string;

      if (typeof result === 'object' && result !== null && 'toString' in result) {
        // BigNumber 或其他 mathjs 类型
        formattedResult = result.toString();
      } else if (typeof result === 'number') {
        // 检查 Infinity 和 NaN
        if (!isFinite(result)) {
          if (result === Infinity || result === -Infinity) {
            throw new Error(`${ErrorCodes.DIVISION_BY_ZERO}: 除零错误或结果溢出`);
          }
          throw new Error(`${ErrorCodes.INVALID_EXPRESSION}: 结果为 NaN`);
        }
        formattedResult = result.toString();
      } else if (typeof result === 'boolean') {
        formattedResult = result.toString();
      } else {
        formattedResult = String(result);
      }

      // 检查字符串结果是否为 Infinity
      if (formattedResult === 'Infinity' || formattedResult === '-Infinity') {
        throw new Error(`${ErrorCodes.DIVISION_BY_ZERO}: 除零错误或结果溢出`);
      }

      // 检查结果大小
      if (formattedResult.length > 10000) {
        throw new Error(`${ErrorCodes.OVERFLOW}: 计算结果过大`);
      }

      return formattedResult;
    });

    // 竞速：计算 vs 超时
    const result = await Promise.race([calculationPromise, timeoutPromise]);

    return {
      result,
      expression,
      precision: validPrecision,
    };
  } catch (error: any) {
    // 处理特定错误
    if (error.message && error.message.includes('division by zero')) {
      throw new Error(`${ErrorCodes.DIVISION_BY_ZERO}: 除零错误`);
    }

    // 重新抛出已知错误
    if (error.message && error.message.startsWith(ErrorCodes.TIMEOUT)) {
      throw error;
    }

    if (error.message && error.message.startsWith(ErrorCodes.OVERFLOW)) {
      throw error;
    }

    // 其他错误
    throw new Error(`${ErrorCodes.INVALID_EXPRESSION}: ${error.message || '计算错误'}`);
  }
}

/**
 * 测试数学引擎是否正常工作
 */
export function testMathEngine(): boolean {
  try {
    const result = math.evaluate('2 + 2');
    return result.toString() === '4';
  } catch {
    return false;
  }
}

