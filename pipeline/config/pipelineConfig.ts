export function createCdkCodeBuildSpecTestConfig() {

  const buildSpecConfig = {
    version: 0.2,
    env: {
      variables: {
        'PIPELINE_ENABLED': 'true',
      }
    },
    phases: {
      install: {
        commands: [
          "n stable",
          "node -v",
          "npm update npm"
        ]
      },
      build: {
        commands: [
          "echo \"node: $(node --version)\" ",
          "echo \"npm: $(npm --version)\" ",
          "npm ci",
          "npm audit",
          "npm run build",
          "npm run test",
        ]
      },
      post_build: {
        commands: [
          "npx cdk diff --all",
        ]
      }
    }
  }
  return buildSpecConfig;

}


export function createCdkCodeBuildSpecDeployConfig() {

  const buildSpecConfig = {
    version: 0.2,
    env: {
      variables: {
        'PIPELINE_ENABLED': 'true',
      }
    },
    phases: {
      install: {
        commands: [
          "n stable",
          "node -v",
          "npm update npm"
        ]
      },
      build: {
        commands: [
          "echo \"node: $(node --version)\" ",
          "echo \"npm: $(npm --version)\" ",
          "npm ci",
        ]
      },
      post_build: {
        commands: [
          "npx cdk deploy --all --concurrency 3 --require-approval never"
        ]
      }
    }
  }
  return buildSpecConfig;

}