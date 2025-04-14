# EveryWorkout UI/UX 標準化ガイド 2.0

## 目次

- [デザインシステム概要](#デザインシステム概要)
- [デザイン原則](#デザイン原則)
- [カラーシステム](#カラーシステム)
- [タイポグラフィ](#タイポグラフィ)
- [コンポーネント](#コンポーネント)
  - [ボタン](#ボタン)
  - [バッジ](#バッジ)
  - [カード](#カード)
  - [リストコンテナ](#リストコンテナ)
  - [フローティングアクションボタン](#フローティングアクションボタン)
  - [タイマー](#タイマー)
  - [フォーム要素](#フォーム要素)
- [レイアウトシステム](#レイアウトシステム)
- [ダークモード](#ダークモード)
- [レスポンシブデザイン](#レスポンシブデザイン)
- [アクセシビリティ](#アクセシビリティ)
- [アイコンと画像](#アイコンと画像)
- [アニメーションとトランジション](#アニメーションとトランジション)
- [実装ガイドライン](#実装ガイドライン)

## デザインシステム概要

EveryWorkoutのUIデザインシステムは、Atomic Designの原則に基づき、モダンで一貫性のあるユーザーエクスペリエンスを提供します。このシステムは拡張性と再利用性を重視し、開発効率とユーザー体験の両方を向上させることを目的としています。

### Atomic Designの階層

1. **アトム**: 基本的なUIの構成要素（ボタン、入力フィールド、ラベルなど）
2. **モレキュール**: アトムを組み合わせた機能単位（検索フォーム、ナビゲーションアイテムなど）
3. **オーガニズム**: モレキュールを組み合わせた複雑なUI部品（ナビゲーション、ワークアウトカードなど）
4. **テンプレート**: ページレベルのレイアウト構造
5. **ページ**: 実際のコンテンツを配置した具体的なページ

## デザイン原則

EveryWorkoutのデザインは以下の原則に基づいています：

1. **シンプリシティ**: 不要な要素を排除し、ユーザーが目的を達成するための最短経路を提供します
2. **一貫性**: 同じパターンと視覚言語を一貫して使用し、学習曲線を最小限に抑えます
3. **アクセシビリティ**: すべてのユーザーが利用できるインクルーシブなデザインを目指します
4. **フィードバック**: ユーザーアクションに対して明確なフィードバックを提供します
5. **効率性**: 最小限のステップで目標を達成できるようにします
6. **美しさ**: 視覚的に魅力的で、使用する喜びを感じられるデザインを提供します

## カラーシステム

EveryWorkoutのカラーシステムは、モダンで活力のある印象を与えながらも、長時間の使用でも目に優しい配色を実現しています。

### プライマリカラー

- **メインカラー**: `#3B82F6` - アクションボタンやアクティブ状態の要素に使用
- **メインカラー（ダーク）**: `#2563EB` - ホバー状態やアクセント
- **メインカラー（ライト）**: `#93C5FD` - 背景やセカンダリ要素

### ニュートラルカラー

- **テキスト（ライトモード）**: `#1F2937` - 通常のテキスト
- **テキスト（セカンダリ）**: `#6B7280` - 補足情報やラベル
- **テキスト（ダークモード）**: `#F9FAFB` - ダークモードでのテキスト
- **背景（ライトモード）**: `#FFFFFF` - 通常の背景
- **背景（セカンダリ）**: `#F3F4F6` - セカンダリ背景、カード
- **背景（ダークモード）**: `#111827` - ダークモードでの背景
- **背景（ダークセカンダリ）**: `#1F2937` - ダークモードでのセカンダリ背景

### セマンティックカラー

- **成功**: `#10B981` - 成功メッセージや完了状態
- **警告**: `#F59E0B` - 注意喚起
- **エラー**: `#EF4444` - エラーメッセージや警告
- **情報**: `#3B82F6` - 情報メッセージ

### グラデーション

- **プライマリグラデーション**: `linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)` - CTAボタンやフォーカス要素
- **アクセントグラデーション**: `linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)` - 特別な強調要素

### 使用ガイドライン

- プライマリカラーはアクションを促す要素（ボタン、リンクなど）に使用
- セマンティックカラーは対応する状態や通知にのみ使用
- テキストと背景のコントラスト比はWCAG AAレベル（4.5:1）以上を確保
- カラーだけでなく、形状や位置などの視覚的手がかりも併用
- ダークモードでは、コントラストを確保するために色の明度を調整

## タイポグラフィ

タイポグラフィは情報の階層を明確にし、読みやすさを確保するために重要な要素です。

### フォントファミリー

- **基本フォント**: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`
- **見出しフォント**: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`
- **モノスペースフォント**: `'JetBrains Mono', 'SF Mono', 'Roboto Mono', Menlo, Consolas, monospace`

### タイポグラフィスケール

- **見出し特大（h1）**: `text-4xl` (2.25rem / 36px), `leading-tight`, `tracking-tight`
- **見出し大（h2）**: `text-3xl` (1.875rem / 30px), `leading-tight`, `tracking-tight`
- **見出し中（h3）**: `text-2xl` (1.5rem / 24px), `leading-snug`
- **見出し小（h4）**: `text-xl` (1.25rem / 20px), `leading-snug`
- **サブ見出し（h5）**: `text-lg` (1.125rem / 18px), `leading-normal`
- **本文（大）**: `text-base` (1rem / 16px), `leading-relaxed`
- **本文（標準）**: `text-sm` (0.875rem / 14px), `leading-relaxed`
- **キャプション**: `text-xs` (0.75rem / 12px), `leading-normal`

### フォントウェイト

- **極細**: `font-extralight` (200)
- **細字**: `font-light` (300)
- **通常**: `font-normal` (400)
- **中太**: `font-medium` (500)
- **太字**: `font-semibold` (600)
- **極太**: `font-bold` (700)
- **特太**: `font-extrabold` (800)

### 行間とレターケーシング

- **タイト**: `leading-tight` (1.25)
- **スナグ**: `leading-snug` (1.375)
- **標準**: `leading-normal` (1.5)
- **リラックス**: `leading-relaxed` (1.625)
- **ルース**: `leading-loose` (2)
- **レターケーシング（タイト）**: `tracking-tight` (-0.025em)
- **レターケーシング（標準）**: `tracking-normal` (0)
- **レターケーシング（ワイド）**: `tracking-wide` (0.025em)

### 使用ガイドライン

- 見出しには太字（`font-semibold`または`font-bold`）と`tracking-tight`を使用
- 本文テキストには通常のウェイト（`font-normal`）と`leading-relaxed`を使用
- 強調したいテキストには中太（`font-medium`）または太字（`font-semibold`）を使用
- フォントサイズは情報の階層を明確にするために一貫して使用
- モバイルでは、見出しのサイズを1段階小さくすることを検討
- 長文のテキストブロックでは`leading-relaxed`を使用して読みやすさを確保

## コンポーネント

### ボタン

ボタンは、ユーザーがアクションを実行するための主要な要素です。

#### バリエーション

- **プライマリボタン**: 主要なアクションに使用
- **セカンダリボタン**: 補助的なアクションに使用
- **テキストボタン**: 軽微なアクションに使用
- **アイコンボタン**: アイコンのみのコンパクトなボタン
- **危険ボタン**: 削除などの取り消せないアクションに使用

#### サイズ

- **大**: フォーカスを集めるアクションに使用
- **中**: 標準的なアクションに使用
- **小**: 補助的なアクションに使用

#### スタイル

```jsx
// プライマリボタン
<Button variant="primary" size="md">ボタンテキスト</Button>

// セカンダリボタン
<Button variant="secondary" size="md">ボタンテキスト</Button>

// テキストボタン
<Button variant="text" size="md">ボタンテキスト</Button>

// アイコンボタン
<Button variant="icon" size="md"><IconComponent /></Button>

// 危険ボタン
<Button variant="danger" size="md">削除</Button>
```

#### デザイン仕様

- 角丸: `rounded-lg`
- トランジション: `transition-all duration-200 ease-in-out`
- フォントウェイト: `font-medium`

##### プライマリボタン
- 背景: `bg-blue-500`
- テキスト: `text-white`
- ホバー時: `hover:bg-blue-600`
- アクティブ時: `active:bg-blue-700`
- 無効時: `disabled:bg-blue-300 disabled:cursor-not-allowed`

##### セカンダリボタン
- 背景: `bg-white dark:bg-gray-800`
- ボーダー: `border border-gray-300 dark:border-gray-600`
- テキスト: `text-gray-700 dark:text-gray-200`
- ホバー時: `hover:bg-gray-50 dark:hover:bg-gray-700`
- アクティブ時: `active:bg-gray-100 dark:active:bg-gray-600`

##### テキストボタン
- テキスト: `text-blue-500 dark:text-blue-400`
- ホバー時: `hover:bg-blue-50 dark:hover:bg-blue-900/20`
- アクティブ時: `active:bg-blue-100 dark:active:bg-blue-900/30`

##### 危険ボタン
- 背景: `bg-red-500`
- テキスト: `text-white`
- ホバー時: `hover:bg-red-600`
- アクティブ時: `active:bg-red-700`

##### サイズバリエーション
- 大: `px-6 py-3 text-base`
- 中: `px-4 py-2 text-sm`
- 小: `px-3 py-1 text-xs`

### バッジ

バッジは、ラベルやタグ、ステータスを表示するための小さな要素です。

#### バリエーション

- **デフォルト**: 一般的な情報に使用
- **プライマリ**: 重要な情報に使用
- **成功**: 成功状態を示す
- **警告**: 注意喚起
- **エラー**: エラー状態を示す
- **情報**: 補足情報を示す

#### スタイル

```jsx
<Badge variant="default" label="ラベルテキスト" />
<Badge variant="primary" label="プライマリ" />
<Badge variant="success" label="成功" />
<Badge variant="warning" label="警告" />
<Badge variant="error" label="エラー" />
<Badge variant="info" label="情報" />
```

#### デザイン仕様

- パディング: `px-2.5 py-1`
- フォントサイズ: `text-xs`
- フォントウェイト: `font-medium`
- 角丸: `rounded-full`
- トランジション: `transition-colors duration-200`

##### デフォルトバッジ
- 背景色（ライトモード）: `bg-gray-100`
- 背景色（ダークモード）: `dark:bg-gray-700`
- テキスト色（ライトモード）: `text-gray-800`
- テキスト色（ダークモード）: `dark:text-gray-200`

##### プライマリバッジ
- 背景色: `bg-blue-100 dark:bg-blue-900/30`
- テキスト色: `text-blue-800 dark:text-blue-300`

##### 成功バッジ
- 背景色: `bg-green-100 dark:bg-green-900/30`
- テキスト色: `text-green-800 dark:text-green-300`

##### 警告バッジ
- 背景色: `bg-yellow-100 dark:bg-yellow-900/30`
- テキスト色: `text-yellow-800 dark:text-yellow-300`

##### エラーバッジ
- 背景色: `bg-red-100 dark:bg-red-900/30`
- テキスト色: `text-red-800 dark:text-red-300`

##### 情報バッジ
- 背景色: `bg-blue-100 dark:bg-blue-900/30`
- テキスト色: `text-blue-800 dark:text-blue-300`

### カード

カードは、関連するコンテンツをグループ化して表示するためのコンテナです。

#### バリエーション

- **デフォルト**: 標準的なカード
- **インタラクティブ**: クリック可能なカード
- **エレベーション**: 影の強さが異なるカード

#### スタイル

```jsx
<Card>
  <CardHeader>
    <CardTitle>カードタイトル</CardTitle>
    <CardDescription>カードの説明文</CardDescription>
  </CardHeader>
  <CardContent>
    カードのコンテンツ
  </CardContent>
  <CardFooter>
    <Button>アクション</Button>
  </CardFooter>
</Card>
```

#### デザイン仕様

- 角丸: `rounded-xl`
- 背景色（ライトモード）: `bg-white`
- 背景色（ダークモード）: `dark:bg-gray-800`
- ボーダー（ライトモード）: `border border-gray-200`
- ボーダー（ダークモード）: `dark:border-gray-700`
- 影（ライトモード）: `shadow-sm`
- パディング: `p-5`
- トランジション: `transition-all duration-200`

##### インタラクティブカード
- ホバー時: `hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600`
- カーソル: `cursor-pointer`

##### カードヘッダー
- パディング: `pb-4`

##### カードタイトル
- フォントサイズ: `text-lg`
- フォントウェイト: `font-semibold`
- テキスト色: `text-gray-900 dark:text-white`

##### カード説明
- フォントサイズ: `text-sm`
- テキスト色: `text-gray-500 dark:text-gray-400`
- マージン: `mt-1`

##### カードコンテンツ
- パディング: `py-2`

##### カードフッター
- パディング: `pt-4`
- ボーダー: `border-t border-gray-200 dark:border-gray-700`
- マージントップ: `mt-2`

### リストコンテナ

リストコンテナは、項目のリストを表示するためのコンテナです。

#### バリエーション

- **デフォルト**: 標準的なリスト
- **インタラクティブ**: クリック可能な項目を含むリスト
- **アイコン付き**: 各項目の前にアイコンを表示するリスト

#### スタイル

```jsx
<ListContainer variant="default">
  <li>リスト項目1</li>
  <li>リスト項目2</li>
</ListContainer>

<ListContainer variant="interactive">
  <li>クリック可能な項目1</li>
  <li>クリック可能な項目2</li>
</ListContainer>
```

#### デザイン仕様

- レイアウト: `flex flex-col`
- 角丸: `rounded-lg`
- オーバーフロー: `overflow-hidden`
- 背景色（ライトモード）: `bg-white`
- 背景色（ダークモード）: `dark:bg-gray-800`
- ボーダー（ライトモード）: `border border-gray-200`
- ボーダー（ダークモード）: `dark:border-gray-700`

##### リスト項目
- パディング: `px-4 py-3`
- 区切り線: `border-b border-gray-100 dark:border-gray-700`
- 最後の項目: `last:border-b-0`

##### インタラクティブリスト項目
- ホバー時: `hover:bg-gray-50 dark:hover:bg-gray-700`
- カーソル: `cursor-pointer`
- トランジション: `transition-colors duration-150`

##### アイコン付きリスト項目
- レイアウト: `flex items-center gap-3`
- アイコン: `text-gray-400 dark:text-gray-500`

### フローティングアクションボタン

フローティングアクションボタン（FAB）は、画面の特定の位置に固定された主要なアクションボタンです。

#### バリエーション

- **標準**: 大きなサイズのFAB
- **ミニ**: 小さなサイズのFAB
- **拡張**: ラベル付きのFAB

#### スタイル

```jsx
// 標準FAB
<FloatingButton variant="standard" href="/path/to/page">
  <PlusIcon />
</FloatingButton>

// ミニFAB
<FloatingButton variant="mini" href="/path/to/page">
  <PlusIcon />
</FloatingButton>

// 拡張FAB
<FloatingButton variant="extended" href="/path/to/page">
  <PlusIcon />
  <span>新規作成</span>
</FloatingButton>
```

#### デザイン仕様

- 位置: `fixed z-50 right-4 bottom-16 md:right-6 md:bottom-6`
- 形状: `rounded-full`
- 背景: `bg-blue-500 dark:bg-blue-600`
- テキスト: `text-white`
- 影: `shadow-lg`
- トランジション: `transition-all duration-200 ease-in-out`
- ホバー時: `hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-xl`
- アクティブ時: `active:bg-blue-700 dark:active:bg-blue-800`

##### 標準FAB
- サイズ: `w-14 h-14`
- アイコンサイズ: `w-6 h-6`

##### ミニFAB
- サイズ: `w-10 h-10`
- アイコンサイズ: `w-5 h-5`

##### 拡張FAB
- パディング: `px-6 py-3`
- レイアウト: `flex items-center gap-2`
- フォントサイズ: `text-sm`
- フォントウェイト: `font-medium`

### タイマー

タイマーは、時間を表示し、制御するためのコンポーネントです。

#### バリエーション

- **標準**: 通常のタイマー表示
- **コンパクト**: 小さいサイズのタイマー
- **カウントダウン**: 特定の時間からカウントダウンするタイマー

#### スタイル

```jsx
// 標準タイマー
<Timer variant="standard" expiryTimeDelta={60} onExpire={() => console.log('Time expired')} />

// コンパクトタイマー
<Timer variant="compact" expiryTimeDelta={60} onExpire={() => console.log('Time expired')} />

// カウントダウンタイマー
<Timer variant="countdown" expiryTimeDelta={60} onExpire={() => console.log('Time expired')} />
```

#### デザイン仕様

- レイアウト: `flex flex-col`
- 背景色（ライトモード）: `bg-white`
- 背景色（ダークモード）: `dark:bg-gray-800`
- テキスト色（ライトモード）: `text-gray-900`
- テキスト色（ダークモード）: `dark:text-white`
- 角丸: `rounded-xl`
- 影（ライトモード）: `shadow-md`
- ボーダー（ダークモード）: `dark:border dark:border-gray-700`
- オーバーフロー: `overflow-hidden`

##### 時間表示
- フォントサイズ: `text-5xl md:text-6xl`
- フォントウェイト: `font-bold`
- パディング: `p-6`
- テキスト配置: `text-center`
- フォントファミリー: `font-mono`

##### コントロールエリア
- レイアウト: `flex justify-between items-center`
- 背景色（ライトモード）: `bg-gray-50`
- 背景色（ダークモード）: `dark:bg-gray-700`
- ボーダー: `border-t border-gray-200 dark:border-gray-600`
- パディング: `p-3`

##### コントロールボタン
- サイズ: `w-10 h-10`
- 角丸: `rounded-full`
- 背景色: `bg-blue-500`
- テキスト色: `text-white`
- ホバー時: `hover:bg-blue-600`
- アクティブ時: `active:bg-blue-700`
- トランジション: `transition-colors duration-150`

### フォーム要素

フォーム要素は、ユーザーからの入力を受け付けるための要素です。

#### 入力フィールド

##### バリエーション

- **標準**: 通常の入力フィールド
- **検索**: 検索用の入力フィールド
- **エラー**: エラー状態の入力フィールド
- **成功**: 成功状態の入力フィールド
- **無効**: 無効状態の入力フィールド

##### スタイル

```jsx
// 標準入力フィールド
<Input id="standard" placeholder="標準入力" />

// 検索入力フィールド
<Input id="search" type="search" placeholder="検索..." icon={<SearchIcon />} />

// エラー入力フィールド
<Input id="error" status="error" errorMessage="入力が無効です" />

// 成功入力フィールド
<Input id="success" status="success" />

// 無効入力フィールド
<Input id="disabled" disabled placeholder="無効" />
```

##### デザイン仕様

- 幅: `w-full`
- パディング: `px-4 py-2`
- フォントサイズ: `text-sm`
- 角丸: `rounded-lg`
- ボーダー（ライトモード）: `border border-gray-300`
- ボーダー（ダークモード）: `dark:border-gray-600`
- 背景色（ライトモード）: `bg-white`
- 背景色（ダークモード）: `dark:bg-gray-700`
- テキスト色（ライトモード）: `text-gray-900`
- テキスト色（ダークモード）: `dark:text-white`
- プレースホルダー色: `placeholder-gray-400 dark:placeholder-gray-500`
- フォーカス時: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600`
- トランジション: `transition-colors duration-200`

##### エラー状態
- ボーダー: `border-red-500 dark:border-red-500`
- フォーカス時: `focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-600 dark:focus:border-red-600`
- エラーメッセージ: `text-xs text-red-500 mt-1`

##### 成功状態
- ボーダー: `border-green-500 dark:border-green-500`
- フォーカス時: `focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600`

##### 無効状態
- 背景色: `bg-gray-100 dark:bg-gray-800`
- テキスト色: `text-gray-500 dark:text-gray-400`
- カーソル: `cursor-not-allowed`

#### セレクトボックス

##### バリエーション

- **標準**: 通常のセレクトボックス
- **エラー**: エラー状態のセレクトボックス
- **無効**: 無効状態のセレクトボックス

##### スタイル

```jsx
// 標準セレクトボックス
<Select id="standard">
  <option value="1">オプション1</option>
  <option value="2">オプション2</option>
</Select>

// エラーセレクトボックス
<Select id="error" status="error" errorMessage="選択が無効です">
  <option value="1">オプション1</option>
  <option value="2">オプション2</option>
</Select>

// 無効セレクトボックス
<Select id="disabled" disabled>
  <option value="1">オプション1</option>
  <option value="2">オプション2</option>
</Select>
```

##### デザイン仕様

- 幅: `w-full`
- パディング: `px-4 py-2`
- フォントサイズ: `text-sm`
- 角丸: `rounded-lg`
- ボーダー（ライトモード）: `border border-gray-300`
- ボーダー（ダークモード）: `dark:border-gray-600`
- 背景色（ライトモード）: `bg-white`
- 背景色（ダークモード）: `dark:bg-gray-700`
- テキスト色（ライトモード）: `text-gray-900`
- テキスト色（ダークモード）: `dark:text-white`
- アイコン: `appearance-none bg-no-repeat bg-right-center pr-10`
- フォーカス時: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600`
- トランジション: `transition-colors duration-200`

#### ラベル

##### スタイル

```jsx
<label
  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  htmlFor="inputId"
>
  ラベルテキスト
</label>
```

##### デザイン仕様

- ディスプレイ: `block`
- フォントサイズ: `text-sm`
- フォントウェイト: `font-medium`
- テキスト色（ライトモード）: `text-gray-700`
- テキスト色（ダークモード）: `dark:text-gray-300`
- マージンボトム: `mb-2`

#### フォームグループ

##### スタイル

```jsx
<div className="space-y-4">
  <div className="form-group">
    <label htmlFor="name">名前</label>
    <Input id="name" placeholder="名前を入力" />
  </div>
  <div className="form-group">
    <label htmlFor="email">メールアドレス</label>
    <Input id="email" type="email" placeholder="メールアドレスを入力" />
  </div>
</div>
```

##### デザイン仕様

- マージン: `space-y-4`

## レイアウトシステム

EveryWorkoutのレイアウトシステムは、一貫性のあるスペーシングと構造を提供し、様々な画面サイズに適応します。

### コンテナシステム

- **最大幅コンテナ**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **中幅コンテナ**: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`
- **小幅コンテナ**: `max-w-2xl mx-auto px-4 sm:px-6 lg:px-8`

### グリッドシステム

Tailwind CSSのグリッドシステムを使用して、レスポンシブなレイアウトを構築します。

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>アイテム1</div>
  <div>アイテム2</div>
  <div>アイテム3</div>
</div>
```

### ページレイアウト

- 基本的なページ構造は、ヘッダー、メインコンテンツ、フッターで構成
- ページの上下にパディングを適用: `pt-16 pb-20`
- ナビゲーションは固定位置: `fixed top-0 left-0 right-0 z-40`
- フッターは固定位置または通常のフロー: `fixed bottom-0 left-0 right-0 z-40` または `mt-auto`

### セクションレイアウト

- セクション間のスペーシング: `py-12 md:py-16 lg:py-20`
- セクション内のコンテンツスペーシング: `space-y-8`
- セクションヘッダー: `mb-8 md:mb-12`

### スペーシングシステム

Tailwind CSSのスペーシングスケールを使用して、一貫性のあるマージンとパディングを適用します。

- **エクストラスモール**: `4px` (`p-1`, `m-1`)
- **スモール**: `8px` (`p-2`, `m-2`)
- **ミディアム**: `16px` (`p-4`, `m-4`)
- **ラージ**: `24px` (`p-6`, `m-6`)
- **エクストララージ**: `32px` (`p-8`, `m-8`)
- **2XL**: `48px` (`p-12`, `m-12`)
- **3XL**: `64px` (`p-16`, `m-16`)

#### スペーシングの使用ガイドライン

- 関連する要素間の間隔: `space-y-4` または `gap-4`
- セクション間の間隔: `my-12` または `py-12`
- コンテナ内のパディング: `p-4 md:p-6 lg:p-8`
- 要素間の水平間隔: `mx-2` または `px-2`

## ダークモード

EveryWorkoutはダークモードをサポートしており、`useDarkMode` フックを使用して実装されています。

### 実装方法

- Tailwind CSSの `dark:` プレフィックスを使用してダークモード用のスタイルを定義
- `localStorage` を使用してユーザーの設定を保存
- `document.documentElement.classList` に `dark` クラスを追加/削除してダークモードを切り替え
- `class` 戦略を使用して、ユーザー設定に基づいてダークモードを適用

### ダークモードのデザイン原則

1. **コントラストを維持する**: ダークモードでもテキストと背景のコントラストを確保
2. **純粋な黒を避ける**: 純粋な黒（#000000）ではなく、暗いグレー（#111827）を使用
3. **彩度を下げる**: 明るい色の彩度を下げて目の疲れを軽減
4. **影の使用を控える**: 影の代わりにボーダーを使用してコンポーネントを区別
5. **色の階層を維持する**: 情報の階層を維持するために、異なる濃さの背景色を使用

### ダークモードのカラーマッピング

| ライトモード | ダークモード |
|------------|------------|
| `bg-white` | `dark:bg-gray-900` |
| `bg-gray-50` | `dark:bg-gray-800` |
| `bg-gray-100` | `dark:bg-gray-700` |
| `text-gray-900` | `dark:text-white` |
| `text-gray-700` | `dark:text-gray-300` |
| `text-gray-500` | `dark:text-gray-400` |
| `border-gray-200` | `dark:border-gray-700` |
| `shadow-md` | `dark:border dark:border-gray-700` |

### ダークモード切り替えコンポーネント

```jsx
const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={darkMode === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
    >
      {darkMode === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  );
};
```

## レスポンシブデザイン

EveryWorkoutはモバイルファーストのアプローチを採用し、様々な画面サイズに最適化されたユーザーエクスペリエンスを提供します。

### ブレークポイント

Tailwind CSSのデフォルトブレークポイントを使用します：

- **sm**: 640px以上 - 小型タブレット、横向きモバイル
- **md**: 768px以上 - タブレット
- **lg**: 1024px以上 - デスクトップ、大型タブレット
- **xl**: 1280px以上 - 大型デスクトップ
- **2xl**: 1536px以上 - 超大型ディスプレイ

### レスポンシブデザイン原則

1. **モバイルファースト**: 最初にモバイル向けのデザインを作成し、その後大きな画面サイズに対応
2. **流動的なレイアウト**: 固定幅ではなく、パーセンテージやビューポート単位を使用
3. **適応型コンポーネント**: 画面サイズに応じて適切に調整されるコンポーネント
4. **コンテンツの優先順位付け**: 小さな画面では最も重要なコンテンツを優先表示

### レスポンシブパターン

#### スタッキング/リフロー

小さな画面では要素を縦に積み重ね、大きな画面では横に並べます。

```jsx
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">コンテンツ1</div>
  <div className="w-full md:w-1/2">コンテンツ2</div>
</div>
```

#### 表示/非表示

画面サイズに応じて要素の表示/非表示を切り替えます。

```jsx
<div className="hidden md:block">大きな画面でのみ表示</div>
<div className="block md:hidden">小さな画面でのみ表示</div>
```

#### サイズ調整

画面サイズに応じて要素のサイズを調整します。

```jsx
<h1 className="text-2xl md:text-3xl lg:text-4xl">レスポンシブな見出し</h1>
<div className="p-4 md:p-6 lg:p-8">レスポンシブなパディング</div>
```

### レスポンシブナビゲーション

小さな画面ではハンバーガーメニュー、大きな画面では水平ナビゲーションを表示します。

```jsx
<nav>
  <div className="flex justify-between items-center">
    <Logo />
    <div className="hidden md:flex space-x-4">
      <NavLink>ホーム</NavLink>
      <NavLink>ワークアウト</NavLink>
      <NavLink>プロフィール</NavLink>
    </div>
    <button className="block md:hidden">
      <MenuIcon className="w-6 h-6" />
    </button>
  </div>
  
  {/* モバイルメニュー */}
  <div className="md:hidden">
    <NavLink>ホーム</NavLink>
    <NavLink>ワークアウト</NavLink>
    <NavLink>プロフィール</NavLink>
  </div>
</nav>
```

## アクセシビリティ

アクセシビリティは、すべてのユーザーが製品を使用できるようにするための重要な要素です。EveryWorkoutは、WCAG 2.1 AAレベルのアクセシビリティ基準を目指しています。

### アクセシビリティの原則

1. **知覚可能**: 情報とユーザーインターフェースコンポーネントは、ユーザーが知覚できる方法で提示される必要があります
2. **操作可能**: ユーザーインターフェースコンポーネントとナビゲーションは操作可能である必要があります
3. **理解可能**: 情報とユーザーインターフェースの操作は理解可能である必要があります
4. **堅牢**: コンテンツは、支援技術を含む様々なユーザーエージェントによって確実に解釈できるように十分に堅牢である必要があります

### 色とコントラスト

- テキストと背景のコントラスト比は、WCAG 2.1 AAレベル（4.5:1）以上を確保
- 色だけに依存せず、形状やテキストなどの追加の視覚的手がかりを提供
- ダークモードでも適切なコントラストを維持

```jsx
// 良い例: 色と形状の両方を使用
<Alert variant="error">
  <AlertIcon><ExclamationIcon /></AlertIcon>
  <AlertTitle>エラーが発生しました</AlertTitle>
  <AlertDescription>入力内容を確認してください</AlertDescription>
</Alert>
```

### キーボードアクセシビリティ

- すべてのインタラクティブな要素は、キーボードでアクセス可能にする
- フォーカス状態を視覚的に明確にする: `focus:ring-2 focus:ring-blue-500 focus:outline-none`
- 論理的なタブ順

## アクセシビリティ

アクセシビリティを確保するためのガイドラインです。

### 色のコントラスト

- テキストと背景のコントラスト比は、WCAG 2.1 AAレベル（4.5:1）以上を確保
- ダークモードでも適切なコントラストを維持

### キーボードナビゲーション

- すべてのインタラクティブな要素は、キーボードでアクセス可能にする
- フォーカス状態を視覚的に明確にする: `focus:outline-none focus:shadow-outline`

### スクリーンリーダー対応

- 意味のある画像には `alt` テキストを提供
- アイコンボタンには、アクセシブルな名前を提供

## アイコンと画像

### アイコン

- Heroicons（@heroicons/react）を使用
- アイコンサイズは一貫して使用: `w-8 h-8`, `w-10 h-10` など
- アイコンボタンには適切なラベルを提供

### 画像

- 画像は適切なサイズと形式で最適化
- レスポンシブな画像を使用: `max-w-full h-auto`

## アニメーションとトランジション

### ホバーエフェクト

- ボタンのホバー時の背景色変更: `hover:bg-[#42bfec] hover:text-white`
- リスト項目のホバー時の背景色変更: `hover:bg-gray-200`

### トランジション

- 色の変化には滑らかなトランジションを適用: `transition-colors duration-200`
- 過度なアニメーションは避け、ユーザーエクスペリエンスを向上させる目的で使用
