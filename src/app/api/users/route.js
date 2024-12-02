import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    const result = await conn.query("SELECT username FROM users WHERE id = ?", [
      id,
    ]);
    
    if (result.length > 0) {
      return NextResponse.json({ username: result[0].username }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
