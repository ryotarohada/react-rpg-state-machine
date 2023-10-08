import { useEffect, useState } from "react";

const SELECT = "SELECT";
const PLAYER_TURN = "PLAYER_TURN";
const ENEMY_TURN = "ENEMY_TURN";
const PLAYER_WON = "PLAYER_WON";
const PLAYER_LOST = "PLAYER_LOST";

export const StateMachine = () => {
  // context
  const [playerStatus, setPlayerStatus] = useState({ hp: 20, atk: 3, spd: 3 });
  const [enemyStatus, setEnemyStatus] = useState({ hp: 10, atk: 2, spd: 2 });
  const [isPlayerEndTurn, setIsPlayerEndTurn] = useState(false);
  const [isEnemyEndTurn, setIsEnemyEndTurn] = useState(false);

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
        setIsPlayerEndTurn(false);
        setIsEnemyEndTurn(false);
        break;

      case PLAYER_TURN:
        setEnemyStatus({
          ...enemyStatus,
          hp: enemyStatus.hp - playerStatus.atk,
        });
        setIsPlayerEndTurn(true);
        break;

      case ENEMY_TURN:
        setPlayerStatus({
          ...playerStatus,
          hp: playerStatus.hp - enemyStatus.atk,
        });
        setIsEnemyEndTurn(true);
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

  function decideFirstAttacker(spd_1, spd_2) {
    const randomNum = Math.random() * (spd_1 + spd_2);
    return randomNum <= spd_1;
  }

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
            <button
              onClick={() => {
                if (decideFirstAttacker(playerStatus.spd, enemyStatus.spd)) {
                  playerTurnEvent();
                } else {
                  enemyTurnEvent();
                }
              }}
            >
              Attack
            </button>
          </>
        )}
        {battlePhase === PLAYER_TURN && (
          <>
            <p>プレイヤーは敵に{playerStatus.atk}のダメージを与えた</p>
            <button
              onClick={() => {
                if (!isEnemyEndTurn) {
                  enemyTurnEvent();
                  return;
                }
                selectEvent();
              }}
            >
              next
            </button>
          </>
        )}
        {battlePhase === ENEMY_TURN && (
          <>
            <p>プレイヤーは{enemyStatus.atk}のダメージを受けた</p>
            <button
              onClick={() => {
                if (!isPlayerEndTurn) {
                  playerTurnEvent();
                  return;
                }
                selectEvent();
              }}
            >
              next
            </button>
          </>
        )}
      </div>
    </>
  );
};
