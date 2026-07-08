const items = ['Premium Materials', 'Sustainable Design', 'Award Winning', 'Free Global Shipping'];

function MarqueeGroup({ ariaHidden }) {
  return (
    <div className="flex items-center space-x-12 marquee-content" aria-hidden={ariaHidden || undefined}>
      {items.map((text, i) => (
        <span key={i} className="flex items-center space-x-12">
          <span className="text-2xl font-serif italic text-brand-300">{text}</span>
          <i className="ph ph-star-four text-brand-200"></i>
        </span>
      ))}
    </div>
  );
}

export default function FeaturedMarquee() {
  return (
    <section id="featured" className="py-10 bg-white border-y border-brand-100 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

      <div className="flex space-x-12 whitespace-nowrap animate-[scroll_40s_linear_infinite] px-4 hover:[animation-play-state:paused]">
        <MarqueeGroup />
        <MarqueeGroup ariaHidden="true" />
      </div>
    </section>
  );
}
