import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const plugins = [];
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_API_KEY_HERE') {
  plugins.push(googleAI({apiKey: process.env.GEMINI_API_KEY}));
}

export const ai = genkit({
  plugins,
});
