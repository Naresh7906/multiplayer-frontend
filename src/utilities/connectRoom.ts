import { Client } from "colyseus.js";
import { envConfig } from "../config/envConfig";

// TODO : added error handling

export async function connectRoom() {
  console.log(envConfig.MULTIPLAYER_URL);
  const colyseusClient = new Client(envConfig.MULTIPLAYER_URL);
  return await colyseusClient.joinOrCreate("base_room");
}
