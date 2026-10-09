# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code へのガイドです。

## プロジェクト概要

task-board — タスク管理ボードアプリケーション。タスクの追加・完了切り替え・削除ができ、タスクはブラウザの localStorage に保存される。

## デプロイ先

https://nrbt39-rgb.github.io/task-board/

- `main` へのプッシュで GitHub Actions([.github/workflows/deploy.yml](.github/workflows/deploy.yml))が自動でビルド・デプロイする。
- サブパスで配信されるため、[vite.config.js](vite.config.js) の `base: '/task-board/'` は変更しないこと。

## 技術スタック

- **React 19**(関数コンポーネント + Hooks)
- **Vite 8**(開発サーバー・ビルド、`@vitejs/plugin-react`)
- **JavaScript(JSX)** — TypeScript は未導入
- **CSS** — プレーンな CSS ファイル(CSS フレームワークは未導入)
- **データ保存** — localStorage(キー: `task-board.tasks`)。バックエンドなし
- **ホスティング** — GitHub Pages(GitHub Actions でデプロイ)
- テスト・Lint は未導入

## ディレクトリ構成

```
index.html          エントリー HTML
vite.config.js      Vite 設定(base パスを含む)
src/
  main.jsx          React のマウント処理
  App.jsx           アプリ本体(タスクの状態管理と画面)
  App.css           スタイル
.github/workflows/
  deploy.yml        GitHub Pages への自動デプロイ
```

## 開発コマンド

- 依存関係のインストール: `npm install`
- 開発サーバー起動: `npm run dev`(http://localhost:5173/task-board/)
- 本番ビルド: `npm run build`(`dist/` に出力)
- ビルド結果の確認: `npm run preview`

## コンポーネントの命名規約

- **コンポーネント名・ファイル名**: PascalCase。1ファイル1コンポーネントで、ファイル名とコンポーネント名を一致させる(例: `TaskItem.jsx` の `TaskItem`)。
- **拡張子**: JSX を含むファイルは `.jsx`、含まないものは `.js`。
- **定義方法**: `function` 宣言の関数コンポーネントを `export default` する(例: `export default function App()`)。
- **配置**: コンポーネントを分割する場合は `src/components/` に置く。
- **イベント処理関数**: 動詞 + 名詞の camelCase(例: `addTask`、`toggleTask`、`deleteTask`)。
- **カスタムフック**: `use` で始める(例: `useTasks`)。
- **定数**: UPPER_SNAKE_CASE(例: `STORAGE_KEY`)。
- **CSS クラス名**: kebab-case(例: `task-list`、`add-form`)。状態を表すクラスは単語1つで併記する(例: `task done`)。
- **localStorage のキー**: `task-board.` で始める(例: `task-board.tasks`)。

## Git運用ルール

**コードを変更するたびに、コミットして GitHub にプッシュすること。**

1. 変更が一区切りついたら(機能追加・修正・リファクタリングの単位で)すぐにコミットする。
2. コミット後は必ず `git push` で GitHub のリモートに反映する。変更をローカルだけに溜めない。
3. プッシュ前に、テストや Lint がある場合は実行して通ることを確認する。
4. コミットメッセージは変更内容が分かる簡潔な日本語または英語で書く(例: `タスクのドラッグ&ドロップ機能を追加`)。
5. 1コミットには関連する変更のみを含める。無関係な変更は分けてコミットする。
6. `.env` や認証情報などの秘密情報はコミットしない(`.gitignore` に追加する)。
7. `git push --force` や履歴の書き換えは、ユーザーの明示的な指示がない限り行わない。
8. プッシュが失敗した場合(リモートが先行している等)は、`git pull --rebase` で取り込んでから再度プッシュする。コンフリクトが発生したらユーザーに確認する。
