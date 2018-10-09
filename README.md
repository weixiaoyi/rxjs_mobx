# react Mobx框架封装应用，配合Rxjs



### 问题总结
1.mobx 框架导致componentDidUpdate生命周期nextProps跟this.props一致，无法区分，shouldComponentUpdate的netprops也同时因此失灵

2.changeState必须要调用this，由于封装的原因，延迟赋予了这个方法

###功能点
1.修复componentDidUpdate的前后两次props不一致问题，通过封装diapttch给每个oberval属性增加对应的prev属性
2.action内部的rxjs使用区分组件内部的new Subject使用
