# AIエージェント作業ガイド（EveryWorkout）

このドキュメントは、EveryWorkout リポジトリでAIエージェントが実装・修正を行う際の実践ルールをまとめたものです。特に **コンポーネント設計**、**Storybook**、**appルーティング**、**CI/CD** を中心に定義します。

---

## 1. 基本方針

- 既存設計（Atomic Design / TypeScript / Tailwind）に合わせる。
- 変更は最小スコープで行い、既存の命名・責務分離を維持する。
- UIコンポーネントの追加・変更時は Storybook ストーリーも同時に更新する。
- ルーティング追加時は `src/app` の App Router 構成規則に従う。
- CIが前提とする Node / Prisma / Storybook の実行条件を壊さない。

---

## 2. コンポーネント設計ルール

### 2.1 設計思想

- Atomic Design を採用する（Atoms → Molecules → Organisms → Templates → Pages）。
- 単一責務を守り、再利用可能な部品を優先する。
- 可能な限り「表示責務」と「データ取得責務」を分離する。

### 2.2 配置と命名

- UIコンポーネントは `src/components` 配下に配置する。
- ファイル名は PascalCase（例: `WorkoutCard.tsx`, `Button.tsx`）。
- Hooks は `src/hooks` 配下で `useXxx.ts` 命名とする。
- Props 型は `ComponentNameProps` を基本とする。

### 2.3 実装スタイル

- TypeScriptで厳密に型付けし、`any` は原則使用しない。
- スタイリングは Tailwind CSS を第一選択とする。
- 真偽値は `is/has/should` 接頭辞を優先する。
- 複雑化する場合はロジックを hooks / utils へ切り出す。

### 2.4 再利用エクスポート

- 汎用コンポーネントを追加した場合は `src/components/index.ts` への公開追加を検討する。

---

## 3. Storybook運用ルール

### 3.1 ストーリーファイル

- ストーリーは `src/components/**/*.stories.tsx` に配置する。
- コンポーネント追加時は、最低1つの基本状態ストーリーを作成する。
- 主要なバリアント（例: primary/secondary、empty/loading/error）を網羅する。

### 3.2 Storybook設定に関する制約

- Storybook フレームワークは `@storybook/nextjs` を利用する。
- Addons は既存設定（links / essentials / interactions / chromatic など）を維持する。
- 静的アセットは `public` を参照するため、画像・アイコン利用時は `public` 配下を優先する。

### 3.3 開発時チェック

- ローカル確認コマンド:
  - `yarn storybook`（開発サーバ）
  - `yarn build-storybook`（静的ビルド）

---

## 4. App Router（`src/app`）ルール

### 4.1 ルート構成

- 画面ルートは `src/app/<route>/page.tsx` を作成する。
- 実装本体は `XxxPage.tsx` に分離し、`page.tsx` は薄いエントリーポイントにする既存パターンを優先する。
  - 例: `src/app/dashboard/page.tsx` + `src/app/dashboard/DashboardPage.tsx`

### 4.2 動的ルート

- 動的セグメントは `[id]` / `[exerciseId]` 形式を使用する。
- URLパラメータ処理はページ単位で明示的に型付けする。

### 4.3 レイアウトとProvider

- ルートレイアウトは `src/app/layout.tsx`。
- グローバル provider（Theme / Session / tRPC Client）はレイアウト構造を維持し、追加時は順序影響を確認する。

### 4.4 APIルート

- App Router API は `src/app/api/**/route.ts` に実装する。
- 既存の `pages/api`（NextAuth, tRPC 互換用）との共存を壊さない。

---

## 5. CI/CDルール

### 5.1 GitHub Actions ワークフロー

#### Storybook デプロイ

- ファイル: `.github/workflows/deploy-storybook.yml`
- トリガー: `main` ブランチ push / 手動実行
- Node: `22.x`
- 手順: install → `yarn build-storybook` → GitHub Pages 配備

#### Prisma Migration デプロイ

- ファイル: `.github/workflows/migration.yml`
- トリガー: `main` ブランチへの push かつ `prisma/**` 変更時 / 手動実行
- Node: `18.x`
- `npx prisma migrate deploy` を本番DBへ実行
- `DATABASE_URL` は `secrets.PROD_DATABASE_URL` を使用

### 5.2 変更時の注意点

- `prisma/schema.prisma` または `prisma/migrations/**` を更新した場合、マイグレーション適用前提の整合性を必ず確認する。
- Storybook対象のコンポーネント変更時は、ビルド破壊（型・依存・静的アセット参照切れ）を避ける。
- Nodeバージョン差分（18/22）があるため、依存更新時は互換性を意識する。

---

## 6. 推奨作業フロー（AIエージェント向け）

1. 変更対象の責務を特定（UI / route / API / DB）。
2. 既存実装パターンに合わせて最小差分で実装。
3. 追加したUIの Storybook ストーリーを作成・更新。
4. ルーティング変更時は `page.tsx` と `XxxPage.tsx` 分離を維持。
5. Prisma変更時は migration ファイルの整合性を確認。
6. 最低限 `lint` または影響範囲のビルド/チェックを実行。

---

## 7. 禁止・非推奨事項

- `any` の多用、巨大コンポーネントへの責務集中。
- 既存デザイン規約（Atomic Design / Tailwind方針）からの逸脱。
- Storybook 未更新のままUI仕様を変更すること。
- App Router と Pages Router の境界を無計画に変更すること。
- CIワークフロー（Nodeバージョン、実行コマンド、Secrets参照）の無断変更。

