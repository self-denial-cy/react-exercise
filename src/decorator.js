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
 * 同一个装饰器可以作用在多个类上
 * 同一个类上也可以使用多个装饰器
 * 装饰器的处理顺序，由下至上【先处理 decorator2，再处理 decorator1】【如果 decorator2 中有返回结果，那么 decorator1 接收到的 target 就是这个返回结果】
 */

@decorator1
@decorator2
@decorator3('Cat')
@decorator4()
class Cat {}

console.log(Cat);
