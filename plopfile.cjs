module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new BearCave component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['section', 'card', 'button', 'layout'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{type}}s/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{type}}s/{{pascalCase name}}.css',
        templateFile: 'plop-templates/component.css.hbs',
      },
    ],
  });

  plop.setGenerator('case-study', {
    description: 'Create a new case study',
    prompts: [
      { type: 'input', name: 'slug', message: 'Case study slug:' },
      { type: 'input', name: 'icon', default: '🚀', message: 'Emoji icon:' },
      { type: 'input', name: 'Title', message: 'Title:' },
      { type: 'input', name: 'Subtitle', message: 'Subtitle:' },
      { type: 'input', name: 'badges', default: '["Analytics","Automation"]', message: 'Badges (JSON array):' },
      { type: 'input', name: 'stats', default: '[{"label":"Impact","value":"+100%"}]', message: 'Stats (JSON array):' },
      { type: 'input', name: 'challenge', default: '{"text":"…"}', message: 'Challenge (JSON object):' },
      { type: 'input', name: 'strategy', default: '["…"]', message: 'Strategy (JSON array):' },
      { type: 'input', name: 'build', default: '["…"]', message: 'Build (JSON array):' },
      { type: 'input', name: 'outcomes', default: '["…"]', message: 'Outcomes (JSON array):' },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/data/case-studies/{{slug}}.ts',
        templateFile: 'plop-templates/case-data.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/case-studies/{{slug}}/index.tsx',
        templateFile: 'plop-templates/case-page.hbs',
      },
    ],
  });
};

