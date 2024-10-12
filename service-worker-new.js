// Instalación del service worker
self.addEventListener('install', function(event) {
    console.log('Service Worker instalado.');
    event.waitUntil(
        caches.open('static-cache-v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/icon.png'
            ]);
        })
    );
});

// Activación del service worker
self.addEventListener('activate', function(event) {
    console.log('Service Worker activado.');
});

// Manejo de notificaciones push
self.addEventListener('push', function(event) {
    const data = event.data.json();
    console.log('Notificación recibida', data);
    const options = {
        body: data.body,
        icon: 'icon.png',
        data: {
            url: data.url
        }
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Manejo de clic en la notificación
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
