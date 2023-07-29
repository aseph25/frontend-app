import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import Sidebarx from './Sidebarx';

const Main = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(5); // Menampilkan 5 berita per halaman

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

  // Menghitung index berita yang akan ditampilkan pada halaman saat ini
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);

  // Mengubah halaman saat tombol "Back" atau "Next" diklik
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Mendapatkan total halaman berita
  const totalPages = Math.ceil(newsData.length / newsPerPage);

  // Menampilkan pagination items dengan Ellipsis
  const renderPaginationItems = () => {
    const items = [];

    // Tombol "Back"
    items.push(
      <Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
    );

    // Tombol halaman
    for (let number = 1; number <= totalPages; number++) {
      if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      } else if (number === currentPage - 2 || number === currentPage + 2) {
        // Tambahkan Ellipsis di sekitar halaman saat ini
        items.push(<Pagination.Ellipsis key={number} disabled />);
      }
    }

    // Tombol "Next"
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentNews.length < newsPerPage || currentPage === totalPages}
      />
    );

    return items;
  };

  return (
    <div id="berita">
    <div className='mt-auto py-2 bg-light'>
      <div className="container py-4 ">
        <div className="row">
          <div className="col-lg-3">
            <Sidebarx newsData={currentNews} /> {/* Gunakan komponen Sidebar di sini */}
          </div>
          <div className="col-lg-9">
            <h1 className="header">Berita Terbaru</h1>
            {currentNews.map((newsItem, index) => (
              <div key={index} className="card mb-4">
                {newsItem.urlToImage && (
                  <img src={newsItem.urlToImage} alt="Gambar Berita" className="card-img-top" />
                )}
                <div className="card-body">
                  <h2 className="card-title">{newsItem.title}</h2>
                  <p className="card-text">{newsItem.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Tanggal Publikasi: {new Date(newsItem.publishedAt).toLocaleDateString('id-ID')}
                    </small>
                  </p>
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Baca Selengkapnya
                  </a>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="d-flex justify-content-center">
              <Pagination>{renderPaginationItems()}</Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Main;
