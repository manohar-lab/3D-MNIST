import type { MaterialName, ViewerSettings } from '../types/digit'

export default function Controls({ settings, setSettings, onGenerate, onReset }: { settings: ViewerSettings; setSettings: (next: ViewerSettings) => void; onGenerate: () => void; onReset: () => void }) {
  const update = <K extends keyof ViewerSettings>(key: K, value: ViewerSettings[K]) => setSettings({ ...settings, [key]: value })
  return <aside className="controls-panel">
    <div className="panel-heading"><div><span className="eyebrow">Model controls</span><h2>Shape lab</h2></div><span className="live-chip">LIVE</span></div>
    <label className="range-row"><span>Thickness <b>{settings.thickness.toFixed(2)}</b></span><input type="range" min="0.15" max="0.8" step="0.01" value={settings.thickness} onChange={e => update('thickness', Number(e.target.value))} /></label>
    <label className="range-row"><span>Scale <b>{settings.scale.toFixed(2)}</b></span><input type="range" min="0.7" max="1.35" step="0.01" value={settings.scale} onChange={e => update('scale', Number(e.target.value))} /></label>
    <label className="range-row"><span>Smoothness <b>{settings.smoothness}</b></span><input type="range" min="1" max="8" step="1" value={settings.smoothness} onChange={e => update('smoothness', Number(e.target.value))} /></label>
    <div className="field"><span>Material</span><div className="segmented">{(['glass', 'chrome', 'candy'] as MaterialName[]).map(material => <button className={settings.material === material ? 'selected' : ''} key={material} onClick={() => update('material', material)}>{material}</button>)}</div></div>
    <div className="field"><span>Lighting</span><div className="segmented">{(['studio', 'warm', 'neon'] as const).map(light => <button className={settings.lighting === light ? 'selected' : ''} key={light} onClick={() => update('lighting', light)}>{light}</button>)}</div></div>
    <label className="toggle"><input type="checkbox" checked={settings.wireframe} onChange={e => update('wireframe', e.target.checked)} /><span className="toggle-ui" /> Wireframe overlay</label>
    <div className="control-actions"><button className="button button-primary" onClick={onGenerate}>Generate <span>↗</span></button><button className="button button-quiet" onClick={onReset}>Reset view</button></div>
  </aside>
}
