import fetch from 'node-fetch';

export async function getComments() {
  const body = await fetch('https://app.fakejson.com/q', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: process.env.FAKE_JSON_TOKEN,
      data: {
        firstName: 'nameFirst',
        _repeat: 9,
      },
    }),
  }).then((result) => result.json());

  return body;
}

export default {};
