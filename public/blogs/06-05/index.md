# TypeScript 常用类型详解：void、object、tuple、enum、type


## 一、void —— 空类型

### 1.1 基本概念

`void` 的含义是"**空**"，即：**函数不返回任何值，调用者也不应依赖其返回值进行任何操作**。

`void` 通常用于**函数返回值声明**，表示该函数没有有意义的返回值。

```typescript
function logMessage(msg: string): void {
  console.log(msg)
}

logMessage('你好')
```

> **注意**：编码者没有编写 `return` 指定函数返回值，所以 `logMessage` 函数没有**显式返回值**，但会有一个**隐式返回值**——`undefined`。虽然函数返回类型为 `void`，但也是可以接受 `undefined` 的。简单记：**`undefined` 是 `void` 可以接受的一种"空"**。

### 1.2 合法写法

以下三种写法均符合规范：

```typescript
// 写法 1：无 return 语句
function logMessage(msg: string): void {
  console.log(msg)
}

// 写法 2：有 return 但无值
function logMessage(msg: string): void {
  console.log(msg)
  return
}

// 写法 3：显式返回 undefined
function logMessage(msg: string): void {
  console.log(msg)
  return undefined
}
```

### 1.3 void 与 undefined 的关键区别

虽然从语法层面 `void` 可以接受 `undefined`，但**语义层面**二者有本质区别：

```typescript
// 返回值为 void —— 调用者不应依赖返回值
function logMessage(msg: string): void {
  console.log(msg)
}

let result = logMessage('你好')
if (result) {  // ❌ 报错：无法测试 "void" 类型的表达式的真实性
  console.log('logMessage 有返回值')
}
```

```typescript
// 返回值为 undefined —— 调用者可以操作返回值
function logMessage(msg: string): undefined {
  console.log(msg)
}

let result = logMessage('你好')
if (result) {  // ✅ 无警告
  console.log('logMessage 有返回值')
}
```

### 1.4 理解 void 与 undefined 的关系

| 维度 | void | undefined |
|------|------|-----------|
| **本质** | 一个广泛的概念，表达"空"的**意图** | 是"空"的一种**具体实现** |
| **关系** | `void` 包含 `undefined` | `undefined` 是 `void` 可接受的状态 |
| **语义** | 一种意图上的约定，超越特定值 | 仅仅是一个特定的值 |

**总结**：如果一个函数返回类型为 `void`，那么：

1. **从语法上讲**：函数是可以返回 `undefined` 的，显式返回还是隐式返回都无所谓。
2. **从语义上讲**：函数调用者**不应关心**函数返回的值，也不应依赖返回值进行任何操作——即使我们知道它返回了 `undefined`。

### 1.5 特殊情况：函数类型声明中的 void

当使用**类型别名**定义函数类型时，`void` 的检查会放宽：

```typescript
// 代码段 1（正常情况——直接声明函数返回值）：
function demo(): void {
  return undefined   // ✅ 合法
  return 100         // ❌ 不合法
  return false       // ❌ 不合法
  return null        // ❌ 不合法
  return []          // ❌ 不合法
}

// 代码段 2（特殊情况——通过类型别名定义）：
type LogFunc = () => void

const f1: LogFunc = () => {
  return 100        // ✅ 允许返回非空值！
}
const f2: LogFunc = () => 200       // ✅ 允许返回非空值！
const f3: LogFunc = function () {
  return 300        // ✅ 允许返回非空值！
}
```

> **为什么会有这种"特殊"情况？**  
> 这是为了兼容 JavaScript 中常见的实践模式。例如 `Array.prototype.forEach` 方法期望其回调的返回类型是 `void`，但 `Array.prototype.push` 的返回值是一个数字（新数组长度）。如果 TypeScript 严格限制回调不能返回任何值，以下代码就无法通过编译：

```typescript
const src = [1, 2, 3]
const dst: number[] = [0]

// forEach 的回调类型为 (value) => void
// 但 push 方法返回一个 number，这依然合法
src.forEach((el) => dst.push(el))
```

> 这就是 TypeScript 在**类型兼容性**设计上的一个实用权衡：当函数被赋值给一个返回类型为 `void` 的函数类型时，该函数可以返回**任意值**，但这些返回值会被**忽略**。

---

## 二、object —— 对象类型

### 2.1 object（小写）与 Object（大写）

在 TypeScript 中，`object`（小写）和 `Object`（大写）是两个不同的类型，但都因为**范围太宽泛**而在实际开发中使用频率较低。

#### object（小写）

`object` 的含义是：**所有非原始类型**，可存储：对象、函数、数组等。

```typescript
let a: object // a 的值可以是任何【非原始类型】

// ✅ 以下均为非原始类型，符合要求
a = {}
a = { name: '张三' }
a = [1, 3, 5, 7, 9]
a = function () {}
a = new String('123')
class Person {}
a = new Person()

// ❌ 以下均为原始类型，有警告
a = 1          // 警告：不能将类型 "number" 分配给类型 "object"
a = true       // 警告：不能将类型 "boolean" 分配给类型 "object"
a = '你好'     // 警告：不能将类型 "string" 分配给类型 "object"
a = null       // 警告：不能将类型 "null" 分配给类型 "object"
a = undefined  // 警告：不能将类型 "undefined" 分配给类型 "object"
```

#### Object（大写）

官方描述：**所有可以调用 Object 方法的类型**。  
简单记忆：**除了 `undefined` 和 `null` 的任何值**。

