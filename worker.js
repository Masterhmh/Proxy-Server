// worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const targetUrl = 'https://script.google.com/macros/s/AKfycbxBu0eH5pYLGb4kPx03GhcYWL6QIP5LChAVRBLeAYx1I6QugGphj2iCzV29_000/exec';

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': 'https://test-miniapp.netlify.app',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const modifiedRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  const response = await fetch(modifiedRequest);

  const newHeaders = new Headers(response.headers);
  newHeaders.set('Access-Control-Allow-Origin', 'https://test-miniapp.netlify.app');
  newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
