// Pure CSS entrance animation. Content is always in the DOM and will
// always resolve to fully visible on its own — it never depends on
// scroll position, an IntersectionObserver firing, or JS running at
// all. This replaces an earlier pattern that set opacity:0 via JS and
// only revealed content once scrolled into view, which could leave
// content invisible indefinitely if the observer never fired.
export function RevealCard({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  return (
    <div className="reveal-enter" style={{ animationDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}