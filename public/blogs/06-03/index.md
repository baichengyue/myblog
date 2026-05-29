一.any
any 的含义是：任意类型，⼀旦将变量类型限制为 any ，那就意味着放弃了对该变量的类型检查。
eg:
// 明确的表示a的类型是 any —— 【显式的any】
let a: any
// 以下对a的赋值，均⽆警告
a = 100
a = '你好'
a = false
// 没有明确的表示b的类型是any，但TS主动推断出来b是any —— 隐式的any
let b
//以下对b的赋值，均⽆警告
b = 100
b = '你好'
b = false
--注意点： any 类型的变量，可以赋值给任意类型的变量
let c:any
c = 9
let x: string
x = c // ⽆警告

二.unknow
unknown 的含义是：未知类型，适⽤于：起初不确定数据的具体类型，要后期才能确定
unknown 可以理解为⼀个类型安全的 any 。他与any比较之下会进行自检
// 设置a的类型为unknown
let a: unknown
//以下对a的赋值，均符合规范
a = 100
a = false
a = '你好'
// 设置x的数据类型为string
let x: string
x = a //警告：不能将类型“unknown”分配给类型“string”-------

同时以上特性会导致unknown 强制开发者在使⽤之前进⾏类型检查，从⽽提供更强的类型安全性。
// 设置a的类型为unknown
let a: unknown
a = 'hello'
//第⼀种⽅式：加类型判断
if(typeof a === 'string'){
 x = a
 console.log(x)
}
//第⼆种⽅式：加断⾔（两种方法）
x = a as string
x = <string>a

3.never
never 的含义是：任何值都不是，即：不能有值，例如 undefined 、 null 、 '' 、 0 都不⾏！
⼏乎不⽤ never 去直接限制变量，因为没有意义，
never可以用于限制函数返回值-------------
// 限制throwError函数不需要有任何返回值，任何值都不⾏，像undeifned、null都不⾏
function throwError(str: string): never {
 throw new Error('程序异常退出:' + str)
}