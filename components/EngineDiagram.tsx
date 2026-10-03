const PIPE_IN = 'M112 130 H324'
const PIPE_OUT = 'M396 130 H608'
const BRANCH = 'M360 166 V304'
const REPLAY = 'M396 340 C 560 340 640 300 640 166'

export type EnginePhase = 'intro' | 'relay' | 'retain' | 'recover'

export function EngineDiagram({ phase }: { phase: EnginePhase }) {
  return (
    <svg
      className="engine-diagram"
      data-phase={phase}
      viewBox="0 0 720 460"
      role="img"
      aria-label="Diagram of the getrequest reliability layer: a client request is relayed through a gateway, retained in a log store, and recoverable via replay back to your API."
    >
      {/* pipes */}
      <path className="engine-diagram__pipe engine-diagram__pipe--in" d={PIPE_IN} />
      <path className="engine-diagram__pipe engine-diagram__pipe--out" d={PIPE_OUT} />
      <path className="engine-diagram__pipe engine-diagram__pipe--branch" d={BRANCH} />
      <path className="engine-diagram__pipe engine-diagram__pipe--replay" d={REPLAY} />

      {/* flowing packets */}
      <circle className="engine-diagram__dot engine-diagram__dot--in" r="5" cx="112" cy="130" />
      <circle className="engine-diagram__dot engine-diagram__dot--out" r="5" cx="396" cy="130" />
      <circle className="engine-diagram__dot engine-diagram__dot--branch" r="4" cx="360" cy="166" />
      <circle className="engine-diagram__dot engine-diagram__dot--replay" r="5" cx="396" cy="340" />

      {/* client node */}
      <g className="engine-diagram__node engine-diagram__node--client" transform="translate(80 130)">
        <rect className="engine-diagram__node-shell" x="-32" y="-32" width="64" height="64" rx="16" />
        <g
          transform="translate(-13 -13) scale(1.08)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="engine-diagram__icon"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </g>
        <text className="engine-diagram__node-name" y="54" textAnchor="middle">Your client</text>
        <text className="engine-diagram__node-sub" y="70" textAnchor="middle">browser · SDK · backend</text>
      </g>

      {/* gateway node */}
      <g className="engine-diagram__node engine-diagram__node--gateway" transform="translate(360 130)">
        <rect className="engine-diagram__node-shell engine-diagram__node-shell--gateway" x="-36" y="-36" width="72" height="72" rx="18" />
        <svg x="-14" y="-14" width="28" height="24" viewBox="172 -1 22 20" className="engine-diagram__mark">
          <path d="M177.399 8.9991L175 1C180.738 2.71238 186.149 5.41762 191 8.9991C186.15 12.5811 180.739 15.2869 175.001 17L177.399 8.9991ZM177.399 8.9991H183.986Z" fill="#FFFF00" />
          <path d="M177.399 8.9991L175 1C180.738 2.71238 186.149 5.41762 191 8.9991C186.15 12.5811 180.739 15.2869 175.001 17L177.399 8.9991ZM177.399 8.9991H183.986" stroke="#1a1a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <text className="engine-diagram__node-name" y="58" textAnchor="middle">getrequest</text>
        <text className="engine-diagram__node-sub" y="74" textAnchor="middle">relay · retain · recover</text>
      </g>

      {/* API node */}
      <g className="engine-diagram__node engine-diagram__node--api" transform="translate(640 130)">
        <rect className="engine-diagram__node-shell" x="-32" y="-32" width="64" height="64" rx="16" />
        <g
          transform="translate(-13 -13) scale(1.08)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="engine-diagram__icon"
        >
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="6" cy="18" r="1" fill="currentColor" stroke="none" />
        </g>
        <text className="engine-diagram__node-name" y="54" textAnchor="middle">Your API</text>
        <text className="engine-diagram__node-sub" y="70" textAnchor="middle">any upstream URL</text>
      </g>

      {/* store node (retain) */}
      <g className="engine-diagram__node engine-diagram__node--store" transform="translate(360 340)">
        <rect className="engine-diagram__node-shell" x="-32" y="-32" width="64" height="64" rx="16" />
        <g
          transform="translate(-13 -13) scale(1.08)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="engine-diagram__icon"
        >
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </g>
        <text className="engine-diagram__node-name" y="54" textAnchor="middle">Log store</text>
        <text className="engine-diagram__node-sub" y="70" textAnchor="middle">durable · searchable</text>
      </g>

      {/* recover payoff mark on the API node */}
      <g className="engine-diagram__recover-burst" transform="translate(640 130)">
        <circle r="10" />
        <path d="M-4 0 L-1 3.5 L5 -3.5" fill="none" stroke="#06080f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
