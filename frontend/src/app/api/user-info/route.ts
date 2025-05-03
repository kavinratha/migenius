import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  try {
    // Get the system username
    const username = os.userInfo().username;
    
    // Capitalize first letter
    const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    
    return NextResponse.json({ username: formattedUsername });
  } catch (error) {
    return NextResponse.json({ username: 'Benutzer' });
  }
} 