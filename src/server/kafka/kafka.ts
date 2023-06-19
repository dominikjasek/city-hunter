import { KafkaTopic } from '~/server/kafka/types';

export const emitKafkaEvent = async ({ topic, message }: { topic: KafkaTopic; message: string }) => {
  const result = await fetch(`${process.env.UPSTASH_KAFKA_REST_URL}/produce/${topic}/${message}`, {
    headers: {
      Authorization: `Basic ${process.env.UPSTASH_KAFKA_AUTHORIZATION_KEY}`,
    },
  });
  const jsonRes = await result.json();
  console.log('kafka result:', jsonRes);
  return jsonRes;
};
