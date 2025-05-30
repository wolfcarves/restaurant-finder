import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: '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',
});

async function main() {
    const completion = await openai.chat.completions.create({
        model: 'openrouter/auto',
        messages: [
            {
                role: 'user',
                content: 'Hello, how are you?',
            },
        ],
    });

    console.log(completion.choices[0].message);
}

main();
