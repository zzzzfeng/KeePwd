# About KeePwd(关于)
`Save password to localstorage of browser, a keepass-like password manager`
- [体验](https://zzzzfeng.github.io/KeePwd/index.html)
- 轻量版的密码管理器，密码加密存储在[localstorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
- 移动端版本：微信小程序KeePwd

# About Function(关于功能)
- 增加：应用名（或网站地址）-密码 对，密码可以随机生成
- 展示：为增加安全性，密码全部使用 * 星号替代
- 复制：单击复制密码到剪贴板
- 删除：右键删除
- 导出：更换电脑或浏览器或清空缓存时，数据会丢失，导出功能可以将关键数据全部复制到剪贴板
- 导入：应用名输入 #导入# ，密码粘贴导出的密码，可将别处保存的密码合并到一起

# About Security(关于安全性)
- 所有信息完全存储在本地（浏览器localstorage）
- 首先设置解锁密码lkpwd，加密存储在localstorage，加密方式：`CryptoJS.SHA256(CryptoJS.SHA256(lkpwd)+lkpwd)`
- 输入解锁密码比对无误后，将其加密存储在sessionstorage(窗口关闭即失效)，该pwd用作后续加密密钥，加密方式：`CryptoJS.SHA256(lkpwd.slice(0,1)+lkpwd)`
- 密码全部使用`CryptoJS.AES`加密保存，密钥为保存在sessionstorage中的pwd
