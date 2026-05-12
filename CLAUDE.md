# CLAUDE.md

## パッケージマネージャー

このプロジェクトは **Yarn 4.1.1** を使用する（`package.json` の `packageManager` フィールドで固定）。

**`npm` コマンドは絶対に使わない。** `npm install` を実行すると `yarn.lock` が更新されず、Vercel ビルドが `YN0028: The lockfile would have been modified` エラーで失敗する。

### パッケージ操作のコマンド

| 操作 | コマンド |
|------|---------|
| パッケージ追加 | `yarn add <package>` |
| dev 依存追加 | `yarn add -D <package>` |
| パッケージ削除 | `yarn remove <package>` |
| 依存インストール | `yarn install` |

### コミット対象ファイル

パッケージ操作後は以下を必ずコミットに含める：

- `package.json`
- `yarn.lock`
- `.yarn/install-state.gz`
