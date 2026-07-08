import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { message, visible } = useToast();

  return (
    <div className={`fixed bottom-6 right-6 z-50 toast glass-dark px-5 py-3 rounded-xl flex items-center shadow-2xl border border-white/10 ${visible ? 'show' : ''}`}>
      <i className="ph ph-check-circle text-accent-light mr-3 text-xl"></i>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
