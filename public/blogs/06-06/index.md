## 四、enum —— 枚举类型

### 4.1 为什么需要枚举？

先看一段没有使用枚举的代码：

```typescript
function walk(str: string) {
  if (str === 'up') {
    console.log('向【上】走')
  } else if (str === 'down') {
    console.log('向【下】走')
  } else if (str === 'left') {
    console.log('向【左】走')
  } else if (str === 'right') {
    console.log('向【右】走')
  } else {
    console.log('未知方向')
  }
}

walk('up')
walk('down')
```

存在的问题：
- 调用 `walk` 时传参**没有任何提示**，编码者很容易写错字符串内容
- `'up'`、`'down'`、`'left'`、`'right'` 是**连续且相关的一组值**，特别适合使用枚举

**枚举（enum）可以定义一组命名常量，它能增强代码的可读性，也让代码更好维护。**

### 4.2 数字枚举（Numeric Enum）

数字枚举是最常见的枚举类型，其成员的值会**自动递增**，且具备**反向映射**的特点。

```typescript
// 定义描述【上下左右】方向的枚举 Direction
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction)
/* 打印结果：
{
  0: 'Up',
  1: 'Down',
  2: 'Left',
  3: 'Right',
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
}
*/

// 正向映射
console.log(Direction.Up)   // 输出: 0

// 反向映射（通过值获取枚举成员名称）
console.log(Direction[0])   // 输出: 'Up'

// 枚举成员是只读的
Direction.Up = 'shang'  // ❌ 报错
```

#### 自定义初始值

```typescript
enum Direction {
  Up = 6,
  Down,    // 自动为 7
  Left,    // 自动为 8
  Right    // 自动为 9
}

console.log(Direction.Up)    // 输出: 6
console.log(Direction.Down)  // 输出: 7
```

#### 使用数字枚举优化 walk 函数

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

function walk(n: Direction) {
  if (n === Direction.Up) {
    console.log('向【上】走')
  } else if (n === Direction.Down) {
    console.log('向【下】走')
  } else if (n === Direction.Left) {
    console.log('向【左】走')
  } else if (n === Direction.Right) {
    console.log('向【右】走')
  } else {
    console.log('未知方向')
  }
}

walk(Direction.Up)    // 代码更加直观易读，类型安全，易于维护
walk(Direction.Down)
```

### 4.3 字符串枚举（String Enum）

枚举成员的值是字符串，**不具备反向映射**。

```typescript
enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

let dir: Direction = Direction.Up
console.log(dir)  // 输出: "up"
```

> 字符串枚举在调试和日志记录中更加友好，因为值本身就是有意义的字符串。

### 4.4 常量枚举（Const Enum）

官方描述：**常量枚举是一种特殊枚举类型，它使用 `const` 关键字定义，在编译时会被内联，避免生成一些额外的代码。**

#### 普通枚举 vs 常量枚举

**普通枚举** —— TypeScript 代码：
```typescript
enum Directions {
  Up,
  Down,
  Left,
  Right
}
let x = Directions.Up
```

编译后生成的 JavaScript（代码量较大）：
```javascript
"use strict";
var Directions;
(function (Directions) {
    Directions[Directions["Up"] = 0] = "Up";
    Directions[Directions["Down"] = 1] = "Down";
    Directions[Directions["Left"] = 2] = "Left";
    Directions[Directions["Right"] = 3] = "Right";
})(Directions || (Directions = {}));
let x = Directions.Up;
```

**常量枚举** —— TypeScript 代码：
```typescript
const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let x = Directions.Up
```

编译后生成的 JavaScript（代码量较小）：
```javascript
"use strict";
let x = 0 /* Directions.Up */;
```

> **"编译时内联"**的含义：TypeScript 在编译时，会将枚举成员引用替换为它们的实际值，而不是生成额外的枚举对象。这可以减少生成的 JavaScript 代码量，并提高运行时性能。

### 4.5 枚举类型对比总结

| 特性 | 数字枚举 | 字符串枚举 | 常量枚举 |
|------|---------|-----------|---------|
| 自动递增 | ✅ | ❌ | ✅ |
| 反向映射 | ✅ | ❌ | ❌ |
| 运行时对象 | ✅ 生成 | ✅ 生成 | ❌ 不生成（内联） |
| 编译后体积 | 较大 | 较大 | 较小 |
| 使用场景 | 状态码、标识位 | API 路径、配置值 | 追求极致性能 |

### 4.6 异构枚举（Heterogeneous Enum）

虽然不推荐，但 TypeScript 允许混合数字和字符串成员：

```typescript
enum Mixed {
  No = 0,
  Yes = 'YES'
}
```

> **建议**：尽量避免使用异构枚举，保持枚举成员类型一致。

---

## 五、type —— 类型别名

### 5.1 基本用法

`type` 可以为任意类型创建别名，让代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展。

```typescript
type num = number

