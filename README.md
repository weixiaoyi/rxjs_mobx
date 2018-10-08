# react Mobx框架封装应用，配合Rxjs

### 问题总结
1.mobx 框架导致componentDidUpdate生命周期nextProps跟this.props一致，无法区分，shouldComponentUpdate的netprops也同时因此失灵

2.changeState必须要调用this，由于封装的原因，延迟赋予了这个方法