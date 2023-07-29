import React, { useState, useEffect } from 'react';

const Sidebarx = ({ newsData }) => {
  // Mengacak urutan berita
  const [randomNews, setRandomNews] = useState([]);

  useEffect(() => {
    // Menggunakan teknik Fisher-Yates untuk mengacak array
    const shuffleArray = (array) => {
      const shuffled = array.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Mengacak array newsData ketika komponen pertama kali dimuat atau newsData berubah
    setRandomNews(shuffleArray(newsData));
  }, [newsData]);

  return (
    <div className="sidebar" style={{ backgroundColor: '#f1f1f1', padding: '20px', borderRadius: '4px' }}>
      <h3>Berita Populer</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {randomNews.map((newsItem, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            <a href={`#${index}`} style={{ textDecoration: 'none', color: '#333' }}>
              {newsItem.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebarx;
