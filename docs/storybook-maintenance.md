# Storybook メンテナンス手順書

> 対象プロジェクト: EveryWorkout  
> Storybook バージョン: 8.2.2

## 概要

Storybookの定期メンテナンス作業を標準化するためのチェックリストです。
新しいコンポーネントが追加されたとき、またはコード修正後の品質確認として実施してください。

---

## 1. ストーリーの網羅性確認

### 1.1 未ストーリー化コンポーネントの確認

```bash
# クライアントコンポーネントとストーリーファイルを比較する
diff <(ls src/components/*.tsx | grep -v '.stories.' | xargs -I{} basename {} .tsx | sort) \
     <(ls src/components/*.stories.tsx | xargs -I{} basename {} .stories.tsx | sort)
```

- [ ] `src/components/` 内の全クライアントコンポーネントにストーリーがあるか確認
- [ ] サーバーコンポーネント（`src/components/server/` 配下）はスキップ（Storybook非対応）
- [ ] ストーリーが不足しているコンポーネントをリストアップして追加

**現時点での未対応コンポーネント（要将来対応）:**

| コンポーネント | 理由 | 対処方針 |
|---|---|---|
| `WorkoutCard.tsx` | tRPC フック（`useMutation`）依存 | MSW 導入後に追加 |
| `AuthShowcase.tsx` | NextAuth `useSession` 依存 | NextAuth モックデコレーター導入後に追加 |

### 1.2 新規ストーリー作成パターン

**パターン A: Props のみのシンプルなコンポーネント**

```tsx
import { MyComponent } from "./MyComponent";

export default {
    component: MyComponent,
    title: 'MyComponent',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        label: 'サンプル',
    },
};
```

**パターン B: 内部状態（useState）が必要なコンポーネント**

```tsx
import { useState } from "react";
import { MyComponent } from "./MyComponent";
import meta from "./MyComponent.stories";

export default {
    component: MyComponent,
    title: 'MyComponent',
    tags: ['autodocs'],
};

export const Default = {
    render: function Comp() {
        const [value, setValue] = useState('');
        return (
            <meta.component
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        );
    },
};
```

### 1.3 ストーリー作成チェックリスト

- [ ] 全必須 Props を網羅したデフォルトストーリーがあるか
- [ ] Props のバリエーション（variant, disabled など）をストーリーで表現しているか
- [ ] `date` 型の Props は `new Date()` オブジェクトで渡しているか（文字列不可）
- [ ] `<li>` 要素を含むコンポーネントは `<ul>` でラップしているか（セマンティック HTML）
- [ ] 日本語文言を含むコンポーネントは日本語テストデータを使用しているか

---

## 2. コード修正に伴う整合性確認

コンポーネントの Props が変更された場合、対応するストーリーも更新が必要です。

### 2.1 確認手順

1. 変更されたコンポーネントファイルを特定する
2. 対応する `.stories.tsx` を開く
3. `args` の型が現在の Props と一致しているか確認する

```bash
# 変更されたコンポーネントに対応するストーリーを確認
git diff --name-only HEAD~1 | grep '.tsx' | grep -v '.stories.'
```

### 2.2 よくある不整合パターン

| 不整合の内容 | 確認方法 | 対処 |
|---|---|---|
| Props 名の変更（例: `layout` → `variant`） | story の `args` を目視確認 | args を新しい Props 名に更新 |
| Props の追加・削除 | TypeScript のビルドエラー | `yarn build-storybook` で検出・修正 |
| 必須 Props の追加 | `yarn build-storybook` でエラー | デフォルト値を args に追加 |
| `title` の誤字 | Storybook UI で確認 | `export default` の `title` フィールドを修正 |

### 2.3 整合性チェックリスト

- [ ] `yarn build-storybook` でビルドエラーがないか確認
- [ ] 変更したコンポーネントのストーリーを Storybook UI で目視確認
- [ ] Autodocs に表示される Props 一覧が実装と一致しているか確認
- [ ] story の `args` に廃止された Props が残っていないか確認

---

## 3. アクションテスト（play 関数）の追加

### 3.1 概要

`@storybook/test` と `@storybook/addon-interactions` がインストール済みです。
ユーザー操作が重要なコンポーネントには `play()` 関数を追加してください。

### 3.2 基本パターン

```tsx
import { expect, fn, userEvent, within } from '@storybook/test';

export const Interactive = {
    args: {
        onClick: fn(),  // スパイ関数でコールバックを検証
    },
    play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: Record<string, unknown> }) => {
        const canvas = within(canvasElement);
        // クリック操作
        await userEvent.click(canvas.getByRole('button', { name: 'ボタン名' }));
        // コールバックが呼ばれたことを検証
        expect(args.onClick).toHaveBeenCalled();
    },
};
```

### 3.3 フォームのテストパターン

```tsx
import { type ChangeEvent, useState } from "react";
import { expect, fn, userEvent, within } from '@storybook/test';
import { MyForm } from "./MyForm";
import meta from "./MyForm.stories";

const submitSpy = fn();  // モジュールレベルで定義してplay関数から参照できるようにする

export const Interactive = {
    render: function Comp() {
        const [value, setValue] = useState('');
        return (
            <meta.component
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                onSubmit={submitSpy}
            />
        );
    },
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        await userEvent.type(canvas.getByPlaceholderText('入力欄'), 'テスト入力');
        await userEvent.click(canvas.getByRole('button', { name: '送信' }));
        expect(submitSpy).toHaveBeenCalled();
    },
};
```

### 3.4 インタラクションテスト追加チェックリスト

