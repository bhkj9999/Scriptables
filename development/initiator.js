// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comments;
// 

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
// @ts-ignore
if (typeof require === 'undefined') require = importModule
const { Base } = require("./env")

// @组件代码开始
class Widget extends Base {
  /**
   * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
   * @param {string} arg 自定义参数
   */
  constructor (arg) {
    super(arg)
    this.name = '示例小组件'
    this.desc = '「小件件」—— 原创精美实用小组件'
  }

  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render () {
    const data = await this.getData()
    switch (this.widgetFamily) {
      case 'large':
        return await this.renderLarge(data)
      case 'medium':
        return await this.renderMedium(data)
      default:
        return await this.renderSmall(data)
    }
  }

  /**
   * 渲染小尺寸组件
   */
  async renderSmall (data) {
    // @ts-ignore
    let w = new ListWidget()
    await this.renderHeader(w, data['logo'], data['title'])
    const t = w.addText(data['content'])
    // @ts-ignore
    t.font = Font.lightSystemFont(16)
    w.addSpacer()
    w.url = this.actionUrl('open-url', data['url'])
    return w
  }
  /**
   * 渲染中尺寸组件
   */
  async renderMedium (data, num = 3) {
    // @ts-ignore
    let w = new ListWidget()
    await this.renderHeader(w, data['logo'], data['title'])
    data['data'].slice(0, num).map(d => {
      const cell = w.addStack()
      cell.centerAlignContent()
      const cell_box = cell.addStack()
      // @ts-ignore
      cell_box.size = new Size(3, 15)
      // @ts-ignore
      cell_box.backgroundColor = new Color('#ff837a', 0.6)
      cell.addSpacer(10)
      const cell_text = cell.addText(d['title'])
      // @ts-ignore
      cell_text.font = Font.lightSystemFont(16)
      cell.url = this.actionUrl("open-url", d['url'])
      cell.addSpacer()
      w.addSpacer(10)
    })
    w.addSpacer()
    return w
  }
  /**
   * 渲染大尺寸组件
   */
  async renderLarge (data) {
    return await this.renderMedium(data, 10)
  }

  /**
   * 获取数据函数，函数名可不固定
   */
  async getData () {
    const api = 'https://x.im3x.cn/v1/test-api.json'
    return await this.httpGet(api, true, false)
  }

  /**
   * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
   * @param {string} url 打开的链接
   */
  async actionOpenUrl (url) {
    // @ts-ignore
    Safari.openInApp(url, false)
  }

}
// @组件代码结束

// @ts-ignore
const { Testing } = require("./env")
// @ts-ignore
await Testing(Widget)