window.dom = {
  create(string) {
    const container = document.createElement("template"); //template中可以1存放任意标签
    container.innerHTML = string.trim(); //trim函数的功能就是将字符串两边的空格去掉
    return container.content.firstChild; //content.firstChild配合template使用
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling); //将node2插入到node的后面
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node); //将node2插入到node的前面
  },
  append(parent, node) {
    parent.appendChild(node); //在parent里增加node节点
  },
  wrap(node, parent) {
    dom.before(node, parent); //将node插入到parent前面 div node里增加一个parent，将node插入到parent前面，再将
    dom.append(parent, node); //在parent里增加node节点
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node; //移除节点
  },
  empty(node) {
    // const childNodes = node.childNodes; //const{childNodes}=node;
    const array = [];
    // for (let i = 0; i < childNodes.length; i++) {
    //   dom.remove(childNodes[i]);
    //   array.push(childNodes[i]);
    // }
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array; //清空里面的节点并且得到里面的节点
  },
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    //适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } //ie
      else {
        node.textContent = string; //firefox/chrome
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } //ie
      else {
        return node.textContent; //firefox/chrome
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(dom,"color","red")
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(dom,"color")
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:red})
        //判断name是否是object类型
        for (let key in name) {
          //object里所有的key都读到
          node.style[key] = name[key]; //变量做key要放[]里，本来是style.border
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    contains(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    //scope查找的范围
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node); //node.parentNode.children伪数组,利用Array.from转成数组，再利用filter过滤
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
//const 定义的变量不可以修改
//var定义的变量可以修改,如果不初始化会输出undefined,不会报错。
//let  函数内定义,与外界无关
