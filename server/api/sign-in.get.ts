import { defineEventHandler } from "h3";
import { useRuntimeConfig } from "#imports";
import LogtoClient from "@logto/node";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const logto = new LogtoClient({
        endpoint: config.logto.endpoint,
        appId: config.logto.appId,
        appSecret: config.logto.appSecret,
    });

    const redirectUri = `${event.node.req.headers.origin}/callback`;
    const url = await logto.getSignInUrl(redirectUri);

    return {
        statusCode: 302,
        headers: {
            Location: url,
        },
    };
});
