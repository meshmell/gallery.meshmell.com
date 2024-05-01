import { ref, push } from "firebase/database";
import { NextResponse, NextRequest } from "next/server";

import { database } from "@/src/utils/firebase/firebase.config";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const modelSlug = searchParams.get("modelSlug");

    const modelsRef = ref(database, `modelsDownload/${modelSlug}/downloads`);
    await push(modelsRef, { timeStamp: Date.now() });

    return NextResponse.json({ success: true, message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update downloads in database", error);

    return NextResponse.json({ success: false, message: "Failed to update downloads in database", error }, { status: 500 });
  }
}
