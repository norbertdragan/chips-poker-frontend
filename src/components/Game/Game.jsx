import React, { useState, useContext } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import WebSocket from "./WebSocket";
import { DispatchContext, StateContext } from "../store/context";
import { Button } from "../Controls";
import GameAPI from "./GameAPI";

const SOCKET_URL_DCV = "ws://209.250.254.100:9000/";
const SOCKET_URL_BVV = "ws://95.179.192.102:9001/";
const SOCKET_URL_PLAYER1 = "ws://45.77.52.117:9002";
const SOCKET_URL_PLAYER2 = "ws://217.69.0.32:9003";

// For testing
const SOCKET_URL_ECHO = "wss://echo.websocket.org";

const Game = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  return (
    <div>
      <div
        css={css`
          position: absolute;
          z-index: 5;
        `}
      >
        {state.gameStarted === false && (
          <Button
            label="Starts"
            onClick={
              () =>
                // GameAPI.sendMessage({ method: "game" }, "dcv", state, dispatch)
                GameAPI.sendMessage(
                  {
                    method: "replay",
                    action: "round_betting",
                    playerid: 1,
                    round: 1,
                    pot: 4000000,
                    actions: [5, 3, 3],
                    possibilities: [0, 1, 2, 3, 4, 5, 6, 7],
                    min_amount: 0,
                    gui_playerID: 1
                  },
                  "player2",
                  state,
                  dispatch
                )
              // GameAPI.toggleControls(dispatch)
            }
          />
        )}
      </div>
      <WebSocket
        nodeName="dcv"
        server={SOCKET_URL_DCV}
        message={state.message.bvv}
      />
      <WebSocket
        nodeName="bvv"
        server={SOCKET_URL_BVV}
        message={state.message.bvv}
      />
      <WebSocket
        nodeName="player1"
        server={SOCKET_URL_PLAYER1}
        message={state.message.player1}
      />
      <WebSocket
        nodeName="player2"
        server={SOCKET_URL_ECHO}
        message={state.message.player2}
      />
    </div>
  );
};

export default Game;
