
export type CdkCodePipelineConfig = {
  codeCommitBranchName: string,  // CI/CDパイプラインのトリガとなるブランチを指定
  notifyEmail: string, //承認メールの通知先
}


export function getCdkCodePipelineConfig(envType: string): CdkCodePipelineConfig {
  switch (envType) {
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
        `CDK CodePipeline config in "${envType}" environment are not exist.`
      )
  }
}


// 対応する環境のBuildSpec(testおよびdiff)を取得する関数
export function getCdkCodeBuildSpecTestConfig(envType: string) {

  const buildSpecConfig = {
    version: 0.2,
    env: {
      variables: {
        'ENV_TYPE': envType,
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
export function getCdkCodeBuildSpecDeployConfig(envType: string) {

  const buildSpecConfig = {
    version: 0.2,
    env: {
      variables: {
        'ENV_TYPE': envType,
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