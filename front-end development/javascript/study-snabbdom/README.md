h 函数用来产生虚拟节点

vnode => virtual node

```javascript
// 调用 h 函数
h('a', { props: { href: 'http://www.atguigu.com' } }, '尚硅谷')

// 得到虚拟节点
{ 'sel': 'a', 'data': { props: { href: 'http://www.atguigu.com' } }, 'text': '尚硅谷' }

// 真实节点
<a href="http://www.atguigu.com">尚硅谷</a>
```

虚拟节点的属性
```javascript
{
    children: undefined, // 子元素
    data: {}, // 属性样式
    elm: undefined, // 对应的真正节点
    key: undefined, // 唯一标识
    sel: 'div',
    text: '我是一个盒子'
}
```

diff 算法

1. key 是这个节点的唯一标识，他会告诉 diff 算法，在更改前后他们是同一个 DOM 节点

2. 只有同一个虚拟节点，才会进行精细化比较，否则就是暴力的删除旧节点，插入新的（如何定义是同一个虚拟节点：选择器相同且 key 相同）

3. 只进行同层比较，不会进行跨层比较
