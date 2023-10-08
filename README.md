# react-rpg-state-machine

React と StateMachine を使用して RPG の戦闘画面のロジックを作成します。

StateMachine の概念を理解することが目的です。

## logic

一般的な RPG の戦闘ロジックとして以下の順で進みます。

1. プレイヤーの行動を選択
2. プレイヤーの攻撃
3. 敵の攻撃
4. 1 へ戻る or 戦闘終了

- プレイヤーと敵は hp(体力)と atk(攻撃力)の概念があります。
- 攻撃を行う事で atk の数値だけ相手の hp を減少させます。
- どちらかの hp が 0 になると戦闘終了です。

## StateMachine の要素

- context
- state
- transitions
- actions
- events
- guards

## vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
