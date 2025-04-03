addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  console.log("Request URL:", request.url); // Log URL nhận được từ Miniapp
  const targetUrl = 'https://script.google.com/macros/s/AKfycbyLk7diZSSGkDVaU6B_C1WcUcyxqCPEC66EsH4Y4tdti2vT-uR5WKN4hwAIKZenWQ_E/exec';

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

  const modifiedRequest = new Request(targetUrl + '?' + new URL(request.url).search, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  const response = await fetch(modifiedRequest);
  console.log("Response from GAS:", response.status); // Log trạng thái phản hồi

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