let price: num
price = 100
```

### 5.2 联合类型（Union Types）

联合类型是一种高级类型，它表示一个值可以是**几种不同类型之一**。

```typescript
type Status = number | string
type Gender = '男' | '女'

function printStatus(status: Status) {
  console.log(status)
}

function logGender(str: Gender) {
  console.log(str)
}

printStatus(404)
printStatus('200')
printStatus('501')

logGender('男')
logGender('女')
```

> 联合类型在实际开发中使用频率极高，例如：API 状态码可以是数字或字符串、用户性别只能是特定几个字面量值等。

### 5.3 交叉类型（Intersection Types）

**交叉类型**允许将**多个类型合并为一个类型**。合并后的类型将拥有所有被合并类型的成员。交叉类型通常用于对象类型。

```typescript
// 面积
type Area = {
  height: number // 高
  width: number  // 宽
}

// 地址
type Address = {
  num: number   // 楼号
  cell: number  // 单元号
  room: string  // 房间号
}

// 定义类型 House，是 Area 和 Address 组成的交叉类型
type House = Area & Address

const house: House = {
  height: 180,
  width: 75,
  num: 6,
  cell: 3,
  room: '702'
}
```

### 5.4 type 的更多用法

```typescript
// 1. 基本类型别名
type ID = string | number

// 2. 对象类型
type User = {
  id: ID
  name: string
  email?: string
}

// 3. 函数类型
type Callback = (data: string) => void

// 4. 元组类型
type Point = [number, number]

// 5. 条件类型（高级用法）
type IsString<T> = T extends string ? true : false

// 6. 映射类型（高级用法）
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

### 5.5 type 与 interface 的对比

type 和 interface 都可以用于**定义对象结构**，在定义对象结构时两者可以互换：

```typescript
// 使用 interface 定义 Person 对象
interface PersonInterface {
  name: string
  age: number
  speak(): void
}

// 使用 type 定义 Person 对象
type PersonType = {
  name: string
  age: number
  speak(): void
}

// 两种都可以使用
let person: PersonType = {
  name: '张三',
  age: 18,
  speak() {
    console.log(`我叫：${this.name}，年龄：${this.age}`)
  }
}
```

| 区别点 | `interface` | `type` |
|--------|------------|--------|
| **专注领域** | 更专注于定义**对象和类**的结构 | 可以定义**类型别名、联合类型、交叉类型**等 |
| **继承扩展** | ✅ 支持 `extends` 继承 | ❌ 不支持继承，用交叉类型 `&` 模拟 |
| **自动合并** | ✅ 同名 interface 自动合并 | ❌ 同名 type 会报错 |
| **联合类型** | ❌ 不支持直接定义联合类型 | ✅ `type A = string \| number` |
| **适用场景** | 对象结构、类契约、API 响应格式 | 联合类型、交叉类型、工具类型、基本类型别名 |

> **简单选择原则**：
> - 定义对象/类的结构 → 优先用 `interface`
> - 需要联合类型、交叉类型、类型别名 → 用 `type`

---

## 总结

| 类型 | 一句话描述 | 使用频率 |
|------|-----------|---------|
| **void** | 函数没有返回值，调用者不应依赖返回值 | ⭐⭐⭐⭐ 高 |
| **object** | 非原始类型（实际开发中用更精确的对象声明替代） | ⭐⭐ 低 |
| **tuple** | 固定长度、每项类型可不同的特殊数组 | ⭐⭐⭐ 中 |
| **enum** | 一组命名常量，增强可读性和可维护性 | ⭐⭐⭐⭐ 高 |
| **type** | 为任意类型创建别名，支持联合/交叉等高级类型 | ⭐⭐⭐⭐⭐ 极高 |

这五个类型是 TypeScript 类型系统的核心组成部分。掌握它们，能让你在日常开发中写出更加类型安全、可维护的代码。

