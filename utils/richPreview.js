// utils/richPreview.js
const fetch = require('node-fetch');

exports.getLinkPreview = async (url) => {
  try {
    // You can use a 3rd-party API or write your own parser. For now, we'll fetch the page title.
    const res = await fetch(url, { timeout: 7000 });
    const html = await res.text();
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
    const desc = (html.match(/<meta name="description" content="([^"]+)"/i) || [])[1] || '';
    // For thumbnail: look for <meta property="og:image">
    const thumb = (html.match(/<meta property="og:image" content="([^"]+)"/i) || [])[1] || '';
    return { title, desc, thumb };
  } catch {
    return { title: '', desc: '', thumb: '' };
  }
};
