import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";
import { members } from "@wix/members";

// Cache the anonymous access token for 30 minutes to avoid re-fetching on every request
let cachedAnonToken: { value: string; expiresAt: number } | null = null;

export const wixClientServer = async () => {
  let refreshToken;
  try {
    const cookiesStore = cookies();
    refreshToken = JSON.parse(cookiesStore.get("refreshToken")?.value || "{}");
  } catch (error) {
    console.log(error);
  }

  const isLoggedIn = refreshToken && Object.keys(refreshToken).length > 0;

  // For anonymous users, reuse cached access token if still valid
  const now = Math.floor(Date.now() / 1000);
  const accessToken =
    !isLoggedIn && cachedAnonToken && cachedAnonToken.expiresAt > now + 60
      ? cachedAnonToken
      : { value: "", expiresAt: 0 };

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken: isLoggedIn ? refreshToken : {},
        accessToken,
      },
    }),
  });

  // After client is created, cache the token it generates for anonymous users
  if (!isLoggedIn && accessToken.value === "") {
    try {
      const tokens = await wixClient.auth.generateVisitorTokens();
      if (tokens?.accessToken) {
        cachedAnonToken = tokens.accessToken;
      }
    } catch {
      // ignore — will just re-fetch next time
    }
  }

  return wixClient;
};
