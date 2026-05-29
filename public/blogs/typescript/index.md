JavaScript 中的数据类型

① string

② number

③ boolean

④ null

⑤ undefined

⑥ bigint

⑦ symbol

⑧ object

备注：其中 object 包含： Array 、 Function 、 Date 、 Error 等......

Ts有以上所有数据类型，以及六个新类型：

① any

② unknown

③ never

④ void

⑤ tuple

⑥ enum

两个⽤于⾃定义类型的⽅式：

1.  Type//定义新类型
2.  interface//接口

在 TypeScript 中进⾏类型声明时，与在js中一样，通常都是⽤⼩写的 number 、 string 、 boolean，因为大写的一般用于new一个新的包装对象

Eg：_let str1: string_

_str1_ _\=_ 'hello'

_str1_ _\=_ _new_ _String_('hello') _//报错_

_let str2: String_

_str2_ _\=_ 'hello'

_str2_ _\=_ _new_ _String_('hello')

_console_._log_(_typeof_ _str1_)

_console_._log_(_typeof_ _str2_)