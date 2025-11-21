# @cosmiumx/mcp-math-calculator

🧮 **精确数学计算的 MCP 服务器** - 为 AI 提供 100% 准确的计算能力

[English](./README.md) | 简体中文

[![npm version](https://img.shields.io/npm/v/@cosmiumx/mcp-math-calculator)](https://www.npmjs.com/package/@cosmiumx/mcp-math-calculator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 为什么需要这个工具？

AI 语言模型在数学计算上存在固有缺陷：
- ❌ 浮点数计算不准确（0.1 + 0.2 ≠ 0.3）
- ❌ 大数运算经常出错
- ❌ 复杂表达式容易算错
- ❌ 即使简单计算也可能失误

这个 MCP 服务器通过专业的数学引擎解决了这些问题。

## 🌟 特性

- ✅ **精确算术运算** - 解决浮点数精度问题
- ✅ **大数支持** - 处理超大整数
- ✅ **复杂表达式** - 支持括号、运算符优先级
- ✅ **丰富函数库** - 300+ 数学函数
- ✅ **完全安全** - 沙箱隔离，无代码注入风险
- ✅ **超时保护** - 防止恶意计算

## 📦 安装

### 快速开始（推荐）

编辑 Claude Desktop 配置文件：

**macOS/Linux:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

添加以下配置：

```json
{
  "mcpServers": {
    "math-calculator": {
      "command": "npx",
      "args": ["-y", "@cosmiumx/mcp-math-calculator"]
    }
  }
}
```

保存后重启 Claude Desktop。

### 其他安装方式

```bash
# 全局安装
npm install -g @cosmiumx/mcp-math-calculator

# 使用 pnpm
pnpm add -g @cosmiumx/mcp-math-calculator

# 使用 yarn
yarn global add @cosmiumx/mcp-math-calculator
```

## 🚀 使用示例

配置完成后，你可以直接向 AI 提出计算需求：

```
你: 精确计算 0.1 + 0.2
AI: [调用 calculate 工具]
结果: 0.3

你: 123456789 乘以 987654321 等于多少？
AI: [调用 calculate 工具]
结果: 121932631112635269

你: 计算 sqrt(16) + pow(2, 3)
AI: [调用 calculate 工具]
结果: 12
```

## 📚 支持的运算

### 基础运算
- 加法：`2 + 3`
- 减法：`10 - 5`
- 乘法：`4 * 6`
- 除法：`20 / 4`
- 幂运算：`2 ^ 3` 或 `pow(2, 3)`
- 取模：`10 % 3`

### 科学函数
- 平方根：`sqrt(16)`
- 绝对值：`abs(-5)`
- 三角函数：`sin(pi/2)`, `cos(0)`, `tan(pi/4)`
- 对数：`log(10)`, `log10(100)`, `log2(8)`
- 指数：`exp(1)`
- 取整：`round(3.5)`, `floor(3.9)`, `ceil(3.1)`

### 数学常数
- 圆周率：`pi` (3.14159...)
- 自然对数底：`e` (2.71828...)
- 黄金比例：`phi` (1.61803...)
- 一周弧度：`tau` (6.28318...)

### 复杂表达式
```javascript
(10 + 20) * 3 / 2          // 45
2 + 3 * 4 - 5 / 5          // 13
sqrt(pow(3, 2) + pow(4, 2)) // 5
sin(pi/6) + cos(pi/3)      // 1
```

## 🔧 高级配置

### 自定义精度

```json
{
  "expression": "1 / 3",
  "precision": 10
}
```

结果将保留 10 位小数精度。

### 环境变量（可选）

```json
{
  "mcpServers": {
    "math-calculator": {
      "command": "npx",
      "args": ["-y", "@cosmiumx/mcp-math-calculator"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## 🔒 安全保障

### 多层安全机制

1. **输入验证**
   - 拒绝危险关键词（import, require, eval 等）
   - 长度限制（最大 1000 字符）
   - 类型检查

2. **沙箱执行**
   - 使用 mathjs 安全解析器
   - 不使用原生 `eval()`
   - 隔离执行环境

3. **资源限制**
   - 5秒执行超时
   - 结果大小限制（10,000 字符）
   - 防止内存溢出

4. **函数白名单**
   - 仅允许安全的数学函数
   - 禁止系统调用
   - 无文件系统访问

## 🧪 测试

项目包含完整的测试套件：

```bash
# 运行测试
pnpm test

# 查看测试覆盖率
pnpm test -- --coverage
```

**测试统计：**
- ✅ 37 个测试用例
- ✅ 100% 通过率
- ✅ 覆盖所有核心功能

## 🛠️ 本地开发

```bash
# 克隆仓库
git clone https://github.com/Cosmiumx/mcp-math-calculator.git
cd mcp-math-calculator

# 安装依赖
pnpm install

# 开发模式（监听文件变化）
pnpm watch

# 构建
pnpm build

# 运行测试
pnpm test

# 本地测试 MCP 服务器
node build/index.js
```

## 📦 项目结构

```
mcp-math-calculator/
├── src/
│   ├── index.ts           # MCP 服务器入口
│   ├── lib/
│   │   ├── math-engine.ts # 计算引擎
│   │   └── validator.ts   # 输入验证
│   ├── types/
│   │   └── index.ts       # 类型定义
│   └── tests/
│       └── *.test.ts      # 测试文件
├── build/                 # 编译输出
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 贡献指南

欢迎任何形式的贡献！

1. **Fork 项目**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交改动** (`git commit -m '添加某个特性'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **开启 Pull Request**

### 开发规范

- 遵循 TypeScript 严格模式
- 添加测试覆盖新功能
- 更新相关文档
- 保持代码风格一致

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 🐛 问题反馈

如果遇到问题或有建议，欢迎：

- 提交 [GitHub Issue](https://github.com/Cosmiumx/mcp-math-calculator/issues)
- 发起 [Pull Request](https://github.com/Cosmiumx/mcp-math-calculator/pulls)
- 联系作者：[Cosmiumx](https://github.com/Cosmiumx)

## 📚 相关链接

- [Model Context Protocol 官网](https://modelcontextprotocol.io/)
- [MCP 规范文档](https://spec.modelcontextprotocol.io/)
- [mathjs 文档](https://mathjs.org/)
- [npm 包页面](https://www.npmjs.com/package/@cosmiumx/mcp-math-calculator)

## 🌟 致谢

- [Model Context Protocol](https://modelcontextprotocol.io/) - 提供 MCP 标准
- [mathjs](https://mathjs.org/) - 提供数学计算引擎
- [TypeScript](https://www.typescriptlang.org/) - 类型系统支持

## ⭐ Star History

如果这个项目对你有帮助，请给它一个 ⭐️！

---

**Made with ❤️ by [Cosmiumx](https://github.com/Cosmiumx)**

