// previewBuilder.ts
export function buildPreviewHTML(): string {
  // TODO: Implement dynamic layout or branding preview injection logic.
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Brand Preview</title>
      <style>
        body {
          font-family: sans-serif;
          background: #f9fafb;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .logo {
          font-size: 3rem;
          font-weight: bold;
          color: #111827;
        }
      </style>
    </head>
    <body>
      <div class="logo">JD</div>
    </body>
    </html>
  `;
}
