export function TrafficFlow() {
  return (
    <section className="section section--dark tf-section" aria-labelledby="tf-heading">
      <div className="container">
        <div className="section__header">
          <span className="label">// the reliability layer</span>
          <h2 className="heading-xl" id="tf-heading">
            Every request relayed safely.<br />Every failure recoverable.
          </h2>
          <p className="section__sub">
            getrequest sits between your clients and your backend as a protective reliability layer. Requests are relayed in real time, retained in full before they reach your infrastructure, and recoverable on demand — even after downtime.
          </p>
        </div>

        <div className="tf">
          {/* ── Main flow diagram ── */}
          <div className="tf__scene">

            {/* Row: Client → pipe → getrequest → pipe → API */}
            <div className="tf__flow" aria-hidden="true">

              {/* Client node */}
              <div className="tf__node">
                <div className="tf__node-shell">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                  </svg>
                </div>
                <span className="tf__node-name">Your client</span>
                <span className="tf__node-sub">browser · SDK · backend</span>
              </div>

              {/* Pipe: client → getrequest */}
              <div className="tf__pipe">
                <div className="tf__pipe-label">HTTP request</div>
                <div className="tf__pipe-track">
                  <span className="tf__arrow">→</span>
                  <span className="tf__dot tf__dot--ok" style={{ animationDelay: '0s' }}></span>
                  <span className="tf__dot tf__dot--ok" style={{ animationDelay: '1.4s' }}></span>
                  <span className="tf__dot tf__dot--ok" style={{ animationDelay: '2.8s' }}></span>
                  <span className="tf__dot tf__dot--err" style={{ animationDelay: '4.5s' }}></span>
                </div>
              </div>

              {/* getrequest node */}
              <div className="tf__node tf__node--gr">
                <div className="tf__node-shell tf__node-shell--gr">
                  <svg viewBox="0 0 192 41" fill="none" aria-hidden="true">
                    <path d="M177.399 8.9991L175 1C180.738 2.71238 186.149 5.41762 191 8.9991C186.15 12.5811 180.739 15.2869 175.001 17L177.399 8.9991ZM177.399 8.9991H183.986Z" fill="#FFFF00"/>
                    <path d="M177.399 8.9991L175 1C180.738 2.71238 186.149 5.41762 191 8.9991C186.15 12.5811 180.739 15.2869 175.001 17L177.399 8.9991ZM177.399 8.9991H183.986" stroke="#1a1a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="tf__node-name">getrequest</span>
                <span className="tf__node-sub">proxy · capture · relay</span>
                {/* Capture pulse rings */}
                <span className="tf__node-ring tf__node-ring--1" aria-hidden="true"></span>
                <span className="tf__node-ring tf__node-ring--2" aria-hidden="true"></span>
              </div>

              {/* Pipe: getrequest → API */}
              <div className="tf__pipe">
                <div className="tf__pipe-label">transparent forward</div>
                <div className="tf__pipe-track">
                  <span className="tf__arrow">→</span>
                  <span className="tf__dot tf__dot--ok" style={{ animationDelay: '0.25s' }}></span>
                  <span className="tf__dot tf__dot--ok" style={{ animationDelay: '1.65s' }}></span>
                  <span className="tf__dot tf__dot--ok" style={{ animationDelay: '3.05s' }}></span>
                </div>
              </div>

              {/* API node */}
              <div className="tf__node">
                <div className="tf__node-shell">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="8" rx="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2"/>
                    <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none"/>
                    <circle cx="6" cy="18" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <span className="tf__node-name">Your API</span>
                <span className="tf__node-sub">any upstream URL</span>
              </div>
            </div>

            {/* Capture branch from getrequest downward */}
            <div className="tf__branch" aria-hidden="true">
              <div className="tf__branch-line">
                <span className="tf__capture-dot" style={{ animationDelay: '0.5s' }}></span>
                <span className="tf__capture-dot" style={{ animationDelay: '1.9s' }}></span>
                <span className="tf__capture-dot" style={{ animationDelay: '3.3s' }}></span>
              </div>
              <span className="tf__branch-label">captured</span>
            </div>

            {/* Live inspector log panel */}
            <div className="tf__inspector" role="img" aria-label="Live request inspector showing captured logs">
              <div className="tf__inspector-bar">
                <span className="tf__inspector-dot"></span>
                <span className="tf__inspector-dot"></span>
                <span className="tf__inspector-dot"></span>
                <span className="tf__inspector-title">Live Inspector</span>
                <span className="tf__inspector-live">● live</span>
              </div>
              <div className="tf__inspector-body">
                <div className="tf__log-row tf__log-row--1">
                  <span className="tok-method-post">POST</span>
                  <span className="tf__log-path">/api/auth/login</span>
                  <span className="tok-status-ok">200</span>
                  <span className="tf__log-ms">43ms</span>
                </div>
                <div className="tf__log-row tf__log-row--2">
                  <span className="tok-method-get">GET</span>
                  <span className="tf__log-path">/api/users/profile</span>
                  <span className="tok-status-ok">200</span>
                  <span className="tf__log-ms">18ms</span>
                </div>
                <div className="tf__log-row tf__log-row--3">
                  <span className="tok-method-put">PUT</span>
                  <span className="tf__log-path">/api/settings</span>
                  <span className="tok-status-err">500</span>
                  <span className="tf__log-ms">203ms</span>
                  <span className="tf__replay">↺ Replay</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Feature pills ── */}
          <div className="tf__pills">
            <div className="tf__pill">
              <span className="tf__pill-icon">→</span>
              <span><strong>Relay</strong> — every request passes through a controlled layer before hitting your backend</span>
            </div>
            <div className="tf__pill">
              <span className="tf__pill-icon">◎</span>
              <span><strong>Retain</strong> — every request captured in full before it reaches your infrastructure</span>
            </div>
            <div className="tf__pill">
              <span className="tf__pill-icon">↺</span>
              <span><strong>Recover</strong> — replay any retained request after downtime, with exact original payload</span>
            </div>
            <div className="tf__pill">
              <span className="tf__pill-icon">⚡</span>
              <span><strong>Zero code changes</strong> — point one URL, the reliability layer is live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
