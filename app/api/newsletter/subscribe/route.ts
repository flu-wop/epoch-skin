import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data', 'newsletter');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Read existing subscribers
    const subscribersFile = path.join(dataDir, 'subscribers.json');
    let subscribers: string[] = [];
    
    if (existsSync(subscribersFile)) {
      const fileContent = await readFile(subscribersFile, 'utf-8');
      subscribers = JSON.parse(fileContent);
    }

    // Check if email already exists
    if (subscribers.includes(email.toLowerCase())) {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    // Add new subscriber
    subscribers.push(email.toLowerCase());
    
    // Save to file
    await writeFile(subscribersFile, JSON.stringify(subscribers, null, 2));

    // Also log to console for now
    console.log(`New newsletter subscriber: ${email}`);

    return NextResponse.json(
      { message: "Successfully subscribed! Thank you for joining our community." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
