import type { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, registerFont } from "canvas";
import { getHometeById } from "../../../lib/homete";
import { Homete } from "../../../types/homete";

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
  registerFont("public/fonts/CookieRunFont/CookieRun-Regular.ttf", {
    family: "CookieRun Regular",
  });
  registerFont("public/fonts/CookieRunFont/CookieRun-Bold.ttf", {
    family: "CookieRun Bold",
  });

  // Fill whole background with white.
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, width, height);

  // Define texts.
  const nicknameIsHometed = `@${homete.recipient}님은 칭찬받았어요!`;
  const hometeUrl = `https://homete.driip.me`;
  const hometeDescription = homete.description;

  // Draw texts.
  context.font = "1rem 'CookieRun Regular' sans-serif";
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#000000";
  context.fillText(nicknameIsHometed, 600, 100);

  context.font = "2rem 'CookieRun Regular' sans-serif";
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#000000";
  context.fillText(homete.description, 600, 200);

  const buffer = canvas.toBuffer("image/jpeg");

  res.setHeader("Content-Type", "image/jpeg");
  res.status(200).send(buffer);
};

export default handler;
