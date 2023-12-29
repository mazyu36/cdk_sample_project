# AWS CDKチーム開発のためのサンプルプロジェクト

AWS CDKをチーム開発する際の要素を組み合わせたサンプルプロジェクトである。以下3点の要素を盛り込んでいる。

詳細は参考のプロジェクトに記載している。


* Construct実装時は`lib/constructs/`配下と`lib/config`配下に実装を行っていく（解説記事：[AWS CDKをチーム開発する際に採用したプロジェクト管理、開発のフローについて](https://mazyu36.hatenablog.com/entry/2023/01/06/181459)）
* test実装は`test/constructs/`配下に実装する（解説記事：[AWS CDKをチーム開発する際に採用したテスト実装について](https://mazyu36.hatenablog.com/entry/2023/02/05/151723)）
* CICDパイプラインはCodePipeline, CodeBuildで自作し、本体とは別Appで作成する（解説記事：[AWS CDKのチーム開発でCDK Pipelinesの導入を諦めた話](https://mazyu36.hatenablog.com/entry/2022/12/10/155945)）

## プロジェクト構成

```sh
.
├── README.md
├── bin
│   ├── app.ts
│   ├── config
│   └── pipeline.ts  # pipeline構築用のapp
├── cdk.context.json
├── cdk.json
├── jest.config.js
├── lib
│   ├── appStack.ts
│   ├── config # Constructに対応する設定を実装
│   └── constructs # Constructを実装する。ファイルで分割する
├── package-lock.json
├── package.json
├── pipeline # pipeline関連のstack定義
│   ├── config
│   └── pipelineStack.ts # pipeline用のStack
├── test
│   ├── __snapshots__
│   ├── constructs # Constructに対応するテストを実祖する
│   └── createTemplate.test.ts # テスト用のテンプレートを生成するための関数
└── tsconfig.json
```

## デプロイ方法
* `app`を手動デプロイする場合は`cdk deploy -c env=環境名`でデプロイを行う。
* `pipeline`をデプロイする場合は`cdk deploy --app "npx ts-node --prefer-ts-exts bin/pipeline.ts" -c env=環境名`でデプロイを行う。`pipeline`のデプロイ後はコードをプッシュするたびにCICDが行われる。