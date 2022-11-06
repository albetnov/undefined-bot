import { ChatInputCommandInteraction, EmbedBuilder, hyperlink } from "discord.js";

const links = [
  {
    name: "Dart Basics - OOP",
    link: "https://youtu.be/asNdz10WR6w",
  },
  {
    name: "Flutter Basics",
    link: "https://youtu.be/SoX3cel4LRM",
  },
  {
    name: "Deeper Flutter Mainly In Type Safety",
    link: "https://youtu.be/7TOMseh9I2c",
  },
];

const parsedLinks = links.map((item) => hyperlink(item.name, item.link));

const embeds = new EmbedBuilder()
  .setTitle("Flutter Roadmap")
  .setImage("https://storage.googleapis.com/cms-storage-bucket/c823e53b3a1a7b0d36a9.png")
  .setDescription(
    `
  Flutter Roadmap 🎉🎉🎉

  100 Days of Code.

  November

  Week 2 - 3
  ${parsedLinks[0]}

  Week 4
  Collab Dart Projects (Probably creating CLI)

  Week 4 - December Week 3
  ${parsedLinks[1]}

  December Week 4
  Collab Flutter Projects

  Until Day 93
  ${parsedLinks[2]}

  Day 93-100
  Collab Final Flutter Project

  * May Changes from time to time.
  Powered by ${hyperlink("Mas Erico", "https://www.youtube.com/c/EricoDarmawanHandoyo")}.
`
  )
  .setAuthor({ name: "Albet Novendo", url: "https://github.com/albetnov" })
  .setFooter({ text: "You can do this!" });

export default function handler(action: ChatInputCommandInteraction) {
  action.reply({ embeds: [embeds] });
}
