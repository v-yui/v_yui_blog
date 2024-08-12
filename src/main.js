// 用于加载所需文件，在index.html的head中引入
// 无法灵活的在子页面使用import,在config中需分离数个出口文件,过于繁杂
// 因此为方便后续使用,把html中需要再处理的内容挂载到window

// import home from './template/home.html';
import home from './template/newHome.html';
import note from './template/note.html';
import read from './template/read.html';
import tool from './template/tool.html';
import photo from './template/photo.html';

import proJS from './lib/notes/1.1. ProfessionalJS.md';
import grpHTTP from './lib/notes/1.2. 图解HTTP.md';
import CSSMast from './lib/notes/1.3. CSS Mastery.md';
import nodeLearn from './lib/notes/2.1 node学习.md'
import webpackLearn from './lib/notes/2.2 webpack学习.md'
import eventLoop from './lib/notes/2.3 eventLoop.md'
import newCode from './lib/notes/2.4 牛客刷题知识点.md'
import regLearn from './lib/notes/2.5 正则表达式.md'

// 使用less来简化嵌套写法,子页面样式均导入main.less
import './style/main.less';

// 5个子页面,为便于使用for循环添加点击事件,故使用数组保存
window.temp = [home, note, read, photo];

// note页需展示的markdown笔记
window.notes = {
  readNote: [proJS, grpHTTP, CSSMast],
  selfNote: [nodeLearn, webpackLearn, eventLoop, newCode, regLearn]
};