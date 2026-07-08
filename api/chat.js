/**
 * api/chat.js
 * Serverless function (Vercel-style) that proxies chat requests to Gemini.
 * The real API key lives only here, as a server-side environment variable
 * (GEMINI_API_KEY), never in the browser bundle.
 *
 * Deploying elsewhere?
 * - Netlify: move this file to netlify/functions/chat.js and swap the
 *   `export default function handler(req, res)` signature for Netlify's
 *   `export async function handler(event)` signature.
 * - Any Node server (Express, etc.): mount this logic as a POST route.
 */

const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY' });
    }

    try {
        const { contents, systemInstruction } = req.body;

        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents, systemInstruction })
            }
        );

        if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            return res.status(geminiRes.status).json({ error: errText });
        }

        const data = await geminiRes.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return res.status(502).json({ error: 'No response from model' });
        }

        return res.status(200).json({ text });
    } catch (error) {
        console.error('Chat proxy error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
