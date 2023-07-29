import React, { useState, useEffect } from 'react';

const BeritaUtama = () => {
  const [beritaUtama, setBeritaUtama] = useState(null);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Ganti API_KEY dengan kunci API Anda dari NewsAPI
    const API_KEY = '91f017ba1de54d268eddb810529138d6';
    const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2023-07-27&to=2023-07-27&sortBy=popularity&apiKey=${API_KEY}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles) {
          setNewsData(data.articles);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Ketika newsData berubah, atur beritaUtama secara acak
    if (newsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * newsData.length);
      setBeritaUtama(newsData[randomIndex]);
    }
  }, [newsData]);

  useEffect(() => {
    // Fungsi untuk memulai pembaruan berita setiap 5 detik
    const intervalId = setInterval(() => {
      updateBeritaUtama();
    }, 5000); // 5 detik (5000 milidetik)

    // Fungsi untuk mengganti berita utama secara acak
    const updateBeritaUtama = () => {
      if (newsData.length > 0) {
        const currentBeritaIndex = newsData.findIndex((news) => news.title === beritaUtama.title);
        const nextIndex = (currentBeritaIndex + 1) % newsData.length;
        setBeritaUtama(newsData[nextIndex]);
      }
    };

    // Hentikan pembaruan berita setiap 5 detik ketika komponen akan dibongkar
    return () => clearInterval(intervalId);
  }, [newsData, beritaUtama]);

  if (!beritaUtama) {
    return null; // Jika data berita utama masih loading atau tidak ada, tampilkan null (kosong) saja
  }

  return (
    <div className="mt-auto py-2 bg-light">
      <div className="container berita-utama-container">
        {beritaUtama.urlToImage && (
          <img src={beritaUtama.urlToImage} alt="Gambar Berita Utama" className="card-img-top berita-utama-img" />
        )}
        <div className="card-body">
          <h2 className="card-title">{beritaUtama.title}</h2>
          <p className="card-text">{beritaUtama.description}</p>
          <p className="card-text">
            <small className="text-muted">
              Tanggal Publikasi: {new Date(beritaUtama.publishedAt).toLocaleDateString('id-ID')}
            </small>
          </p>
          <a href={beritaUtama.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Baca Selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
};

export default BeritaUtama;
