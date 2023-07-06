#!/usr/bin/env node
import 'source-map-support/register';
import { AppStack } from '../lib/appStack';
import * as cdk from 'aws-cdk-lib';
import { EnvConfig, createEnvConfig } from './config/envConfig';

const app = new cdk.App();

// contextからデプロイ対象の環境を取得
const envName = app.node.tryGetContext('env');

const isPipeline = process.env.PIPELINE_ENABLED === 'true';


// contextを指定した場合は指定の環境にデプロイ
if (envName && !isPipeline) {
  // 対応する設定値を取得
  const envConfig: EnvConfig = createEnvConfig(envName)

  const appStack = new AppStack(app, `${envName}AppStack`, {
    stackName: `${envName}AppStack`,
    env: envConfig,
    terminationProtection: false,
    envName: envName
  })

  // タグを付与
  cdk.Tags.of(appStack).add('Environment', envName);
}

// 環境変数の設定が行われている場合は、dev, stg, prodにデプロイ
// ------ dev -------
const devEnvName = 'dev'
const devEnvConfig: EnvConfig = createEnvConfig(devEnvName)
const devAppStack = new AppStack(app, `${devEnvName}AppStack`, {
  stackName: `${devEnvName}AppStack`,
  env: devEnvConfig,
  terminationProtection: false,
  envName: devEnvName
})
cdk.Tags.of(devAppStack).add('Environment', devEnvName)


// ------ stg -------
const stgEnvName = 'stg'
const stgEnvConfig: EnvConfig = createEnvConfig(stgEnvName)
const stgAppStack = new AppStack(app, `${stgEnvName}AppStack`, {
  stackName: `${stgEnvName}AppStack`,
  env: stgEnvConfig,
  terminationProtection: false,
  envName: stgEnvName
})
cdk.Tags.of(stgAppStack).add('Environment', stgEnvName)


// ------ prod -------
const prodEnvName = 'prod'
const prodEnvConfig: EnvConfig = createEnvConfig(prodEnvName)
const prodAppStack = new AppStack(app, `${prodEnvName}AppStack`, {
  stackName: `${prodEnvName}AppStack`,
  env: prodEnvConfig,
  terminationProtection: false,
  envName: prodEnvName
})
cdk.Tags.of(prodAppStack).add('Environment', prodEnvName)

