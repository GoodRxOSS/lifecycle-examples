/**
 * Copyright 2025 GoodRx, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Filter out sensitive environment variables if needed
    const envVars = { ...process.env };

    // Convert to array of key-value pairs and sort alphabetically
    const sortedEnvVars = Object.entries(envVars)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .reduce(
        (acc, [key, value]) => {
          // Mask sensitive values that might contain tokens or keys
          const isSensitive = /key|token|password|secret/i.test(key);
          acc[key] = isSensitive ? "********" : value;
          return acc;
        },
        {} as Record<string, string | undefined>,
      );

    return NextResponse.json(sortedEnvVars);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch environment variables" },
      { status: 500 },
    );
  }
}
