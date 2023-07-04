
export type CdkCodePipelineConfig = {
  codeCommitBranchName: string,  // CI/CDパイプラインのトリガとなるブランチを指定
  notifyEmail: string, //承認メールの通知先
}


export function getCdkCodePipelineConfig(envName: string): CdkCodePipelineConfig {
  switch (envName) {
    case 'dev':
      return {
        codeCommitBranchName: "main",
        notifyEmail: "test@example.com",
      }
    case 'stg':
      return {
        codeCommitBranchName: "main",
        notifyEmail: "test@example.com",
      }
    case 'prd':
      return {
        codeCommitBranchName: "main",
        notifyEmail: "test@example.com",
      }
    default:
      throw new Error(
        `CDK CodePipelineConfig does not exist. envName:${envName}`
      )
  }
}


// 対応する環境のBuildSpec(testおよびdiff)を取得する関数
export function getCdkCodeBuildSpecTestConfig(envName: string) {

  const buildSpecConfig = {
    version: 0.2,
    env: {
      variables: {
        'ENV_TYPE': envName,
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
          "npx cdk ls -c env=${ENV_TYPE}",
          "npx cdk diff --all -c env=${ENV_TYPE}",
        ]
      }
    }
  }
  return buildSpecConfig;

}


// 対応する環境のBuildSpec(cdk deploy)を取得する関数
export function getCdkCodeBuildSpecDeployConfig(envName: string) {

  const buildSpecConfig = {
    version: 0.2,
    env: {
      variables: {
        'ENV_TYPE': envName,
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
          "npx cdk deploy --all  -c env=${ENV_TYPE} --require-approval never"
        ]
      }
    }
  }
  return buildSpecConfig;

}