// lib/vapiClient.js
import Vapi from "@vapi-ai/web";

const vapi = new Vapi({
  apiKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
});

export default vapi;
