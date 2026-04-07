import express from "express";
import type { Express, Response, Request } from "express";

export function createApplication(): Express {
  const app = express();

  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "Server is fine" });
  });

  return app;
}
