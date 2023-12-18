import './Tabs.scss';

export default function Tabs({tabs}) {
  return (
    <div className="tabs">
        <ul className="tab-list">
            {tabs}
        </ul>
    </div>
  )
}
