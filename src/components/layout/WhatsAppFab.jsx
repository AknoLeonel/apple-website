import { whatsappLink } from '../../config/store';
import { WhatsAppIcon } from '../ui/Icons';

const WhatsAppFab = () => (
  <a
    href={whatsappLink('Olá! Gostaria de fazer meu orçamento.')}
    target="_blank"
    rel="noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3 px-4 sm:px-5 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 font-semibold"
  >
    <WhatsAppIcon size={22} />
    <span className="hidden sm:inline">WhatsApp</span>
  </a>
);

export default WhatsAppFab;
