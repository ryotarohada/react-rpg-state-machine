import { useEffect, useState } from "react";

const SELECT = "SELECT";
const PLAYER_TURN = "PLAYER_TURN";
const ENEMY_TURN = "ENEMY_TURN";
const PLAYER_WON = "PLAYER_WON";
const PLAYER_LOST = "PLAYER_LOST";

export const StateMachine = () => {
  // context
  const [playerStatus, setPlayerStatus] = useState({ hp: 20, atk: 3 });
  const [enemyStatus, setEnemyStatus] = useState({ hp: 10, atk: 2 });

  // state
  const [battlePhase, setBattlePhase] = useState(SELECT);

  // transitions
  function selectTransition() {
    setBattlePhase(SELECT);
  }

  function playerTurnTransition() {
    setBattlePhase(PLAYER_TURN);
  }

  function enemyTurnTransition() {
    setBattlePhase(ENEMY_TURN);
  }

  function playerWonTransition() {
    setBattlePhase(PLAYER_WON);
  }

  function playerLostTransition() {
    setBattlePhase(PLAYER_LOST);
  }

  // events
  function selectEvent() {
    selectTransition();
  }

  function playerTurnEvent() {
    playerTurnTransition();
  }

  function enemyTurnEvent() {
    enemyTurnTransition();
  }

  // actions
  function actions() {
    switch (battlePhase) {
      case SELECT:
        break;

      case PLAYER_TURN:
        setEnemyStatus({
          ...enemyStatus,
          hp: enemyStatus.hp - playerStatus.atk,
        });
        break;

      case ENEMY_TURN:
        setPlayerStatus({
          ...playerStatus,
          hp: playerStatus.hp - enemyStatus.atk,
        });
        break;
      case PLAYER_WON:
        alert("You won!");
        break;

      case PLAYER_LOST:
        alert("You lost!");
        break;

      default:
        break;
    }
  }

  // events
  useEffect(() => {
    actions();
  }, [battlePhase]);

  // events & guards
  useEffect(() => {
    if (enemyStatus.hp <= 0) {
      playerWonTransition();
    }
    if (playerStatus.hp <= 0) {
      playerLostTransition();
    }
  }, [playerStatus, enemyStatus]);

  return (
    <>
      <div>
        <p>プレイヤーのHP: {playerStatus.hp}</p>
        <p>敵のHP: {enemyStatus.hp}</p>
      </div>

      <div>
        {battlePhase === SELECT && (
          <>
            <p>プレイヤーの行動を選択</p>
            <button onClick={playerTurnEvent}>Attack</button>
          </>
        )}
        {battlePhase === PLAYER_TURN && (
          <>
            <p>プレイヤーは敵に{playerStatus.atk}のダメージを与えた</p>
            <button onClick={enemyTurnEvent}>next</button>
          </>
        )}
        {battlePhase === ENEMY_TURN && (
          <>
            <p>プレイヤーは{enemyStatus.atk}のダメージを受けた</p>
            <button onClick={selectEvent}>next</button>
          </>
        )}
      </div>
    </>
  );
};
