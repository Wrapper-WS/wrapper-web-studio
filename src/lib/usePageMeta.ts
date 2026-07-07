import { useEffect } from 'react'

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = `${title} | Wrapper Web Studio`
    document.title = fullTitle

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      const previous = tag.getAttribute('content')
      tag.setAttribute('content', description)

      // Restore the site-wide default when navigating away, so we don't
      // leak a page-specific description onto the next route by mistake.
      return () => {
        if (previous) tag?.setAttribute('content', previous)
      }
    }
  }, [title, description])
}