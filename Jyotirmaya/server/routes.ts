import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertScanResultSchema, insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await storage.createUser(userData);
      
      res.json({ 
        user: { 
          id: user.id, 
          email: user.email,
          phone: user.phone,
          dataConsent: user.dataConsent 
        } 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ 
        user: { 
          id: user.id, 
          email: user.email,
          phone: user.phone,
          dataConsent: user.dataConsent 
        } 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/scan-results", async (req, res) => {
    try {
      const { userId, ...scanData } = req.body;
      
      if (!userId) {
        return res.status(401).json({ error: "User ID required" });
      }

      const resultData = insertScanResultSchema.parse(scanData);
      const result = await storage.createScanResult(userId, resultData);
      
      res.json({ result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/scan-results/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(401).json({ error: "User ID required" });
      }

      const results = await storage.getScanResults(userId);
      res.json({ results });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const { userId, ...bookingData } = req.body;
      
      if (!userId) {
        return res.status(401).json({ error: "User ID required" });
      }

      const validatedBooking = insertBookingSchema.parse(bookingData);
      const booking = await storage.createBooking(userId, validatedBooking);
      
      res.json({ booking });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/bookings/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(401).json({ error: "User ID required" });
      }

      const userBookings = await storage.getBookings(userId);
      res.json({ bookings: userBookings });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