```typescript
let b: Object // b 的值必须是 Object 的实例对象（除去 undefined 和 null）

// ✅ 以下均无警告
b = {}
b = { name: '张三' }
b = [1, 3, 5, 7, 9]
b = function () {}
b = new String('123')
class Person {}
b = new Person()

// ✅ 原始类型的包装对象也是 Object 的实例
b = 1       // 1 的包装对象 Number 是 Object 的实例
b = true    // true 的包装对象 Boolean 是 Object 的实例
b = '你好'  // 字符串的包装对象 String 是 Object 的实例

// ❌ 只有 null 和 undefined 不行
b = null       // 警告
b = undefined  // 警告
```

> **总结**：`object` 和 `Object` 因限制范围太宽，实际开发中使用频率**极低**。需要限制对象结构时，应使用更精确的方式。

### 2.2 声明对象类型（实际开发推荐写法）

实际开发中，限制一般对象通常使用以下形式：

```typescript
// 限制 person1 对象必须有 name 属性，age 为可选属性
let person1: { name: string; age?: number }

// 含义同上，也能用分号做分隔
let person2: { name: string; age?: number }

// 含义同上，也能用换行做分隔（推荐）
let person3: {
  name: string
  age?: number
}

// ✅ 如下赋值均合法
person1 = { name: '李四', age: 18 }
person2 = { name: '张三' }
person3 = { name: '王五' }

// ❌ 不合法，因为 person3 的类型限制中没有对 gender 属性的说明
person3 = { name: '王五', gender: '男' }
```

### 2.3 索引签名（Index Signature）

**索引签名**允许定义对象可以具有**任意数量的属性**，这些属性的键和类型是可变的，常用于描述**具有动态属性的对象**。

```typescript
// 限制 person 对象必须有 name 属性，可选 age 属性但值必须是数字，
// 同时可以有任意数量、任意类型的其他属性
let person: {
  name: string
  age?: number
  [key: string]: any // 索引签名，key 这个单词可以换成其他的
}

// ✅ 赋值合法
person = {
  name: '张三',
  age: 18,
  gender: '男'
}
```

### 2.4 声明函数类型

在 TypeScript 中，`=>` 用于**函数类型声明**时表示**函数类型**，描述其参数类型和返回类型（与 JavaScript 中的箭头函数 `=>` 是不同的概念）。

```typescript
// 声明一个函数类型：接收两个 number 参数，返回 number
let count: (a: number, b: number) => number

count = function (x, y) {
  return x + y
}
```

> **区分记忆**：
> - **TypeScript 中的 `=>`**：在函数类型声明时表示函数类型，描述参数和返回值。
> - **JavaScript 中的 `=>`**：是一种定义函数的语法（箭头函数），是具体的函数实现。

### 2.5 声明数组类型

```typescript
// 写法 1：类型[]
let arr1: string[]
arr1 = ['a', 'b', 'c']

// 写法 2：Array<类型>（泛型写法）
let arr2: Array<string>
arr2 = ['hello', 'world']
```

---

## 三、tuple —— 元组类型

### 3.1 基本概念

**元组（Tuple）**是一种特殊的数组类型，可以存储**固定数量**的元素，并且**每个元素的类型是已知的且可以不同**。元组用于精确描述一组值的类型。

```typescript
// 第一个元素必须是 string 类型，第二个元素必须是 number 类型
let arr1: [string, number]

// 第一个元素必须是 number 类型，第二个元素是可选的，如果存在必须是 boolean 类型
let arr2: [number, boolean?]

// 第一个元素必须是 number 类型，后面的元素可以是任意数量的 string 类型
let arr3: [number, ...string[]]
```

### 3.2 赋值示例

```typescript
// ✅ 可以赋值
arr1 = ['hello', 123]
arr2 = [100, false]
arr2 = [200]               // 第二个元素是可选的，可以省略
arr3 = [100, 'hello', 'world']
arr3 = [100]               // 剩余元素也可以为零个

// ❌ 不可以赋值
arr1 = ['hello', 123, false]  // arr1 声明时是两个元素，赋值为三个
```

### 3.3 元组的典型应用场景

| 场景 | 示例 |
|------|------|
| **函数返回多个值** | `function getUser(): [string, number] { return ['Tom', 18] }` |
| **CSV 数据行** | `type Row = [string, number, boolean]` |
| **React useState** | `const [state, setState] = useState(0)` |
| **坐标点** | `type Point2D = [number, number]` |
| **HTTP 响应** | `type Response = [number, string]` —— [状态码, 消息体] |

### 3.4 元组与数组的对比

| 特性 | 数组（Array） | 元组（Tuple） |
|------|-------------|-------------|
| 元素数量 | 不固定 | 固定（可选元素除外） |
| 元素类型 | 所有元素同类型 | 每个位置可不同类型 |
| 访问方式 | 索引访问 | 索引访问（有类型提示） |
| 典型声明 | `string[]` | `[string, number]` |

### 3.5 元组的进阶用法

```typescript
// 带可选元素的元组
type HttpResult = [number, string, boolean?]

// 带剩余元素的元组
type StringTable = [string, ...string[]]

// 只读元组
const point: readonly [number, number] = [10, 20]
// point[0] = 30  // ❌ 报错：无法为只读属性赋值

// 带标签的元组（TypeScript 4.0+，增强可读性）
type NamedTuple = [name: string, age: number]
const person: NamedTuple = ['张三', 18]
```

---