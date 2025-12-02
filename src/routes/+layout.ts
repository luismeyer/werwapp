import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
import { dev } from "$app/environment";

injectSpeedInsights();

inject({ mode: dev ? "development" : "production" });