- [ ] クリック可能な UI 要素（ボタン、チェックボックス）がある場合は `play()` を追加
- [ ] フォームコンポーネントは入力→送信の一連の操作をテスト
- [ ] `getByRole` を優先し、aria-label や role 属性でクエリする（`querySelector` は最終手段）
- [ ] `fn()` スパイを使ってコールバック呼び出しを検証する
- [ ] `userEvent.type()` でテキスト入力、`userEvent.click()` でクリック操作
- [ ] 非同期操作には `await` を付ける

### 3.5 play 関数の未実装コンポーネント（優先度順）

| コンポーネント | テスト対象操作 | 難易度 | 備考 |
|---|---|---|---|
| `Dropdown` | ドロップダウン開閉トグル | 低 | |
| `Timer` | 再生/一時停止/リセットボタン | 低 | aria-label が設定済みで取得しやすい |
| `Badge` | onClick コールバック（任意） | 低 | |
| `FloatingButton` | onClick コールバック | 低 | |
| `ExerciseSelector` | 部位選択・種目選択のフロー | 高 | 複数ステップの遷移あり |

---

## 4. 自動テスト実行

### 4.1 test-storybook（Storybook Test Runner）

play() 関数のある全ストーリーを Playwright で自動実行します。

```bash
# ターミナル 1: Storybook を起動
yarn storybook

# ターミナル 2: テスト実行
yarn test-storybook
```

- [ ] 全テストが PASS していることを確認
- [ ] 失敗したテストのエラーメッセージを記録・修正

### 4.2 Storybook ビルド確認

```bash
yarn build-storybook
```

- [ ] ビルドエラーがないか確認（TypeScript エラー、import エラー）
- [ ] `storybook-static/` ディレクトリが生成されているか確認

---

## 5. アクセシビリティ（a11y）確認

### 5.1 手動確認（Storybook UI）

1. `yarn storybook` を起動
2. 各ストーリーを開き、下部パネルの「Accessibility」タブを確認
3. Violations（赤）が 0 件であることを確認

- [ ] 全ストーリーで Violations が 0 件か確認
- [ ] インタラクティブ要素に適切な `aria-label` があるか確認
- [ ] フォームの `<input>` / `<textarea>` に対応する `<label>` があるか確認
- [ ] カラーコントラスト比が WCAG AA 基準（4.5:1）を満たしているか確認

### 5.2 既知の a11y 改善項目

| コンポーネント | 問題 | 修正案 |
|---|---|---|
| `Paginator.tsx` | ChevronIcon に aria-label がない | `aria-label="前のページ"` / `aria-label="次のページ"` を追加 |
| `DropdownItem.tsx` | `<li>` の onClick に role がない | `role="menuitem"` と `tabIndex={0}` の追加を検討 |

---

## 6. ビジュアルリグレッションテスト（Chromatic）

`@chromatic-com/storybook` がインストール済みです。

```bash
npx chromatic --project-token=<YOUR_TOKEN>
```

- [ ] Chromatic プロジェクトトークンを環境変数 `CHROMATIC_PROJECT_TOKEN` に設定
- [ ] ベースラインとの差分がないか確認
- [ ] 意図した UI 変更は Chromatic 上で承認（Accept）する
- [ ] PR マージ前に Chromatic チェックが通っているか確認

---

## 7. バージョン確認

### 7.1 Storybook アップデートの確認

```bash
npx storybook@latest upgrade
```

- [ ] `@storybook/nextjs`, `@storybook/test`, `@storybook/addon-interactions` を同時更新
- [ ] `@chromatic-com/storybook` のバージョン互換性を確認
- [ ] バージョンアップ後に全ストーリーを再確認

---

## 8. 将来対応予定（Future Work）

### 8.1 MSW 導入後に追加するストーリー

`msw` と `msw-storybook-addon` を導入後:
- `WorkoutCard.stories.tsx` — tRPC `api.workout.update.useMutation` のモック
- `AuthShowcase.stories.tsx` — NextAuth `useSession` のモック

**導入手順の概要:**
```bash
yarn add -D msw msw-storybook-addon
npx msw init public/
```

### 8.2 Paginator のテスト安定性向上

`Paginator.tsx` の各 Icon に `aria-label` を追加することで、
play() 関数内の SVG クエリが安定します。

```tsx
<ChevronLeftIcon aria-label="前のページ" className="w-8 h-8 cursor-pointer" onClick={viewPrev} />
<ChevronRightIcon aria-label="次のページ" className="w-8 h-8 cursor-pointer" onClick={viewNext} />
```

### 8.3 型安全なストーリーへの移行

現在は型なしで書かれているストーリーが多数あります。
新規作成時は `Meta` / `StoryObj` 型の使用を推奨します:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
    component: MyComponent,
    title: 'MyComponent',
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
    args: { ... },
};
```

---

## 定期メンテナンスチェックリスト

### コード修正のたびに実施

- [ ] 変更コンポーネントの story args が Props と一致しているか確認
- [ ] `yarn build-storybook` でビルドエラーなし

### 月次で実施

- [ ] 新規コンポーネントのストーリー追加
- [ ] 全ストーリーの目視確認（Autodocs 含む）
- [ ] アクセシビリティ Violations が 0 件
- [ ] `yarn test-storybook` 全テスト PASS

### 四半期で実施

- [ ] Chromatic ビジュアルリグレッション確認
- [ ] Storybook / アドオンのバージョンアップ確認
- [ ] Future Work 項目の見直し（MSW 導入の検討など）

---

## メンテナンス作業ログ

| 日付 | 作業内容 | 担当者 | 結果 |
|---|---|---|---|
| 2026-05-09 | 初回メンテナンス。ストーリー追加（DropdownItem, NotLoggedInCard, RecordCard）、play関数追加（Button, EditNoteForm, EditGoalForm, DropdownItem）、整合性修正（Badge誤字、Button variant） | - | 完了 |
