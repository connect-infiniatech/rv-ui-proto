import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from 'chart.js';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import './TimeSeriesPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

/* ---------- Types ---------- */
type ChartTypeKey = 'line' | 'bar' | 'pie' | 'radar';

/* ---------- Categories ---------- */
const categories: { id: ChartTypeKey; name: string; type: ChartTypeKey }[] = [
  { id: 'line',  name: 'Time Series',   type: 'line' },
  { id: 'bar',   name: 'Monthly Sales', type: 'bar'  },
  { id: 'pie',   name: 'Market Share',  type: 'pie'  },
  { id: 'radar', name: 'Skill Radar',   type: 'radar'},
];

/* ---------- Sample Data ---------- */
const sampleData: Record<ChartTypeKey, ChartData<any>> = {
  line: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],
    datasets: [
      { label: 'Contributions', data: [0,0,1,0,0,2,1,3],
        borderColor: 'green', backgroundColor: 'lightgreen' }
    ],
  },
  bar: {
    labels: ['Q1','Q2','Q3','Q4'],
    datasets: [
      { label: 'Sales', data: [12,19,3,5], backgroundColor: '#42a5f5' }
    ],
  },
  pie: {
    labels: ['A','B','C'],
    datasets: [
      { data: [30,45,25], backgroundColor: ['#66bb6a','#ef5350','#ffa726'] }
    ],
  },
  radar: {
    labels: ['HTML','CSS','JS','React','SQL'],
    datasets: [
      { label: 'Skills', data: [8,7,9,6,5],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)' }
    ],
  },
};

/* ---------- Renderer ---------- */
function ChartRenderer({ type, data }: { type: ChartTypeKey; data: ChartData<any> }) {
  switch (type) {
    case 'bar':   return <Bar data={data} />;
    case 'pie':   return <Pie data={data} />;
    case 'radar': return <Radar data={data} />;
    default:      return <Line data={data} />;
  }
}

/* ---------- Page ---------- */
const TimeSeriesPage: React.FC = () => {
  const [selected, setSelected] = useState<ChartTypeKey[]>([]);
  const [popup, setPopup] = useState<{ type: ChartTypeKey; data: ChartData<any> } | null>(null);

  const toggleCategory = (id: ChartTypeKey) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="charts-container">
      {/* Category Selector */}
      <div className="category-list">
        {categories.map(c => (
          <label key={c.id}>
            <input
              type="checkbox"
              checked={selected.includes(c.id)}
              onChange={() => toggleCategory(c.id)}
            />
            {c.name}
          </label>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {selected.map(id => (
          <div
            key={id}
            className="chart-card"
            onClick={() => setPopup({ type: id, data: sampleData[id] })}
          >
            <h4>{categories.find(c => c.id === id)?.name}</h4>
            <ChartRenderer type={id} data={sampleData[id]} />
          </div>
        ))}
      </div>

      {/* Popup */}
      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(null)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setPopup(null)}>×</button>
            <ChartRenderer type={popup.type} data={popup.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSeriesPage;