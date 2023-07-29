import React, { useState, useEffect } from 'react';

const BeritaList = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Ganti API_KEY dengan kunci API Anda dari NewsAPI
    const API_KEY = '91f017ba1de54d268eddb810529138d6';
    const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2023-07-27&to=2023-07-27&sortBy=popularity&apiKey=${API_KEY}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles && data.articles.length >= 7) {
          setNewsData(data.articles.slice(0, 6)); // Simpan 3 berita pertama
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (!newsData.length) {
    return null; // Jika data berita utama masih loading atau tidak ada, tampilkan null (kosong) saja
  }

  return (
    <div id="berita-lama">
    <div className="mt-auto py-2 bg-light">
      <div className="container berita-utama-container">
        <div className="row">
          {newsData.map((news, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                {news.urlToImage && (
                  <img src={news.urlToImage} alt={`Gambar Berita ${index + 1}`} className="card-img-top berita-utama-img" />
                )}
                <div className="card-body">
                  <h2 className="card-title">{news.title}</h2>
                  {/* <p className="card-text">{news.description}</p> */}
                  <p className="card-text">
                    <small className="text-muted">Tanggal Publikasi: {new Date(news.publishedAt).toLocaleDateString('id-ID')}</small>
                  </p>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Baca Selengkapnya
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BeritaList;
