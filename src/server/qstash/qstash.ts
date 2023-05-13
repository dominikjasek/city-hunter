import { QStashEvent } from '~/server/qstash/types';

export const emitQStashEvent = async (event: QStashEvent) => {
  const res = await fetch(`${process.env.QSTASH_URL}${event.topic}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
    },
    body: JSON.stringify(event.value),
  });
  console.log('res', res);
};
