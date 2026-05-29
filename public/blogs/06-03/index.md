一.any

any 的含义是：任意类型，⼀旦将变量类型限制为 any ，那就意味着放弃了对该变量的类型检查。

eg:

_// 明确的表示a的类型是 any —— 【显式的any】_

_let a: any_

_// 以下对a的赋值，均⽆警告_

_a_ _\=_ 100

_a_ _\=_ '你好'

_a_ _\=_ false

_// 没有明确的表示b的类型是any，但TS主动推断出来b是any —— 隐式的any_

_let b_

_//以下对b的赋值，均⽆警告_

_b_ _\=_ 100

_b_ _\=_ '你好'

_b_ _\=_ false

\--注意点： any 类型的变量，可以赋值给任意类型的变量

_let c:any_

_c_ _\=_ 9

_let x: string_

_x_ _\=_ _c_ _// ⽆警告_

二.unknow

unknown 的含义是：未知类型，适⽤于：起初不确定数据的具体类型，要后期才能确定

unknown 可以理解为⼀个类型安全的 any 。他与any比较之下会进行自检

_// 设置a的类型为unknown_

_let a: unknown_

_//以下对a的赋值，均符合规范_

_a_ _\=_ 100

_a_ _\=_ false

_a_ _\=_ '你好'

_// 设置x的数据类型为string_

_let x: string_

_x_ _\=_ _a_ _//警告：不能将类型“unknown”分配给类型“string”_

同时以上特性会导致unknown 强制开发者在使⽤之前进⾏类型检查，从⽽提供更强的类型安全性。

_// 设置a的类型为unknown_

_let a: unknown_

_a_ _\=_ 'hello'

_//第⼀种⽅式：加类型判断_

_if_(_typeof_ _a_ _\===_ 'string'){

&nbsp;_x_ _\=_ _a_

&nbsp;_console_._log_(_x_)

}

_//第⼆种⽅式：加断⾔_

_x_ _\=_ _a_ _as_ string

_//第三种⽅式：加断⾔_

_x_ _\=_ &lt;string&gt;_a_

3.never

never 的含义是：任何值都不是，即：不能有值，例如 undefined 、 null 、 '' 、 0 都不⾏！

⼏乎不⽤ never 去直接限制变量，因为没有意义，

never可以用于限制函数返回值-------------

_// 限制throwError函数不需要有任何返回值，任何值都不⾏，像undeifned、null都不⾏_

_function_ _throwError_(str_:_ string)_:_ never {

&nbsp;_throw_ _new_ _Error_(_str_)

}