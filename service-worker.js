// GSkin Service Worker —— 已停用（清理版）
// 现在的 index.html 不再注册 Service Worker。2026-05-30 的旧版本网页曾注册过它，
// 访问过那个版本的浏览器里，旧 Service Worker 还会"缓存优先"地返回旧文件（包括模型）。
// 浏览器每次打开网站都会自动检查这个文件是否更新；拿到这个版本后，它会删除 GSkin 的旧缓存并注销自己，
// 之后所有访问都直接走网络，模型和网页更新能立即生效。
// 只删除名字以 "gskin-" 开头的缓存，不影响同一域名下的其他网站。

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('gskin-')).map((k) => caches.delete(k)));
    await self.registration.unregister();
  })());
});

// 不拦截任何请求：没有 fetch 处理函数时，浏览器直接走网络。
