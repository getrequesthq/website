export function GRMark() {
  return (
    <svg className="dm-frame__mark" viewBox="172 -1 22 20" aria-hidden="true">
      <path d="M177.399 8.9991L175 1C180.738 2.71238 186.149 5.41762 191 8.9991C186.15 12.5811 180.739 15.2869 175.001 17L177.399 8.9991ZM177.399 8.9991H183.986Z" fill="#FFFF00" />
      <path d="M177.399 8.9991L175 1C180.738 2.71238 186.149 5.41762 191 8.9991C186.15 12.5811 180.739 15.2869 175.001 17L177.399 8.9991ZM177.399 8.9991H183.986" stroke="#1a1a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Crumbs({ items }: { items: string[] }) {
  return (
    <div className="dm-frame__crumbs">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <span> / </span>}
          {i === items.length - 1 ? <b>{item}</b> : item}
        </span>
      ))}
    </div>
  )
}
