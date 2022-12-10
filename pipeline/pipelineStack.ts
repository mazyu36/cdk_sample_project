import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

import { aws_iam as iam } from 'aws-cdk-lib';
import { aws_kms as kms } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_codecommit as codecommit } from 'aws-cdk-lib';
import { aws_codebuild as codebuild } from 'aws-cdk-lib';
import { aws_codepipeline as codepipeline } from 'aws-cdk-lib';
import { aws_codepipeline_actions as codepipeline_actions } from 'aws-cdk-lib';
import { aws_sns as sns } from 'aws-cdk-lib';

import { getCdkCodeBuildSpecDeployConfig, getCdkCodeBuildSpecTestConfig, getCdkCodePipelineConfig } from "./config/pipelineConfig";

interface CdkCodePipelineStackProps extends StackProps {
  envType: string,
}

export class CdkCodePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: CdkCodePipelineStackProps) {
    super(scope, id, props);

    // Configを取得
    const cdkCodePipelineConfig = getCdkCodePipelineConfig(props.envType)

    //--------------CodePipelineを定義----------------
    // kmsキーを作成
    const cdkArtifactKey = new kms.Key(this, 'CDKCodePipelineKey');

    const cdkArtifactBucket = new s3.Bucket(this, 'CDKArtifactBucket', {
      encryptionKey: cdkArtifactKey,
      accessControl: s3.BucketAccessControl.PRIVATE,
      encryption: s3.BucketEncryption.KMS,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      bucketName: `${props.envType}-bucket-cdk-codepipeline-artifact`,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const cdkCodePipeline = new codepipeline.Pipeline(this, 'CDKPipeline', {
      pipelineName: `${props.envType}-CDK-CodePipeline`,
      artifactBucket: cdkArtifactBucket
    });


    //--------------CodeCommit----------------
    // TODO CodeCommitリポジトリは事前に手動で作成しておく
    const cdkRepository = codecommit.Repository.fromRepositoryName(this, 'CDKRepository', 'cdk-pipeline-test')

    // CodePipelineにStageを追加
    const sourceStage = cdkCodePipeline.addStage({
      stageName: 'Source'
    });

    // Actionを定義
    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipeline_actions.CodeCommitSourceAction({
      actionName: 'Source',
      repository: cdkRepository,
      branch: cdkCodePipelineConfig.codeCommitBranchName,
      output: sourceOutput
    });

    // StageにActionを追加
    sourceStage.addAction(sourceAction);


    //--------------CodeBuild用のIAMロール作成----------------
    // AdministratorAccessを付与
    const codeBuildRole = new iam.Role(this, 'CDKPipelinesCodeBuildDeployRole', {
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
      managedPolicies: [
        {
          managedPolicyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
        },
      ],
    });


    //--------------CodeBuild（テスト）----------------
    const cdkBuildSpecTestConfig = getCdkCodeBuildSpecTestConfig(props.envType)

    const cdkTestProject = new codebuild.PipelineProject(this, 'CDKTestProject', {
      projectName: `${props.envType}-CDK-Test-Project`,
      buildSpec: codebuild.BuildSpec.fromObject(cdkBuildSpecTestConfig),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        privileged: true
      },
      cache: codebuild.Cache.local(codebuild.LocalCacheMode.DOCKER_LAYER, codebuild.LocalCacheMode.CUSTOM),
      role: codeBuildRole
    });

    //Stageを定義
    const cdkTestStage = cdkCodePipeline.addStage({
      stageName: 'Test'
    });

    //Actionを定義
    const testAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'Test',
      project: cdkTestProject,
      input: sourceOutput,
      executeBatchBuild: false,
      combineBatchBuildArtifacts: false
    })

    // StageにActionを追加
    cdkTestStage.addAction(testAction)


    //--------------Approval----------------
    //Stageを定義
    const cdkApprovalStage = cdkCodePipeline.addStage({
      stageName: 'Approval'
    });

    //トピックとサブスクリプションを作成
    const cdkSnsTopic = new sns.Topic(this, "CdkSnsTopic", {
      displayName: `${props.envType}-cdk-sns-topic`,
      topicName: `${props.envType}-cdk-sns-topic`,
    });
    new sns.Subscription(this, 'CdkSnsSubscription', {
      topic: cdkSnsTopic,
      endpoint: cdkCodePipelineConfig.notifyEmail,
      protocol: sns.SubscriptionProtocol.EMAIL,
    });

    //Actionを定義
    const cdkApprovalAction = new codepipeline_actions.ManualApprovalAction({
      actionName: 'ApprovalAction',
      notificationTopic: cdkSnsTopic
    });

    // StageにActionを追加
    cdkApprovalStage.addAction(cdkApprovalAction)


    //--------------CodeBuild（デプロイ）----------------
    const cdkCodeBuildSpecDeployConfig = getCdkCodeBuildSpecDeployConfig(props.envType)

    const cdkDeployProject = new codebuild.PipelineProject(this, 'CDKDeployProject', {
      projectName: `${props.envType}-CDK-Deploy-Project`,
      buildSpec: codebuild.BuildSpec.fromObject(cdkCodeBuildSpecDeployConfig),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        privileged: true
      },
      cache: codebuild.Cache.local(codebuild.LocalCacheMode.DOCKER_LAYER, codebuild.LocalCacheMode.CUSTOM),
      role: codeBuildRole
    });

    //Stageを追加
    const cdkDeployStage = cdkCodePipeline.addStage({
      stageName: 'Deploy'
    });

    // Actionを定義
    const cdkDeployAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'Deploy',
      project: cdkDeployProject,
      input: sourceOutput,
      executeBatchBuild: false,
      combineBatchBuildArtifacts: false
    })

    // StageにActionを追加
    cdkDeployStage.addAction(cdkDeployAction)


  };
}
