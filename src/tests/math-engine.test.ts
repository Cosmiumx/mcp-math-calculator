/**
 * 数学计算引擎测试
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { calculate, testMathEngine } from '../lib/math-engine.js';
import { ErrorCodes } from '../types/index.js';

test('数学引擎基础功能测试', async () => {
  assert.strictEqual(testMathEngine(), true, '数学引擎应该正常工作');
});

test('基础算术运算', async (t) => {
  await t.test('加法', async () => {
    const result = await calculate('2 + 2');
    assert.strictEqual(result.result, '4');
  });

  await t.test('减法', async () => {
    const result = await calculate('10 - 3');
    assert.strictEqual(result.result, '7');
  });

  await t.test('乘法', async () => {
    const result = await calculate('6 * 7');
    assert.strictEqual(result.result, '42');
  });

  await t.test('除法', async () => {
    const result = await calculate('20 / 4');
    assert.strictEqual(result.result, '5');
  });
});

test('浮点数精度问题', async (t) => {
  await t.test('0.1 + 0.2 应该等于 0.3', async () => {
    const result = await calculate('0.1 + 0.2');
    assert.strictEqual(result.result, '0.3');
  });

  await t.test('0.3 - 0.2 应该等于 0.1', async () => {
    const result = await calculate('0.3 - 0.2');
    assert.strictEqual(result.result, '0.1');
  });
});

test('复杂表达式', async (t) => {
  await t.test('括号运算', async () => {
    const result = await calculate('(10 + 20) * 3');
    assert.strictEqual(result.result, '90');
  });

  await t.test('嵌套括号', async () => {
    const result = await calculate('((2 + 3) * 4) - 10');
    assert.strictEqual(result.result, '10');
  });

  await t.test('混合运算', async () => {
    const result = await calculate('2 + 3 * 4 - 5 / 5');
    assert.strictEqual(result.result, '13');
  });
});

test('科学计算函数', async (t) => {
  await t.test('平方根', async () => {
    const result = await calculate('sqrt(16)');
    assert.strictEqual(result.result, '4');
  });

  await t.test('幂运算', async () => {
    const result = await calculate('pow(2, 3)');
    assert.strictEqual(result.result, '8');
  });

  await t.test('绝对值', async () => {
    const result = await calculate('abs(-5)');
    assert.strictEqual(result.result, '5');
  });

  await t.test('对数', async () => {
    const result = await calculate('log10(100)');
    assert.strictEqual(result.result, '2');
  });
});

test('数学常数', async (t) => {
  await t.test('圆周率 pi', async () => {
    const result = await calculate('pi');
    assert.ok(result.result.startsWith('3.14159'));
  });

  await t.test('自然对数底 e', async () => {
    const result = await calculate('e');
    assert.ok(result.result.startsWith('2.71828'));
  });

  await t.test('使用常数计算', async () => {
    const result = await calculate('2 * pi');
    assert.ok(result.result.startsWith('6.28318'));
  });
});

test('大数运算', async (t) => {
  await t.test('大数乘法', async () => {
    const result = await calculate('123456789 * 987654321');
    assert.strictEqual(result.result, '121932631112635269');
  });

  await t.test('大数加法', async () => {
    const result = await calculate('999999999999999999 + 1');
    assert.strictEqual(result.result, '1000000000000000000');
  });
});

test('错误处理', async (t) => {
  await t.test('除零错误', async () => {
    await assert.rejects(
      async () => await calculate('10 / 0'),
      (error: Error) => {
        return error.message.includes(ErrorCodes.DIVISION_BY_ZERO);
      }
    );
  });

  await t.test('无效表达式', async () => {
    await assert.rejects(
      async () => await calculate('2 +'),
      (error: Error) => {
        return error.message.includes(ErrorCodes.INVALID_EXPRESSION);
      }
    );
  });

  await t.test('空表达式', async () => {
    await assert.rejects(
      async () => await calculate(''),
      (error: Error) => {
        return error.message.includes(ErrorCodes.INVALID_EXPRESSION);
      }
    );
  });
});

test('安全性测试', async (t) => {
  await t.test('拒绝 import', async () => {
    await assert.rejects(
      async () => await calculate('import("fs")'),
      (error: Error) => {
        return error.message.includes(ErrorCodes.INVALID_EXPRESSION);
      }
    );
  });

  await t.test('拒绝 require', async () => {
    await assert.rejects(
      async () => await calculate('require("fs")'),
      (error: Error) => {
        return error.message.includes(ErrorCodes.INVALID_EXPRESSION);
      }
    );
  });

  await t.test('拒绝 eval', async () => {
    await assert.rejects(
      async () => await calculate('eval("2+2")'),
      (error: Error) => {
        return error.message.includes(ErrorCodes.INVALID_EXPRESSION);
      }
    );
  });

  await t.test('拒绝 function', async () => {
    await assert.rejects(
      async () => await calculate('function() { return 2; }'),
      (error: Error) => {
        return error.message.includes(ErrorCodes.INVALID_EXPRESSION);
      }
    );
  });
});

test('精度控制', async (t) => {
  await t.test('默认精度', async () => {
    const result = await calculate('1 / 3');
    assert.ok(result.precision === 15);
  });

  await t.test('自定义精度', async () => {
    const result = await calculate('1 / 3', 10);
    assert.ok(result.precision === 10);
  });
});

