type Bullet = string;
type Item = {
  role: string;
  company?: string;
  dates?: string;
  location?: string;
  bullets?: Bullet[];
};
type Section = {
  heading: string;
  items: Item[];
};
type ResumeData = {
  name: string;
  title: string;
  contact?: { email?: string; site?: string; location?: string };
  sections: Section[];
};

export function buildResumeHTML(
  data: ResumeData,
  theme: 'modern' | 'minimal' | 'bold' = 'modern'
): string {
  const palette =
    theme === 'bold'
      ? { bg: '#0b1220', fg: '#ffffff', accent: '#60a5fa' }
      : theme === 'minimal'
        ? { bg: '#ffffff', fg: '#111827', accent: '#4b5563' }
        : { bg: '#ffffff', fg: '#111827', accent: '#1f6feb' };

  const header = `
  <header class="header">
    <h1>${data.name}</h1>
    <p class="title">${data.title}</p>
    ${data.contact?.site ? `<p class="contact"><a href="${data.contact.site}">${data.contact.site}</a></p>` : ''}
    ${data.contact?.email ? `<p class="contact">${data.contact.email}</p>` : ''}
    ${data.contact?.location ? `<p class="contact">${data.contact.location}</p>` : ''}
  </header>`;

  const sections = data.sections
    .map(
      sec => `
    <section class="section">
      <h2>${sec.heading}</h2>
      ${sec.items
        .map(
          item => `
        <div class="item">
          <div class="item-header">
            <strong>${item.role}</strong>
            ${item.company ? ` · ${item.company}` : ''}
            ${item.location ? ` · ${item.location}` : ''}
            ${item.dates ? ` <span class="dates">${item.dates}</span>` : ''}
          </div>
          ${
            item.bullets && item.bullets.length
              ? `<ul class="bullets">${item.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`
              : ''
          }
        </div>
      `
        )
        .join('')}
    </section>
  `
    )
    .join('');

  const styles = `
    <style>
      :root {
        --bg: ${palette.bg};
        --fg: ${palette.fg};
        --accent: ${palette.accent};
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: var(--fg);
        background: var(--bg);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        line-height: 1.45;
      }
      .page {
        max-width: 820px;
        margin: 0 auto;
        padding: 36px 28px;
        background: #fff;
        color: #111827;
      }
      .header { border-bottom: 2px solid var(--accent); padding-bottom: 12px; margin-bottom: 18px; }
      h1 { font-size: 28px; margin: 0; }
      .title { font-size: 16px; color: #374151; margin: 4px 0 8px; }
      .contact { font-size: 13px; color: #4b5563; margin: 2px 0; }
      h2 { font-size: 16px; margin: 18px 0 8px; color: #0f172a; border-left: 3px solid var(--accent); padding-left: 8px; }
      .item { margin-bottom: 10px; }
      .item-header { font-size: 14px; margin-bottom: 4px; }
      .dates { float: right; color: #6b7280; font-weight: normal; }
      .bullets { margin: 4px 0 0 18px; }
      .bullets li { margin-bottom: 4px; }
      @media print {
        .page { box-shadow: none; }
        a { text-decoration: none; color: inherit; }
      }
    </style>
  `;

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${data.name} — Resume</title>
      ${styles}
    </head>
    <body>
      <main class="page">
        ${header}
        ${sections}
      </main>
    </body>
  </html>`;
}
