import { FormData } from '../pages/bli-fadder.js';

export function sendEmail(data) {
    const apiEndpoint = '/api/email';

    fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(data.name),
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
      })
      .catch((err) => {
        alert(err);
      });
}