'use server';
/**
 * @fileOverview Generates plausible entries for the 'Signal from the Bunker' section.
 *
 * - generateBunkerSignals - A function that generates plausible bunker signals.
 * - BunkerSignalsOutput - The return type for the generateBunkerSignals function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const BunkerSignalsOutputSchema = z.array(
  z.object({
    date: z.string().describe('The date of the signal.'),
    time: z.string().describe('The time of the signal.'),
    status: z.string().describe('The status of the signal.'),
    text: z.string().describe('The text of the signal.'),
  })
);
export type BunkerSignalsOutput = z.infer<typeof BunkerSignalsOutputSchema>;

const possibleTexts = [
  'Exposición del arte de Bloodmoon 21 de diciembre en: Punkware Cyberzine - CABA',
  'Gotra single o Moonshiner EP',
  'Bloodmoon EP acaba de salir.',
  'Nueva colaboración con artista desconocido.',
  'Preparando el próximo lanzamiento sorpresa.',
  'Experimentando con nuevos sonidos y texturas.',
];

export async function generateBunkerSignals(): Promise<BunkerSignalsOutput> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    return [
        { date: '2025-07-22', time: '14:30:15', status: 'LIVE', text: 'Bloodmoon EP just dropped.' },
        { date: '2025-07-25', time: '18:00:00', status: 'NEXT MOVE', text: 'Secret collaboration in the works.' },
        { date: '2025-07-28', time: '11:45:23', status: 'REC', text: 'Experimenting with new sounds...' },
    ];
  }
  return generateBunkerSignalsFlow();
}

const generateBunkerSignalsPrompt = ai.definePrompt({
  name: 'generateBunkerSignalsPrompt',
  output: {schema: BunkerSignalsOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are an AI that generates plausible entries for a \"Signal from the Bunker\" section of a website. Each entry should have a date, time, status, and text.

The entries should mimic cryptic messages and sound mysterious. The status can be one of: LIVE, NEXT MOVE, REC. The date and time should be plausible.

You can choose from the following texts for the text field, or make up your own:\n${possibleTexts.map(text => `- ${text}`).join('\n')}

Generate 3 entries.

Output in JSON format:
`,
});

const generateBunkerSignalsFlow = ai.defineFlow(
  {
    name: 'generateBunkerSignalsFlow',
    outputSchema: BunkerSignalsOutputSchema,
  },
  async () => {
    const {output} = await generateBunkerSignalsPrompt();
    return output!;
  }
);
