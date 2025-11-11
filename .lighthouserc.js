module.exports = {
  ci: {
    collect: {
      staticDistDir: "storybook-static",
      startServerCommand: "npx http-server storybook-static -p 9001",
      url: [ "http://localhost:9001" ],
      numberOfRuns: 1
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.90 }],
        "categories:best-practices": ["warn", { minScore: 0.90 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};

