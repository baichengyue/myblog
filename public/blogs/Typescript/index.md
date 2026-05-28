一.typescript概念
TypeScript 由微软开发，是基于 JavaScript 的⼀个扩展语⾔。于此执行TypeScript文件 需要编译为 JavaScript ，然后交给浏览器或其他 JavaScript 运⾏环境执⾏。
/编译过程中ts有静态错误检查，因此代码量虽大于js，但维护性上远胜于js

二.ts的环境配置
如上面所说--浏览器不能直接运⾏ TypeScript 代码，需要编译为 JavaScript 再交由浏览器解析器执⾏。

   要把 .ts ⽂件编译为 .js ⽂件，需要配置 TypeScript 的编译环境，步骤如下：
      第⼀步：创建⼀个 demo.ts ⽂件，例如
const person={
   name :'lisi',
   age:'18'
}
console.log(`我叫${person.name}，我今年${person.age}岁了`)
   
     第⼆步：全局安装 TypeScript
终端中执行npm i typescript -g
     第三步：使⽤命令编译 .ts ⽂件
终端中执行tsc demo.ts!

实现自动化编译在终端中执行两步：
   tsc --init//生成ts配置文件
   tsc --watch 或 tsc -w//自动监测项目结构下的所有.ts文件

***tsc --noEmitOnError --watch//当编译出错时不⽣成 .js ⽂件