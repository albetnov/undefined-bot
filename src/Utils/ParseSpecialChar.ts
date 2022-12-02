import { GuildMember } from "discord.js";
import env from "./env";

export default function parseSpecialChar(str: string, member?: GuildMember) {
  return str
    .replace(/\[SERVER_NAME\]/, env("SERVER_NAME"))
    .replace(/\[MEMBER_NAME\]/, member ? member.displayName : "Undefined Member");
}
