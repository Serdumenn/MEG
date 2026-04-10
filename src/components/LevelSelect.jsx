import './LevelSelect.css';

const LEVELS = [
  {
    value: 'A1',
    label: 'A1',
    title: 'Başlangıç',
    description: 'Temel İngilizce biliyorum. Kendimi tanıtabilir ve basit cümleleri anlayabilirim.',
  },
  {
    value: 'A2',
    label: 'A2',
    title: 'Temel',
    description: 'Tanıdık konularda konuşabiliyorum ancak geçmiş ve gelecek zamanlarda hatalar yapıyorum.',
  },
  {
    value: 'B1',
    label: 'B1',
    title: 'Orta Seviye',
    description: 'Günlük durumların çoğunu idare edebiliyorum ama perfect zamanlar ve karmaşık dilbilgisinde zorlanıyorum.',
  },
  {
    value: 'B2',
    label: 'B2',
    title: 'Orta-Üst Seviye',
    description: 'Makul düzeyde akıcı konuşuyorum ve ileri düzey dilbilgisi hatalarını gidermek istiyorum.',
  },
];

export default function LevelSelect({ onSelect }) {
  return (
    <div className="level-select-overlay">
      <div className="level-select-modal animate-fade-in">
        <div className="level-select-header">
          <h1 className="level-select-title">MEG</h1>
          <p className="level-select-subtitle">İngilizce Rehberim</p>
          <p className="level-select-prompt">Mevcut İngilizce seviyeniz nedir?</p>
        </div>

        <div className="level-cards">
          {LEVELS.map(lv => (
            <button
              key={lv.value}
              className="level-card"
              onClick={() => onSelect(lv.value)}
            >
              <div className="level-card-left">
                <span className={`level-badge badge badge-${lv.value.toLowerCase()}`}>{lv.label}</span>
              </div>
              <div className="level-card-content">
                <p className="level-card-title">{lv.title}</p>
                <p className="level-card-desc">{lv.description}</p>
              </div>
              <span className="level-card-arrow">›</span>
            </button>
          ))}
        </div>

        <p className="level-select-note">Bunu istediğiniz zaman Ayarlar'dan değiştirebilirsiniz.</p>
      </div>
    </div>
  );
}
