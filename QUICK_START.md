# 快速开始指南

## 🚀 5分钟上手

### 步骤 1: 配置 Claude Desktop

1. 找到配置文件：
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. 编辑配置文件，添加：

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

3. 保存并重启 Claude Desktop

### 步骤 2: 测试

向 Claude 提问：

```
精确计算 0.1 + 0.2
```

预期输出：
```
计算结果: 0.3
```

### 步骤 3: 更多示例

```
# 大数运算
123456789 * 987654321

# 科学计算
sqrt(16) + pow(2, 3)

# 复杂表达式
(10 + 20) * 3 / 2

# 三角函数
sin(pi/2)
```

## 🎯 常见问题

### Q: 为什么 AI 没有调用计算工具？

**A**: 尝试在提问中明确说明"精确计算"或"使用计算工具"。

### Q: 如何更新到最新版本？

**A**: 使用 npx 方式会自动使用缓存的最新版本。如果需要强制更新：

```bash
npx clear-npx-cache
```

### Q: 可以在其他 MCP 客户端使用吗？

**A**: 可以！任何支持 MCP 协议的客户端都可以使用。

## 📝 配置示例

### 基础配置（推荐）

```json
{
  "mcpServers": {
    "math": {
      "command": "npx",
      "args": ["-y", "@cosmiumx/mcp-math-calculator"]
    }
  }
}
```

### 全局安装后使用

```bash
# 先安装
npm install -g @cosmiumx/mcp-math-calculator
```

```json
{
  "mcpServers": {
    "math": {
      "command": "mcp-math-calculator"
    }
  }
}
```

### 本地开发版本

```json
{
  "mcpServers": {
    "math": {
      "command": "node",
      "args": ["/path/to/mcp-math-calculator/build/index.js"]
    }
  }
}
```

## 🔧 故障排除

### 问题: "command not found"

**解决方案**:
1. 确保 Node.js 已安装（v18+）
2. 确保 npx 可用：`npx --version`

### 问题: MCP 服务器无响应

**解决方案**:
1. 检查配置文件格式是否正确
2. 查看 Claude Desktop 日志
3. 重启 Claude Desktop

### 问题: 计算结果不正确

**解决方案**:
1. 检查表达式语法
2. 查看错误信息
3. 提交 Issue：https://github.com/Cosmiumx/mcp-math-calculator/issues

## 💡 提示

- 使用圆括号 `()` 明确运算优先级
- 函数名区分大小写（`sqrt` 不是 `SQRT`）
- 乘法必须使用 `*` 符号（`2x` 不支持，应写 `2 * x`）
- 大数运算会自动使用高精度模式

## 📚 更多资源

- [完整文档](./README.md)
- [中文文档](./README.zh-CN.md)
- [更新日志](./CHANGELOG.md)
- [GitHub Issues](https://github.com/Cosmiumx/mcp-math-calculator/issues)

---

**遇到问题？** 在 GitHub 上提问：https://github.com/Cosmiumx/mcp-math-calculator/issues

