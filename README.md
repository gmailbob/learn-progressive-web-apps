# learn-progressive-web-apps
Udemy PWA 课程。只包含前端部分，firebase部分没有包括进来，需要可去课程里链接下载

这次课程前几个commit是自己敲的，后面都是直接用instructor的。原因之一是代码结构实在有点乱。以前写过基于express-handlebars的multiple pages application，但是交互比这个简单。同时也感叹像React/Vue等框架component化让代码易读易维护了不少

课程代码相对有点老。一些API近年来有语法改动/功能改进（例如PushManager.subscribe()的参数applicationServerKey已经可以直接接受ArrayBuffer了；再例如新添HTMLCanvasElement.toBlob()，课程还使用toDataURL再转换为blob的方法），所以代码大概率可能跑不起来了，仅作阅读研究使用

课程涉及到的一些模块，例如indexedDB、native device features在service worker之外也能用，一些知识以前没有接触过（eg: video tag, media API, geolocation API），值得注意
