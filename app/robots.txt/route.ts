// Hand-written rather than app/robots.ts: MetadataRoute.Robots can't emit the `schemamap:` (NLWeb) directive.
export const dynamic = 'force-static'

const BASE_URL = 'https://www.getrequest.io'

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    `schemamap: ${BASE_URL}/schemamap.xml`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
