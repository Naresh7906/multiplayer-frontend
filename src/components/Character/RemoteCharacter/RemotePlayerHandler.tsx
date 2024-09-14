import { Room } from "colyseus.js";
import { useEffect } from "react";
import { BaseRoomState } from "../../../schema/BaseRoomState";
import { string } from "three/webgpu";
import { Player } from "../../../schema/Player";

interface RemotePlayerHandlerProps {
  room: Room<BaseRoomState> | null;
}

export function RemotePlayerHandler(props: RemotePlayerHandlerProps) {
  useEffect(() => {
    if (props.room) {
    props.room.state.players.forEach((player:Player,key:string)=>{
        console.log(key," Exists already with data : ",player)
    })
      props.room.state.players.onAdd((player: Player, key: string) => {
        console.log(player);
        return true;
      }, false);
    }
  }, [props.room]);

  return null;
}
