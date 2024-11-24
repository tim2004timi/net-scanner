import getAiResponse from '@/api/getAiResponse';
import Modal from './Modal';

async function AiModal({ data }: { data: { name: string; id: number } }) {
  const aiResponse = await getAiResponse(data.id);

  return <Modal data={{ ...data, aiText: aiResponse }} />;
}

export default AiModal;
