const fs = require('fs');
const css = \

/* --- Playtest Section --- */
.playtest {
  padding: 100px 0;
  background: var(--bg);
}
.playtest .section__head { margin-bottom: 60px; }
.playtest__grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 40px;
  align-items: start;
}
.playtest__copy {
  position: sticky;
  top: 100px;
}
.playtest__inner {
  display: flex;
  flex-direction: column;
}
.playtest__eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--green);
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}
.playtest__eyebrow i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  animation: pulse 2s infinite;
}
.playtest__title {
  font-size: 24px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.playtest__desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 24px;
}
.playtest__meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted);
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}
.playtest__hints-h {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 12px;
  display: block;
}
.playtest__hints ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.playtest__hints li {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.playtest__hints li span {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
}
.playtest__hints li em {
  font-style: normal;
  font-size: 12px;
  color: var(--text-secondary);
}
.playtest__frame {
  min-width: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03);
  overflow: hidden;
}
@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

@media (max-width: 980px) {
  .playtest__grid {
    grid-template-columns: 1fr;
  }
  .playtest__copy {
    position: static;
  }
}
\;

fs.appendFileSync('src/pages/Product.css', css);
console.log('Appended to Product.css');
