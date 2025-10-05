import { 
  users, 
  scanResults, 
  bookings,
  type User, 
  type InsertUser,
  type ScanResult,
  type InsertScanResult,
  type Booking,
  type InsertBooking
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createScanResult(userId: string, result: InsertScanResult): Promise<ScanResult>;
  getScanResults(userId: string): Promise<ScanResult[]>;
  
  createBooking(userId: string, booking: InsertBooking): Promise<Booking>;
  getBookings(userId: string): Promise<Booking[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createScanResult(userId: string, result: InsertScanResult): Promise<ScanResult> {
    const [scanResult] = await db
      .insert(scanResults)
      .values({ ...result, userId })
      .returning();
    return scanResult;
  }

  async getScanResults(userId: string): Promise<ScanResult[]> {
    return await db
      .select()
      .from(scanResults)
      .where(eq(scanResults.userId, userId))
      .orderBy(desc(scanResults.createdAt));
  }

  async createBooking(userId: string, booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db
      .insert(bookings)
      .values({ ...booking, userId })
      .returning();
    return newBooking;
  }

  async getBookings(userId: string): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }
}

export const storage = new DatabaseStorage();
