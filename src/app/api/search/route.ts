import { NextResponse } from "next/server";
import { searchRecords } from "@/lib/mock-data";

export function GET() {
  return NextResponse.json({ records: searchRecords });
}
