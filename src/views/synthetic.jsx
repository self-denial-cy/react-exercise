import React from 'react';
import '../styles/synthetic.scss';

export default class Synthetic extends React.Component {
  render() {
    return (
      <>
        <div
          className="wrapper"
          onClick={() => {
            console.log('wrapper 冒泡【合成】');
          }}
          onClickCapture={() => {
            console.log('wrapper 捕获【合成】');
          }}
        >
          <div
            className="outer center"
            onClick={() => {
              console.log('outer 冒泡【合成】');
            }}
            onClickCapture={() => {
              console.log('outer 捕获【合成】');
            }}
          >
            <div
              className="inner center"
              onClick={() => {
                console.log('inner 冒泡【合成】');
              }}
              onClickCapture={() => {
                console.log('inner 捕获【合成】');
              }}
            ></div>
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    document.addEventListener(
      'click',
      () => {
        console.log('document 捕获【原生】');
      },
      true
    );
    document.addEventListener(
      'click',
      () => {
        console.log('document 冒泡【原生】');
      },
      false
    );
    document.body.addEventListener(
      'click',
      () => {
        console.log('body 捕获【原生】');
      },
      true
    );
    document.body.addEventListener(
      'click',
      () => {
        console.log('body 冒泡【原生】');
      },
      false
    );
    const root = document.querySelector('#root');
    root.addEventListener(
      'click',
      () => {
        console.log('root 捕获【原生】');
      },
      true
    );
    root.addEventListener(
      'click',
      () => {
        console.log('root 冒泡【原生】');
      },
      false
    );
    const wrapper = document.querySelector('.wrapper');
    wrapper.addEventListener(
      'click',
      () => {
        console.log('wrapper 捕获【原生】');
      },
      true
    );
    wrapper.addEventListener(
      'click',
      () => {
        console.log('wrapper 冒泡【原生】');
      },
      false
    );
    const outer = document.querySelector('.outer');
    outer.addEventListener(
      'click',
      () => {
        console.log('outer 捕获【原生】');
      },
      true
    );
    outer.addEventListener(
      'click',
      () => {
        console.log('outer 冒泡【原生】');
      },
      false
    );
    const inner = document.querySelector('.inner');
    inner.addEventListener(
      'click',
      () => {
        console.log('inner 捕获【原生】');
      },
      true
    );
    inner.addEventListener(
      'click',
      () => {
        console.log('inner 冒泡【原生】');
      },
      false
    );
  }
}

/**
 * React 中合成事件的处理原理
 * 【绝对不是】给当前元素基于 addEventListener 单独做事件绑定，而是基于【事件委托】处理的
 * 在 React17 及以后版本，都是委托给 #root 这个容器【捕获和冒泡都做了委托】
 * 在 React17 以前，都是委托给 document 容器的【而且只做了冒泡阶段的委托】
 * 对于不支持事件传播机制的事件，才是单独做的事件绑定【例如 onMouseEnter 等】
 *
 * 在渲染的时候，如果发现 JSX 元素中的 onClick、onClickCapture 等类似属性，不会给该元素直接做事件绑定，只是将绑定的方法赋值给
 * 元素的相关属性暂时保存起来
 * inner.onClick = () => {}【这不是 DOM 0 级事件绑定，inner.onclick 这样的才是】
 * 然后给 #root 这个容器做了事件绑定【捕获和冒泡都做了】，因为组件中渲染内容最后都会插入到 #root 这个容器中，这样点击容器内任一元素，
 * 都会触发容器的点击行为
 * 而在给 #root 绑定的方法中，把之前给元素设置的 onClick、onClickCapture 等类似属性，在相应阶段执行
 *
 * 以点击事件为例
 * root.addEventListener('click', (e) => {
 *    const path = e.path // path，【事件源 -> ... -> window】所有祖先元素
 *    [...path].reverse().forEach(el => {
 *        const handle = el.onClickCapture
 *        if(handle) handle() // handle 如果是非箭头函数的话，在严格模式下执行，内部 this 则为 undefined
 *    })
 * }, true)
 *
 * root.addEventListener('click', (e) => {
 *    const path = e.path
 *    path.forEach(el => {
 *        const handle = el.onClick
 *        if(handle) handle() // 将 e 原生事件对象特殊处理后变成合成事件对象再传递给 handle
 *    })
 * }, false)
 *
 * 在 React16 中，关于合成事件对象的处理，React 内部是基于【事件对象池】做了一个缓存机制，在之后版本中去除了这套事件对象池和缓存机制
 * 为了防止每一次都是重新创建出新的合成事件对象，它设置了一个事件对象池【缓存池】
 * 本次事件触发，获取到事件操作的相关信息后，从缓存池中取一个合成事件对象，把信息赋值给相关成员
 * 等待本次操作结束，把合成事件对象中的成员信息都清空，再放回到缓存池中
 * 因此，如果在控制台中想要看到合成事件对象的信息，可以使用 e.persist() 持久化处理下合成事件对象
 */
