#!/usr/bin / env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCodePipelineStack } from '../pipeline/pipelineStack';
import { EnvConfig, createEnvConfig } from './config/envConfig';
import { Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';

const app = new cdk.App();

// デプロイ先の環境はcontextから取得する
const envType = app.node.tryGetContext('env');

// contextで`env`が指定されていない場合はエラーにする
if (envType === undefined)
  throw new Error(`Please specify environment with context option. ex) cdk deploy -c env=dev`);

// contextを元に環境設定（デプロイ先のアカウントID、リージョン）を取得する
const envConfig: EnvConfig = createEnvConfig(envType)

// スタックを作成
new CdkCodePipelineStack(app, 'CDKPipelinesStack', {
  stackName: `${envType}-CDK-CodePipeline-Stack`,  // Stack名に環境名を含め重複防止
  env: envConfig,  // アカウントID、リージョンを設定
  terminationProtection: true,  // Stackの削除保護を有効化
  envType: envType  // contextをStackに引き継ぐ
})

// タグに環境名を付与
const envTagName = 'Environment';
cdk.Tags.of(app).add(envTagName, envType);

