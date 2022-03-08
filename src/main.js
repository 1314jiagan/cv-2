const div = dom.create("<tr><td>1</td></tr>");
console.log(div);
dom.after(test, div);
const div3 = dom.create("<div id='dov'>3</div>");
// dom.warp(test, div3);
const nodes = dom.empty(window.empty);
console.log(nodes);
dom.attr(test, "title", "hello");
const title = dom.attr(test, "title");
console.log(`${title}`);
// dom.text(test, "设置新的内容");
dom.style(test, { border: "1px solid red" });
dom.style(test, "color", "red");
var a = dom.style(test, "color");
console.log(a);
dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "red");
console.log(dom.class.contains(test, "blue"));
const fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn); //移除点击的这个事件

const divTest = dom.find("#test")[0]; //不写[0]获取的是数组不是div
console.log(divTest);
console.log(dom.find(".red", divTest)[0]);
console.log(dom.parent(test));
console.log(dom.siblings(dom.find("#e2")[0]));
console.log(dom.next(dom.find("#e2")[0]));
console.log(dom.previous(dom.find("#e2")[0]));
const t = dom.find("#travel")[0];

const b = dom.previous(dom.find("#e2")[0]);
console.log(b);
dom.each(dom.children(t), (n) => dom.style(n, "color", "red"));
console.log(dom.index(b));
