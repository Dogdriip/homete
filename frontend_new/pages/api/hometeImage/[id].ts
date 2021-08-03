import type { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, registerFont } from "canvas";
import { getHometeById } from "../../../lib/homete";
import { Homete } from "../../../types/homete";
import path from "path";
import { fillTextWithTwemoji } from "node-canvas-with-twemoji-and-discord-emoji";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const homete: Homete = await getHometeById(id as string);

  // Create canvas and get `context`.
  const width = 1200;
  const height = 600;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Register font.
  let basePath = process.cwd();
  if (process.env.NODE_ENV === "production") {
    basePath = path.join(process.cwd(), ".next/server/chunks");
  }
  registerFont(path.join(basePath, "fonts/CookieRun-Regular.ttf"), {
    family: "CookieRun Regular",
  });
  registerFont(path.join(basePath, "fonts/CookieRun-Bold.ttf"), {
    family: "CookieRun Bold",
  });

  // Fill whole background with white.
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, width, height);

  // Define texts.
  const nicknameIsHometed = `@${homete.recipient}님은 칭찬받았어요!`;
  const hometeDescriptionNewLine = homete.description.replace(
    /(.{30})/g,
    "$1\n"
  );
  const hometeUrl = `https://homete.driip.me`;

  // Draw texts.
  context.font = "1.5rem 'CookieRun Regular' sans-serif";
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#000000";
  context.fillText(nicknameIsHometed, 600, 100);

  context.font = "2rem 'CookieRun Regular' sans-serif";
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#000000";
  context.fillText(hometeDescriptionNewLine, 600, 200);
  await fillTextWithTwemoji(context, hometeDescriptionNewLine, 600, 200);

  context.font = "1rem 'CookieRun Regular' sans-serif";
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#000000";
  context.fillText(hometeUrl, 600, 500);

  const buffer = canvas.toBuffer("image/jpeg");

  res.setHeader("Content-Type", "image/jpeg");
  res.status(200).send(buffer);
};

export default handler;
