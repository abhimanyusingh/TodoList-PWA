workbox.skipWaiting();
workbox.clientsClaim();


workbox.routing.registerRoute(
    new RegExp('https:.*min\.(css|js)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cdn-cache'
    })
)

workbox.routing.registerRoute(
    new RegExp('http:.*:4567.*\.json'),
    workbox.strategies.networkFirst()
)

self.addEventListener('fetch', event => {
    if(event.request.method === 'POST' ||  event.request.method === 'DELETE') {
        event.respondWith(
            fetch(event.request).catch(err => {
                return new Response(
                    JSON.stringify({error: 'This action is disabled while app is offline'}), {
                        headers: {'Content-Type': 'applocation/json'}
                    }
                )
            })
        )
    }
})

// self.addEventListener('install', event => {
// })


// self.addEventListener('activate', event => {
// })



workbox.precaching.precacheAndRoute(self.__precacheManifest || []);