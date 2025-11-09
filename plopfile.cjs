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
};

