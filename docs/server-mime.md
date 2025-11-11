# Server MIME Configuration Cheatsheet

Ensuring your static hosting platform returns the correct `Content-Type` headers for JavaScript (`.js`, `.mjs`) and WebAssembly (`.wasm`) assets prevents modern browsers from blocking modules with `application/octet-stream` responses.

Use the snippets below for common setups.

## Nginx

```nginx
http {
  types {
    application/javascript  js mjs;
    application/wasm        wasm;
    # ... keep existing type mappings
  }

  # Optionally tighten caching for static assets
  server {
    # ...
    location /assets/ {
      add_header Content-Type "";
      types {
        application/javascript  js mjs;
        application/wasm        wasm;
      }
    }
  }
}
```

## Apache / .htaccess

```apache
<IfModule mod_mime.c>
  AddType application/javascript .js .mjs
  AddType application/wasm        .wasm
</IfModule>
```

## Express (Node.js)

```js
import express from 'express';
import path from 'path';

const app = express();

app.use(
  express.static(path.join(process.cwd(), 'dist'), {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
        res.type('application/javascript; charset=utf-8');
      } else if (filePath.endsWith('.wasm')) {
        res.type('application/wasm');
      }
    }
  })
);
```

## Netlify

Add the following to the root `_headers` file (or `netlify.toml`):

```
/assets/*.js
  Content-Type: application/javascript; charset=utf-8

/assets/*.mjs
  Content-Type: application/javascript; charset=utf-8

/assets/*.wasm
  Content-Type: application/wasm
```

## Cloudflare Pages / Workers Sites

For Workers Sites / Pages projects using `wrangler.toml`:

```toml
[site]
bucket = "./dist"
mime_types = { "js" = "application/javascript", "mjs" = "application/javascript", "wasm" = "application/wasm" }
```

For Pages projects using an `_headers` file, reuse the Netlify example above to enforce headers at the edge.

