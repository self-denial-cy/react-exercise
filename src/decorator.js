// 类的装饰器，操作的是类本身，设置的是静态属性和静态方法/也可以设置原型上的属性和方法
function decorator1(target) {
  target.className = 'Cat';
  target.getClassName = function () {
    return this.className;
  };
  target.prototype.mew = function () {
    console.log('mew');
  };
  // 装饰器函数如果有返回结果，会替换装饰的目标类
  // return 100;
}

function decorator2(target) {
  target.prototype.sleep = function () {
    console.log('sleep');
  };
}

// 这种方式可以接收传入的参数
function decorator3(className) {
  console.log(1);
  // 返回的函数才是装饰器函数
  return function (target) {
    console.log(2);
    target.className = className;
  };
}

function decorator4() {
  console.log(3);
  return function (target) {
    console.log(4);
  };
}

/**
 * 类中属性、方法的装饰器
 * 在给实例设置私有属性时，触发装饰器函数执行，以此来给属性进行装饰
 * target 类的原型对象
 * name 装饰的属性名
 * descriptor 修饰对象 {configurable: true, enumerable: true, writable: true, initializer: ƒ}
 * 属性的初始值就是 initializer 执行返回的结果
 *
 * 如果装饰器应用在方法上，除了 descriptor 不同外，其它一样
 * {writable: true, enumerable: false, configurable: true, value: ƒ}
 * 这里的 value 指向方法本身
 *
 * 类中属性、方法的装饰器如果想返回一些东西，那么返回的结果必须是一个 descriptor 修饰对象
 */
function decorator5(target, name, descriptor) {
  console.log(target, name, descriptor);
}

function decorator6(target, name, descriptor) {
  return {
    initializer() {
      return 'initializer';
    },
    enumerable: true
  };
}

/**
 * 同一个装饰器可以作用在多个类上
 * 同一个类上也可以使用多个装饰器
 * 装饰器的处理顺序，由下至上【先处理 decorator2，再处理 decorator1】【如果 decorator2 中有返回结果，那么 decorator1 接收到的 target 就是这个返回结果】
 */

@decorator1
@decorator2
@decorator3('Cat')
@decorator4()
class Cat {
  @decorator5
  name = 'benny';

  @decorator5
  getName() {}

  @decorator6
  getInitializer() {}
}

console.log(Cat, new Cat());

// 只读装饰器
function readonly(_, name, descriptor) {
  descriptor.writable = false;
}

// 记录执行时间日志的装饰器
function loggerTime(_, name, descriptor) {
  const fn = descriptor.value;
  // 将方法重写
  descriptor.value = function (...args) {
    console.time(name);
    const res = fn.call(this, ...args);
    console.timeEnd(name);
    return res;
  };
}

class Dog {
  @readonly name = 'Boo Boo';

  @readonly
  @loggerTime
  getName() {
    console.log(this.name);
  }
}

new Dog().getName();
