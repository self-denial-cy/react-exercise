#### JSX 底层渲染机制

##### JSX 底层渲染机制【创建 virtualDOM】

第一步，将 JSX 语法编译为虚拟 DOM 对象【virtualDOM】

虚拟 DOM 对象：框架内部构建的一套对象体系【对象相关成员都是 React 内部规定的】，基于这些属性描述出构建视图中的 DOM 节点的相关特征

1. 基于 babel-preset-react-app 把 JSX 编译为 React.createElement 这种格式，只要是元素节点，必然会基于 createElement 进行处理

   ```js
   React.createElement(ele, props, ...children)
   // ele 元素标签名 or 组件
   // props 元素的属性集合【对象】，默认为 null
   // children 第三个及以后的参数，都是当前元素的子节点
   ```

2. 执行 createElement 方法，创建出 virtualDOM

   ```js
   virtualDOM = {
       $$typeof: Symbol(react.element),
       ref: null,
       key: null,
       type: 标签名 or 组件,
       // 存储了元素的相关属性 && 子节点信息
       props:{
       	元素的相关属性,
       	children: 子节点信息【没有子节点则没有这个属性，属性可能是一个值，也可能是一个数组】
   	}
   }
   ```

##### JSX 底层渲染机制【创建真实 DOM】

第二步，将 virtualDOM 渲染为真实 DOM【浏览器页面中，用户可见的元素】

> 第一次渲染页面是直接从 virtualDOM 到 真实 DOM；但是后期视图更新时，需要经过一个 DOM-DIFF 的对比，计算出补丁包 PATCH【两次视图差异的部分】，用 PATCH 补丁包进行渲染，大大减少重排重绘，提升页面渲染性能

这个渲染过程是基于 ReactDOM 中的 render 方法处理的

- v16

  ```js
  ReactDOM.render(
  	<>...</>,
      document.getElementById('root')
  )
  ```

- v18

  ```js
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
  	<>...</>
  )
  ```

#### 组件式开发

##### 函数式组件

创建一个函数，该函数返回 JSX 视图，这就是一个函数式组件；使用时引入这个函数，将函数名当作标签名一样使用即可【单闭合调用 or 双闭合调用】

> 命名规范：组件名一般采用 PascalCase【大驼峰命名法】这种方式命名

调用组件时，可以给组件传递各种各样的属性，如果传递的属性值不是字符串，需要基于胡子语法进行传递

###### 渲染机制

- 基于 babel-preset-react-app 将组件编译为 createElement 的形式【传递给组件的属性通过 props 传入】
- 执行 createElement 方法，创建出一个 virtualDOM 对象
- 基于 render 方法渲染为真实 DOM，渲染过程中会将函数式组件的函数执行，把 props 作为参数传入【该 props 是只读的，不允许修改】
- 接收函数执行的返回结果【也就是该组件的 virtualDOM】
- 基于 render 方法将组件的 virtualDOM 转换为真实 DOM，插入到其所在位置

> 函数式组件是【静态组件】
>
> 第一次渲染时，执行函数：
>
> 1. 产生一个私有上下文
> 2. 将解析出来的 props【包含 children】传入函数【但是被冻结了，只读】
> 3. 对执行返回的 virtualDOM 进行渲染
>
> 后续与组件存在交互时：
>
> - 可能会修改私有上下文中的变量
> - 私有变量值也会发生改变
> - 但是【视图不会更新】
>
> 也就是说，函数式组件第一次渲染完毕后，组件中的内容不会根据组件内的某些操作，再进行更新，所以称之为静态组件；除非在父组件中，通过修改传入的属性值来重新调用这个函数式组件

##### 类组件

###### 渲染机制【前几步都类似】

- render 渲染时，遇到 class 或者说构造函数，将其基于 new 执行【也就是创建一个类 or 构造函数实例】，也会把解析出来的 props 传入

  ```js
  new ClassComponent({
      num: 0
  })
  ```

- 将实例 render 方法返回的 virtualDOM 渲染成真实 DOM

##### 深度优先原则

父组件在操作中，遇到子组件，一定是把子组件处理完，才能继续处理父组件

- 初始渲染：父 willMount -> 父 render -> 子 willMount -> 子 render -> 子 didMount -> 父 didMount

- 更新：父 shouldUpdate -> 父 willUpdate -> 父 render -> 子 shouldUpdate -> 子 willUpdate -> 子 render -> 子 didUpdate -> 父 didUpdate

- 销毁：父 willUnmount -> 子 willUnmount -> 子销毁 -> 父销毁

#### React 中事件的一些细节

##### 移动端的 click 的 300ms 延迟问题

- 移动端的 click 是单击事件，pc 端的 click 是点击事件
- 如果连续点击两下
  - pc 端会触发两次 click 和一次 dbclick
  - 移动端不会触发 click，只会触发 dbclick
- 所谓的单击事件，第一次点击后，监听 300ms 看是否还有第二次点击，如果没有就是单击，如果有就是双击，这就是 300ms 延迟的由来

由于 300ms 延迟的问题，移动端中一般使用 touch 来模拟点击效果【可以自己实现 or fastclick 这个包】

- touchstart 手指触摸屏幕
- touchmove 手指在屏幕上移动【保证移动距离在一定误差内】
- touchend 手指离开屏幕

##### 循环渲染中的事件绑定与 Vue 框架的区别

- React 在循环渲染中绑定事件，比如 onClick，并不会给循环渲染出来的每个元素直接绑定事件，只是给该元素挂载了一个 onClick 属性，最后还是通过 #root 容器上的事件委托来处理的
- Vue 在循环渲染中绑定事件，就是直接给每个元素直接绑定事件，不过可以自行实现事件委托的机制【标记好每个元素，然后在其父元素上监听处理】

#### 父子组件通信

1. 父组件可通过属性传递数据给子组件
2. 子组件想修改父组件的数据 —— 父组件需将修改自己数据的方法通过属性传递给子组件，子组件执行即可
3. 父组件想把一些 HTML 结构传递给子组件 —— 基于属性中的 children【插槽机制】
4. 父组件中可以给子组件设置 ref，以此获取子组件的实例【子组件如果是函数式组件，可以获取其暴露的数据和方法】

#### React 中实现样式私有化

- 内联样式
  - 不利于样式复用【如果提取成一个通用样式对象，则没有代码提示】
  - 无法使用伪类
  - 样式和结构混淆在一起，不利于后期代码维护
- 人为控制样式隔离，基于样式表、样式类名这样的方式，人为有意识的、有规范的规避样式冲突问题【这种方案业内较通用】
  - 首先保证每个组件最外层的样式类名是不冲突的【比如，组件文件路径 + 组件名作为组件最外层容器的样式类名】
  - 组件最外层容器内的元素，其样式都基于 less、scss 等嵌入到指定最外层容器的样式类名之下去编写
  - 优点，实现了样式和逻辑的分离、可以使用 CSS 的任何语法，包括伪类、媒体查询等、可以对样式文件进行强缓存或者协商缓存、在编写样式时有代码提示
  - 缺点，容易造成样式冲突【需要人为控制，有心智负担】、性能低【预编译语言的嵌套，可能带来超长的选择器前缀】
- CSSModules 方案【只支持 CSS】
- react-jss 方案【[链接](https://cssinjs.org/react-jss)】【生成 Hooks API，类组件需要借由高阶组件才能使用】
- 
